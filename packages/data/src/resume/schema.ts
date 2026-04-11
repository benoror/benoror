export interface ICompany {
  short?: boolean;
  name: string;
  url: string;
  location: string;
  remote?: boolean;
  startDate: string;
  endDate: string;
  roles: IRole[];
  description: string;
}

export interface IRole {
  title: string;
  project?: string;
  projectUrl?: string;
  location?: string;
  remote?: boolean;
  startDate?: string;
  endDate?: string;
  description: string;
  skills: ISkill[];
  achievements: IAchievement[];
}

export interface IAchievement {
  description: string;
  subAchievements?: IAchievement[];
}

export interface ISkill {
  name: string;
  slug?: string;
  url?: string;
  order?: number;
  level?: number;
  since?: number;
  description?: string;
  subSkills?: ISkill[];
}

export interface IResumeAbout {
  name: string;
  header: string;
  location: string;
  public_email: string;
  about_me: string;
}

export interface IEducationEntry {
  institution: string;
  institutionUrl: string;
  location: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ILanguageEntry {
  name: string;
  level: number;
  proficiency: string;
}

export interface IResumeDocument {
  about: IResumeAbout;
  companies: ICompany[];
  skills: ISkill[];
  education: IEducationEntry[];
  languages: ILanguageEntry[];
}

export interface ICoverLetterDocument {
  title?: string;
  targetCompany?: string;
  targetRole?: string;
  recipient?: string;
  date?: string;
  greeting: string;
  paragraphs: string[];
  closing?: string;
  signature?: string;
  summary?: string;
}

export interface IResumeVariantMetadata {
  title?: string;
  description?: string;
}

export interface IResumeDocumentOverride {
  about?: Partial<IResumeAbout>;
  companies?: ICompany[];
  skills?: ISkill[];
  education?: IEducationEntry[];
  languages?: ILanguageEntry[];
}

export interface IResumeVariantDefinition {
  slug: string;
  label?: string;
  metadata?: IResumeVariantMetadata;
  resume?: IResumeDocumentOverride;
  coverLetter?: ICoverLetterDocument;
}
