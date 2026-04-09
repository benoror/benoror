import { getFeedContextSnapshot } from "@/lib/feed/serialize-feed-context"
import {
  buildStaticChatbotKnowledgeBase,
  type ChatbotSection,
} from "@workspace/data/chatbot"

interface ContextCache {
  signature: string
  sections: ContextSection[]
}

interface ContextSection {
  section: ChatbotSection
  searchableText: string
  priority: number
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

function flattenStructuredValues(value: unknown): string[] {
  if (value === null || value === undefined) return []
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return [String(value)]
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenStructuredValues(item))
  }
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, nestedValue]) => [
      key,
      ...flattenStructuredValues(nestedValue),
    ])
  }
  return []
}

function buildSearchableText(section: ChatbotSection) {
  return [
    section.title,
    ...(section.aliases ?? []),
    ...(section.keywords ?? []),
    ...flattenStructuredValues(section.data),
  ]
    .join("\n")
    .toLowerCase()
}

function renderSectionsForPrompt(sections: ChatbotSection[]) {
  return JSON.stringify(
    {
      sections: sections.map((section) => ({
        id: section.id,
        kind: section.kind,
        title: section.title,
        aliases: section.aliases ?? [],
        keywords: section.keywords ?? [],
        data: section.data,
      })),
    },
    null,
    2,
  )
}

async function buildContextCache() {
  const [staticKnowledgeBase, feedSnapshot] = await Promise.all([
    buildStaticChatbotKnowledgeBase(),
    getFeedContextSnapshot(),
  ])
  const sections = [...staticKnowledgeBase.sections, feedSnapshot.section]
  const signature = JSON.stringify({
    staticKnowledgeBase,
    feedSignature: feedSnapshot.signature,
  })

  if (contextCache && contextCache.signature === signature) {
    return contextCache
  }

  contextCache = {
    signature,
    sections: sections.map((section) => ({
      section,
      searchableText: buildSearchableText(section),
      priority: section.priority,
    })),
  }
  return contextCache
}

function pickRelevantSections(
  sections: ContextSection[],
  query: string,
  maxSections: number,
): ChatbotSection[] {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) {
    return sections.slice(0, maxSections).map((section) => section.section)
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
    .map((item) => item.section.section)
}

export async function getChatbotContext() {
  const cache = await buildContextCache()
  return renderSectionsForPrompt(cache.sections.map((section) => section.section))
}

export async function getChatbotContextForQuery(query: string, maxSections = 3) {
  const cache = await buildContextCache()
  const selectedSections = pickRelevantSections(cache.sections, query, maxSections)

  return {
    signature: cache.signature,
    context: renderSectionsForPrompt(selectedSections),
    selectedSections: selectedSections.map((section) => section.title),
  }
}
