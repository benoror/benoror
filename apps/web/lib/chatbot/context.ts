import fs from "node:fs/promises"
import path from "node:path"
import { getFeedContextSnapshot } from "@/lib/feed/serialize-feed-context"
import { serializePersonalContext } from "@workspace/data/serializers/personal-context"
import { serializePortfolioContext } from "@workspace/data/serializers/portfolio-context"
import { serializeResumeContext } from "@workspace/data/serializers/resume-context"

interface BaseSectionMeta {
  id: string
  title: string
  aliases?: string[]
  keywords?: string[]
  priority?: number
}

interface FileSectionMeta extends BaseSectionMeta {
  type: "file"
  file: string
}

type RuntimeSectionKey = "resume" | "portfolio" | "personal"

interface RuntimeSectionMeta extends BaseSectionMeta {
  type: "runtime"
  runtime_key: RuntimeSectionKey
}

type SnapshotSectionKey = "feed"

interface SnapshotSectionMeta extends BaseSectionMeta {
  type: "snapshot"
  snapshot_key: SnapshotSectionKey
}

type ContextSectionMeta = FileSectionMeta | RuntimeSectionMeta | SnapshotSectionMeta

interface PublicProfile {
  last_updated?: string
  sections: ContextSectionMeta[]
}

interface ContextCache {
  signature: string
  content: string
  sections: ContextSection[]
}

type SignatureEntry =
  | {
      kind: "manifest"
      file: string
      mtimeMs: number
      lastUpdated: string | null
    }
  | {
      kind: "file"
      file: string
      mtimeMs: number
    }
  | {
      kind: "runtime"
      runtimeKey: RuntimeSectionKey
      signature: string
    }
  | {
      kind: "snapshot"
      snapshotKey: SnapshotSectionKey
      signature: string
    }

interface ContextSection {
  id: string
  title: string
  content: string
  searchableText: string
  priority: number
}

const PUBLIC_PROFILE_FILE = "public_profile.json"
const cwd = process.cwd()
const defaultChatbotDataPath = cwd.endsWith(`${path.sep}apps${path.sep}web`)
  ? path.join(cwd, "..", "..", "packages", "data", "chatbot")
  : path.join(cwd, "packages", "data", "chatbot")
const CHATBOT_DATA_PATH =
  process.env.CHATBOT_DATA_PATH ||
  defaultChatbotDataPath

const runtimeSectionResolvers: Record<
  RuntimeSectionKey,
  {
    load: () => string
  }
> = {
  resume: {
    load: serializeResumeContext,
  },
  portfolio: {
    load: serializePortfolioContext,
  },
  personal: {
    load: serializePersonalContext,
  },
}

let contextCache: ContextCache | null = null

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "how",
  "i",
  "in",
  "is",
  "it",
  "its",
  "me",
  "my",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "was",
  "what",
  "where",
  "who",
  "with",
  "you",
])

function normalizeToken(token: string): string {
  let normalized = token.toLowerCase()

  if (normalized.endsWith("ies") && normalized.length > 4) {
    normalized = `${normalized.slice(0, -3)}y`
  } else if (
    normalized.endsWith("s") &&
    !normalized.endsWith("ss") &&
    normalized.length > 3
  ) {
    normalized = normalized.slice(0, -1)
  }

  if (normalized.endsWith("ing") && normalized.length > 5) {
    normalized = normalized.slice(0, -3)
  } else if (normalized.endsWith("ed") && normalized.length > 4) {
    normalized = normalized.slice(0, -2)
  } else if (normalized.endsWith("ment") && normalized.length > 6) {
    normalized = normalized.slice(0, -4)
  }

  if (normalized.endsWith("i") && normalized.length > 3) {
    normalized = `${normalized.slice(0, -1)}y`
  }

  if (normalized === "videogame") return "game"
  if (normalized === "gaming") return "game"
  if (normalized === "develop") return "build"
  if (normalized === "developer") return "build"
  if (normalized === "development") return "build"
  if (normalized === "developed") return "build"

  return normalized
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((token) => normalizeToken(token))
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

function isBaseSectionMeta(value: unknown): value is BaseSectionMeta {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    (candidate.aliases === undefined || isStringArray(candidate.aliases)) &&
    (candidate.keywords === undefined || isStringArray(candidate.keywords)) &&
    (candidate.priority === undefined || typeof candidate.priority === "number")
  )
}

function isFileSectionMeta(value: unknown): value is FileSectionMeta {
  if (!isBaseSectionMeta(value)) return false
  const candidate = value as unknown as { type?: unknown; file?: unknown }
  return candidate.type === "file" && typeof candidate.file === "string"
}

function isRuntimeSectionMeta(value: unknown): value is RuntimeSectionMeta {
  if (!isBaseSectionMeta(value)) return false
  const candidate = value as unknown as { type?: unknown; runtime_key?: unknown }
  return (
    candidate.type === "runtime" &&
    (candidate.runtime_key === "resume" ||
      candidate.runtime_key === "portfolio" ||
      candidate.runtime_key === "personal")
  )
}

function isSnapshotSectionMeta(value: unknown): value is SnapshotSectionMeta {
  if (!isBaseSectionMeta(value)) return false
  const candidate = value as unknown as { type?: unknown; snapshot_key?: unknown }
  return candidate.type === "snapshot" && candidate.snapshot_key === "feed"
}

function isContextSectionMeta(value: unknown): value is ContextSectionMeta {
  return (
    isFileSectionMeta(value) ||
    isRuntimeSectionMeta(value) ||
    isSnapshotSectionMeta(value)
  )
}

