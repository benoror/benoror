import CoreSkill from '@/components/sections/CoreSkills/CoreSkill';
import type { ISkill } from '@workspace/data/types/resume';

export default function CoreSkills({ skills }: { skills: ISkill[] }) {
  return (
    <section className="CoreSkills w-full grid grid-cols-3 md:grid-cols-6 gap-3">
      {[...skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((skill, index) => (
        <CoreSkill key={index} skill={skill} />
      ))}
    </section>
  )
}
