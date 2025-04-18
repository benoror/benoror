import CoreSkill from '@/components/sections/CoreSkills/CoreSkill';
import { SKILLS } from '@workspace/data/resume';

export default function CoreSkills() {
  return (
    <section className="CoreSkills w-full flex flex-row gap-8 justify-between print:hidden">
      {SKILLS.map((skill, index) => (<CoreSkill key={index} skill={skill} />))}
    </section>
  )
}
