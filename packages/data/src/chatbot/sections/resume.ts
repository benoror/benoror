import { ABOUT, COMPANIES, EDUCATION, LANGUAGES, SKILLS } from "../../resume.js"
import type { IAchievement, IRole, ISkill } from "../../types/resume.js"
import type {
  ChatbotSection,
  ResumeChatbotCompany,
  ResumeChatbotRole,
  ResumeChatbotSkill,
} from "../types.js"

const MAX_ACHIEVEMENTS_PER_ROLE = 10

function flattenAchievementDescriptions(
  achievements: IAchievement[] = [],
  depth = 0,
): string[] {
  return achievements.flatMap((achievement) => {
    const prefix = depth === 0 ? "" : "  "
    const nested = flattenAchievementDescriptions(
      achievement.subAchievements ?? [],
      depth + 1,
    )
    return [`${prefix}${achievement.description}`, ...nested]
  })
}

function summarizeRole(role: IRole): ResumeChatbotRole {
  return {
    title: role.title,
    project: role.project,
    location: role.location,
    startDate: role.startDate,
    endDate: role.endDate,
    description: role.description,
    highlights: flattenAchievementDescriptions(role.achievements).slice(
      0,
      MAX_ACHIEVEMENTS_PER_ROLE,
    ),
    skills: role.skills.map((skill) => skill.name),
  }
}

function summarizeCompany(company: (typeof COMPANIES)[number]): ResumeChatbotCompany {
  return {
    name: company.name,
    url: company.url,
    location: company.location,
    startDate: company.startDate,
    endDate: company.endDate,
    description: company.description,
    roles: (company.roles ?? []).map(summarizeRole),
  }
}

function summarizeSkill(skill: ISkill): ResumeChatbotSkill {
  return {
    name: skill.name,
    level: skill.level,
    description: skill.description,
    coreAreas: (skill.subSkills ?? []).slice(0, 6).map((subSkill) => subSkill.name),
  }
}

export function buildResumeSection(): ChatbotSection {
  const sortedSkills = [...SKILLS].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return {
    id: "resume",
    kind: "resume",
    title: "Ben Orozco Professional Background",
    keywords: ["resume", "career", "experience", "companies", "education", "skills"],
    aliases: ["professional background", "work history", "career trajectory"],
    priority: 4,
    data: {
      about: {
        name: ABOUT.name,
        header: ABOUT.header,
        location: ABOUT.location,
        summary: ABOUT.about_me,
      },
      experience: COMPANIES.map(summarizeCompany),
      skills: sortedSkills.map(summarizeSkill),
      education: EDUCATION.map((education) => ({
        title: education.title,
        institution: education.institution,
        location: education.location,
        startDate: education.startDate,
        endDate: education.endDate,
      })),
      languages: LANGUAGES.map((language) => ({
        name: language.name,
        proficiency: language.proficiency,
      })),
    },
  }
}
