import { getAggregatedFeed } from "@/lib/feed"

type FeedContextSnapshot = {
  content: string
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
      content: feedContextCache.content,
      signature: feedContextCache.signature,
    }
  }

  const aggregatedFeed = await getAggregatedFeed()
  const recentItems = aggregatedFeed.items.slice(0, MAX_FEED_ITEMS)
  const activeSources = aggregatedFeed.sources
    .filter((source) => source.status === "active" || source.status === "manual")
    .map((source) => source.name)

  const lines: string[] = []
  lines.push("# Recent Writing, Notes, and Public Activity")
  lines.push(
    "Snapshot of Ben Orozco's recent public writing, notes, talks, and social activity feeds.",
  )
  lines.push("")

  if (activeSources.length > 0) {
    lines.push(`Sources: ${activeSources.join(", ")}`)
    lines.push("")
  }

  for (const item of recentItems) {
    const publishedOn = item.publishedAt.slice(0, 10)
    const summary = item.summary ?? item.body?.slice(0, 220) ?? ""
    lines.push(
      `- **${item.title}** (${publishedOn}, ${item.sourceName}) - ${summary || "Recent public activity."}`,
    )
  }

  const signature = recentItems
    .map((item) => `${item.id}:${item.publishedAt}`)
    .join("|")

  const snapshot = {
    content: lines.join("\n"),
    signature,
  }

  feedContextCache = {
    ...snapshot,
    expiresAt: now + FEED_CONTEXT_TTL_MS,
  }

  return snapshot
}
