#!/usr/bin/env python3
"""
Parse Gemini-formatted citizen charter MD files into service JSON.

Handles two output formats from Gemini:
  Format A — structured markdown (## N. Title / ### Requirements / **Bold:** headers)
  Format B — plain-text markdown (N. Title inline / Requirements / plain headers)

Usage:
    python3 scripts/parse_charters.py

Input:  raw_data/citizencharters/*.md
Output: src/data/services/categories/<category>.json
"""

import json
import re
import unicodedata
from pathlib import Path

# Key: lowercase substring of the office name or filename
# Value: (category_slug, category_name, office_slug_in_departments_json)
OFFICE_MAP = {
    "city college of calamba":        ("education-scholarship",           "Education & Scholarship",        "city-college-of-calamba"),
    "city civil registry":             ("certificates-vital-records",      "Certificates & Vital Records",   "city-civil-registrar"),
    "city health":                     ("health-wellness",                 "Health & Wellness",              "city-health-office"),
    "city treasury":                   ("taxation-payments",               "Taxation & Payments",            "city-treasurer"),
    "city assessment":                 ("taxation-payments",               "Taxation & Payments",            "city-assessor"),
    "city accounting":                 ("taxation-payments",               "Taxation & Payments",            "city-accountant"),
    "city budget":                     ("taxation-payments",               "Taxation & Payments",            "city-budget-office"),
    "city engineering":                ("infrastructure-public-works",     "Infrastructure & Public Works",  "city-engineer"),
    "building regulatory":             ("infrastructure-public-works",     "Infrastructure & Public Works",  "city-engineer"),
    "city planning":                   ("infrastructure-public-works",     "Infrastructure & Public Works",  "city-planning-and-development-office"),
    "city social services":            ("social-services-assistance",      "Social Services & Assistance",   "city-social-welfare-and-development-office"),
    "housing and settlements":         ("social-services-assistance",      "Social Services & Assistance",   "city-social-welfare-and-development-office"),
    "city agricultural":               ("agriculture-economic-development","Agriculture & Economic Development","city-agriculture-office"),
    "city veterinary":                 ("agriculture-economic-development","Agriculture & Economic Development","city-veterinary-office"),
    "cooperatives and livelihood":     ("agriculture-economic-development","Agriculture & Economic Development","city-agriculture-office"),
    "city environment":                ("environment-natural-resources",   "Environment & Natural Resources","city-environment-and-natural-resources-office"),
    "public order and safety":         ("public-safety-security",          "Public Safety & Security",       "city-disaster-risk-reduction-and-management-office"),
    "business permits":                ("business-trade-investment",       "Business, Trade & Investment",   "business-permit-and-licensing-office"),
    "information investment":          ("business-trade-investment",       "Business, Trade & Investment",   "city-information-office"),
    "city population":                 ("certificates-vital-records",      "Certificates & Vital Records",   "city-civil-registrar"),
    "city human resources":            ("certificates-vital-records",      "Certificates & Vital Records",   "human-resource-management-office"),
    "city legal":                      ("certificates-vital-records",      "Certificates & Vital Records",   "city-administrator"),
    "city general services":           ("infrastructure-public-works",     "Infrastructure & Public Works",  "city-general-services-office"),
    "city administration":             ("certificates-vital-records",      "Certificates & Vital Records",   "city-administrator"),
    "office of the city mayor":        ("certificates-vital-records",      "Certificates & Vital Records",   "office-of-the-city-mayor"),
    "office of the city vice":         ("certificates-vital-records",      "Certificates & Vital Records",   "office-of-the-vice-mayor"),
    "legislative services":            ("certificates-vital-records",      "Certificates & Vital Records",   "office-of-the-sangguniang-panlungsod"),
    "cultural affairs":                ("social-services-assistance",      "Social Services & Assistance",   "city-tourism-office"),
}


# ── Helpers ───────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def resolve_category(name: str):
    name_lower = name.lower()
    for key, val in OFFICE_MAP.items():
        if key in name_lower:
            return val
    return None


def parse_md_table(raw: str) -> list[dict]:
    lines = [l.strip() for l in raw.strip().splitlines() if l.strip() and "|" in l]
    if len(lines) < 3:
        return []
    headers = [h.strip().strip("*") for h in lines[0].split("|") if h.strip()]
    rows = []
    for line in lines[2:]:
        cells = line.split("|")
        if cells and not cells[0].strip():
            cells = cells[1:]
        if cells and not cells[-1].strip():
            cells = cells[:-1]
        cells = [c.strip() for c in cells]
        if len(cells) < len(headers):
            cells += [""] * (len(headers) - len(cells))
        rows.append(dict(zip(headers, cells[: len(headers)])))
    return rows


