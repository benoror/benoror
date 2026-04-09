import type { ChatbotSection } from "../types.js"

import { readChatbotMarkdown } from "./editorial.js"

export async function buildFaqSection(): Promise<ChatbotSection> {
  return {
    id: "faq",
    kind: "faq",
    title: "Ben Orozco FAQ",
    keywords: ["faq", "common questions", "background", "interests"],
    aliases: ["questions about ben", "common questions"],
    priority: 4,
    data: {
      markdown: await readChatbotMarkdown("faq.md"),
    },
  }
}