function isPublicProfile(value: unknown): value is PublicProfile {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    (candidate.last_updated === undefined ||
      typeof candidate.last_updated === "string") &&
    Array.isArray(candidate.sections) &&
    candidate.sections.every(isContextSectionMeta)
  )
}

async function readPublicProfile() {
  const profilePath = path.join(CHATBOT_DATA_PATH, PUBLIC_PROFILE_FILE)
  const profileRaw = await fs.readFile(profilePath, "utf-8")
  const parsed: unknown = JSON.parse(profileRaw)

  if (!isPublicProfile(parsed)) {
    throw new Error("Invalid chatbot public profile format")
  }

  return {
    profile: parsed,
    profilePath,
  }
}

async function readMarkdownFile(filename: string) {
  try {
    return await fs.readFile(path.join(CHATBOT_DATA_PATH, filename), "utf-8")
  } catch (error) {
    console.error(`Failed to load markdown file ${filename}:`, error)
    return ""
  }
}

function buildSearchableText(section: BaseSectionMeta, content: string) {
  return [
    section.title,
    ...(section.aliases ?? []),
    ...(section.keywords ?? []),
    content,
  ]
    .join("\n")
    .toLowerCase()
}

function getPriority(section: BaseSectionMeta) {
  return section.priority ?? 0
}

async function getFileSignatureEntries(files: string[]) {
  const stats = await Promise.all(files.map((file) => fs.stat(file)))
  return stats.map((stat, index): SignatureEntry => ({
    kind: "file",
    file: path.relative(cwd, files[index] ?? ""),
    mtimeMs: stat.mtimeMs,
  }))
}

async function resolveFileSection(section: FileSectionMeta) {
  const filePath = path.join(CHATBOT_DATA_PATH, section.file)
  const [content, signatureEntries] = await Promise.all([
    readMarkdownFile(section.file),
    getFileSignatureEntries([filePath]),
  ])

  return {
    section: {
      id: section.id,
      title: section.title,
      content,
      searchableText: buildSearchableText(section, content),
      priority: getPriority(section),
    },
    signatureEntries,
  }
}

async function resolveRuntimeSection(section: RuntimeSectionMeta) {
  const resolver = runtimeSectionResolvers[section.runtime_key]
  const content = resolver.load()

  return {
    section: {
      id: section.id,
      title: section.title,
      content,
      searchableText: buildSearchableText(section, content),
      priority: getPriority(section),
    },
    signatureEntries: [
      {
        kind: "runtime",
        runtimeKey: section.runtime_key,
        signature: content,
      } satisfies SignatureEntry,
    ],
  }
}

async function resolveSnapshotSection(section: SnapshotSectionMeta) {
  const snapshot = await getFeedContextSnapshot()

  return {
    section: {
      id: section.id,
      title: section.title,
      content: snapshot.content,
      searchableText: buildSearchableText(section, snapshot.content),
      priority: getPriority(section),
    },
    signatureEntries: [
      {
        kind: "snapshot",
        snapshotKey: section.snapshot_key,
        signature: snapshot.signature,
      } satisfies SignatureEntry,
    ],
  }
}

async function resolveContextSection(section: ContextSectionMeta) {
  switch (section.type) {
    case "file":
      return resolveFileSection(section)
    case "runtime":
      return resolveRuntimeSection(section)
    case "snapshot":
      return resolveSnapshotSection(section)
  }
}

async function buildContextCache() {
  const { profile, profilePath } = await readPublicProfile()
  const profileStat = await fs.stat(profilePath)
  const resolvedSections = await Promise.all(
    profile.sections.map((section) => resolveContextSection(section)),
  )

  const signature = JSON.stringify(
    [
      {
        kind: "manifest",
        file: PUBLIC_PROFILE_FILE,
        mtimeMs: profileStat.mtimeMs,
        lastUpdated: profile.last_updated ?? null,
      } satisfies SignatureEntry,
      ...resolvedSections.flatMap((entry) => entry.signatureEntries),
    ],
  )

  if (contextCache && contextCache.signature === signature) {
    return contextCache
  }

  const sections = resolvedSections.map((entry) => entry.section)

  const content = sections
    .map((section) => `## ${section.title}\n${section.content}`)
    .join("\n\n")

  contextCache = { signature, content, sections }
  return contextCache
}

function pickRelevantSections(
  sections: ContextSection[],
  query: string,
  maxSections: number,
) {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) {
    return sections.slice(0, maxSections)
  }

  const querySet = new Set(queryTokens)
  const scored = sections.map((section, index) => {
    const sectionTokens = tokenize(section.searchableText)
    let score = section.priority

    for (const token of sectionTokens) {
      if (querySet.has(token)) score += 1
    }

    // Slightly prioritize earlier sections for tie-break stability.
    return { section, score, index }
  })

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.index - b.index
    })
    .slice(0, maxSections)
    .map((item) => item.section)
}

export async function getChatbotContext() {
  const cache = await buildContextCache()
  return cache.content
}

export async function getChatbotContextForQuery(query: string, maxSections = 3) {
  const cache = await buildContextCache()
  const selectedSections = pickRelevantSections(cache.sections, query, maxSections)
  const selectedContent = selectedSections
    .map((section) => `## ${section.title}\n${section.content}`)
    .join("\n\n")

  return {
    signature: cache.signature,
    context: selectedContent,
    selectedSections: selectedSections.map((section) => section.title),
  }
}
