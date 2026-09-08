export type AggregatedFeedAlsoSharedTo = {
  sourceId: string
  sourceName: string
  link: string
}

export type MergeableFeedItem = {
  id: string
  title: string
  link: string
  sourceId: string
  sourceName: string
  sourceUrl: string
  referencedLinks?: string[]
  alsoSharedTo?: AggregatedFeedAlsoSharedTo[]
}

export type BlueskyExternalEmbed = {
  $type?: string
  external?: { uri?: string; title?: string; description?: string }
}

export type BlueskyFacet = {
  features?: Array<{ $type?: string; uri?: string }>
}

export type BlueskyReplyRef = {
  root?: { uri?: string }
  parent?: { uri?: string }
}

export type BlueskyAuthor = {
  handle?: string
  did?: string
  displayName?: string
}

export type BlueskyPostView = {
  uri?: string
  indexedAt?: string
  author?: BlueskyAuthor
  embed?: BlueskyExternalEmbed
  replyCount?: number
  record?: {
    text?: string
    createdAt?: string
    $type?: string
    reply?: BlueskyReplyRef | unknown
    embed?: BlueskyExternalEmbed
    facets?: BlueskyFacet[]
  }
  reply?: unknown
}

export type BlueskyAuthorFeedEntry = {
  reason?: unknown
  reply?: unknown
  post?: BlueskyPostView
}

export type BlueskyThreadNode = {
  $type?: string
  post?: BlueskyPostView
  replies?: BlueskyThreadNode[]
}

export type BlueskyAuthorRef = {
  did?: string
  handle?: string
}

const normalizePriorityUrl = (value: string): string => value.trim().replace(/\/+$/, "")

export const normalizeUrlForMatch = (value: string): string | null => {
  const trimmed = value.trim().replace(/[),.;!?]+$/g, "").replace(/\u2026$/, "").replace(/\.{2,}$/, "")
  if (!trimmed) return null

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const url = new URL(withProtocol)
    if (!/^https?:$/i.test(url.protocol)) return null
    if (!url.hostname.includes(".")) return null
    url.hash = ""
    url.search = ""
    url.username = ""
    url.password = ""
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "")
    const pathname = url.pathname.replace(/\/+$/, "") || ""
    return `${url.protocol}//${url.hostname}${pathname}`
  } catch {
    return null
  }
}

export const urlsLooselyMatch = (left: string, right: string): boolean => {
  const a = normalizeUrlForMatch(left)
  const b = normalizeUrlForMatch(right)
  if (!a || !b) return false
  if (a === b) return true
  // Bluesky (and similar clients) often truncate display URLs with "...".
  return a.startsWith(b) || b.startsWith(a)
}

