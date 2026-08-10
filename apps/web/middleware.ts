import { NextResponse, type NextRequest } from "next/server"

const SECTION_HOSTS: Record<string, string> = {
  "portfolio.benoror.com": "/portfolio",
  "feed.benoror.com": "/feed",
}

const PASSTHROUGH_PREFIXES = ["/_next", "/api", "/images", "/favicon", "/icon", "/robots", "/sitemap"]

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase()
  if (!host) return NextResponse.next()

  const sectionRoot = SECTION_HOSTS[host]
  if (!sectionRoot) return NextResponse.next()

  const { pathname, search } = request.nextUrl

  if (PASSTHROUGH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next()
  }

  // Keep RSS aliases absolute on the feed host.
  if (host === "feed.benoror.com" && (pathname === "/feed.rss" || pathname === "/feed.xml")) {
    return NextResponse.next()
  }

  if (pathname === sectionRoot || pathname.startsWith(`${sectionRoot}/`)) {
    return NextResponse.next()
  }

  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone()
    url.pathname = sectionRoot
    return NextResponse.rewrite(url)
  }

  // Unknown paths on section hosts → section root (preserve query for feed pagination bookmarks).
  const url = request.nextUrl.clone()
  url.pathname = sectionRoot
  url.search = search
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
}
