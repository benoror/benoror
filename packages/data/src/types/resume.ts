export interface IRole {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[][];
}

export interface ISkill {
  name: string;
  level?: number;
  since?: number;
  description?: string;
  subSkills?: ISkill[];
}
