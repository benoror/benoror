import type { ChatbotSection } from "../schema.js";
import { FAQ_MARKDOWN } from "./editorial-content.js";

export async function buildFaqSection(): Promise<ChatbotSection> {
  return {
    id: "faq",
    kind: "faq",
    title: "Ben Orozco FAQ",
    keywords: ["faq", "common questions", "background", "interests"],
    aliases: ["questions about ben", "common questions"],
    priority: 4,
    data: {
      markdown: FAQ_MARKDOWN,
    },
  };
}
