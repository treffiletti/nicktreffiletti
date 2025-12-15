import { NextResponse, NextRequest } from "next/server";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ref", "ref_src", "mc_cid", "mc_eid"];

export function middleware(req: NextRequest) {
  // ignore non-GET and Next/static
  if (req.method !== "GET") return NextResponse.next();
  const { pathname, searchParams } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/favicon") || pathname.startsWith("/robots.txt") || pathname.startsWith("/sitemap.xml")) {
    return NextResponse.next();
  }

  // find any tracking params
  const present = UTM_KEYS.filter((k) => searchParams.has(k));
  if (present.length === 0) return NextResponse.next();

  // store them for later use (optional)
  const payload: Record<string, string> = {};
  for (const k of present) payload[k] = searchParams.get(k) || "";

  const res = NextResponse.redirect(new URL(pathname, req.url), 302);
  // if you need to read this client-side, set httpOnly: false
  res.cookies.set("utm", JSON.stringify(payload), { path: "/", maxAge: 60 * 60 * 24 * 90 });
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
