import { FEED_SOURCES, HOME, INTERESTS, LINKS, PERSONAL, SKILLS } from "@workspace/data/personal"

export function serializePersonalContext(): string {
  const lines: string[] = []

  lines.push("# Personal Summary and Online Presence")
  lines.push(`${PERSONAL.short_name} (${PERSONAL.full_name})`)
  lines.push(HOME.header)
  lines.push(HOME.about_me)
  lines.push("")

  lines.push("## Interests")
  for (const interest of INTERESTS) {
    lines.push(`- ${interest}`)
  }
  lines.push("")

  lines.push("## Signature Strengths")
  for (const skill of SKILLS) {
    lines.push(`- ${skill.name}`)
  }
  lines.push("")

  lines.push("## Links")
  for (const [key, entry] of Object.entries(LINKS)) {
    const label =
      ("legend" in entry ? entry.legend : undefined) ?? key.replaceAll("_", " ")
    lines.push(`- ${label}: ${entry.url}`)
  }
  lines.push("")

  lines.push("## Public Writing and Activity Sources")
  for (const source of FEED_SOURCES) {
    const suffix = source.note ? ` (${source.note})` : ""
    lines.push(`- ${source.name}: ${source.site_url}${suffix}`)
  }

  return lines.join("\n")
}
