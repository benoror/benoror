import { NextResponse, type NextRequest } from "next/server";
import { getSectionHostRoute } from "@/lib/section-host";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host) return NextResponse.next();

  const route = getSectionHostRoute(host, request.nextUrl.pathname);
  if (!route || route.action === "next") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = route.pathname;

  return route.action === "redirect"
    ? NextResponse.redirect(url)
    : NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
