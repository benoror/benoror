import Parser from "rss-parser"
import { FEED_SOURCES, LINKS } from "@workspace/data/personal"

const RSS_USER_AGENT = "benoror-feed-bot/1.0 (+https://www.benoror.com/feed)"
const FEED_TIMEOUT_MS = 10000
const MAX_ITEMS = 200
const GIST_API_BASE_URL = "https://api.github.com/gists"
const BLUESKY_API_BASE_URL = "https://public.api.bsky.app"

const parser = new Parser()
const LINK_PRIORITY_LIST = Object.values(LINKS).map((entry) => entry.url)

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
  alsoSharedTo?: Array<{
    sourceId: string
    sourceName: string
    link: string
  }>
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

const normalizeUrl = (value: string): string => value.trim().replace(/\/+$/, "")
const normalizeLocalhostNotesLink = (value: string): string =>
  value.replace(/^https:\/\/localhost:3002/i, "http://localhost:3002")
const isNotesRootLinkForSource = (itemLink: string, sourceSiteUrl: string): boolean => {
  try {
    const linkUrl = new URL(itemLink)
    const sourceUrl = new URL(sourceSiteUrl)
    const isSameHost = linkUrl.host.toLowerCase() === sourceUrl.host.toLowerCase()
    const isRootPath = linkUrl.pathname === "/" || linkUrl.pathname === ""
    return isSameHost && isRootPath
  } catch {
    const normalizedItem = normalizeUrl(itemLink).toLowerCase()
    const normalizedSource = normalizeUrl(sourceSiteUrl).toLowerCase()
    return normalizedItem === normalizedSource
  }
}

const getSourcePriority = (sourceUrl: string): number => {
  const normalizedSourceUrl = normalizeUrl(sourceUrl)
  const index = LINK_PRIORITY_LIST.findIndex((url) => {
    const normalizedPriorityUrl = normalizeUrl(url)
    return (
      normalizedSourceUrl === normalizedPriorityUrl ||
      normalizedSourceUrl.startsWith(`${normalizedPriorityUrl}/`) ||
      normalizedPriorityUrl.startsWith(`${normalizedSourceUrl}/`)
    )
  })

  return index >= 0 ? index : Number.MAX_SAFE_INTEGER
}

const normalizeDedupTitle = (title: string): string => title.trim().toLowerCase()

const pickPreferredBySourcePriority = (a: AggregatedFeedItem, b: AggregatedFeedItem): AggregatedFeedItem => {
  const aPriority = getSourcePriority(a.sourceUrl)
  const bPriority = getSourcePriority(b.sourceUrl)
  return aPriority <= bPriority ? a : b
}

const sortBySourcePriority = (items: AggregatedFeedItem[]): AggregatedFeedItem[] => {
  return [...items].sort((a, b) => {
    const aPriority = getSourcePriority(a.sourceUrl)
    const bPriority = getSourcePriority(b.sourceUrl)
    if (aPriority !== bPriority) return aPriority - bPriority
    return 0
  })
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

type GistFile = {
  filename: string
  content: string
  language?: string
}

const extractCodeLinesFromHtml = (html: string): string[] => {
  const lineMatches = Array.from(
    html.matchAll(/<td[^>]*class="[^"]*blob-code-inner[^"]*"[^>]*>([\s\S]*?)<\/td>/gi),
  )

  return lineMatches.map((match) => stripInlineHtml(match[1] ?? "").replace(/\u00a0/g, " ").trimEnd())
}

const extractGistFilesFromHtml = (html: string): GistFile[] => {
  const sections = Array.from(
    html.matchAll(/<a[^>]*href="[^"]*#file-[^"]+"[^>]*>([\s\S]*?)<\/a>([\s\S]*?)(?=<a[^>]*href="[^"]*#file-[^"]+"|$)/gi),
  )

  const files = sections
    .map((section) => {
      const filename = stripInlineHtml(section[1] ?? "").trim()
      const lines = extractCodeLinesFromHtml(section[2] ?? "")
      return {
        filename,
        content: lines.join("\n").trim(),
      }
    })
    .filter((file) => file.filename.length > 0 && file.content.length > 0)

  // Fallback for layouts without per-file anchors.
  if (files.length === 0) {
    const lines = extractCodeLinesFromHtml(html)
    if (lines.length > 0) {
      return [{ filename: "unknown.txt", content: lines.join("\n").trim() }]
    }
  }

  return files
}

const extractGistCodeFromHtml = (html: string): string | undefined => {
  const lines = extractCodeLinesFromHtml(html)
  const hasUsefulContent = lines.some((line) => line.trim().length > 0)
  if (!hasUsefulContent) {
    return undefined
  }

  return lines.join("\n").trim()
}

const parseGistIdFromLink = (link: string): string | null => {
  const match = link.match(/gist\.github\.com\/[^/]+\/([a-f0-9]+)/i)
  return match?.[1] ?? null
}

const mapLanguageFromExtension = (filename: string | undefined): string | undefined => {
  const ext = getFileExtension(filename)
  return ext ? EXTENSION_TO_LANGUAGE[ext] : undefined
}

const mapGitHubLanguage = (language: string | undefined): string | undefined => {
  if (!language) return undefined
  const normalized = language.toLowerCase()
  const fromExtensionMap = EXTENSION_TO_LANGUAGE[normalized]
  if (fromExtensionMap) return fromExtensionMap

  const direct: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    markdown: "markdown",
    ruby: "ruby",
    python: "python",
    shell: "bash",
    bash: "bash",
    json: "json",
    yaml: "yaml",
    html: "html",
    css: "css",
    scss: "scss",
    go: "go",
    rust: "rust",
    java: "java",
    kotlin: "kotlin",
    swift: "swift",
    c: "c",
    "c++": "cpp",
    sql: "sql",
  }

  return direct[normalized]
}

