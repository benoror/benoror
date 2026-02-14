import SubSkillContent from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillContent';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@workspace/ui/components/tooltip';
import { sinceToString, sinceToYears } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import SkillBadge from '@/components/SkillBadge';

export default function SubSkill({ skill }: { skill: ISkill }) {
  const years = sinceToYears(skill.since)
  const yearsOfExperience = sinceToString(skill.since)

  const badge = (
    <SkillBadge className="cursor-pointer">
      <span>{skill.name}</span>
      {years !== 0 && <span title={yearsOfExperience}> ({years}y)</span>}
    </SkillBadge>
  )

  return (
    <div id={skill.slug} className="SubSkill">
      <Dialog>
        {skill.description ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                {badge}
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs line-clamp-2">{skill.description}</p>
              <p className="text-[10px] text-muted-foreground mt-1 italic">Click for details</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <DialogTrigger asChild>
            {badge}
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogTitle>{skill.name}{yearsOfExperience && ` - ${yearsOfExperience}`}</DialogTitle>
          <SubSkillContent skill={skill} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
