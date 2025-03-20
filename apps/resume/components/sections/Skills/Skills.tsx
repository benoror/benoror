import Skill from '@/components/sections/Skills/Skill/Skill';
import { HammerIcon } from "lucide-react";
import { SKILLS } from '@workspace/data/resume';

export default function Skills() {
  return (
    <section className="flex flex-col items-center gap-2 print:gap-2">
      <h2 className="text-2xl font-bold print:text-xl">
        <HammerIcon className="size-6 inline" /> Skills
      </h2>
      <div className="flex flex-col items-center gap-4">
        {SKILLS.map((skill, index) => (<Skill key={index} skill={skill} />))}
      </div>
    </section>
  )
}
