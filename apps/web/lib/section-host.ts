const SECTION_HOSTS: Record<string, string> = {
  "portfolio.benoror.com": "/portfolio",
  "feed.benoror.com": "/feed",
  "podcast.benoror.com": "/podcast",
};

const PASSTHROUGH_PREFIXES = [
  "/_next",
  "/api",
  "/images",
  "/favicon",
  "/icon",
  "/robots",
  "/sitemap",
];

const PODCAST_HOST = "podcast.benoror.com";

export type SectionHostRoute =
  | { action: "next" }
  | { action: "redirect" | "rewrite"; pathname: string };

export function getSectionHostRoute(
  host: string,
  pathname: string,
): SectionHostRoute | null {
  const sectionRoot = SECTION_HOSTS[host];
  if (!sectionRoot) return null;

  if (
    PASSTHROUGH_PREFIXES.some(
      (prefix) =>
        pathname === prefix || pathname.startsWith(`${prefix}/`),
    )
  ) {
    return { action: "next" };
  }

  if (
    host === "feed.benoror.com" &&
    (pathname === "/feed.rss" || pathname === "/feed.xml")
  ) {
    return { action: "next" };
  }

  if (host === PODCAST_HOST) {
    if (
      pathname === sectionRoot ||
      pathname.startsWith(`${sectionRoot}/`)
    ) {
      return {
        action: "redirect",
        pathname: pathname.slice(sectionRoot.length) || "/",
      };
    }

    return {
      action: "rewrite",
      pathname:
        pathname === "/" || pathname === ""
          ? sectionRoot
          : `${sectionRoot}${pathname}`,
    };
  }

  if (
    pathname === sectionRoot ||
    pathname.startsWith(`${sectionRoot}/`)
  ) {
    return { action: "next" };
  }

  return {
    action: "rewrite",
    pathname: sectionRoot,
  };
}
