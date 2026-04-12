import { LINKS } from '@workspace/data/shared/profile';
import type { IAchievement, IResumeDocument, IResumeVariantSections, IRole, ISkill } from '@workspace/data/resume/schema';
import { shortURL } from '@workspace/utils/url';
import { sinceToString } from '@workspace/utils/date';

function withAbsoluteSkillLinks(markdown: string, publicResumeUrl: string): string {
  return markdown.replace(/\]\(#([^)]+)\)/g, `](${publicResumeUrl}#$1)`);
}

function pushAchievement(lines: string[], achievement: IAchievement, publicResumeUrl: string, depth = 0): void {
  const indent = '  '.repeat(depth);
  lines.push(`${indent}- ${withAbsoluteSkillLinks(achievement.description, publicResumeUrl)}`);

  for (const subAchievement of achievement.subAchievements ?? []) {
    pushAchievement(lines, subAchievement, publicResumeUrl, depth + 1);
  }
}

function pushRole(lines: string[], role: IRole, publicResumeUrl: string): void {
  const roleName = role.projectUrl ? `${role.title} - [${role.project}](${role.projectUrl})` : role.title;
  lines.push(`#### ${roleName}`);

  const metadata = [role.startDate, role.endDate].filter(Boolean).join(' - ');
  const location = role.location ? ` (${role.location})` : '';
  if (metadata || location) {
    lines.push(`_${metadata}${location}_`);
  }

  lines.push(withAbsoluteSkillLinks(role.description, publicResumeUrl));

  if (role.achievements.length > 0) {
    lines.push('');
    lines.push('Achievements:');
    for (const achievement of role.achievements) {
      pushAchievement(lines, achievement, publicResumeUrl);
    }
  }

  if (role.skills.length > 0) {
    lines.push('');
    lines.push(`Key skills: ${role.skills.map((skill) => skill.name).join(', ')}`);
  }
}

function subSkillsInline(subSkills: ISkill[] = []): string {
  return subSkills
    .map((skill) => {
      const nestedSkills = skill.subSkills?.map((subSkill) => subSkill.name).join(', ');
      return nestedSkills ? `${skill.name}: ${nestedSkills};` : `${skill.name};`;
    })
    .join(' ');
}

function pushSkill(lines: string[], skill: ISkill, publicResumeUrl: string): void {
  const years = sinceToString(skill.since);
  const yearsText = years ? ` (${years})` : '';
  const description = skill.description ? ` - ${withAbsoluteSkillLinks(skill.description, publicResumeUrl)}` : '';
  const details = skill.subSkills && skill.subSkills.length > 0 ? `: ${subSkillsInline(skill.subSkills)}` : '.';
  lines.push(`- **${skill.name}**${yearsText}${description}${details}`);
}

function pushShortRole(lines: string[], role: IRole, publicResumeUrl: string): void {
  const roleName = role.projectUrl ? `${role.title} - [${role.project}](${role.projectUrl})` : role.title;
  lines.push(`- **${roleName}**: ${withAbsoluteSkillLinks(role.description, publicResumeUrl)}`);
}

export function buildResumeMarkdown(
  document: IResumeDocument,
  resumeUrl: string,
  sections?: IResumeVariantSections,
): string {
  const publicResumeUrl = resumeUrl.replace(/\/$/, '');
  const lines: string[] = [];
  const sortedSkills = [...document.skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  lines.push(`# ${document.about.name} - Resume`);
  lines.push('');
  lines.push(`${document.about.header}`);
  lines.push(`${document.about.location}`);
  lines.push('');
  lines.push('## Contact');
  lines.push(`- Email: [${document.about.public_email}](mailto:${document.about.public_email})`);
  lines.push(`- Website: [${shortURL(LINKS.website.url)}](${LINKS.website.url})`);
  lines.push(`- GitHub: [${shortURL(LINKS.github.url)}](${LINKS.github.url})`);
  lines.push(`- LinkedIn: [${shortURL(LINKS.linkedin.url)}](${LINKS.linkedin.url})`);
  lines.push(`- Blog: [${shortURL(LINKS.blog.url)}](${LINKS.blog.url})`);
  lines.push(`- Resume URL: [${shortURL(publicResumeUrl)}](${publicResumeUrl})`);
  lines.push('');
  lines.push('## About');
  lines.push(withAbsoluteSkillLinks(document.about.about_me, publicResumeUrl));
  lines.push('');
  if (sections?.coreSkills !== false) {
    lines.push('## Core Skills');
    for (const skill of sortedSkills) {
      const years = sinceToString(skill.since);
      const yearsText = years ? ` (${years})` : '';
      lines.push(`- ${skill.name}: ${skill.level ?? 0}/100${yearsText}`);
    }
    lines.push('');
  }

  lines.push('## Experience');
  lines.push('');

  for (const company of document.companies) {
    lines.push(`### [${company.name}](${company.url})`);
    lines.push(`_${company.startDate} - ${company.endDate} - ${company.location}_`);
    lines.push(withAbsoluteSkillLinks(company.description, publicResumeUrl));
    lines.push('');

    for (const role of company.roles ?? []) {
      if (company.short) {
        pushShortRole(lines, role, publicResumeUrl);
      } else {
        pushRole(lines, role, publicResumeUrl);
      }
      lines.push('');
    }
  }

  lines.push('## Skills');
  for (const skill of sortedSkills) {
    pushSkill(lines, skill, publicResumeUrl);
  }
  lines.push('');

  lines.push('## Education');
  for (const education of document.education) {
    lines.push(`- **${education.title}** - [${education.institution}](${education.institutionUrl})`);
    lines.push(`  - ${education.startDate} - ${education.endDate}`);
    lines.push(`  - ${education.location}`);
    lines.push(`  - ${education.description}`);
  }
  lines.push('');

  lines.push('## Languages');
  for (const language of document.languages) {
    lines.push(`- ${language.name}: ${language.proficiency} (${language.level}/100)`);
  }
  lines.push('');

  lines.push('Based on the print layout content from `apps/resume`, generated from `@workspace/data/resume`.');

  return lines.join('\n');
}

export function createResumeMarkdownResponse(markdown: string, filename = 'Ben Orozco - Resume.md') {
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=300',
    },
  });
}
