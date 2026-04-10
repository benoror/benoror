import { BASE_RESUME_DOCUMENT } from '@workspace/data/resume'
import { buildResumeMarkdown, createResumeMarkdownResponse } from '@/lib/resumeMarkdown'
import { getResumeMarkdownFilename } from '@/lib/resumeMetadata'
import { getAbsoluteResumeUrl } from '@/lib/resumeUrls'

export function GET() {
  const markdown = buildResumeMarkdown(BASE_RESUME_DOCUMENT, getAbsoluteResumeUrl())

  return createResumeMarkdownResponse(markdown, getResumeMarkdownFilename())
}
