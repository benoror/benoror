export interface IRole {
  title: string;
  company: string;
  project?: string;
  websiteUrl: string;
  location: string;
  remote?: boolean;
  startDate: string;
  endDate: string;
  description: string;
  roles?: IRole[];
  achievements: IAchievement[];
  skills?: ISkill[];
}

export interface IAchievement {
  achievement: string;
  subAchievements?: IAchievement[];
}

export interface ISkill {
  name: string;
  slug?: string;
  level?: number;
  since?: number;
  description?: string;
  subSkills?: ISkill[];
}