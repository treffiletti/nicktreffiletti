import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get("password");
  const correctPassword = process.env.WIP_ACCESS_PASSWORD;

  if (!correctPassword) {
    // If no password is set, deny access
    return NextResponse.redirect(new URL("/wip-access?error=1", req.url));
  }

  if (password !== correctPassword) {
    return NextResponse.redirect(new URL("/wip-access?error=1", req.url));
  }

  const redirectTo = req.nextUrl.searchParams.get("redirect") || "/";
  const response = NextResponse.redirect(new URL(redirectTo, req.url));

  response.cookies.set("wip_access", process.env.WIP_ACCESS_COOKIE_SECRET || "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
