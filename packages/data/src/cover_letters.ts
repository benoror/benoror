import { RESUME_VARIANTS, getCoverLetter } from './resume_variants.js';
import type { ICoverLetterDocument } from './types/resume.js';

export const COVER_LETTERS: Record<string, ICoverLetterDocument> = Object.fromEntries(
  Object.keys(RESUME_VARIANTS)
    .map((slug) => {
      const coverLetter = getCoverLetter(slug);
      return coverLetter ? [slug, coverLetter] : null;
    })
    .filter((entry): entry is [string, ICoverLetterDocument] => Boolean(entry))
);