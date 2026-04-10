import Section from '@/components/Section';
import type { IResumeAbout } from '@workspace/data/types/resume';

export default function About({ about }: { about: IResumeAbout }) {
  return (
    <Section className="text-justify">
      <p>{about.about_me}</p>
    </Section>
  );
}
