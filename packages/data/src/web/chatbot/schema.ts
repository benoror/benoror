import type { FeedSource } from "../../shared/profile/schema.js";
import type { PortfolioItem } from "../portfolio/index.js";
import type { ICompany, IRole, ISkill } from "../../resume/schema.js";

export type ChatbotSectionId =
  | "general_summary"
  | "faq"
  | "resume"
  | "projects"
  | "social_media"
  | "blog_feed";

export type ChatbotSectionKind =
  | "summary"
  | "faq"
  | "resume"
  | "portfolio"
  | "personal"
  | "feed";

export interface ChatbotSectionMeta {
  id: ChatbotSectionId;
  title: string;
  aliases?: string[];
  keywords?: string[];
  priority: number;
}

export interface MarkdownSectionData {
  markdown: string;
}

export type ResumeChatbotRole = Pick<
  IRole,
  "title" | "project" | "location" | "startDate" | "endDate" | "description"
> & {
  highlights: string[];
  skills: string[];
};

export type ResumeChatbotCompany = Pick<
  ICompany,
  "name" | "url" | "location" | "startDate" | "endDate" | "description"
> & {
  roles: ResumeChatbotRole[];
};

export type ResumeChatbotSkill = Pick<ISkill, "name" | "level" | "description"> & {
  coreAreas: string[];
};

export interface ResumeChatbotVariant {
  slug: string;
  label?: string;
  metadata?: {
    title?: string;
    description?: string;
  };
  tailoredAbout?: {
    header: string;
    summary: string;
  };
  highlightedCompanies: string[];
  highlightedSkills: string[];
  coverLetter?: {
    title?: string;
    targetCompany?: string;
    targetRole?: string;
    recipient?: string;
    summary?: string;
    keyThemes: string[];
  };
}

export interface ResumeSectionData {
  about: {
    name: string;
    header: string;
    location: string;
    summary: string;
  };
  experience: ResumeChatbotCompany[];
  skills: ResumeChatbotSkill[];
  education: Array<{
    title: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  baseCoverLetter: {
    title?: string;
    targetRole?: string;
    recipient?: string;
    summary?: string;
    keyThemes: string[];
  };
  variants: ResumeChatbotVariant[];
}

export type PortfolioSectionItem = Pick<
  PortfolioItem,
  "id" | "title" | "category" | "role" | "description" | "circa" | "url" | "techStack" | "links"
>;

export interface PortfolioSectionData {
  overview: string;
  projects: PortfolioSectionItem[];
  talks: PortfolioSectionItem[];
  publications: PortfolioSectionItem[];
}

export interface PersonalSectionData {
  identity: {
    fullName: string;
    shortName: string;
  };
  home: {
    header: string;
    publicEmail: string;
    summary: string;
  };
  interests: string[];
  signatureStrengths: string[];
  links: Array<{
    id: string;
    label: string;
    url: string;
  }>;
  publicWritingSources: Array<
    Pick<FeedSource, "id" | "name" | "status" | "note"> & {
      siteUrl: string;
    }
  >;
}

export interface FeedSectionData {
  sources: string[];
  items: Array<{
    id: string;
    title: string;
    publishedAt: string;
    sourceName: string;
    summary: string;
  }>;
}

export type ChatbotSectionData =
  | MarkdownSectionData
  | ResumeSectionData
  | PortfolioSectionData
  | PersonalSectionData
  | FeedSectionData;

export interface ChatbotSection<TData = ChatbotSectionData> extends ChatbotSectionMeta {
  kind: ChatbotSectionKind;
  data: TData;
}

export interface StaticChatbotKnowledgeBase {
  version: 1;
  sections: ChatbotSection[];
}