def clean_cell(text: str) -> str:
    text = re.sub(r"(<br\s*/?>[\s]*)+", "\n", text)
    text = re.sub(r"\n{2,}", "\n", text)
    return text.strip()


def strip_num(text: str) -> str:
    return re.sub(r"^[\d]+\.[\d.]*\s*", "", text.strip()).strip()


def split_cell_actions(text: str) -> list[str]:
    # Strip leading numbering like "1.", "1.1", "1.2", "N/A" from each line
    parts = []
    for l in text.splitlines():
        l = l.strip()
        if not l or l.upper() == "N/A":
            continue
        l = re.sub(r"^[\d]+\.[\d.]*\s*", "", l).strip()
        if l:
            parts.append(l)
    if not parts and text.strip().upper() not in ("N/A", ""):
        return [text.strip()] if text.strip() else []
    return parts


def parse_steps_table(table_raw: str) -> list[dict]:
    """Shared step-parsing logic used by both format parsers."""
    client_steps: list[dict] = []
    step_counter = 1
    for row in parse_md_table(table_raw):
        client_raw = clean_cell(row.get("Client Action", ""))
        agency_raw = clean_cell(row.get("Agency Action", ""))
        fee_raw    = row.get("Fee", "").strip()
        time_raw   = clean_cell(row.get("Processing Time", "")).strip()
        person_raw = row.get("Person Responsible", "").strip()

        if not client_raw and not agency_raw:
            continue

        client_parts = split_cell_actions(client_raw) if client_raw else []
        agency_parts = split_cell_actions(agency_raw) if agency_raw else []
        time_parts   = split_cell_actions(time_raw)   if time_raw   else []

        # Skip rows where the citizen has no action (N/A) — pure internal agency steps
        if not client_parts:
            continue

        for i in range(len(client_parts)):
            c = client_parts[i]
            a = agency_parts[i] if i < len(agency_parts) else (agency_parts[0] if agency_parts else "")
            t = time_parts[i]   if i < len(time_parts)   else (time_parts[0]   if time_parts   else "")

            if not c and not a:
                continue

            step: dict = {"step": step_counter, "action": c or a}
            if a:
                step["agencyAction"] = a
            if person_raw:
                step["personResponsible"] = person_raw
            if t and t.lower() not in ("", "n/a"):
                step["processing_time"] = t
            if fee_raw and fee_raw.lower() not in ("none", "walang babayaran", "n/a", ""):
                step["fee"] = fee_raw

            client_steps.append(step)
            step_counter += 1

    return client_steps


def assemble_service(title, svc_num, office_div, classification, txn_type,
                     who_may_avail, detailed_requirements, client_steps,
                     total_fee, total_time, notes,
                     profile, cat_slug, cat_name, office_slug) -> dict:
    fees = None
    if total_fee and total_fee.lower() not in ("none", "n/a", ""):
        fees = {"amount": total_fee, "description": "As per Citizens Charter fee schedule"}

    svc: dict = {
        "service":              title,
        "slug":                 slugify(title),
        "type":                 "transaction",
        "source":               "citizens-charter",
        "serviceNumber":        svc_num,
        "officeDivision":       office_div,
        "classification":       classification or None,
        "typeOfTransaction":    txn_type,
        "whoMayAvail":          who_may_avail,
        "officeSlug":           [office_slug],
        "category":             {"name": cat_name, "slug": cat_slug},
        "detailedRequirements": detailed_requirements,
        "clientSteps":          client_steps,
        "processingTime":       total_time or None,
        "fees":                 fees,
        "updatedAt":            "2025-01-01T00:00:00.000Z",
        "sources": [{
            "name": f"{profile.get('name', 'City Government of Calamba')} Citizen's Charter 2025",
            "url":  None,
        }],
    }
    if notes:
        svc["notes"] = notes
    return svc


# ── Format A parser (structured markdown: ## N. Title / ### Requirements) ─────

