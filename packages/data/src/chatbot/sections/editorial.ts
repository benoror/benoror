import fs from "node:fs/promises"

export async function readChatbotMarkdown(filename: string) {
  const fileUrl = new URL(`../../../chatbot/${filename}`, import.meta.url)
  return fs.readFile(fileUrl, "utf-8")
}
