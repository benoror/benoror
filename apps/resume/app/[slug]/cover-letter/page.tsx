import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CoverLetterPageContent from '@/components/CoverLetterPageContent';
import { buildCoverLetterMetadata } from '@/lib/resumeMetadata';
import { getCoverLetter, getCoverLetterSlugs } from '@workspace/data/resume/variants';

type CoverLetterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CoverLetterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const coverLetter = getCoverLetter(slug);

  if (!coverLetter) {
    return {};
  }

  return buildCoverLetterMetadata(slug);
}

export function generateStaticParams() {
  return getCoverLetterSlugs().map((slug) => ({ slug }));
}

export default async function CoverLetterPage({ params }: CoverLetterPageProps) {
  const { slug } = await params;
  const coverLetter = getCoverLetter(slug);

  if (!coverLetter) {
    notFound();
  }

  return <CoverLetterPageContent coverLetter={coverLetter} />;
}
