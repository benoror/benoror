import type { ChatbotSection } from "../types.js"
import { GENERAL_SUMMARY_MARKDOWN } from "./editorial-content.js"

export async function buildSummarySection(): Promise<ChatbotSection> {
  return {
    id: "general_summary",
    kind: "summary",
    title: "Ben Orozco: General Summary",
    keywords: ["summary", "overview", "bio", "introduction"],
    aliases: ["who is ben", "tell me about ben"],
    priority: 5,
    data: {
      markdown: GENERAL_SUMMARY_MARKDOWN,
    },
  }
}
