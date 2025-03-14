import CoreSkill from '@/components/sections/CoreSkills/CoreSkill';
import { SKILLS } from '@/lib/data/ALL_SKILLS';

export default function CoreSkills() {
  return (
    <section className="CoreSkills w-full flex flex-wrap justify-between print:hidden">
      {SKILLS.map((skill, index) => (<CoreSkill key={index} skill={skill} />))}
    </section>
  )
}
