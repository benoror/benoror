'use client'

import { useEffect, useState } from 'react';
import { sinceToString } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import PrintSubSkill from '@/components/sections/Skills/Skill/SubSkills/PrintSubSkill/PrintSubSkill';
import SubSkill from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubSkill';
import CompactCard from '@/components/CompactCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { PrintOnly, ScreenOnly } from '@/components/MediaVisibility';

export default function Skill({ skill }: { skill: ISkill }) {
  const [isOpen, setIsOpen] = useState(false)
  const yearsOfExperience = sinceToString(skill.since)
  const subSkillCount = skill.subSkills?.length ?? 0

  useEffect(() => {
    if (window.location.hash === `#${skill.slug}`) {
      setIsOpen(true)
    }

    const handleExpand = (e: Event) => {
      const { slug } = (e as CustomEvent<{ slug: string }>).detail
      if (slug === skill.slug) setIsOpen(true)
    }

    window.addEventListener('expand-skill', handleExpand)
    return () => window.removeEventListener('expand-skill', handleExpand)
  }, [skill.slug])

  return (
    <>
      <ScreenOnly>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CompactCard
            id={skill.slug}
            className={cn(
              !isOpen && "hover:bg-muted/50 dark:hover:bg-muted/20"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <CollapsibleTrigger asChild>
                <button
                  className="shrink-0 cursor-pointer rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/15 transition-colors"
                  aria-label={isOpen ? 'Collapse skills' : 'Expand skills'}
                >
                  <ChevronDown className={cn(
                    "size-4 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )} />
                </button>
              </CollapsibleTrigger>

              <CollapsibleTrigger asChild>
                <button
                  className="font-semibold text-sm text-brand hover:underline decoration-sky-400 dark:decoration-sky-500 underline-offset-2 cursor-pointer text-left"
                >
                  {skill.name}
                </button>
              </CollapsibleTrigger>

              {subSkillCount > 0 && (
                isOpen ? (
                  <span className="text-xs text-muted-foreground/50 whitespace-nowrap ml-auto">
                    {subSkillCount} skills
                  </span>
                ) : (
                  <CollapsibleTrigger asChild>
                    <button className="text-xs text-muted-foreground/50 whitespace-nowrap cursor-pointer hover:text-sky-700 dark:hover:text-sky-300 hover:underline underline-offset-2 transition-colors ml-auto">
                      {subSkillCount} skills
                    </button>
                  </CollapsibleTrigger>
                )
              )}

              <span className="text-xs text-muted-foreground/50">·</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {yearsOfExperience}
              </span>
            </div>

            {/* Collapsible subskills (screen) */}
            <CollapsibleContent>
              <div className="px-3 pb-3">
                {skill.description && (
                  <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
                )}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {skill.subSkills?.map((subSkill, index) => <SubSkill key={index} skill={subSkill} />)}
                </div>
              </div>
            </CollapsibleContent>
          </CompactCard>
        </Collapsible>
      </ScreenOnly>

      {/* Print version (plain text, no card chrome) */}
      <PrintOnly id={skill.slug} className="break-inside-avoid py-0.5 text-[12px] leading-4 text-left">
        <p>
          <span className="font-bold text-brand-print">{skill.name}</span>
          <span className="text-muted-foreground"> ({yearsOfExperience})</span>
          {subSkillCount > 0 ? ': ' : '. '}
          {skill.subSkills?.map((subSkill, index) => <PrintSubSkill key={index} skill={subSkill} />)}
        </p>
      </PrintOnly>
    </>
  )
}
