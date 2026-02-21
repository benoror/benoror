import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@workspace/ui/components/tooltip';
import { ISkill } from '@workspace/data/types/resume';
import SkillBadge from '@/components/SkillBadge';
import { ExternalLink } from 'lucide-react';

export default function SubSkillTag({ skill }: { skill: ISkill }) {
  const badgeContent = (
    <>
      {skill.name}
      {skill.url && <ExternalLink className="inline h-3 w-3 ml-1 opacity-50" />}
    </>
  )

  const badge = skill.url ? (
    <div id={skill.slug}>
      <a href={skill.url} target="_blank" rel="noopener noreferrer">
        <SkillBadge className='mr-1 cursor-pointer'>{badgeContent}</SkillBadge>
      </a>
    </div>
  ) : (
    <div id={skill.slug}>
      <SkillBadge className='mr-1'>{badgeContent}</SkillBadge>
    </div>
  )

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