def parse_format_a(text: str, profile: dict, cat_slug, cat_name, office_slug) -> list[dict]:
    services = []
    for block in re.split(r"(?=\n## \d+\.)", text):
        hm = re.match(r"\n## (\d+)\.\s*(.+?)(?:\n|$)", block)
        if not hm:
            continue
        svc_num, title = hm.group(1), hm.group(2).strip()

        # Metadata: bold **Key:** Value pairs
        meta_lines, capturing = [], False
        for line in block.splitlines():
            if re.search(r"\*\*(Office/Division|Classification|Transaction Type|Who May Avail):", line):
                meta_lines.append(line); capturing = True
            elif capturing:
                if line.startswith(("###", "|", "---")): break
                if line.strip(): meta_lines.append(line)

        def bold_meta(key, text):
            m = re.search(rf"\*\*{key}:\*\*\s*([^\*\n]+)", text)
            return m.group(1).strip() if m else ""

        meta_text = " ".join(meta_lines)
        office_div     = bold_meta("Office/Division", meta_text)
        classification = bold_meta("Classification", meta_text).split()[0] if bold_meta("Classification", meta_text) else None
        txn_type       = bold_meta("Transaction Type", meta_text) or bold_meta("Transaction type", meta_text)
        who_may_avail  = bold_meta("Who May Avail", meta_text) or bold_meta("Who may avail", meta_text)

        # Requirements
        req_m = re.search(r"### Requirements\s*\n((?:\|[^\n]+\n?)+)", block)
        reqs = []
        if req_m:
            for row in parse_md_table(req_m.group(1)):
                r = strip_num(clean_cell(row.get("Requirement", "")))
                w = strip_num(clean_cell(row.get("Where to Secure", "")))
                if r: reqs.append({"requirement": r, "where_to_secure": w})

        # Steps
        steps_m = re.search(r"### Process Steps\s*\n((?:\|[^\n]+\n?)+)", block)
        steps = parse_steps_table(steps_m.group(1)) if steps_m else []

        # Totals (bold format)
        tm = re.search(r"\*\*Total Fee:\*\*\s*(.+?)\s+\*\*Total Processing Time:\*\*\s*(.+?)(?:\n|$)", block)
        total_fee  = tm.group(1).strip() if tm else ""
        total_time = tm.group(2).strip() if tm else ""

        # Notes
        nm = re.search(r"### Notes\s*\n(.*?)(?=\n## |\Z)", block, re.DOTALL)
        notes = nm.group(1).strip() if nm else ""
        if notes.lower() in ("none", "n/a", ""): notes = ""

        services.append(assemble_service(
            title, svc_num, office_div, classification, txn_type, who_may_avail,
            reqs, steps, total_fee, total_time, notes, profile, cat_slug, cat_name, office_slug
        ))
    return services


# ── Format B parser (plain-text: N. Title ... Office/Division: X ...) ─────────

def parse_format_b(text: str, profile: dict, cat_slug, cat_name, office_slug) -> list[dict]:
    # Find where the actual services begin — first line matching "N. ... Office/Division:"
    first_m = re.search(r"(?m)^(\d+)\.\s+.{0,500}?Office/Division:", text)
    if not first_m:
        return []

    services_text = text[first_m.start():]

    # Find all service start positions by scanning for "^\d+. " lines that have
    # "Office/Division:" within the next 600 chars
    starts = []
    for m in re.finditer(r"(?m)^(\d+)\.\s+", services_text):
        vicinity = services_text[m.start(): m.start() + 600]
        if "Office/Division:" in vicinity:
            starts.append(m.start())
    if not starts:
        return []
    starts.append(len(services_text))

    services = []
    for i in range(len(starts) - 1):
        block = services_text[starts[i]: starts[i + 1]]

        # Title = text before "Office/Division:" on the first line
        hm = re.match(r"^(\d+)\.\s+(.+?)(?=\s+Office/Division:)", block)
        if not hm:
            continue
        svc_num, title = hm.group(1), hm.group(2).strip()

        # Inline metadata (plain text, no bold markers)
        def plain_meta(key, text):
            m = re.search(rf"{re.escape(key)}:\s*([^\n]+?)(?=\s+(?:Classification|Transaction Type|Who May Avail)|$)", text[:600])
            return m.group(1).strip() if m else ""

        office_div    = plain_meta("Office/Division", block)
        classification_raw = plain_meta("Classification", block)
        classification = classification_raw.split()[0] if classification_raw else None
        txn_type      = plain_meta("Transaction Type", block)
        who_may_avail = re.search(r"Who May Avail:\s*([^\n]+)", block[:600])
        who_may_avail = who_may_avail.group(1).strip() if who_may_avail else ""

        # Requirements (no ### prefix)
        req_m = re.search(r"(?:^|\n)Requirements\s*\n((?:\|[^\n]+\n?)+)", block)
        reqs = []
        if req_m:
            for row in parse_md_table(req_m.group(1)):
                r = strip_num(clean_cell(row.get("Requirement", "")))
                w = strip_num(clean_cell(row.get("Where to Secure", "")))
                if r: reqs.append({"requirement": r, "where_to_secure": w})

        # Steps (no ### prefix)
        steps_m = re.search(r"(?:^|\n)Process Steps\s*\n((?:\|[^\n]+\n?)+)", block)
        steps = parse_steps_table(steps_m.group(1)) if steps_m else []

        # Totals (plain text)
        tm = re.search(r"Total Fee:\s*(.+?)\s+Total Processing Time:\s*(.+?)(?:\s+Notes|\n|$)", block)
        total_fee  = tm.group(1).strip() if tm else ""
        total_time = tm.group(2).strip() if tm else ""

        # Notes (plain text, same line as "Notes")
        nm = re.search(r"Total Processing Time:[^\n]+?\s+Notes\s+(.+?)$", block, re.DOTALL)
        notes = nm.group(1).strip() if nm else ""
        if notes.lower() in ("none", "n/a", ""): notes = ""

        services.append(assemble_service(
            title, svc_num, office_div, classification, txn_type, who_may_avail,
            reqs, steps, total_fee, total_time, notes, profile, cat_slug, cat_name, office_slug
        ))
    return services


