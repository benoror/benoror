export type ChatRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
}

export interface ChatRequestBody {
  messages: Array<Pick<ChatMessage, "role" | "content">>
}