const fetchGistFilesFromApi = async (link: string): Promise<GistFile[] | null> => {
  const gistId = parseGistIdFromLink(link)
  if (!gistId) return null

  try {
    const gistResponse = await fetch(`${GIST_API_BASE_URL}/${gistId}`, {
      headers: {
        "User-Agent": RSS_USER_AGENT,
        Accept: "application/vnd.github+json",
      },
      signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
      next: { revalidate: 1800 },
    })

    if (!gistResponse.ok) {
      return null
    }

    const gist = (await gistResponse.json()) as {
      files?: Record<
        string,
        {
          filename?: string
          content?: string
          raw_url?: string
          language?: string
          truncated?: boolean
        }
      >
    }

    const files = gist.files ? Object.values(gist.files) : []
    if (files.length === 0) return null

    const enrichedFiles = await Promise.all(
      files.map(async (file) => {
        let content = file.content ?? ""
        if (!content && file.raw_url) {
          const rawResponse = await fetch(file.raw_url, {
            headers: {
              "User-Agent": RSS_USER_AGENT,
            },
            signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
            next: { revalidate: 1800 },
          })
          if (rawResponse.ok) {
            content = await rawResponse.text()
          }
        }

        return {
          filename: file.filename ?? "unknown.txt",
          content: content.trim(),
          language: file.language,
        } satisfies GistFile
      }),
    )

    return enrichedFiles.filter((file) => file.content.length > 0)
  } catch {
    return null
  }
}

const normalizeMaybeEmpty = (value: string | undefined): string | undefined => {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
}

const isStackOverflowCommentItem = (item: Parser.Item): boolean => {
  const title = item.title?.toLowerCase() ?? ""
  const link = item.link?.toLowerCase() ?? ""

  return (
    title.startsWith("comment by ") ||
    link.includes("/posts/comments/") ||
    link.includes("#comment")
  )
}

const getBodyContent = (item: Parser.Item): string => {
  const encoded = (item as Record<string, unknown>)["content:encoded"]
  const encodedContent = typeof encoded === "string" ? encoded : ""
  return encodedContent || item.content || item.contentSnippet || ""
}

