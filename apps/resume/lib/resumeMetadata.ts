import type { Metadata } from 'next';
import { BASE_COVER_LETTER } from '@workspace/data/cover_letters';
import { ABOUT } from '@workspace/data/resume';
import { getCoverLetter, getResumeVariant } from '@workspace/data/resume_variants';
import { getAbsoluteCoverLetterUrl, getAbsoluteResumeMarkdownUrl, getAbsoluteResumeUrl, getCoverLetterPath, getResumeMarkdownPath, getResumePath } from '@/lib/resumeUrls';

const BASE_RESUME_TITLE = `${ABOUT.name} - Resume`;
const BASE_RESUME_DESCRIPTION = `Resume of ${ABOUT.name}`;

export function buildResumeMetadata(slug?: string): Metadata {
  const variant = slug ? getResumeVariant(slug) : undefined;
  const title = variant?.metadata?.title ?? BASE_RESUME_TITLE;
  const description = variant?.metadata?.description ?? BASE_RESUME_DESCRIPTION;
  const canonical = getResumePath(slug);
  const publicUrl = getAbsoluteResumeUrl(slug);

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        'text/markdown': getResumeMarkdownPath(slug),
      },
    },
    openGraph: {
      type: 'profile',
      url: publicUrl,
      title,
      description,
      siteName: 'Ben Orozco Resume',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export function buildCoverLetterMetadata(slug?: string): Metadata {
  const variant = slug ? getResumeVariant(slug) : undefined;
  const coverLetter = slug ? getCoverLetter(slug) : BASE_COVER_LETTER;
  const title = coverLetter?.title ?? `${ABOUT.name} - Cover Letter`;
  const description = coverLetter?.summary ?? variant?.metadata?.description ?? `Cover letter for ${ABOUT.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: getCoverLetterPath(slug),
    },
    openGraph: {
      type: 'article',
      url: getAbsoluteCoverLetterUrl(slug),
      title,
      description,
      siteName: 'Ben Orozco Resume',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export function getResumeMarkdownFilename(slug?: string): string {
  return slug ? `${ABOUT.name} - Resume - ${slug}.md` : `${ABOUT.name} - Resume.md`;
}

export function getResumeMarkdownUrl(slug?: string): string {
  return getAbsoluteResumeMarkdownUrl(slug);
}
