import { RESUME_VARIANTS, getCoverLetter } from './resume_variants.js';
import type { ICoverLetterDocument } from './types/resume.js';

export const BASE_COVER_LETTER: ICoverLetterDocument = {
  title: 'Ben Orozco - Cover Letter',
  targetRole: 'VP Engineering / Director of Engineering / AI Engineering Leadership',
  recipient: 'Hiring team',
  greeting: 'Dear hiring team,',
  paragraphs: [
    'I am a hands-on engineering leader with a strong software engineering foundation and a track record spanning product, architecture, delivery, and team building across SaaS environments in the U.S. and Latin America. My experience has included building and scaling products from early-stage efforts through high-growth execution, while staying close to the code, system design, and cross-functional decision-making needed to move quickly and sustainably.',
    'Across VP Engineering and CTO roles, I have led distributed teams, partnered closely with product and executive stakeholders, and taken ownership of both technical direction and business outcomes. That has ranged from scaling engineering organizations and improving delivery systems, to modernizing architecture, supporting product strategy, and introducing practical AI-enabled workflows that help teams ship with greater clarity and speed.',
    'What I believe I bring especially well is a combination of executive leadership and technical generalist depth. I am comfortable operating across engineering management, architecture, backend and frontend systems, infrastructure, product thinking, and emerging AI workflows, which has been especially valuable in ambiguous environments where companies need both strategic perspective and pragmatic execution.',
    'I would welcome the opportunity to bring that blend of leadership, product sensibility, and technical execution to a team building meaningful software at scale. Thank you for your time and consideration.',
  ],
  closing: 'Best regards,',
  signature: 'Ben Orozco',
  summary: 'Base cover letter for Ben Orozco highlighting engineering leadership, technical generalist depth, product strategy, and AI-enabled execution.',
};

export const COVER_LETTERS: Record<string, ICoverLetterDocument> = Object.fromEntries(
  Object.keys(RESUME_VARIANTS)
    .map((slug) => {
      const coverLetter = getCoverLetter(slug);
      return coverLetter ? [slug, coverLetter] : null;
    })
    .filter((entry): entry is [string, ICoverLetterDocument] => Boolean(entry))
);