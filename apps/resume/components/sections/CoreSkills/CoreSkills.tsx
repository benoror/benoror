import CoreSkill from '@/components/sections/CoreSkills/CoreSkill';
import type { ISkill } from '@workspace/data/types/resume';

export default function CoreSkills({ skills }: { skills: ISkill[] }) {
  const sortedSkills = [...skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section
      className="CoreSkills w-full grid gap-3"
      style={{ gridTemplateColumns: `repeat(${sortedSkills.length}, minmax(0, 1fr))` }}
    >
      {sortedSkills.map((skill, index) => (
        <CoreSkill key={index} skill={skill} />
      ))}
    </section>
  )
}
