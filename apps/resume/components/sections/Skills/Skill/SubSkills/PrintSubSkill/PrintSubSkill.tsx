import { ISkill } from '@workspace/data/types/resume';

export default function PrintSubSkill({ skill }: { skill: ISkill}) {
  return (
    <span className="text-sm">
        <span className="font-semibold">{skill.name}</span>{ skill.subSkills && skill.subSkills.length > 0 && (<>:</>) || (<>.&nbsp;</>)} <span>{skill.subSkills && skill.subSkills.map((subSkill, index) => subSkill.name).join(', ') }</span>{ skill.subSkills && skill.subSkills.length > 0 && (<>.&nbsp;</>)}
    </span>
  )
}
