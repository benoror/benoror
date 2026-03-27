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
  body?: string
  bodyFormat?: "html" | "markdown" | "code" | "text"
  codeLanguage?: string
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

export type AggregatedFeed = {
  items: AggregatedFeedItem[]
  sources: AggregatedFeedSource[]
  generatedAt: string
}

const parseDate = (value: string | undefined): Date | null => {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  md: "markdown",
  markdown: "markdown",
  sql: "sql",
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  ts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  json: "json",
  rb: "ruby",
  py: "python",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  yml: "yaml",
  yaml: "yaml",
  html: "html",
  css: "css",
  scss: "scss",
  go: "go",
  rs: "rust",
  java: "java",
  kt: "kotlin",
  swift: "swift",
  c: "c",
  h: "c",
  cpp: "cpp",
  hpp: "cpp",
}

const FILE_EXTENSION_REGEX = /\.([a-z0-9]+)$/i

const getFileExtension = (value: string | undefined): string | null => {
  if (!value) return null
  const trimmed = value.split(/[?#]/)[0] ?? value
  const match = trimmed.match(FILE_EXTENSION_REGEX)
  return match?.[1]?.toLowerCase() ?? null
}

const inferExtensionFromContent = (value: string | undefined): string | null => {
  if (!value) return null
  const match = value.match(/([a-z0-9_-]+\.[a-z0-9]+)/i)
  return getFileExtension(match?.[1])
}

const isLikelyHtml = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value)

const decodeHtmlEntities = (input: string): string =>
  input
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")

const stripHtmlTags = (input: string): string =>
  decodeHtmlEntities(input.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, ""))
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim()

const stripInlineHtml = (input: string): string => decodeHtmlEntities(input.replace(/<[^>]+>/g, ""))

const extractGistCodeFromHtml = (html: string): string | undefined => {
  const lineMatches = Array.from(
    html.matchAll(/<td[^>]*class="[^"]*blob-code-inner[^"]*"[^>]*>([\s\S]*?)<\/td>/gi),
  )

  if (lineMatches.length === 0) {
    return undefined
  }

  const lines = lineMatches.map((match) => stripInlineHtml(match[1] ?? "").replace(/\u00a0/g, " ").trimEnd())
  const hasUsefulContent = lines.some((line) => line.trim().length > 0)
  if (!hasUsefulContent) {
    return undefined
  }

  return lines.join("\n").trim()
}

const normalizeMaybeEmpty = (value: string | undefined): string | undefined => {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
}

const getBodyContent = (item: Parser.Item): string => {
  const encoded = (item as Record<string, unknown>)["content:encoded"]
  const encodedContent = typeof encoded === "string" ? encoded : ""
  return encodedContent || item.content || item.contentSnippet || ""
}

const inferBodyKind = (
  item: Parser.Item,
  source: (typeof FEED_SOURCES)[number],
): Pick<AggregatedFeedItem, "body" | "bodyFormat" | "codeLanguage"> => {
  const body = getBodyContent(item).trim()
  if (!body) {
    return {}
  }

  const titleExt = getFileExtension(item.title)
  const linkExt = getFileExtension(item.link)
  const snippetExt = inferExtensionFromContent(item.contentSnippet)
  const ext = titleExt ?? snippetExt ?? linkExt
  const codeLanguage = ext ? EXTENSION_TO_LANGUAGE[ext] : undefined
  const isCodeSource = source.id.startsWith("gist_") || Boolean(codeLanguage)

  if (codeLanguage === "markdown") {
    const markdownBody = normalizeMaybeEmpty(stripHtmlTags(body)) ?? normalizeMaybeEmpty(item.contentSnippet)
    return {
      body: markdownBody,
      bodyFormat: "markdown",
      codeLanguage,
    }
  }

  if (isCodeSource && codeLanguage) {
    const gistCodeBody =
      source.id.startsWith("gist_") && isLikelyHtml(body) ? normalizeMaybeEmpty(extractGistCodeFromHtml(body)) : undefined
    const codeBody =
      gistCodeBody ??
      normalizeMaybeEmpty(stripHtmlTags(body)) ??
      normalizeMaybeEmpty(item.contentSnippet)
    return {
      body: codeBody,
      bodyFormat: "code",
      codeLanguage,
    }
  }

  if (isLikelyHtml(body)) {
    return {
      body: normalizeMaybeEmpty(body),
      bodyFormat: "html",
    }
  }

  return {
    body: normalizeMaybeEmpty(body),
    bodyFormat: "text",
  }
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
    ...inferBodyKind(item, source),
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

export const getAggregatedFeed = async (): Promise<AggregatedFeed> => {
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
