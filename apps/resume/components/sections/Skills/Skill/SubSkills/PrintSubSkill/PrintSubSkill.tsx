import { ISkill } from '@workspace/data/types/resume';

export default function PrintSubSkill({ skill }: { skill: ISkill }) {
  const nestedSkills = skill.subSkills?.map((subSkill) => subSkill.name).join(', ')

  return (
    <span className="text-muted-foreground">
      <span className="font-semibold">{skill.name}</span>
      {nestedSkills ? `: ${nestedSkills}; ` : '; '}
    </span>
  )
}
