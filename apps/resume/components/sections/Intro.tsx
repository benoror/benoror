import { LINKS } from '@workspace/data/personal';
import { ABOUT } from '@workspace/data/resume';
import { shortURL } from '@workspace/utils/url';
import { MapPin } from 'lucide-react';

export default function Intro() {
  return (
    <section className="Intro flex flex-col items-center gap-1 w-full">
      <h1 className="text-2xl font-medium text-brand">{ABOUT.name}</h1>
      <div className="text-base">
        {ABOUT.header}
      </div>
      <div className="text-muted-foreground flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        {ABOUT.location}
      </div>
      <div className="items-center gap-2 hidden text-muted-foreground print:flex">
        <a href={LINKS.resume_url} target='_blank'>
          {/* ToDo: Move to footer */}
          {shortURL(LINKS.resume_url)}
        </a>
      </div>
    </section>
  );
}
