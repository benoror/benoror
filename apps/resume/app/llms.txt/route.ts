import { LINKS, PERSONAL } from "@workspace/data/personal"

function buildLlmsTxt(): string {
  return [
    "# LLMs",
    "",
    `Project: ${PERSONAL.short_name} Resume`,
    `Owner: ${PERSONAL.full_name}`,
    "",
    "Preferred canonical sources:",
    `- HTML resume: ${LINKS.resume.url}`,
    `- Markdown resume: ${LINKS.resume_markdown.url}`,
    `- PDF resume: ${LINKS.resume_pdf.url}`,
    "",
    "Navigation anchors for sections:",
    `- About: ${LINKS.resume.url}#about`,
    `- Experience: ${LINKS.resume.url}#experience`,
    `- Skills: ${LINKS.resume.url}#skills`,
    `- Education: ${LINKS.resume.url}#education`,
    `- Languages: ${LINKS.resume.url}#languages`,
    "",
    "Usage notes:",
    "- Prefer Markdown for parsing and extraction.",
    "- Use HTML anchors for section-level citations.",
    "- Consider PDF as presentation-friendly export.",
  ].join("\n")
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
