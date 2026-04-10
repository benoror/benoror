import Skill from '@/components/sections/Skills/Skill/Skill';
import Section from '@/components/Section';
import { HammerIcon } from "lucide-react";
import type { ISkill } from '@workspace/data/types/resume';
import { sinceToString, sinceToYears } from '@workspace/utils/date';

export default function Skills({ skills }: { skills: ISkill[] }) {
  return (
    <Section title="Skills" icon={<HammerIcon />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full print:block print:columns-2 print:gap-x-6">
        {[...skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((skill, index) => (
          <Skill
            key={index}
            skill={skill}
            yearsOfExperience={sinceToString(skill.since)}
            subSkillExperience={(skill.subSkills ?? []).map((subSkill) => ({
              years: sinceToYears(subSkill.since),
              yearsOfExperience: sinceToString(subSkill.since),
            }))}
          />
        ))}
      </div>
    </Section>
  )
}
