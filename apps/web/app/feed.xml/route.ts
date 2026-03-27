import { LINKS } from "@workspace/data/personal"
import { getAggregatedFeed } from "@/lib/feed"

export const revalidate = 1800

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")

export async function GET() {
  const feed = await getAggregatedFeed()
  const feedUrl = `${LINKS.website_url}/feed.xml`

  const itemXml = feed.items
    .map((item) => {
      const description = item.summary
        ? `<description>${escapeXml(item.summary)}</description>`
        : "<description></description>"

      return `
  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.link)}</link>
    <guid isPermaLink="false">${escapeXml(item.id)}</guid>
    <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
    <source url="${escapeXml(item.sourceUrl)}">${escapeXml(item.sourceName)}</source>
    ${description}
  </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ben Orozco - Consolidated Feed</title>
    <link>${escapeXml(LINKS.feed_url)}</link>
    <description>Combined personal feed from blog posts, social updates, podcasts, and gists.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(feed.generatedAt).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${itemXml}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400",
    },
  })
}
