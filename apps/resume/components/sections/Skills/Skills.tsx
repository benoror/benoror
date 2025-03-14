import Skill from '@/components/sections/Skills/Skill/Skill';
import { SKILLS } from '@/lib/data/ALL_SKILLS';

export default function Skills() {
  return (
    <section className="flex flex-col items-center gap-2 print:gap-2">
      <h2 className="text-2xl font-bold print:text-xl">Skills</h2>
      <div className="flex flex-col items-center gap-4">
        {SKILLS.map((skill, index) => (<Skill key={index} skill={skill} />))}
      </div>
    </section>
  )
}
