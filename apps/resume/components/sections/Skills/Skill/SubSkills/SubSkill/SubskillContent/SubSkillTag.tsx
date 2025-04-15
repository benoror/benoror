import { Badge } from '@workspace/ui/components/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@workspace/ui/components/tooltip';
import { ISkill } from '@workspace/data/types/resume';
import SkillBadge from '@/components/SkillBadge';

export default function SubSkillTag({ skill }: { skill: ISkill }) {

  const badge = <div id={skill.slug}>
                  <SkillBadge className='mr-1'>{skill.name}</SkillBadge>
                </div>

  if (!skill.description) return badge

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          { skill.description }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
