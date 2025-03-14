import { ISkill } from '@/lib/types/ISkill';

export default function PrintSubSkill({ skill }: { skill: ISkill}) {

  return (
    <div className="text-sm">
        <span>{skill.name}</span> { skill.subSkills && skill.subSkills.length > 0 && (<>-</>)} <span>{skill.subSkills && skill.subSkills.map((subSkill, index) => subSkill.name).join(', ') }</span>
    </div>
  )
}
