import CompactCard from '@/components/CompactCard';
import Markdown from 'react-markdown';
import type { ICoverLetterDocument } from '@workspace/data/types/resume';

export default function CoverLetterPageContent({
  coverLetter,
}: {
  coverLetter: ICoverLetterDocument;
}) {
  return (
    <main className="container mx-auto px-6 py-12 md:px-8 max-w-3xl">
      <CompactCard className="shadow-md">
        <article className="px-6 py-8 md:px-10 md:py-10 text-sm leading-7">
          <header className="mb-8">
            {coverLetter.title ? (
              <h1 className="text-2xl font-semibold text-brand-emphasis">{coverLetter.title}</h1>
            ) : null}
            <div className="mt-3 space-y-1 text-muted-foreground">
              {coverLetter.targetRole ? <p>{coverLetter.targetRole}</p> : null}
              {coverLetter.targetCompany ? <p>{coverLetter.targetCompany}</p> : null}
              {coverLetter.recipient ? <p>{coverLetter.recipient}</p> : null}
              {coverLetter.date ? <p>{coverLetter.date}</p> : null}
            </div>
          </header>

          <section className="space-y-5">
            <p>{coverLetter.greeting}</p>
            {coverLetter.paragraphs.map((paragraph, index) => (
              <Markdown key={index}>{paragraph}</Markdown>
            ))}
            {coverLetter.closing ? <p>{coverLetter.closing}</p> : null}
            {coverLetter.signature ? <p>{coverLetter.signature}</p> : null}
          </section>
        </article>
      </CompactCard>
    </main>
  );
}
