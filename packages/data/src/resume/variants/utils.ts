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

function getRoleKey(role: IRole): string {
  return [role.title, role.project ?? '', role.startDate ?? '', role.endDate ?? ''].join('::');
}

export function mergeVariantRoles(baseRoles: IRole[], overrideRoles?: IRole[]): IRole[] {
  if (!overrideRoles) {
    return baseRoles;
  }

  const overrideKeys = new Set(overrideRoles.map(getRoleKey));
  const remainingBaseRoles = baseRoles.filter((role) => !overrideKeys.has(getRoleKey(role)));

  return [...overrideRoles, ...remainingBaseRoles];
}

export function mergeVariantCompanies(baseCompanies: ICompany[], overrideCompanies?: ICompany[]): ICompany[] {
  if (!overrideCompanies) {
    return baseCompanies;
  }

  const baseCompaniesByName = new Map(baseCompanies.map((company) => [company.name, company]));
  const overrideNames = new Set(overrideCompanies.map((company) => company.name));

  const mergedOverrideCompanies = overrideCompanies.map((company) => {
    const baseCompany = baseCompaniesByName.get(company.name);

    if (!baseCompany) {
      return company;
    }

    return {
      ...baseCompany,
      ...company,
      roles: mergeVariantRoles(baseCompany.roles, company.roles),
    };
  });

  const remainingBaseCompanies = baseCompanies.filter((company) => !overrideNames.has(company.name));

  return [...mergedOverrideCompanies, ...remainingBaseCompanies];
}
