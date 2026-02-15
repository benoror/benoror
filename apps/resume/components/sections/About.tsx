import { ABOUT } from '@workspace/data/resume';
import Section from '@/components/Section';

export default function About() {
  return (
    <Section className="text-justify print:my-4">
      <p>{ABOUT.about_me}</p>
    </Section>
  );
}
