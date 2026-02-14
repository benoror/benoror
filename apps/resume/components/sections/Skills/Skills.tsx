import Skill from '@/components/sections/Skills/Skill/Skill';
import Section from '@/components/Section';
import { HammerIcon } from "lucide-react";
import { SKILLS } from '@workspace/data/resume';

export default function Skills() {
  return (
    <Section title="Skills" icon={<HammerIcon className="size-6 inline" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {SKILLS.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </div>
    </Section>
  )
}
