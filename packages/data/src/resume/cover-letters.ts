import { RESUME_VARIANTS, getCoverLetter } from './variants/index.js';
import type { ICoverLetterDocument } from './schema.js';

export const BASE_COVER_LETTER: ICoverLetterDocument = {
  title: 'Ben Orozco - Cover Letter',
  targetRole: 'VP of Engineering / Director of Engineering / CTO',
  recipient: 'Hiring team',
  greeting: 'Dear hiring team,',
  paragraphs: [
    'I build engineering organizations without losing touch with how software is designed, shipped, and operated. Across VP of Engineering and CTO roles, I have led products from early stage through high-growth scale while remaining close to architecture, delivery, product decisions, and critical technical work.',
    'At Apptegy, I helped hire, organize, and lead a distributed organization of 140+ engineers through organizational change, manager development, performance management, and new planning and delivery systems. I also drove architecture simplification and led practical AI adoption that increased productivity by 10% and reduced code-review time by 60%. At Trivelta, I now lead three Backoffice teams and a 10-person group while retaining fractional technical ownership of ClickHouse, MCP, and EKS initiatives.',
    'My value is the combination of organizational leadership and technical judgment: building teams, coaching managers and engineers, aligning roadmaps with business priorities, setting architecture direction, and stepping into systems or code when direct involvement improves the outcome. I am most effective in roles that span strategy and execution rather than separating them.',
    'I would welcome a conversation about how that combination could help your organization scale its products, engineering systems, and people.',
  ],
  closing: 'Best regards,',
  signature: 'Ben Orozco',
  summary: 'General cover letter positioning Ben Orozco as a hands-on VP of Engineering / CTO with organization-building scope, technical depth, product judgment, and practical AI leadership.',
};

export const COVER_LETTERS: Record<string, ICoverLetterDocument> = Object.fromEntries(
  Object.keys(RESUME_VARIANTS)
    .map((slug) => {
      const coverLetter = getCoverLetter(slug);
      return coverLetter ? [slug, coverLetter] : null;
    })
    .filter((entry): entry is [string, ICoverLetterDocument] => Boolean(entry))
);
