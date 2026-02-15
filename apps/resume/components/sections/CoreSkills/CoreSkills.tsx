import CoreSkill from '@/components/sections/CoreSkills/CoreSkill';
import { SKILLS } from '@workspace/data/resume';

export default function CoreSkills() {
  return (
    <section className="CoreSkills w-full grid grid-cols-3 md:grid-cols-6 gap-3">
      {SKILLS.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((skill, index) => (
        <CoreSkill key={index} skill={skill} />
      ))}
    </section>
  )
}
