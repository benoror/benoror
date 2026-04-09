import {
  portfolioItems,
  projectsItems,
  publicationsItems,
  talksItems,
} from "@workspace/data/portfolio"

function formatItemLine(item: (typeof portfolioItems)[number]) {
  const circa = item.circa ? ` (${item.circa})` : ""
  const stack = item.techStack.length > 0 ? ` Tech: ${item.techStack.join(", ")}.` : ""
  return `- **${item.title}**${circa} - ${item.category}. ${item.description}.${stack}`
}

export function serializePortfolioContext(): string {
  const lines: string[] = []

  lines.push("# Projects, Publications, and Talks")
  lines.push(
    "Selected work spanning open source, SaaS products, experiments, talks, and publications.",
  )
  lines.push("")

  lines.push("## Projects")
  for (const project of projectsItems) {
    lines.push(formatItemLine(project))
  }
  lines.push("")

  lines.push("## Talks")
  for (const talk of talksItems) {
    lines.push(formatItemLine(talk))
  }
  lines.push("")

  lines.push("## Publications")
  for (const publication of publicationsItems) {
    lines.push(formatItemLine(publication))
  }

  return lines.join("\n")
}
