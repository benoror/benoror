import SubSkills from '@/components/sections/Skills/Skill/SubSkills/SubSkills';
import { sinceToString } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';

export default function Skill({ skill }: { skill: ISkill}) {
  return (
    <div id={skill.slug} className="Skill w-full flex flex-col gap-3 mb-3 print:gap-1 print:mb-0">
      <h3 className="font-bold">{skill.name} - {sinceToString(skill.since)}</h3>
      <div className="text-sm print:hidden">{skill.description}</div>
      {skill.subSkills && <SubSkills skills={skill.subSkills} />}
    </div>
  )
}
