import { Badge } from '@workspace/ui/components/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@workspace/ui/components/tooltip';
import { ISkill } from '@/lib/types/ISkill';

export default function SubSkillTag({ skill }: { skill: ISkill }) {

  const badge = <Badge variant="outline" className='m-0.5'>{skill.name}</Badge>

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
