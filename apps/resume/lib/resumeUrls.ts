import { LINKS } from '@workspace/data/personal';

const PUBLIC_RESUME_ROOT_URL = LINKS.resume.url.replace(/\/$/, '');

export function getResumePath(slug?: string): string {
  return slug ? `/${slug}` : '/';
}

export function getResumeMarkdownPath(slug?: string): string {
  return slug ? `/${slug}/resume.md` : '/resume.md';
}

export function getCoverLetterPath(slug: string): string {
  return `/${slug}/cover-letter`;
}

export function getAbsoluteResumeUrl(slug?: string): string {
  return slug ? `${PUBLIC_RESUME_ROOT_URL}/${slug}` : PUBLIC_RESUME_ROOT_URL;
}

export function getAbsoluteResumeMarkdownUrl(slug?: string): string {
  return `${PUBLIC_RESUME_ROOT_URL}${getResumeMarkdownPath(slug)}`;
}

export function getAbsoluteCoverLetterUrl(slug: string): string {
  return `${PUBLIC_RESUME_ROOT_URL}${getCoverLetterPath(slug)}`;
}
