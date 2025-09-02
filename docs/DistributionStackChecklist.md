# 📋 Distribution Stack Checklist

## 1. Home base (canonical site)

- Next.js site bootstrapped (App Router)
- Content in `/content` with MDX (Contentlayer or Velite)
- `next-seo` configured (title templates, OpenGraph, JSON-LD BlogPosting schema)
- `next-sitemap` generating `/sitemap.xml` and robots.txt
- RSS feed at `/feed.xml` (for Beehiiv + DEV imports)
- Auto-generated OG images (via @vercel/og or Bannerbear)
- Analytics (Plausible or PostHog) connected
- Search Console + Bing Webmaster Tools set up

---

## 2. Newsletter

- Choose a platform (Beehiiv / Buttondown / Ghost / Substack)
- Connect RSS → auto-send (Beehiiv) OR set up manual campaign flow
- Create lead magnet (e.g., “Platform Architecture Scorecard”)
- Add signup CTA to site + LinkedIn carousels

---

## 3. LinkedIn

- Create LinkedIn Newsletter under your profile
- Design PDF carousel template (Keynote/Canva)
- Schedule posts via Typefully/Taplio
- Set up Shield analytics

---

## 4. Repurposing system

- Descript / CapCut workflow for short clips
- Opus Clip / Munch for auto-shorts
- Canva template for carousels
- OG templates configured

---

## 5. Syndication

- DEV account + configure canonical\_url
- Medium “Import Story” flow tested (retains canonical)
- Optional: Hashnode / DZone / Lobsters accounts ready

---

## 6. Authority pitching

- HARO / Qwoted / Help a B2B Writer sign-ups
- Track daily opportunities in inbox / Notion
- InfoQ / The New Stack editorial pitch drafted

---

## 7. Automation glue

- Zapier / n8n flows:
  - New RSS item → draft LinkedIn post in Typefully
  - New RSS item → add to Buffer queue
  - New subscriber → Notion CRM

---

## 8. Weekly loop (operating system)

- 1 canonical post published on site
- Repurpose → LinkedIn carousel + text post + newsletter blurb
- Syndicate to DEV (+ Medium Import)
- Respond to 2–3 HARO/Qwoted/Help a B2B Writer requests
- Track in Shield + Search Console