export const extractUrlsFromText = (value: string | undefined): string[] => {
  if (!value) return []
  const matches = value.match(/https?:\/\/[^\s<>"')]+/gi) ?? []
  const bareHosts = value.match(/(?:^|\s)((?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)/gi) ?? []
  return [...matches, ...bareHosts.map((part) => part.trim())]
    .map((candidate) => normalizeUrlForMatch(candidate))
    .filter((url): url is string => Boolean(url))
}

export const uniqueUrls = (values: Array<string | null | undefined>): string[] => {
  const seen = new Set<string>()
  const result: string[] = []
  for (const value of values) {
    const normalized = value ? normalizeUrlForMatch(value) : null
    if (!normalized || seen.has(normalized)) continue
    seen.add(normalized)
    result.push(normalized)
  }
  return result
}

const normalizeDedupTitle = (title: string): string => title.trim().toLowerCase()

// Only explicit share links (e.g. Bluesky embeds/facets) count as merge
// signals. Harvesting URLs from arbitrary item bodies would collapse posts
// that merely cite another item (e.g. a blog post linking to a note).
const collectReferencedLinks = (item: MergeableFeedItem): string[] =>
  uniqueUrls(item.referencedLinks ?? [])

const getSourcePriority = (sourceUrl: string, priorityUrls: string[]): number => {
  const normalizedSourceUrl = normalizePriorityUrl(sourceUrl)
  const index = priorityUrls.findIndex((url) => {
    const normalizedPriorityUrl = normalizePriorityUrl(url)
    return (
      normalizedSourceUrl === normalizedPriorityUrl ||
      normalizedSourceUrl.startsWith(`${normalizedPriorityUrl}/`) ||
      normalizedPriorityUrl.startsWith(`${normalizedSourceUrl}/`)
    )
  })

  return index >= 0 ? index : Number.MAX_SAFE_INTEGER
}

const pickPreferredBySourcePriority = <T extends MergeableFeedItem>(
  a: T,
  b: T,
  priorityUrls: string[],
): T => {
  const aPriority = getSourcePriority(a.sourceUrl, priorityUrls)
  const bPriority = getSourcePriority(b.sourceUrl, priorityUrls)
  return aPriority <= bPriority ? a : b
}

const sortBySourcePriority = <T extends MergeableFeedItem>(items: T[], priorityUrls: string[]): T[] => {
  return [...items].sort((a, b) => {
    const aPriority = getSourcePriority(a.sourceUrl, priorityUrls)
    const bPriority = getSourcePriority(b.sourceUrl, priorityUrls)
    if (aPriority !== bPriority) return aPriority - bPriority
    return 0
  })
}

export const mergeDuplicateFeedItems = <T extends MergeableFeedItem>(
  items: T[],
  sourcePriorityUrls: string[],
): Array<Omit<T, "referencedLinks">> => {
  const parent = new Map<string, string>()
  const find = (id: string): string => {
    const current = parent.get(id) ?? id
    if (current === id) return id
    const root = find(current)
    parent.set(id, root)
    return root
  }
  const union = (leftId: string, rightId: string) => {
    const leftRoot = find(leftId)
    const rightRoot = find(rightId)
    if (leftRoot !== rightRoot) parent.set(leftRoot, rightRoot)
  }

  for (const item of items) {
    parent.set(item.id, item.id)
  }

  const byTitle = new Map<string, string[]>()
  for (const item of items) {
    const key = normalizeDedupTitle(item.title)
    const existing = byTitle.get(key) ?? []
    byTitle.set(key, [...existing, item.id])
  }
  for (const ids of byTitle.values()) {
    const first = ids[0]
    if (!first) continue
    for (const id of ids.slice(1)) union(first, id)
  }

  for (const item of items) {
    const refs = collectReferencedLinks(item)
    if (refs.length === 0) continue
    for (const other of items) {
      if (other.id === item.id) continue
      if (refs.some((ref) => urlsLooselyMatch(ref, other.link))) {
        union(item.id, other.id)
      }
    }
  }

  const groups = new Map<string, T[]>()
  for (const item of items) {
    const root = find(item.id)
    const existing = groups.get(root) ?? []
    groups.set(root, [...existing, item])
  }

  return [...groups.values()]
    .map((group): Omit<T, "referencedLinks"> | null => {
      const first = group[0]
      if (!first) return null
      if (group.length === 1) {
        const { referencedLinks: _referencedLinks, ...rest } = first
        return rest
      }

      const sorted = sortBySourcePriority(group, sourcePriorityUrls)
      const preferred = sorted.reduce((best, current) =>
        pickPreferredBySourcePriority(best, current, sourcePriorityUrls),
      )
      const alternates = sorted
        .filter((item) => item.id !== preferred.id)
        .map((item) => ({
          sourceId: item.sourceId,
          sourceName: item.sourceName,
          link: item.link,
        }))

      const { referencedLinks: _referencedLinks, ...rest } = preferred
      return {
        ...rest,
        alsoSharedTo: alternates.length > 0 ? alternates : undefined,
      }
    })
    .filter((item): item is Omit<T, "referencedLinks"> => item !== null)
}

export const toBlueskyText = (value: unknown): string => (typeof value === "string" ? value.trim() : "")

const getReplyRootUri = (reply: unknown): string | null => {
  if (!reply || typeof reply !== "object") return null
  const rootUri = (reply as BlueskyReplyRef).root?.uri
  return typeof rootUri === "string" && rootUri.length > 0 ? rootUri : null
}

export const isBlueskyReplyPost = (entry: BlueskyAuthorFeedEntry): boolean =>
  Boolean(entry.reply || entry.post?.reply || getReplyRootUri(entry.post?.record?.reply))

export const isSameBlueskyAuthor = (
  postAuthor: BlueskyAuthor | undefined,
  actor: BlueskyAuthorRef,
): boolean => {
  if (!postAuthor) return false
  if (actor.did && postAuthor.did) {
    return postAuthor.did === actor.did
  }
  if (actor.handle && postAuthor.handle) {
    return postAuthor.handle.toLowerCase() === actor.handle.toLowerCase()
  }
  return false
}

const collectFacetUris = (post: BlueskyPostView): string[] =>
  post.record?.facets?.flatMap((facet) =>
    (facet.features ?? [])
      .map((feature) => feature.uri)
      .filter((uri): uri is string => typeof uri === "string"),
  ) ?? []

/** Embeds and link facets only — the explicit share URIs used as merge signals. */
export const collectBlueskyExplicitShareLinks = (post: BlueskyPostView): string[] =>
  uniqueUrls([
    post.record?.embed?.external?.uri,
    post.embed?.external?.uri,
    ...collectFacetUris(post),
  ])

/** Root posts keep their previous harvest: explicit shares plus URLs in the post text. */
export const collectBlueskyRootReferencedLinks = (post: BlueskyPostView): string[] =>
  uniqueUrls([...collectBlueskyExplicitShareLinks(post), ...extractUrlsFromText(toBlueskyText(post.record?.text))])

/**
 * Walk a `getPostThread` tree and collect explicit share links from self-authored
 * replies only. The root post's own links are excluded — the caller already has those.
 */
export const collectSelfAuthoredReplyShareLinksFromThread = (
  thread: BlueskyThreadNode | undefined,
  actor: BlueskyAuthorRef,
): string[] => {
  if (!thread?.post) return []

  const links: string[] = []
  const visitReplies = (nodes: BlueskyThreadNode[] | undefined) => {
    for (const node of nodes ?? []) {
      const post = node.post
      if (post && isSameBlueskyAuthor(post.author, actor)) {
        links.push(...collectBlueskyExplicitShareLinks(post))
      }
      visitReplies(node.replies)
    }
  }

  visitReplies(thread.replies)
  return uniqueUrls(links)
}

/**
 * Index explicit share links from the author's own replies in `getAuthorFeed`,
 * keyed by each reply's thread root URI. Replies to other people's posts are
 * ignored because their root URI will not match a root we emit.
 */
export const indexSelfAuthoredReplyShareLinksFromAuthorFeed = (
  feed: BlueskyAuthorFeedEntry[],
  actor: BlueskyAuthorRef,
): Map<string, string[]> => {
  const byRoot = new Map<string, string[]>()

  for (const entry of feed) {
    const post = entry.post
    const rootUri = getReplyRootUri(post?.record?.reply)
    if (!post || !rootUri) continue
    if (!isSameBlueskyAuthor(post.author, actor)) continue

    const links = collectBlueskyExplicitShareLinks(post)
    const existing = byRoot.get(rootUri) ?? []
    byRoot.set(rootUri, uniqueUrls([...existing, ...links]))
  }

  return byRoot
}

export const referencedLinksForBlueskyRoot = (
  post: BlueskyPostView,
  threadReplyShareLinks: string[] = [],
): string[] => uniqueUrls([...collectBlueskyRootReferencedLinks(post), ...threadReplyShareLinks])
