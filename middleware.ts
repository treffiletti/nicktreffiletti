import { NextResponse, type NextRequest } from "next/server";

const UTM_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "ref", "ref_src", "mc_cid", "mc_eid",
];

/** Lesson slugs that require WIP access */
const GATED_LESSON_SLUGS = new Set([
  "what-is-mcp", "mcp-architecture", "transport-layers", "tools-resources-prompts",
  "server-setup-typescript", "server-setup-python", "implementing-tools", "resource-providers",
  "security-basics", "error-handling", "observability-tracing", "testing-strategies",
  "deployment-options", "multi-server-orchestration", "custom-transports",
  "enterprise-integration", "future-of-mcp",
]);

function isGatedRoute(pathname: string): boolean {
  // Gate individual lesson pages
  const slug = pathname.replace(/^\//, "").split("/")[0];
  if (GATED_LESSON_SLUGS.has(slug)) return true;
  return false;
}

function hasWipAccess(req: NextRequest): boolean {
  const cookie = req.cookies.get("wip_access")?.value;
  const secret = process.env.WIP_ACCESS_COOKIE_SECRET;
  // If WIP gating is disabled (no env var set), allow access
  if (!process.env.WIP_ACCESS_PASSWORD) return true;
  if (!secret) return cookie === "granted";
  return cookie === secret;
}

export function middleware(req: NextRequest) {
  if (req.method !== "GET") return NextResponse.next();
  const { pathname, searchParams } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/wip-access")
  ) {
    return NextResponse.next();
  }

  // WIP gating check
  if (isGatedRoute(pathname) && !hasWipAccess(req)) {
    const url = req.nextUrl.clone();
    url.pathname = "/wip-access";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // UTM parameter handling — strip and store in cookie
  const present = UTM_KEYS.filter((k) => searchParams.has(k));
  if (present.length === 0) return NextResponse.next();

  const payload: Record<string, string> = {};
  for (const k of present) payload[k] = searchParams.get(k) || "";

  const res = NextResponse.redirect(new URL(pathname, req.url), 302);
  res.cookies.set("utm", JSON.stringify(payload), {
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
    httpOnly: false,
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
