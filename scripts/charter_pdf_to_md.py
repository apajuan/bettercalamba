#!/usr/bin/env python3
"""
Convert Citizens Charter PDFs into structured Markdown using the Gemini API.

This batch-converts every PDF in an input directory into a .md file using the
same prompt format as raw_data/citizencharters/Prompt Template.md, so the output
can be parsed into the services category JSON schema.

IMPORTANT — about your "Gemini Pro" subscription:
  Gemini Advanced (Google One AI Premium) is a consumer subscription for the
  Gemini *app* and does NOT include API access. This script needs a separate
  Gemini API key from Google AI Studio (https://aistudio.google.com -> "Get API
  key"). The free tier is enough for a small batch; pay-as-you-go is cents/PDF.
  API usage is billed separately from your Gemini Advanced subscription.

SETUP:
  pip install google-genai
  export GEMINI_API_KEY="your-key-from-aistudio"

USAGE:
  python3 scripts/charter_pdf_to_md.py                 # default in/out dirs
  python3 scripts/charter_pdf_to_md.py --input <dir> --output <dir>
  python3 scripts/charter_pdf_to_md.py --overwrite     # re-convert existing .md
  python3 scripts/charter_pdf_to_md.py --model gemini-2.5-flash   # faster/cheaper

Defaults:
  --input   raw_data/citizencharters/pdfs
  --output  raw_data/citizencharters
  --model   gemini-2.5-pro
"""

import argparse
import os
import sys
import time
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
DEFAULT_INPUT = PROJECT_ROOT / "raw_data" / "citizencharters" / "pdfs"
DEFAULT_OUTPUT = PROJECT_ROOT / "raw_data" / "citizencharters"

PROMPT = """You are converting a Philippine local government Citizen's Charter PDF into structured Markdown.

The charter contains an agency profile section followed by multiple individual government services.

RULES:
1. Extract the agency profile ONCE at the top, then EVERY service — use the exact formats below, no variations.
2. Do not skip any service, even if the PDF text is garbled or partially unreadable. If a whole service is unreadable, still output its heading and write "N/A" in each field.
3. Preserve bilingual content (Tagalog/English) exactly as written — do NOT translate or summarize.
4. Reconstruct requirements and process-step tables even if the PDF columns are scrambled; use judgment to place each cell in the correct column. Keep every row.
5. If a field is missing or unclear, write "N/A". Never invent data.
6. Do NOT include ordinance text, resolution excerpts, feedback/complaint boilerplate, or page headers/footers.
7. Separate each service with a horizontal rule (---).
8. Number services using the PDF's own numbering. If unnumbered, number them sequentially starting at 1.
9. Output raw Markdown only — no commentary before or after.

=== OUTPUT FORMAT — AGENCY PROFILE (output once at the top) ===

# Agency Profile

**Office Name:** [full official name of the office or department]
**Parent Agency:** City Government of Calamba
**Mandate:** [text, or "N/A"]
**Vision:** [text, or "N/A"]
**Mission:** [text, or "N/A"]
**Service Pledge:** [text, or "N/A"]

---

=== OUTPUT FORMAT — EACH SERVICE (repeat for every service) ===

## [number]. [Service Title]

**Office/Division:** [value]
**Classification:** [Simple | Complex | Highly Technical | N/A]
**Transaction Type:** [G2C | G2B | G2G | combination, e.g. "G2C, G2B" | N/A]
**Who May Avail:** [value]

### Requirements
| Requirement | Where to Secure |
|---|---|
| [requirement] | [where to obtain it] |

### Process Steps
| # | Client Action | Agency Action | Fee | Processing Time |
|---|---|---|---|---|
| 1 | [what the client does] | [what the agency does] | [fee, or "None"] | [time] |

**Total Fee:** [total amount, or "None"]
**Total Processing Time:** [total time, or "N/A"]

### Notes
[PAALALA or other remarks, or "None"]
"""


def eprint(*args):
    print(*args, file=sys.stderr)


def get_client():
    try:
        from google import genai  # noqa: F401
    except ImportError:
        eprint("ERROR: google-genai is not installed. Run:  pip install google-genai")
        sys.exit(1)

    from google import genai

    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        eprint(
            "ERROR: No API key found. Get one at https://aistudio.google.com (Get API key),\n"
            "       then:  export GEMINI_API_KEY=\"your-key\"\n"
            "       (Note: your Gemini Advanced app subscription does NOT provide this.)"
        )
        sys.exit(1)

    return genai.Client(api_key=api_key)


def convert_pdf(client, pdf_path: Path, model: str) -> str:
    """Upload a PDF and return the generated Markdown text."""
    from google.genai import types

    # Inline small PDFs; use the Files API for larger ones (>~15 MB).
    data = pdf_path.read_bytes()
    if len(data) < 15 * 1024 * 1024:
        part = types.Part.from_bytes(data=data, mime_type="application/pdf")
        contents = [part, PROMPT]
    else:
        uploaded = client.files.upload(
            file=pdf_path, config={"mime_type": "application/pdf"}
        )
        contents = [uploaded, PROMPT]

    response = client.models.generate_content(
        model=model,
        contents=contents,
    )
    return (response.text or "").strip()


def main():
    parser = argparse.ArgumentParser(description="Convert Citizens Charter PDFs to Markdown via Gemini.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT, help="Directory of source PDFs")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Directory for .md output")
    parser.add_argument("--model", default="gemini-2.5-pro", help="Gemini model (default: gemini-2.5-pro)")
    parser.add_argument("--overwrite", action="store_true", help="Re-convert PDFs even if .md already exists")
    parser.add_argument("--sleep", type=float, default=2.0, help="Seconds to pause between PDFs (rate limiting)")
    args = parser.parse_args()

    if not args.input.exists():
        eprint(f"Input directory does not exist: {args.input}")
        eprint(f"Create it and drop your charter PDFs in, e.g.:  mkdir -p {args.input}")
        sys.exit(1)

    pdfs = sorted(args.input.glob("*.pdf"))
    if not pdfs:
        eprint(f"No PDFs found in {args.input}")
        sys.exit(1)

    args.output.mkdir(parents=True, exist_ok=True)
    client = get_client()

    print(f"Converting {len(pdfs)} PDF(s) with {args.model}\n")
    converted, skipped, failed = 0, 0, 0

    for pdf in pdfs:
        out_path = args.output / (pdf.stem + ".md")
        if out_path.exists() and not args.overwrite:
            print(f"  SKIP  {pdf.name}  (output exists; use --overwrite to redo)")
            skipped += 1
            continue

        print(f"  ...   {pdf.name}")
        try:
            md = convert_pdf(client, pdf, args.model)
            if not md:
                raise ValueError("empty response from model")
            out_path.write_text(md + "\n", encoding="utf-8")
            print(f"  OK    {pdf.name} -> {out_path.name}")
            converted += 1
        except Exception as exc:  # noqa: BLE001
            eprint(f"  FAIL  {pdf.name}: {exc}")
            failed += 1

        time.sleep(args.sleep)

    print(f"\nDone. converted={converted} skipped={skipped} failed={failed}")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
