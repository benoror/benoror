import SubSkillTag from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillTag';
import { ISkill } from '@workspace/data/types/resume';

export default function SubSkillContent({ skill }: { skill: ISkill }) {
  return (
    <>
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
