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
  location: string;
  remote?: boolean;
  startDate: string;
  endDate: string;
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
  level?: number;
  since?: number;
  description?: string;
  subSkills?: ISkill[];
}