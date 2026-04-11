import { BASE_RESUME_DOCUMENT } from '../index.js';
import type { ICompany, IRole, ISkill } from '../schema.js';

export function getBaseVariantCompany(name: string): ICompany {
  const company = BASE_RESUME_DOCUMENT.companies.find((entry) => entry.name === name);

  if (!company) {
    throw new Error(`Unknown company for resume variant: ${name}`);
  }

  return company;
}

export function getBaseVariantSkill(slug: string): ISkill {
  const skill = BASE_RESUME_DOCUMENT.skills.find((entry) => entry.slug === slug);

  if (!skill) {
    throw new Error(`Unknown skill for resume variant: ${slug}`);
  }

  return skill;
}

export function getBaseVariantRole(company: ICompany, index: number): IRole {
  const role = company.roles[index];

  if (!role) {
    throw new Error(`Unknown role index ${index} for company ${company.name}`);
  }

  return role;
}
