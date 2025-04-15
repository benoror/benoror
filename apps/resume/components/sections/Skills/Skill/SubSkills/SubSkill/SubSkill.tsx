import SubSkillContent from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillContent';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { sinceToString } from '@workspace/utils/date';
import { sinceToYears } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';

export default function SubSkill({ skill }: { skill: ISkill}) {
  const years = sinceToYears(skill.since)
  const yearsOfExperience = sinceToString(skill.since)

  return (
    <div id={skill.slug} className="Skill flex flex-col grow">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-sky-800 dark:text-sky-200 hover:text-sky-800 hover:bg-sky-50 cursor-pointer whitespace-nowrap flex gap-1">
            <span>{skill.name}</span>
            { years !== 0 && <span title={yearsOfExperience}>{years}y</span>}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{skill.name}{yearsOfExperience && ` - ${yearsOfExperience}`}</DialogTitle>
          <SubSkillContent skill={skill} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