const getBlueskyActorFromProfileUrl = (profileUrl: string): string | null => {
  const match = profileUrl.match(/bsky\.app\/profile\/([^/?#]+)/i)
  return match?.[1] ?? null
}

const getBlueskyPostRkey = (uri: string | undefined): string | null => {
  if (!uri) return null
  const parts = uri.split("/")
  return parts[parts.length - 1] ?? null
}

const buildBlueskyPostLink = (authorHandle: string, postUri: string | undefined): string | null => {
  const rkey = getBlueskyPostRkey(postUri)
  if (!rkey) return null
  return `https://bsky.app/profile/${authorHandle}/post/${rkey}`
}

const toBlueskyText = (value: unknown): string => (typeof value === "string" ? value.trim() : "")

const fetchBlueskyItems = async (
  source: (typeof FEED_SOURCES)[number],
): Promise<{ items: AggregatedFeedItem[]; error?: string }> => {
  const actor = getBlueskyActorFromProfileUrl(source.site_url)
  if (!actor) {
    return { items: [], error: "Invalid Bluesky profile URL" }
  }

  try {
    const response = await fetch(
      `${BLUESKY_API_BASE_URL}/xrpc/app.bsky.feed.getAuthorFeed?actor=${encodeURIComponent(actor)}&limit=100`,
      {
        headers: {
          "User-Agent": RSS_USER_AGENT,
        },
        signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
        next: { revalidate: 1800 },
      },
    )

    if (!response.ok) {
      return {
        items: [],
        error: `Unable to fetch Bluesky feed (HTTP ${response.status})`,
      }
    }

    const payload = (await response.json()) as {
      feed?: Array<{
        reason?: unknown
        reply?: unknown
        post?: {
          uri?: string
          indexedAt?: string
          author?: { handle?: string; displayName?: string }
          record?: { text?: string; createdAt?: string; $type?: string; reply?: unknown }
          reply?: unknown
        }
      }>
    }

    const items: AggregatedFeedItem[] = []
    for (const entry of payload.feed ?? []) {
      // Reposts include "reason" metadata; skip them.
      if (entry.reason) continue

      // Keep only top-level posts (exclude all reply shapes).
      if (entry.reply || entry.post?.reply || entry.post?.record?.reply) continue

      const post = entry.post
      const authorHandle = post?.author?.handle
      const link = authorHandle ? buildBlueskyPostLink(authorHandle, post?.uri) : null
      if (!post || !link) continue

      const publishedAtRaw = post.record?.createdAt ?? post.indexedAt
      const publishedAt = parseDate(publishedAtRaw)?.toISOString()
      if (!publishedAt) continue

      const text = toBlueskyText(post.record?.text)
      const title = text.split("\n").find((line) => line.trim().length > 0)?.slice(0, 120) || "Bluesky post"
      const sourceName = source.name

      items.push({
        id: `${source.id}::${post.uri ?? link}`,
        title,
        link,
        summary: text.slice(0, 240) || undefined,
        body: text || undefined,
        bodyFormat: "text",
        publishedAt,
        sourceId: source.id,
        sourceName,
        sourceUrl: source.site_url,
      })
    }

    return { items }
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unknown Bluesky feed error",
    }
  }
}

const inferBodyKind = async (
  item: Parser.Item,
  source: (typeof FEED_SOURCES)[number],
): Promise<Pick<AggregatedFeedItem, "body" | "bodyFormat" | "codeLanguage">> => {
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

  if (source.id.startsWith("gist_")) {
    const gistFilesFromApi = item.link ? await fetchGistFilesFromApi(item.link) : null
    const gistFiles = gistFilesFromApi && gistFilesFromApi.length > 0
      ? gistFilesFromApi
      : isLikelyHtml(body)
        ? extractGistFilesFromHtml(body)
        : []

    if (gistFiles.length > 0) {
      const markdownFiles = gistFiles.filter((file) => {
        const fileExt = getFileExtension(file.filename)
        return fileExt === "md" || fileExt === "markdown"
      })

      if (markdownFiles.length > 0) {
        const markdownBody = markdownFiles
          .map((file) => (markdownFiles.length > 1 ? `## ${file.filename}\n\n${file.content}` : file.content))
          .join("\n\n---\n\n")

        return {
          body: normalizeMaybeEmpty(markdownBody),
          bodyFormat: "markdown",
          codeLanguage: "markdown",
        }
      }

      const primaryFile =
        gistFiles.find((file) => {
          return Boolean(mapLanguageFromExtension(file.filename) ?? mapGitHubLanguage(file.language))
        }) ?? gistFiles[0]

      const primaryLanguage =
        mapLanguageFromExtension(primaryFile?.filename) ??
        mapGitHubLanguage(primaryFile?.language) ??
        codeLanguage

      return {
        body: normalizeMaybeEmpty(primaryFile?.content),
        bodyFormat: primaryLanguage === "markdown" ? "markdown" : "code",
        codeLanguage: primaryLanguage,
      }
    }
  }

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

const normalizeItem = async (
  item: Parser.Item,
  source: (typeof FEED_SOURCES)[number],
): Promise<AggregatedFeedItem | null> => {
  const publishedDate = parseDate(item.isoDate) ?? parseDate(item.pubDate)
  if (!publishedDate || !item.link || !item.title) {
    return null
  }

  // Keep only gists under benoror namespace for the "own starred gists" source.
  if (source.id === "gist_starred_own" && !item.link.includes("gist.github.com/benoror/")) {
    return null
  }

  // Keep Stack Overflow to posts (questions/answers), excluding comments.
  if (source.id === "stack_overflow" && isStackOverflowCommentItem(item)) {
    return null
  }

  const inferredBody = await inferBodyKind(item, source)

  return {
    id: `${source.id}::${item.guid ?? item.link}`,
    title: item.title,
    link: item.link,
    summary: item.contentSnippet ?? undefined,
    ...inferredBody,
    publishedAt: publishedDate.toISOString(),
    sourceId: source.id,
    sourceName: source.name,
    sourceUrl: source.site_url,
  }
}

const getSourceItems = async (
  source: (typeof FEED_SOURCES)[number],
): Promise<{ items: AggregatedFeedItem[]; error?: string; resolvedSiteUrl?: string; resolvedRssUrl?: string }> => {
  if (source.id === "bluesky_posts") {
    return fetchBlueskyItems(source)
  }

  if (!source.rss_url) {
    return { items: [] }
  }

  try {
    const isNotesSource = source.id === "notes"
    const rssCandidates = isNotesSource ? ["http://localhost:3002/index.xml", source.rss_url] : [source.rss_url]

    let response: Response | null = null
    let resolvedRssUrl: string | undefined
    for (const candidate of rssCandidates) {
      try {
        const candidateResponse = await fetch(candidate, {
          headers: {
            "User-Agent": RSS_USER_AGENT,
          },
          signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
          ...(isNotesSource ? { cache: "no-store" as const } : { next: { revalidate: 1800 } }),
        })

        if (candidateResponse.ok) {
          response = candidateResponse
          resolvedRssUrl = candidate
          break
        }
      } catch {
        // Continue with fallback candidate.
      }
    }

    if (!response || !resolvedRssUrl) {
      return {
        items: [],
        error: "Unable to fetch feed from all configured endpoints",
      }
    }

    const xml = await response.text()
    const parsed = await parser.parseString(xml)
    const resolvedSiteUrl =
      isNotesSource && resolvedRssUrl.startsWith("http://localhost")
        ? "http://localhost:3002"
        : source.site_url
    const normalizedItems = (await Promise.all((parsed.items ?? []).map((item) => normalizeItem(item, source))))
      .filter((item): item is AggregatedFeedItem => item !== null)
      .map((item) => {
        if (!isNotesSource) {
          return { ...item, sourceUrl: resolvedSiteUrl }
        }

        const normalizedLink = normalizeLocalhostNotesLink(item.link)
        return {
          ...item,
          id: item.id.replace(item.link, normalizedLink),
          link: normalizedLink,
          sourceUrl: resolvedSiteUrl,
        }
      })
      .filter((item) => !(isNotesSource && isNotesRootLinkForSource(item.link, resolvedSiteUrl)))

    return { items: normalizedItems, resolvedSiteUrl, resolvedRssUrl }
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unknown feed error",
    }
  }
}

export const getAggregatedFeed = async (): Promise<AggregatedFeed> => {
  const sourceResults = await Promise.all(FEED_SOURCES.map((source) => getSourceItems(source)))

  const groupedByTitle = new Map<string, AggregatedFeedItem[]>()
  for (const item of sourceResults.flatMap((result) => result.items)) {
    const key = normalizeDedupTitle(item.title)
    const existingGroup = groupedByTitle.get(key) ?? []
    groupedByTitle.set(key, [...existingGroup, item])
  }

  const dedupedItems = [...groupedByTitle.values()]
    .map((group): AggregatedFeedItem | null => {
      const first = group[0]
      if (!first) return null
      if (group.length === 1) return first
    const sorted = sortBySourcePriority(group)
    const preferred = sorted.reduce((best, current) => pickPreferredBySourcePriority(best, current))
    const alternates = sorted
      .filter((item) => item.id !== preferred.id)
      .map((item) => ({
        sourceId: item.sourceId,
        sourceName: item.sourceName,
        link: item.link,
      }))

    return {
      ...preferred,
      alsoSharedTo: alternates.length > 0 ? alternates : undefined,
    }
    })
    .filter((item): item is AggregatedFeedItem => item !== null)

  const items = dedupedItems
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, MAX_ITEMS)

  const sources: AggregatedFeedSource[] = FEED_SOURCES.map((source, index) => ({
    id: source.id,
    name: source.name,
    siteUrl: sourceResults[index]?.resolvedSiteUrl ?? source.site_url,
    rssUrl: sourceResults[index]?.resolvedRssUrl ?? source.rss_url,
    status: source.status,
    note: source.note,
    error: sourceResults[index]?.error,
  }))

  return { items, sources, generatedAt: new Date().toISOString() }
}
