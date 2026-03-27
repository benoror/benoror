import { buildConsolidatedRssXml, getRssResponse } from "@/lib/feed-rss"

export const revalidate = 1800

export async function GET() {
  const xml = await buildConsolidatedRssXml("/feed.rss")
  return getRssResponse(xml)
}
