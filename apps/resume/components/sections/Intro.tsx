import { LINKS } from '@workspace/data/personal';
import { ABOUT } from '@workspace/data/resume';
import { shortURL } from '@workspace/utils/url';

export default function Intro() {
  return (
    <section className="Intro flex flex-col items-center w-full">
      <h1 className="text-3xl font-medium text-sky-800 dark:text-sky-200">{ABOUT.name}</h1>
      <div className="text-lg">
        {ABOUT.header}
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
