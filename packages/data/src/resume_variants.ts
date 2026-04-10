import { BASE_RESUME_DOCUMENT } from './resume.js';
import type { ICoverLetterDocument, IResumeDocument, IResumeDocumentOverride, IResumeVariantDefinition } from './types/resume.js';

export const RESUME_VARIANTS: Record<string, IResumeVariantDefinition> = {
  // Example:
  // 'acme-cto': {
  //   slug: 'acme-cto',
  //   label: 'Acme CTO',
  //   metadata: {
  //     title: 'Ben Orozco - Resume for Acme CTO',
  //     description: 'Tailored resume and cover letter for the Acme CTO role.',
  //   },
  //   resume: {
  //     about: {
  //       header: 'Hands-on Engineering Leader · CTO Candidate',
  //     },
  //     companies: [
  //       ...BASE_RESUME_DOCUMENT.companies.slice(0, 3),
  //     ],
  //   },
  //   coverLetter: {
  //     targetCompany: 'Acme',
  //     targetRole: 'CTO',
  //     greeting: 'Dear Acme team,',
  //     paragraphs: [
  //       'Short tailored intro...',
  //       'Why this role is a fit...',
  //     ],
  //     closing: 'Best regards,',
  //     signature: 'Ben Orozco',
  //   },
  // },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeObjects(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) {
      continue;
    }

    const baseValue = merged[key];

    if (Array.isArray(value)) {
      merged[key] = value;
      continue;
    }

    if (isPlainObject(value) && isPlainObject(baseValue)) {
      merged[key] = mergeObjects(baseValue, value);
      continue;
    }

    merged[key] = value;
  }
  return merged;
}

export function mergeResumeDocument(base: IResumeDocument, override?: IResumeDocumentOverride): IResumeDocument {
  if (!override) {
    return base;
  }

  return mergeObjects(
    base as unknown as Record<string, unknown>,
    override as unknown as Record<string, unknown>
  ) as unknown as IResumeDocument;
}

export function getResumeVariant(slug: string): IResumeVariantDefinition | undefined {
  return RESUME_VARIANTS[slug];
}

export function isKnownResumeSlug(slug: string): boolean {
  return slug in RESUME_VARIANTS;
}

export function getResumeDocument(slug?: string): IResumeDocument | undefined {
  if (!slug) {
    return BASE_RESUME_DOCUMENT;
  }

  const variant = getResumeVariant(slug);
  if (!variant) {
    return undefined;
  }

  return mergeResumeDocument(BASE_RESUME_DOCUMENT, variant.resume);
}

export function getResumeSlugs(): string[] {
  return Object.keys(RESUME_VARIANTS);
}

export function getCoverLetter(slug: string): ICoverLetterDocument | undefined {
  return getResumeVariant(slug)?.coverLetter;
}

export function getCoverLetterSlugs(): string[] {
  return getResumeSlugs().filter((slug) => Boolean(getCoverLetter(slug)));
}
