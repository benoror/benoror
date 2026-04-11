import type { IResumeAbout } from '@workspace/data/resume/schema';
import { shortURL } from '@workspace/utils/url';
import { MapPin } from 'lucide-react';

export default function Intro({
  about,
  resumeUrl,
}: {
  about: IResumeAbout;
  resumeUrl: string;
}) {
  return (
    <section className="Intro flex flex-col items-center gap-1 w-full">
      <h1 className="text-2xl font-medium text-brand-emphasis">{about.name}</h1>
      <div className="text-base">
        {about.header}
      </div>
      <div className="text-muted-foreground flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        {about.location}
      </div>
      <div className="items-center gap-2 hidden text-muted-foreground print:flex">
        <a href={resumeUrl} target='_blank' className="print:text-brand">
          {/* ToDo: Move to footer */}
          {shortURL(resumeUrl)}
        </a>
      </div>
    </section>
  );
}
