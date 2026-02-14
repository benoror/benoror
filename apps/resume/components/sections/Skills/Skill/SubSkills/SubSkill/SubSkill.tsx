import SubSkillContent from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillContent';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { sinceToString } from '@workspace/utils/date';
import { sinceToYears } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import SkillBadge from '@/components/SkillBadge';

export default function SubSkill({ skill }: { skill: ISkill}) {
  const years = sinceToYears(skill.since)
  const yearsOfExperience = sinceToString(skill.since)

  return (
    <div id={skill.slug} className="SubSkill flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <SkillBadge className="cursor-pointer">
            <span>{skill.name}</span>
            { years !== 0 && <span title={yearsOfExperience}>({years}y)</span>}
          </SkillBadge>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{skill.name}{yearsOfExperience && ` - ${yearsOfExperience}`}</DialogTitle>
          <SubSkillContent skill={skill} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
