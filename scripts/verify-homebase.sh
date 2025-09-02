#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-https://www.nicktreffiletti.com}"
POST_PATH="${POST_PATH:-/}"                 # set to a real post path to test BlogPosting schema (e.g., /posts/hello-world)
RSS_PATH="${RSS_PATH:-/feed.xml}"
SITEMAP_PATH="${SITEMAP_PATH:-/sitemap.xml}"
ROBOTS_PATH="${ROBOTS_PATH:-/robots.txt}"
OG_API_PATH="${OG_API_PATH:-/api/og?title=Test}"   # if you use a dynamic OG endpoint; otherwise test an actual post’s og:image
DRAFT_PATTERN="${DRAFT_PATTERN:-draft}"     # string that would appear in draft slugs/URLs (tweak as needed)

pass() { echo "✅ $1"; }
fail() { echo "❌ $1" && exit 1; }

echo "Testing site: $BASE"
echo "POST_PATH: $POST_PATH"
echo

# 1) Next.js site reachable (App Router assumed)
curl -sS -I "$BASE" | grep -q "200 OK" && pass "Home responds 200" || fail "Home not 200"
curl -sS "$BASE" | grep -qi "<html" && pass "Home returns HTML" || fail "Home not HTML"

# 2) MDX content present (heuristic: article page exists and looks like a post)
if [ "$POST_PATH" != "/" ]; then
  curl -sS -I "$BASE$POST_PATH" | grep -q "200 OK" && pass "Post responds 200" || fail "Post URL not 200"
  curl -sS "$BASE$POST_PATH" | grep -qi "<article" && pass "Post contains <article>" || echo "ℹ️ Could not find <article> tag (heuristic only)"
fi

# 3) next-seo configured (title/OG/canonical exist)
curl -sS "$BASE" | grep -qi '<meta property="og:title"' && pass "Home has og:title" || echo "ℹ️ Home missing og:title"
curl -sS "$BASE" | grep -qi '<link rel="canonical"' && pass "Home has canonical link" || echo "ℹ️ Home missing canonical"

if [ "$POST_PATH" != "/" ]; then
  curl -sS "$BASE$POST_PATH" | grep -qi '<meta property="og:title"' && pass "Post has og:title" || echo "ℹ️ Post missing og:title"
  curl -sS "$BASE$POST_PATH" | grep -qi '<link rel="canonical"' && pass "Post has canonical link" || echo "ℹ️ Post missing canonical"
fi

# 4) next-sitemap generating /sitemap.xml + robots.txt
curl -sS -I "$BASE$SITEMAP_PATH" | grep -q "200 OK" && pass "Sitemap responds 200" || fail "Sitemap not 200"
curl -sS "$BASE$SITEMAP_PATH" | grep -qi "<urlset" && pass "Sitemap looks like XML urlset" || fail "Sitemap missing <urlset>"
curl -sS -I "$BASE$ROBOTS_PATH" | grep -q "200 OK" && pass "robots.txt responds 200" || fail "robots.txt not 200"
curl -sS "$BASE$ROBOTS_PATH" | grep -qi "Sitemap: " && pass "robots.txt references sitemap" || echo "ℹ️ robots.txt missing Sitemap reference"

# 4a) Sitemap does NOT leak drafts
if curl -sS "$BASE$SITEMAP_PATH" | grep -qi "$DRAFT_PATTERN"; then
  fail "Sitemap appears to include drafts (pattern '$DRAFT_PATTERN' found)"
else
  pass "Sitemap shows no obvious drafts (pattern '$DRAFT_PATTERN' not found)"
fi

# 5) RSS feed at /feed.xml and non-empty
curl -sS -I "$BASE$RSS_PATH" | grep -q "200 OK" && pass "RSS responds 200" || fail "RSS not 200"
RSS=$(curl -sS "$BASE$RSS_PATH")
echo "$RSS" | grep -qiE "<rss|<feed" && pass "RSS/Atom root tag OK" || fail "RSS/Atom root tag missing"
ITEM_COUNT=$(echo "$RSS" | grep -ciE "<item>|<entry>")
if [ "$ITEM_COUNT" -gt 0 ]; then
  pass "RSS has at least one item/entry ($ITEM_COUNT)"
else
  fail "RSS has zero items/entries"
fi

# 6) Auto OG images working
# Option A: dynamic endpoint check (preferred for @vercel/og)
OG_CT=$(curl -sS -D - "$BASE$OG_API_PATH" -o /dev/null | awk '/content-type:/ {print tolower($0)}')
if echo "$OG_CT" | grep -q "image/"; then
  pass "Dynamic OG endpoint returns an image ($OG_CT)"
else
  # Option B: try to follow a meta og:image URL on the post page
  if [ "$POST_PATH" != "/" ]; then
    OG_URL=$(curl -sS "$BASE$POST_PATH" | sed -n 's/.*<meta property="og:image"[^>]*content="\([^"]*\)".*/\1/p' | head -n1)
    if [ -n "$OG_URL" ]; then
      OG_CT2=$(curl -sS -D - "$OG_URL" -o /dev/null | awk '/content-type:/ {print tolower($0)}')
      echo "$OG_CT2" | grep -q "image/" && pass "og:image resolves to an image ($OG_CT2)" || fail "og:image does not resolve to an image"
    else
      echo "ℹ️ Could not find og:image meta tag. If you rely on dynamic OG only, ensure OG_API_PATH is correct."
    fi
  else
    echo "ℹ️ Skipping og:image meta test (POST_PATH is root)."
  fi
fi

# 7) Analytics present (Plausible or PostHog)
HOME_HTML=$(curl -sS "$BASE")
if echo "$HOME_HTML" | grep -qi "plausible.io/js/script"; then
  pass "Plausible script tag detected on Home"
elif echo "$HOME_HTML" | grep -qi "cdn.posthog.com"; then
  pass "PostHog script tag detected on Home"
else
  echo "ℹ️ No Plausible/PostHog script tag detected on Home"
fi

# 8) JSON-LD (BlogPosting on post; WebSite/Person/Organization on home)
if echo "$HOME_HTML" | grep -qi 'application/ld+json'; then
  pass "Home has JSON-LD"
else
  echo "ℹ️ Home missing JSON-LD (consider WebSite/Organization/Person)"
fi

if [ "$POST_PATH" != "/" ]; then
  POST_HTML=$(curl -sS "$BASE$POST_PATH")
  if echo "$POST_HTML" | grep -qi 'application/ld+json'; then
    echo "$POST_HTML" | grep -qi '"@type":[[:space:]]*"BlogPosting"' \
      && pass "Post JSON-LD includes BlogPosting" \
      || echo "ℹ️ Post JSON-LD found but BlogPosting @type not detected"
  else
    echo "ℹ️ Post missing JSON-LD"
  fi
fi

# 9) Search Console + Bing verification (meta tags heuristic)
echo "$HOME_HTML" | grep -qi 'name="google-site-verification"' \
  && pass "Google Search Console verification meta present" \
  || echo "ℹ️ Google verification meta not found (you may be using file verification)"

echo "$HOME_HTML" | grep -qi 'name="msvalidate.01"' \
  && pass "Bing Webmaster Tools verification meta present" \
  || echo "ℹ️ Bing verification meta not found (you may be using file verification)"

echo
pass "Home base verification completed. Review ℹ️ informational notes above."
