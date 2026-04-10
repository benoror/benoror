import { ABOUT, COMPANIES, EDUCATION, LANGUAGES, SKILLS } from "../../resume.js"
import { BASE_COVER_LETTER } from "../../cover_letters.js"
import { getResumeDocument, RESUME_VARIANTS } from "../../resume_variants.js"
import type { IAchievement, IRole, ISkill } from "../../types/resume.js"
import type {
  ChatbotSection,
  ResumeChatbotCompany,
  ResumeChatbotRole,
  ResumeChatbotSkill,
  ResumeChatbotVariant,
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

function summarizeVariants(): ResumeChatbotVariant[] {
  return Object.values(RESUME_VARIANTS).map((variant) => {
    const resumeDocument = getResumeDocument(variant.slug)
    const highlightedCompanies = (resumeDocument?.companies ?? [])
      .slice(0, 6)
      .map((company) => company.name)
    const highlightedSkills = (resumeDocument?.skills ?? [])
      .slice(0, 8)
      .map((skill) => skill.name)
    const coverLetter = variant.coverLetter

    return {
      slug: variant.slug,
      label: variant.label,
      metadata: variant.metadata,
      tailoredAbout: resumeDocument
        ? {
            header: resumeDocument.about.header,
            summary: resumeDocument.about.about_me,
          }
        : undefined,
      highlightedCompanies,
      highlightedSkills,
      coverLetter: coverLetter
        ? {
            title: coverLetter.title,
            targetCompany: coverLetter.targetCompany,
            targetRole: coverLetter.targetRole,
            recipient: coverLetter.recipient,
            summary: coverLetter.summary,
            keyThemes: coverLetter.paragraphs,
          }
        : undefined,
    }
  })
}

export function buildResumeSection(): ChatbotSection {
  const sortedSkills = [...SKILLS].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const variants = summarizeVariants()
  const variantKeywords = variants.flatMap((variant) =>
    [
      variant.slug,
      variant.label,
      variant.metadata?.title,
      variant.metadata?.description,
      variant.coverLetter?.targetCompany,
      variant.coverLetter?.targetRole,
    ].filter((value): value is string => Boolean(value)),
  )

  return {
    id: "resume",
    kind: "resume",
    title: "Ben Orozco Professional Background",
    keywords: [
      "resume",
      "career",
      "experience",
      "companies",
      "education",
      "skills",
      "cover letter",
      "resume variants",
      ...variantKeywords,
    ],
    aliases: [
      "professional background",
      "work history",
      "career trajectory",
      "resume version",
      "tailored resume",
      "cover letter",
    ],
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
      baseCoverLetter: {
        title: BASE_COVER_LETTER.title,
        targetRole: BASE_COVER_LETTER.targetRole,
        recipient: BASE_COVER_LETTER.recipient,
        summary: BASE_COVER_LETTER.summary,
        keyThemes: BASE_COVER_LETTER.paragraphs,
      },
      variants,
    },
  }
}
