import CoverLetterPageContent from '@/components/CoverLetterPageContent';
import { buildCoverLetterMetadata } from '@/lib/resumeMetadata';
import { BASE_COVER_LETTER } from '@workspace/data/cover_letters';

export const metadata = buildCoverLetterMetadata();

export default function CoverLetterPage() {
  return <CoverLetterPageContent coverLetter={BASE_COVER_LETTER} />;
}
