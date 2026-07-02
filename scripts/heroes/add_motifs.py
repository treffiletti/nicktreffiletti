#!/usr/bin/env python3
"""Inject a random faint background motif into each hero HTML file.
Idempotent: skips files that already contain a <div class="bg">.
Run: python3 scripts/heroes/add_motifs.py
"""
import glob, os, random, math, re, pathlib

random.seed()  # different assignment each run; comment out args below for reproducible
S = 'rgba(255,255,255,.14)'   # faint stroke
HERO_DIR = pathlib.Path(__file__).resolve().parent

def wrap(inner):
    return ('<div class="bg"><svg width="1600" height="900" viewBox="0 0 1600 900" '
            'fill="none" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg></div>')

def globe():
    cx, cy, r = 1500, 440, 400
    p = [f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke="{S}"/>']
    for rx in (r, 300, 190, 80):
        p.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{r}" stroke="{S}"/>')
    for ry in (300, 190, 80):
        p.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="{ry}" stroke="{S}"/>')
    for (x, y) in [(1300, 250), (1250, 470), (1360, 560), (1180, 380)]:
        p.append(f'<circle cx="{x}" cy="{y}" r="7" fill="rgba(255,255,255,.55)"/>')
    return wrap('<g stroke-width="1.2">' + ''.join(p) + '</g>')

def dots():
    random.seed(7)
    out = []
    for _ in range(230):
        x = min(1590, max(1000, random.gauss(1330, 190)))
        y = min(800, max(120, random.gauss(450, 190)))
        rr = round(random.uniform(.8, 2.6), 1)
        op = round(random.uniform(.18, .5), 2)
        out.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rr}" fill="rgba(255,255,255,{op})"/>')
    random.seed()
    return wrap(''.join(out))

def fan():
    ox, oy = 1180, 740
    lines = []
    for i in range(18):
        t = i / 17
        ex = 1240 + t * 340
        ey = 700 - t * 520
        lines.append(f'<line x1="{ox}" y1="{oy}" x2="{ex:.0f}" y2="{ey:.0f}" stroke="rgba(255,255,255,.10)"/>')
    grid = (f'<rect x="1120" y="150" width="440" height="620" stroke="{S}"/>'
            f'<line x1="1340" y1="150" x2="1340" y2="770" stroke="{S}"/>'
            f'<line x1="1120" y1="460" x2="1560" y2="460" stroke="{S}"/>')
    marks = ''.join(f'<path d="M{x-9} {y}h18M{x} {y-9}v18" stroke="rgba(255,255,255,.5)" stroke-width="1.4"/>'
                    for x, y in [(1180, 740), (1520, 180)])
    return wrap('<g stroke-width="1.2">' + grid + ''.join(lines) + marks + '</g>')

def sparkles():
    tri = '<path d="M1360 170 L1180 760 L1540 760 Z" stroke="{}" stroke-width="1.2"/>'.format(S)
    guides = (f'<line x1="1140" y1="180" x2="1580" y2="180" stroke="rgba(255,255,255,.08)"/>'
              f'<line x1="1360" y1="120" x2="1360" y2="800" stroke="rgba(255,255,255,.08)"/>')
    def star(x, y, s):
        return (f'<path d="M{x} {y-s} C{x+2} {y-2},{x+2} {y-2},{x+s} {y} '
                f'C{x+2} {y+2},{x+2} {y+2},{x} {y+s} C{x-2} {y+2},{x-2} {y+2},{x-s} {y} '
                f'C{x-2} {y-2},{x-2} {y-2},{x} {y-s} Z" fill="rgba(255,255,255,.5)"/>')
    st = star(1470, 260, 26) + star(1250, 430, 20) + star(1420, 600, 16)
    return wrap('<g>' + guides + tri + st + '</g>')

def guides():
    rr = (f'<rect x="1160" y="150" width="600" height="620" rx="40" stroke="{S}"/>'
          f'<rect x="1160" y="150" width="600" height="310" rx="40" stroke="rgba(255,255,255,.08)"/>')
    code = ('<g stroke="rgba(255,255,255,.4)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">'
            '<path d="M1300 430 l-34 30 l34 30"/><path d="M1400 430 l34 30 l-34 30"/></g>')
    dot = '<circle cx="1560" cy="300" r="20" fill="rgba(255,255,255,.05)"/><circle cx="1470" cy="560" r="14" fill="rgba(255,255,255,.05)"/>'
    return wrap('<g stroke-width="1.2">' + rr + '</g>' + code + dot)

def regmarks():
    xs, ys = [1120, 1280, 1440, 1600], [150, 350, 550, 750]
    lines = [f'<line x1="{x}" y1="120" x2="{x}" y2="790" stroke="{S}"/>' for x in xs]
    lines += [f'<line x1="1100" y1="{y}" x2="1600" y2="{y}" stroke="{S}"/>' for y in ys]
    marks = []
    for x in xs[:3]:
        for y in ys[:3]:
            marks.append(f'<path d="M{x-8} {y}h16M{x} {y-8}v16" stroke="rgba(255,255,255,.45)" stroke-width="1.4"/>')
    rect = f'<rect x="1280" y="350" width="160" height="200" rx="14" stroke="rgba(255,255,255,.2)"/>'
    return wrap('<g stroke-width="1.2">' + ''.join(lines) + rect + ''.join(marks) + '</g>')

MOTIFS = [globe, dots, fan, sparkles, guides, regmarks]

files = sorted(glob.glob(str(HERO_DIR / "*.html")))
order = MOTIFS[:]
random.shuffle(order)
for i, f in enumerate(files):
    html = open(f).read()
    if '<div class="bg">' in html:
        print(f"  skip (already has motif): {os.path.basename(f)}"); continue
    motif = order[i % len(order)]()
    html = re.sub(r'(<div class="hero">)', r'\1' + motif, html, count=1)
    open(f, 'w').write(html)
    print(f"  + {order[i % len(order)].__name__:10} -> {os.path.basename(f)}")
