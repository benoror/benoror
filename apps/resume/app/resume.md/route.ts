import { ABOUT, COMPANIES, EDUCATION, LANGUAGES, SKILLS } from '@workspace/data/resume'
import { LINKS, PERSONAL } from '@workspace/data/personal'
import type { IAchievement, IRole, ISkill } from '@workspace/data/types/resume'

const PUBLIC_RESUME_URL = LINKS.resume_url.replace(/\/$/, '')

function withAbsoluteSkillLinks(markdown: string): string {
  return markdown.replace(/\]\(#([^)]+)\)/g, `](${PUBLIC_RESUME_URL}#$1)`)
}

function pushAchievement(lines: string[], achievement: IAchievement, depth = 0): void {
  const indent = '  '.repeat(depth)
  lines.push(`${indent}- ${withAbsoluteSkillLinks(achievement.description)}`)

  for (const subAchievement of achievement.subAchievements ?? []) {
    pushAchievement(lines, subAchievement, depth + 1)
  }
}

function pushRole(lines: string[], role: IRole): void {
  const roleName = role.projectUrl ? `${role.title} - [${role.project}](${role.projectUrl})` : role.title
  lines.push(`#### ${roleName}`)

  const metadata = [role.startDate, role.endDate].filter(Boolean).join(' - ')
  const location = role.location ? ` (${role.location})` : ''
  if (metadata || location) {
    lines.push(`_${metadata}${location}_`)
  }

  lines.push(withAbsoluteSkillLinks(role.description))

  if (role.achievements.length > 0) {
    lines.push('')
    lines.push('Achievements:')
    for (const achievement of role.achievements) {
      pushAchievement(lines, achievement)
    }
  }

  if (role.skills.length > 0) {
    lines.push('')
    lines.push(`Skills: ${role.skills.map((skill) => skill.name).join(', ')}`)
  }
}

function pushSkill(lines: string[], skill: ISkill, depth = 0): void {
  const indent = '  '.repeat(depth)
  const levelText = skill.level !== undefined ? ` (level: ${skill.level}/100)` : ''
  const sinceText = skill.since !== undefined ? ` (since: ${skill.since})` : ''
  lines.push(`${indent}- **${skill.name}**${levelText}${sinceText}`)

  if (skill.description) {
    lines.push(`${indent}  - ${withAbsoluteSkillLinks(skill.description)}`)
  }

  for (const subSkill of skill.subSkills ?? []) {
    pushSkill(lines, subSkill, depth + 1)
  }
}

function buildMarkdown(): string {
  const lines: string[] = []

  lines.push(`# ${ABOUT.name} - Resume`)
  lines.push('')
  lines.push(`_Human + AI-friendly Markdown resume. Canonical web version: [${LINKS.resume_url}](${LINKS.resume_url})_`)
  lines.push('')
  lines.push('## Profile')
  lines.push(`- Name: ${PERSONAL.full_name}`)
  lines.push(`- Headline: ${ABOUT.header}`)
  lines.push(`- Location: ${ABOUT.location}`)
  lines.push(`- Email: ${ABOUT.public_email}`)
  lines.push(`- Website: ${LINKS.website_url}`)
  lines.push(`- GitHub: ${LINKS.github_url}`)
  lines.push(`- LinkedIn: ${LINKS.linkedin_url}`)
  lines.push('')
  lines.push(withAbsoluteSkillLinks(ABOUT.about_me))
  lines.push('')
  lines.push('## Experience')
  lines.push('')

  for (const company of COMPANIES) {
    lines.push(`### [${company.name}](${company.url})`)
    lines.push(`_${company.startDate} - ${company.endDate} (${company.location})_`)
    lines.push(withAbsoluteSkillLinks(company.description))
    lines.push('')

    for (const role of company.roles) {
      pushRole(lines, role)
      lines.push('')
    }
  }

  lines.push('## Skills')
  for (const skill of SKILLS) {
    pushSkill(lines, skill)
  }
  lines.push('')

  lines.push('## Education')
  for (const education of EDUCATION) {
    lines.push(`- **${education.title}** - [${education.institution}](${education.institutionUrl})`)
    lines.push(`  - ${education.startDate} - ${education.endDate}`)
    lines.push(`  - ${education.location}`)
    lines.push(`  - ${education.description}`)
  }
  lines.push('')

  lines.push('## Languages')
  for (const language of LANGUAGES) {
    lines.push(`- ${language.name} - ${language.proficiency} (${language.level}/100)`)
  }
  lines.push('')

  lines.push(`Updated from source data in \`@workspace/data/resume\`.`)

  return lines.join('\n')
}

export function GET() {
  const markdown = buildMarkdown()

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'inline; filename="Ben Orozco - Resume.md"',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
