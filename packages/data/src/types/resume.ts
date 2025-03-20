export interface IRole {
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: IAchievement[];
}

export interface IAchievement {
  achievement: string;
  subAchievements?: IAchievement[];
}

export interface ISkill {
  name: string;
  level?: number;
  since?: number;
  description?: string;
  subSkills?: ISkill[];
}