import ResumePageContent from '@/components/ResumePageContent';
import { BASE_RESUME_DOCUMENT } from '@workspace/data/resume';
import { getAbsoluteResumeUrl } from '@/lib/resumeUrls';

export default function Page() {
  return <ResumePageContent document={BASE_RESUME_DOCUMENT} resumeUrl={getAbsoluteResumeUrl()} />;
}