# ── Main entry ────────────────────────────────────────────────────────────────

def parse_charter(path: Path) -> tuple[dict, list[dict]]:
    text = path.read_text(encoding="utf-8")

    # ── Profile ──────────────────────────────────────────────────────────────
    profile: dict = {}
    prof_m = re.search(r"# Agency Profile\n(.*?)(?=\n## \d+\.)", text, re.DOTALL)
    prof_text = prof_m.group(1) if prof_m else text[:2000]

    name_m = (re.search(r"\*\*Office Name:\*\*\s*([^\n*|]+)", prof_text) or
              re.search(r"Office Name:\s*([^\n|]+?)(?:\s+Parent Agency|\s*\n)", prof_text))
    if name_m:
        profile["name"] = name_m.group(1).strip()

    for sec in ("Mandate", "Vision", "Mission", "Service Pledge"):
        sm = re.search(rf"## {sec}\n(.*?)(?=\n## |\Z)", prof_text, re.DOTALL)
        if sm:
            profile[sec.lower().replace(" ", "_")] = sm.group(1).strip()

    # ── Category ─────────────────────────────────────────────────────────────
    cat_info = resolve_category(profile.get("name", "")) or resolve_category(path.stem)
    if not cat_info:
        print(f"  WARNING: no category mapping for '{profile.get('name', path.name)}' / '{path.stem}'")
        return profile, []
    cat_slug, cat_name, office_slug = cat_info

    # ── Detect format and dispatch ────────────────────────────────────────────
    is_format_a = bool(re.search(r"^## \d+\.", text, re.MULTILINE))
    services = (parse_format_a if is_format_a else parse_format_b)(
        text, profile, cat_slug, cat_name, office_slug
    )
    return profile, services


def main() -> None:
    charter_dir = Path("raw_data/citizencharters")
    output_dir  = Path("src/data/services/categories")
    by_category: dict[str, list] = {}

    for md_file in sorted(charter_dir.glob("*.md")):
        if "prompt" in md_file.stem.lower() or "template" in md_file.stem.lower():
            print(f"Skipping {md_file.name}")
            continue
        print(f"Parsing {md_file.name} …")
        try:
            _, services = parse_charter(md_file)
            fmt = "A" if re.search(r"^## \d+\.", md_file.read_text(), re.MULTILINE) else "B"
            print(f"  → {len(services)} services [format {fmt}]")
            for svc in services:
                by_category.setdefault(svc["category"]["slug"], []).append(svc)
        except Exception as exc:
            import traceback
            print(f"  ERROR: {exc}"); traceback.print_exc()

    for cat_slug, new_svcs in by_category.items():
        out = output_dir / f"{cat_slug}.json"
        existing: list = json.loads(out.read_text(encoding="utf-8")) if out.exists() else []
        known_slugs = {s["slug"] for s in existing}
        added = [s for s in new_svcs if s["slug"] not in known_slugs]
        merged = sorted(existing + added, key=lambda x: x["service"])
        out.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"  Wrote {len(added)} new services → {out}")

    print("\nDone. Run `npm run merge:services` to rebuild services.json.")


if __name__ == "__main__":
    main()
