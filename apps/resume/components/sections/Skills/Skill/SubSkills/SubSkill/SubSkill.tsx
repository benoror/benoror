import SubSkillContent from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillContent';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogTrigger } from '@workspace/ui/components/dialog';
import { sinceToString } from '@/lib/sinceToString';
import { sinceToYears } from '@/lib/sinceToYears';
import { ISkill } from '@/lib/types/ISkill';

export default function SubSkill({ skill }: { skill: ISkill}) {
  const years = sinceToYears(skill.since)
  const yearsOfExperience = sinceToString(skill.since)

  return (
    <div className="Skill flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="whitespace-nowrap flex gap-1">
            <span>{skill.name}</span>
            { years !== 0 && <span title={yearsOfExperience}>{years}y</span>}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SubSkillContent skill={skill} yearsOfExperience={yearsOfExperience} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
