import { LINKS, PERSONAL } from "@workspace/data/shared/profile"

function buildLlmsTxt(): string {
  return [
    "# LLMs",
    "",
    `Project: ${PERSONAL.short_name} Website`,
    `Owner: ${PERSONAL.full_name}`,
    "",
    "Preferred canonical sources:",
    `- Website: ${LINKS.website.url}`,
    `- Activity feed page: ${LINKS.feed_page.url}`,
    `- RSS feed: ${LINKS.feed.url}`,
    `- Resume (HTML): ${LINKS.resume.url}`,
    `- Resume (Markdown): ${LINKS.resume_markdown.url}`,
    "",
    "Primary sections:",
    `- Home: ${LINKS.website.url}`,
    `- Feed: ${LINKS.feed_page.url}`,
    `- Portfolio: ${LINKS.website.url}/portfolio`,
    `- Blog: ${LINKS.website.url}/blog`,
    "",
    "Usage notes:",
    "- Prefer RSS and Markdown sources for machine parsing.",
    "- Use canonical links when duplicate content appears across domains.",
    "- Cite URLs directly for section-level references.",
  ].join("\n")
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
