import { createResumeMarkdownResponse, buildResumeMarkdown } from '@/lib/resumeMarkdown';
import { getResumeMarkdownFilename } from '@/lib/resumeMetadata';
import { getAbsoluteResumeUrl } from '@/lib/resumeUrls';
import { getResumeDocument } from '@workspace/data/resume_variants';

type ResumeMarkdownRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: ResumeMarkdownRouteProps) {
  const { slug } = await params;
  const document = getResumeDocument(slug);

  if (!document) {
    return new Response('Not found', { status: 404 });
  }

  const markdown = buildResumeMarkdown(document, getAbsoluteResumeUrl(slug));
  return createResumeMarkdownResponse(markdown, getResumeMarkdownFilename(slug));
}
