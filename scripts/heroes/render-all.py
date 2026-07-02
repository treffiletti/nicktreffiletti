#!/usr/bin/env python3
"""Render every scripts/heroes/*.html into a 16:9 blog hero PNG.

Run from the repo root (nicktreffiletti.com):
    python3 scripts/heroes/render-all.py

Outputs public/generated/hero/<name>.png at 1600x900 @2x (3200x1800), overwriting
the old heroes. Filenames match blog slugs, so they wire up automatically.

One-time setup (you already have this from the infographic skill):
    pip3 install playwright && python3 -m playwright install chromium
"""
import glob, os, pathlib, sys

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    sys.exit("Playwright not installed. Run:\n  pip3 install playwright && python3 -m playwright install chromium")

ROOT = pathlib.Path(__file__).resolve().parents[2]   # repo root
HERO_DIR = ROOT / "scripts" / "heroes"
OUT_DIR = ROOT / "public" / "generated" / "hero"
OUT_DIR.mkdir(parents=True, exist_ok=True)

htmls = sorted(glob.glob(str(HERO_DIR / "*.html")))
if not htmls:
    sys.exit("No hero HTML files found.")

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(device_scale_factor=2)
    page = ctx.new_page()
    for html in htmls:
        slug = pathlib.Path(html).stem
        page.goto(pathlib.Path(html).resolve().as_uri(), wait_until="networkidle")
        page.wait_for_timeout(600)  # let embedded Geist webfont load
        el = page.query_selector(".hero")
        out = OUT_DIR / f"{slug}.png"
        el.screenshot(path=str(out))
        print(f"  ✓ {slug}.png")
    browser.close()

print(f"\nDone. {len(htmls)} heroes written to public/generated/hero/")
