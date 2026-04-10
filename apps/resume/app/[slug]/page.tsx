import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResumePageContent from '@/components/ResumePageContent';
import { buildResumeMetadata } from '@/lib/resumeMetadata';
import { getAbsoluteResumeUrl } from '@/lib/resumeUrls';
import { getResumeDocument, getResumeSlugs, isKnownResumeSlug } from '@workspace/data/resume_variants';

type ResumePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isKnownResumeSlug(slug)) {
    return {};
  }

  return buildResumeMetadata(slug);
}

export function generateStaticParams() {
  return getResumeSlugs().map((slug) => ({ slug }));
}

export default async function ResumeVariantPage({ params }: ResumePageProps) {
  const { slug } = await params;
  const document = getResumeDocument(slug);

  if (!document) {
    notFound();
  }

  return <ResumePageContent document={document} resumeUrl={getAbsoluteResumeUrl(slug)} />;
}
