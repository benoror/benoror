import { NextResponse } from "next/server"
import { getChatbotContextForQuery } from "@/lib/chatbot/context"
import type { ChatRequestBody } from "@/lib/chatbot/types"

const VERCEL_AI_GATEWAY_URL =
  process.env.AI_GATEWAY_BASE_URL || "https://ai-gateway.vercel.sh/v1/chat/completions"
const DEFAULT_GATEWAY_MODEL = "google/gemma-4-26b-a4b-it"
const MAX_CONTEXT_SECTIONS = 3
const MAX_RECENT_MESSAGES = 8
const CACHE_TTL_MS = 5 * 60 * 1000

type CachedResponse = {
  content: string
  expiresAt: number
}

const responseCache = new Map<string, CachedResponse>()

function pruneResponseCache() {
  const now = Date.now()
  for (const [key, value] of responseCache.entries()) {
    if (value.expiresAt <= now) responseCache.delete(key)
  }
}

function normalizeForCache(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

function compactConversationMessages(messages: ChatRequestBody["messages"]) {
  if (messages.length <= MAX_RECENT_MESSAGES) {
    return messages
  }

  const overflow = messages.slice(0, -MAX_RECENT_MESSAGES)
  const recent = messages.slice(-MAX_RECENT_MESSAGES)
  const summaryLines = overflow
    .slice(-12)
    .map((message) => {
      const compact = message.content.replace(/\s+/g, " ").trim().slice(0, 180)
      const role = message.role === "user" ? "User" : "Assistant"
      return `- ${role}: ${compact}`
    })
  const summary = `Conversation summary of earlier turns:\n${summaryLines.join("\n")}`

  return [{ role: "assistant" as const, content: summary }, ...recent]
}

function buildCacheKey(options: {
  query: string
  contextSignature: string
  model: string
}) {
  return JSON.stringify({
    model: options.model,
    query: normalizeForCache(options.query),
    contextSignature: options.contextSignature,
  })
}

function isValidChatRequest(value: unknown): value is ChatRequestBody {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  if (!Array.isArray(candidate.messages)) return false

  return candidate.messages.every((message) => {
    if (!message || typeof message !== "object") return false
    const msg = message as Record<string, unknown>
    const role = msg.role
    return (
      (role === "user" || role === "assistant") &&
      typeof msg.content === "string"
    )
  })
}

function buildGatewayHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (process.env.AI_GATEWAY_API_KEY) {
    headers.Authorization = `Bearer ${process.env.AI_GATEWAY_API_KEY}`
    return headers
  }

  // Backward compatibility for older env naming.
  if (process.env.VERCEL_AI_GATEWAY_API_KEY) {
    headers.Authorization = `Bearer ${process.env.VERCEL_AI_GATEWAY_API_KEY}`
    return headers
  }

  throw new Error(
    "Missing AI Gateway API Key. Please set AI_GATEWAY_API_KEY (preferred) or VERCEL_AI_GATEWAY_API_KEY.",
  )
}

export async function POST(req: Request) {
  const startedAt = Date.now()

  try {
    const body: unknown = await req.json()
    if (!isValidChatRequest(body)) {
      return NextResponse.json(
        { error: "Invalid chat request body" },
        { status: 400 },
      )
    }

    const model = process.env.AI_GATEWAY_MODEL || DEFAULT_GATEWAY_MODEL
    const incomingMessages = body.messages
    const latestUserMessage =
      [...incomingMessages].reverse().find((message) => message.role === "user")
        ?.content || ""
    const compactedMessages = compactConversationMessages(incomingMessages)

    const contextStartedAt = Date.now()
    const contextBundle = await getChatbotContextForQuery(
      latestUserMessage,
      MAX_CONTEXT_SECTIONS,
    )
    const contextMs = Date.now() - contextStartedAt
    const contextContent = contextBundle.context

    const llmMessages = [
      {
        role: "system",
        content: `You are a helpful AI assistant answering questions about Ben Orozco. Use ONLY the following structured context to answer questions. The context is encoded as JSON, and some sections may include Markdown-authored text inside data fields. If the answer is not in the context, clearly state that you don't have information about it. Keep responses concise by default.

# Context about Ben Orozco:
${contextContent}`,
      },
      ...compactedMessages,
    ]

    // Cache only simple short-history queries to avoid stale contextual answers.
    const canUseCache = incomingMessages.length <= 2 && latestUserMessage.trim().length > 0
    let cacheKey = ""
    if (canUseCache) {
      pruneResponseCache()
      cacheKey = buildCacheKey({
        query: latestUserMessage,
        contextSignature: contextBundle.signature,
        model,
      })
      const cached = responseCache.get(cacheKey)
      if (cached && cached.expiresAt > Date.now()) {
        const totalMs = Date.now() - startedAt
        console.info("chat_api_cache_hit", {
          totalMs,
          messageCount: incomingMessages.length,
          contextSections: contextBundle.selectedSections,
        })
        return new Response(cached.content, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
          status: 200,
        })
      }
    }

    const gatewayStartedAt = Date.now()
    const response = await fetch(VERCEL_AI_GATEWAY_URL, {
      method: "POST",
      headers: buildGatewayHeaders(),
      body: JSON.stringify({
        model,
        messages: llmMessages,
        stream: true,
        max_tokens: 500,
      }),
    })
    const gatewayMs = Date.now() - gatewayStartedAt

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Vercel AI Gateway error:", response.status, errorData)
      throw new Error(
        `Vercel AI Gateway Error: ${response.status} - ${errorData.error?.message || response.statusText}`,
      )
    }

    if (!response.body) {
      throw new Error("AI Gateway returned no response body")
    }

    const streamReader = response.body.getReader()
    const decoder = new TextDecoder()
    let cachedText = ""

    const proxiedStream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        const { done, value } = await streamReader.read()
        if (done) {
          cachedText += decoder.decode()
          if (canUseCache && cacheKey && cachedText.trim()) {
            responseCache.set(cacheKey, {
              content: cachedText,
              expiresAt: Date.now() + CACHE_TTL_MS,
            })
          }
          controller.close()
          return
        }

        if (value) {
          cachedText += decoder.decode(value, { stream: true })
          controller.enqueue(value)
        }
      },
      cancel() {
        streamReader.cancel().catch(() => undefined)
      },
    })

    const totalMs = Date.now() - startedAt
    console.info("chat_api_request_ok", {
      contextMs,
      gatewayMs,
      totalMs,
      messageCount: incomingMessages.length,
      contextChars: contextContent.length,
      contextSections: contextBundle.selectedSections,
      compactedMessageCount: compactedMessages.length,
    })

    return new Response(proxiedStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      status: 200,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
