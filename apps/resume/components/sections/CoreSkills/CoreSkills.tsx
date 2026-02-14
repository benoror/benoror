import CoreSkill from '@/components/sections/CoreSkills/CoreSkill';
import { SKILLS } from '@workspace/data/resume';

export default function CoreSkills() {
  return (
    <section className="CoreSkills w-full flex flex-row gap-8 justify-between print:hidden">
      {SKILLS.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((skill, index) => (
        <CoreSkill key={index} skill={skill} />
      ))}
    </section>
  )
}
