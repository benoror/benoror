'use client'

import { useEffect, useState } from 'react';
import SubSkillContent from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubskillContent/SubSkillContent';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@workspace/ui/components/tooltip';
import { sinceToString, sinceToYears } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import SkillBadge from '@/components/SkillBadge';
import { ExternalLink } from 'lucide-react';

export default function SubSkill({ skill }: { skill: ISkill }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const years = sinceToYears(skill.since)
  const yearsOfExperience = sinceToString(skill.since)
  const hasContent = skill.description || (skill.subSkills && skill.subSkills.length > 0)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const { slug } = (e as CustomEvent<{ slug: string }>).detail
      if (slug === skill.slug) setDialogOpen(true)
    }

    window.addEventListener('open-subskill', handleOpen)
    return () => window.removeEventListener('open-subskill', handleOpen)
  }, [skill.slug])

  const badgeContent = (
    <>
      <span>{skill.name}</span>
      {years !== 0 && <span title={yearsOfExperience}> ({years}y)</span>}
      {skill.url && <ExternalLink className="inline h-3 w-3 ml-1 opacity-50" />}
    </>
  )

  if (skill.url && !hasContent) {
    return (
      <div id={skill.slug} className="SubSkill">
        <a href={skill.url} target="_blank" rel="noopener noreferrer">
          <SkillBadge className="cursor-pointer">
            {badgeContent}
          </SkillBadge>
        </a>
      </div>
    )
  }

  const badge = (
    <SkillBadge className="cursor-pointer">
      {badgeContent}
    </SkillBadge>
  )

  return (
    <div id={skill.slug} className="SubSkill">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
