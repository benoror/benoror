import { ABOUT, COMPANIES, EDUCATION, LANGUAGES, SKILLS } from "@workspace/data/resume"
import type { IAchievement, IRole, ISkill } from "@workspace/data/types/resume"

const MAX_ACHIEVEMENTS_PER_ROLE = 2

function flattenAchievementDescriptions(
  achievements: IAchievement[] = [],
  depth = 0,
): string[] {
  return achievements.flatMap((achievement) => {
    const prefix = depth === 0 ? "- " : "  - "
    const nested = flattenAchievementDescriptions(
      achievement.subAchievements ?? [],
      depth + 1,
    )
    return [`${prefix}${achievement.description}`, ...nested]
  })
}

function summarizeRole(role: IRole): string[] {
  const lines: string[] = []
  const roleTitle = role.project ? `${role.title} (${role.project})` : role.title
  const metadata = [role.startDate, role.endDate].filter(Boolean).join(" - ")
  const location = role.location ? ` | ${role.location}` : ""

  lines.push(`#### ${roleTitle}`)
  if (metadata || location) {
    lines.push(`_${metadata}${location}_`)
  }
  lines.push(role.description)

  const achievements = flattenAchievementDescriptions(role.achievements).slice(
    0,
    MAX_ACHIEVEMENTS_PER_ROLE,
  )
  if (achievements.length > 0) {
    lines.push("Key highlights:")
    lines.push(...achievements)
  }

  if (role.skills.length > 0) {
    lines.push(`Key skills: ${role.skills.map((skill) => skill.name).join(", ")}`)
  }

  return lines
}

function summarizeSkill(skill: ISkill): string {
  const topSubSkills = (skill.subSkills ?? [])
    .slice(0, 6)
    .map((subSkill) => subSkill.name)
    .join(", ")

  const description = skill.description ? ` ${skill.description}` : ""
  const details = topSubSkills ? ` Core areas: ${topSubSkills}.` : ""

  return `- **${skill.name}** (${skill.level ?? 0}/100):${description}${details}`
}

export function serializeResumeContext(): string {
  const lines: string[] = []
  const sortedSkills = [...SKILLS].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  lines.push("# Professional Background")
  lines.push(`${ABOUT.header}`)
  lines.push(ABOUT.about_me)
  lines.push("")

  lines.push("## Experience")
  for (const company of COMPANIES) {
    lines.push(`### ${company.name}`)
    lines.push(
      `${company.startDate} - ${company.endDate}${company.location ? ` | ${company.location}` : ""}`,
    )
    lines.push(company.description)
    lines.push("")

    for (const role of company.roles ?? []) {
      lines.push(...summarizeRole(role))
      lines.push("")
    }
  }

  lines.push("## Core Skills")
  for (const skill of sortedSkills) {
    lines.push(summarizeSkill(skill))
  }
  lines.push("")

  lines.push("## Education")
  for (const education of EDUCATION) {
    lines.push(
      `- **${education.title}** - ${education.institution} (${education.location}, ${education.startDate} - ${education.endDate})`,
    )
  }
  lines.push("")

  lines.push("## Languages")
  for (const language of LANGUAGES) {
    lines.push(`- ${language.name}: ${language.proficiency}`)
  }

  return lines.join("\n")
}
