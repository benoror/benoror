import SubSkillTag from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillTag';
import { ISkill } from '@/lib/types/ISkill';

export default function SubSkillContent({ skill, yearsOfExperience }: { skill: ISkill, yearsOfExperience: string}) {
  return (
    <>
      <h1 className="font-semibold">{skill.name}{yearsOfExperience && ` - ${yearsOfExperience}`}</h1>
      {skill.description}
      <div className="flex flex-row flex-wrap">
        {
          skill.subSkills && skill.subSkills.map(
            (subSkill, index) => (<SubSkillTag key={index} skill={subSkill} />)
          )
        }
      </div>
    </>
  )
}
