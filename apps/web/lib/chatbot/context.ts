import fs from "node:fs/promises"
import path from "node:path"

interface ContextFileMeta {
  id: string
  file: string
  title: string
}

interface PublicProfile {
  general_summary_file: string
  context_files_list: ContextFileMeta[]
}

interface ContextCache {
  signature: string
  content: string
  sections: ContextSection[]
}

interface ContextSection {
  title: string
  content: string
  searchableText: string
}

const PUBLIC_PROFILE_FILE = "public_profile.json"
const cwd = process.cwd()
const defaultChatbotDataPath = cwd.endsWith(`${path.sep}apps${path.sep}web`)
  ? path.join(cwd, "..", "..", "packages", "data", "chatbot")
  : path.join(cwd, "packages", "data", "chatbot")
const CHATBOT_DATA_PATH =
  process.env.CHATBOT_DATA_PATH ||
  defaultChatbotDataPath

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

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
}

function isContextFileMeta(value: unknown): value is ContextFileMeta {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === "string" &&
    typeof candidate.file === "string" &&
    typeof candidate.title === "string"
  )
}

function isPublicProfile(value: unknown): value is PublicProfile {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.general_summary_file === "string" &&
    Array.isArray(candidate.context_files_list) &&
    candidate.context_files_list.every(isContextFileMeta)
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

async function buildContextCache() {
  const { profile, profilePath } = await readPublicProfile()
  const files = [
    profile.general_summary_file,
    ...profile.context_files_list.map((item) => item.file),
  ]
  const uniqueFiles = Array.from(new Set(files))

  const stats = await Promise.all([
    fs.stat(profilePath),
    ...uniqueFiles.map((file) => fs.stat(path.join(CHATBOT_DATA_PATH, file))),
  ])

  const signature = JSON.stringify(
    stats.map((stat, index) => ({
      file: index === 0 ? PUBLIC_PROFILE_FILE : uniqueFiles[index - 1],
      mtimeMs: stat.mtimeMs,
    })),
  )

  if (contextCache && contextCache.signature === signature) {
    return contextCache
  }

  const summaryContent = await readMarkdownFile(profile.general_summary_file)
  const sections: ContextSection[] = [
    {
      title: "General Summary",
      content: summaryContent,
      searchableText: `General Summary\n${summaryContent}`.toLowerCase(),
    },
  ]

  for (const fileMeta of profile.context_files_list) {
    if (fileMeta.file === profile.general_summary_file) continue
    const fileContent = await readMarkdownFile(fileMeta.file)
    sections.push({
      title: fileMeta.title,
      content: fileContent,
      searchableText: `${fileMeta.title}\n${fileContent}`.toLowerCase(),
    })
  }

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
    let score = 0

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
