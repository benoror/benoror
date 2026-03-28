import { ABOUT, COMPANIES, EDUCATION, LANGUAGES, SKILLS } from '@workspace/data/resume'
import { LINKS } from '@workspace/data/personal'
import type { IAchievement, IRole, ISkill } from '@workspace/data/types/resume'
import { shortURL } from '@workspace/utils/url'
import { sinceToString } from '@workspace/utils/date'

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
    lines.push(`Key skills: ${role.skills.map((skill) => skill.name).join(', ')}`)
  }
}

function subSkillsInline(subSkills: ISkill[] = []): string {
  return subSkills
    .map((skill) => {
      const nestedSkills = skill.subSkills?.map((subSkill) => subSkill.name).join(', ')
      return nestedSkills ? `${skill.name}: ${nestedSkills};` : `${skill.name};`
    })
    .join(' ')
}

function pushSkill(lines: string[], skill: ISkill): void {
  const years = sinceToString(skill.since)
  const yearsText = years ? ` (${years})` : ''
  const description = skill.description ? ` - ${withAbsoluteSkillLinks(skill.description)}` : ''
  const details = skill.subSkills && skill.subSkills.length > 0 ? `: ${subSkillsInline(skill.subSkills)}` : '.'
  lines.push(`- **${skill.name}**${yearsText}${description}${details}`)
}

function pushShortRole(lines: string[], role: IRole): void {
  const roleName = role.projectUrl ? `${role.title} - [${role.project}](${role.projectUrl})` : role.title
  lines.push(`- **${roleName}**: ${withAbsoluteSkillLinks(role.description)}`)
}

function buildMarkdown(): string {
  const lines: string[] = []
  const sortedSkills = [...SKILLS].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  lines.push(`# ${ABOUT.name} - Resume`)
  lines.push('')
  lines.push(`${ABOUT.header}`)
  lines.push(`${ABOUT.location}`)
  lines.push('')
  lines.push('## Contact')
  lines.push(`- Email: [${ABOUT.public_email}](mailto:${ABOUT.public_email})`)
  lines.push(`- Website: [${shortURL(LINKS.website_url)}](${LINKS.website_url})`)
  lines.push(`- GitHub: [${shortURL(LINKS.github_url)}](${LINKS.github_url})`)
  lines.push(`- LinkedIn: [${shortURL(LINKS.linkedin_url)}](${LINKS.linkedin_url})`)
  lines.push(`- Blog: [${shortURL(LINKS.blog_url)}](${LINKS.blog_url})`)
  lines.push(`- Resume URL: [${shortURL(LINKS.resume_url)}](${LINKS.resume_url})`)
  lines.push('')
  lines.push('## About')
  lines.push(withAbsoluteSkillLinks(ABOUT.about_me))
  lines.push('')
  lines.push('## Core Skills')
  for (const skill of sortedSkills) {
    const years = sinceToString(skill.since)
    const yearsText = years ? ` (${years})` : ''
    lines.push(`- ${skill.name}: ${skill.level ?? 0}/100${yearsText}`)
  }
  lines.push('')
  lines.push('## Experience')
  lines.push('')

  for (const company of COMPANIES) {
    lines.push(`### [${company.name}](${company.url})`)
    lines.push(`_${company.startDate} - ${company.endDate} - ${company.location}_`)
    lines.push(withAbsoluteSkillLinks(company.description))
    lines.push('')

    for (const role of company.roles ?? []) {
      if (company.short) {
        pushShortRole(lines, role)
      } else {
        pushRole(lines, role)
      }
      lines.push('')
    }
  }

  lines.push('## Skills')
  for (const skill of sortedSkills) {
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
    lines.push(`- ${language.name}: ${language.proficiency} (${language.level}/100)`)
  }
  lines.push('')

  lines.push(`Based on the print layout content from \`apps/resume\`, generated from \`@workspace/data/resume\`.`)

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
