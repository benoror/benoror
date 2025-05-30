import PrintSubSkill from '@/components/sections/Skills/Skill/SubSkills/PrintSubSkill/PrintSubSkill';
import SubSkill from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubSkill';
import { ISkill } from '@workspace/data/types/resume';

export default function SubSkills({ skills }: { skills: ISkill[] }) {
  return (
    <>
      <div className="print:hidden flex w-full flex-row flex-wrap gap-3">
        {skills.map((skill, index) => <SubSkill key={index} skill={skill} /> )}
      </div>
      <div className="hidden print:block w-full text-justify">
        {skills.map((skill, index) => <PrintSubSkill key={index} skill={skill} /> )}
      </div>
    </>
  )
}
