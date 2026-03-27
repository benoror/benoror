import Parser from "rss-parser"
import { FEED_SOURCES } from "@workspace/data/personal"

const RSS_USER_AGENT = "benoror-feed-bot/1.0 (+https://www.benoror.com/feed)"
const FEED_TIMEOUT_MS = 10000
const MAX_ITEMS = 200

const parser = new Parser()

export type AggregatedFeedItem = {
  id: string
  title: string
  link: string
  publishedAt: string
  sourceId: string
  sourceName: string
  sourceUrl: string
  summary?: string
}

export type AggregatedFeedSource = {
  id: string
  name: string
  siteUrl: string
  rssUrl?: string
  status: "active" | "manual" | "private"
  note?: string
  error?: string
}

const parseDate = (value: string | undefined): Date | null => {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const normalizeItem = (
  item: Parser.Item,
  source: (typeof FEED_SOURCES)[number],
): AggregatedFeedItem | null => {
  const publishedDate = parseDate(item.isoDate) ?? parseDate(item.pubDate)
  if (!publishedDate || !item.link || !item.title) {
    return null
  }

  // Keep only gists under benoror namespace for the "own starred gists" source.
  if (source.id === "gist_starred_own" && !item.link.includes("gist.github.com/benoror/")) {
    return null
  }

  return {
    id: `${source.id}::${item.guid ?? item.link}`,
    title: item.title,
    link: item.link,
    summary: item.contentSnippet ?? undefined,
    publishedAt: publishedDate.toISOString(),
    sourceId: source.id,
    sourceName: source.name,
    sourceUrl: source.site_url,
  }
}

const getSourceItems = async (
  source: (typeof FEED_SOURCES)[number],
): Promise<{ items: AggregatedFeedItem[]; error?: string }> => {
  if (!source.rss_url) {
    return { items: [] }
  }

  try {
    const response = await fetch(source.rss_url, {
      headers: {
        "User-Agent": RSS_USER_AGENT,
      },
      signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      return {
        items: [],
        error: `Unable to fetch feed (HTTP ${response.status})`,
      }
    }

    const xml = await response.text()
    const parsed = await parser.parseString(xml)
    const normalizedItems = (parsed.items ?? [])
      .map((item) => normalizeItem(item, source))
      .filter((item): item is AggregatedFeedItem => item !== null)

    return { items: normalizedItems }
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unknown feed error",
    }
  }
}

export const getAggregatedFeed = async () => {
  const sourceResults = await Promise.all(FEED_SOURCES.map((source) => getSourceItems(source)))

  const items = sourceResults
    .flatMap((result) => result.items)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, MAX_ITEMS)

  const sources: AggregatedFeedSource[] = FEED_SOURCES.map((source, index) => ({
    id: source.id,
    name: source.name,
    siteUrl: source.site_url,
    rssUrl: source.rss_url,
    status: source.status,
    note: source.note,
    error: sourceResults[index]?.error,
  }))

  return { items, sources, generatedAt: new Date().toISOString() }
}
