import { BASE_RESUME_DOCUMENT } from '../index.js';
import type {
  ICoverLetterDocument,
  IResumeDocument,
  IResumeDocumentOverride,
  IResumeVariantDefinition,
} from '../schema.js';
import { fleetioLeverageVariant } from './fleetio-leverage.js';
import { recruitedgeGlobalVariant } from './recruitedge-global.js';

export const RESUME_VARIANT_LIST: IResumeVariantDefinition[] = [
  fleetioLeverageVariant,
  recruitedgeGlobalVariant,
];

export const RESUME_VARIANTS: Record<string, IResumeVariantDefinition> = Object.fromEntries(
  RESUME_VARIANT_LIST.map((variant) => [variant.slug, variant])
) as Record<string, IResumeVariantDefinition>;

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
