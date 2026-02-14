import Skill from '@/components/sections/Skills/Skill/Skill';
import { HammerIcon } from "lucide-react";
import { SKILLS } from '@workspace/data/resume';

export default function Skills() {
  return (
    <section className="flex flex-col items-center gap-2 print:gap-2 w-full">
      <h2 className="text-2xl print:text-xl mb-2 font-medium text-sky-800 dark:text-sky-200">
        <HammerIcon className="size-6 inline" /> Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {SKILLS.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </div>
    </section>
  )
}
