"""Generate the BetterCalamba Open Graph share image.

Composes public/calamba-seal.svg onto a 1200x630 Calamba-blue canvas with the
portal wordmark. Re-run after replacing the seal:

    python3 scripts/make_og_image.py
"""

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SEAL_SVG = ROOT / "public" / "calamba-seal.svg"
OUT = ROOT / "public" / "logos" / "png" / "bettercalamba-blue.png"

W, H = 1200, 630
BLUE = (0, 50, 160)  # #0032A0 — portal.brandColor
GOLD = (254, 209, 65)  # #FED141
WHITE = (255, 255, 255)

SEAL_PX = 300
BOLD = "/usr/share/fonts/noto/NotoSans-Bold.ttf"
REGULAR = "/usr/share/fonts/noto/NotoSans-Regular.ttf"


def render_seal(size: int) -> Image.Image:
    tmp = Path("/tmp/bettercalamba-seal-og.png")
    subprocess.run(
        ["rsvg-convert", "-w", str(size), "-h", str(size), str(SEAL_SVG), "-o", str(tmp)],
        check=True,
    )
    return Image.open(tmp).convert("RGBA")


def main() -> None:
    canvas = Image.new("RGB", (W, H), BLUE)
    draw = ImageDraw.Draw(canvas)

    # Gold hairline inset border
    draw.rectangle([28, 28, W - 29, H - 29], outline=GOLD, width=3)

    seal = render_seal(SEAL_PX)
    seal_x, seal_y = 110, (H - SEAL_PX) // 2
    canvas.paste(seal, (seal_x, seal_y), seal)

    text_x = seal_x + SEAL_PX + 80

    title = ImageFont.truetype(BOLD, 84)
    subtitle = ImageFont.truetype(REGULAR, 34)
    kicker = ImageFont.truetype(BOLD, 24)

    draw.text((text_x, 218), "BetterCalamba", font=title, fill=WHITE)
    draw.text(
        (text_x, 322),
        "Community-powered portal of the",
        font=subtitle,
        fill=(214, 226, 250),
    )
    draw.text((text_x, 364), "City of Calamba, Laguna", font=subtitle, fill=(214, 226, 250))
    draw.text((text_x, 430), "SERVICES  ·  TRANSPARENCY  ·  OPEN DATA", font=kicker, fill=GOLD)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
