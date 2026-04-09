import { getAggregatedFeed } from "@/lib/feed"
import type { ChatbotSection, FeedSectionData } from "@workspace/data/chatbot"

type FeedContextSnapshot = {
  section: ChatbotSection<FeedSectionData>
  signature: string
}

const FEED_CONTEXT_TTL_MS = 30 * 60 * 1000
const MAX_FEED_ITEMS = 12

let feedContextCache:
  | (FeedContextSnapshot & {
      expiresAt: number
    })
  | null = null

export async function getFeedContextSnapshot(): Promise<FeedContextSnapshot> {
  const now = Date.now()
  if (feedContextCache && feedContextCache.expiresAt > now) {
    return {
      section: feedContextCache.section,
      signature: feedContextCache.signature,
    }
  }

  const aggregatedFeed = await getAggregatedFeed()
  const recentItems = aggregatedFeed.items.slice(0, MAX_FEED_ITEMS)
  const activeSources = aggregatedFeed.sources
    .filter((source) => source.status === "active" || source.status === "manual")
    .map((source) => source.name)

  const items = recentItems.map((item) => ({
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    sourceName: item.sourceName,
    summary: item.summary ?? item.body?.slice(0, 220) ?? "Recent public activity.",
  }))

  const signature = JSON.stringify({
    sources: activeSources,
    items: items.map((item) => ({
      id: item.id,
      publishedAt: item.publishedAt,
      title: item.title,
      sourceName: item.sourceName,
    })),
  })

  const section: ChatbotSection<FeedSectionData> = {
    id: "blog_feed",
    kind: "feed",
    title: "Ben Orozco Recent Writing and Notes",
    keywords: ["blog", "notes", "feed", "writing", "recent posts"],
    aliases: ["public writing", "recent content"],
    priority: 2,
    data: {
      sources: activeSources,
      items,
    },
  }

  const snapshot = {
    section,
    signature,
  }

  feedContextCache = {
    ...snapshot,
    expiresAt: now + FEED_CONTEXT_TTL_MS,
  }

  return snapshot
}
