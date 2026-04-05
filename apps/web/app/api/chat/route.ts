import { NextResponse } from "next/server"
import { getChatbotContext } from "@/lib/chatbot/context"
import type { ChatRequestBody } from "@/lib/chatbot/types"

const VERCEL_AI_GATEWAY_URL = "https://gateway.ai.vercel.com/v1/chat/completions"

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

  if (process.env.VERCEL_AI_GATEWAY_API_KEY) {
    headers["X-Vercel-AI-Gateway-Api-Key"] = process.env.VERCEL_AI_GATEWAY_API_KEY
    return headers
  }

  if (process.env.GOOGLE_API_KEY) {
    headers["X-Vercel-AI-Gateway-Api-Key"] = process.env.GOOGLE_API_KEY
    return headers
  }

  if (process.env.OPENAI_API_KEY) {
    headers.Authorization = `Bearer ${process.env.OPENAI_API_KEY}`
    return headers
  }

  throw new Error(
    "Missing AI Gateway or Provider API Key. Please set VERCEL_AI_GATEWAY_API_KEY, GOOGLE_API_KEY, or OPENAI_API_KEY environment variable.",
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

    const contextStartedAt = Date.now()
    const contextContent = await getChatbotContext()
    const contextMs = Date.now() - contextStartedAt

    const llmMessages = [
      {
        role: "system",
        content: `You are a helpful AI assistant answering questions about Ben Orozco. Use ONLY the following context to answer the questions. If the answer is not in the context, clearly state that you don't have information about it.

# Context about Ben Orozco:
${contextContent}`,
      },
      ...body.messages,
    ]

    const gatewayStartedAt = Date.now()
    const response = await fetch(VERCEL_AI_GATEWAY_URL, {
      method: "POST",
      headers: buildGatewayHeaders(),
      body: JSON.stringify({
        model: "gemini-1.5-flash",
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

    const totalMs = Date.now() - startedAt
    console.info("chat_api_request_ok", {
      contextMs,
      gatewayMs,
      totalMs,
      messageCount: body.messages.length,
      contextChars: contextContent.length,
    })

    return new Response(response.body, {
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
