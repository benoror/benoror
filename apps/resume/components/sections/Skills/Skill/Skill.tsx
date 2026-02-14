'use client'

import { useEffect, useState } from 'react';
import SubSkills from '@/components/sections/Skills/Skill/SubSkills/SubSkills';
import { sinceToString, sinceToYears } from '@workspace/utils/date';
import { ISkill } from '@workspace/data/types/resume';
import PrintSubSkill from '@/components/sections/Skills/Skill/SubSkills/PrintSubSkill/PrintSubSkill';
import SubSkill from '@/components/sections/Skills/Skill/SubSkills/SubSkill/SubSkill';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';

export default function Skill({ skill }: { skill: ISkill}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const yearsOfExperience = sinceToString(skill.since)

  useEffect(() => {
    // Open dialog if the page loads with a matching hash
    if (window.location.hash === `#${skill.slug}`) {
      setDialogOpen(true)
    }

    // Listen for custom event dispatched from CoreSkill
    const handleOpenSkillDialog = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string }>
      if (customEvent.detail.slug === skill.slug) {
        // Small delay to let the scroll complete before opening the dialog
        setTimeout(() => setDialogOpen(true), 400)
      }
    }

    window.addEventListener('open-skill-dialog', handleOpenSkillDialog)
    return () => window.removeEventListener('open-skill-dialog', handleOpenSkillDialog)
  }, [skill.slug])

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open)
    // Clear hash when dialog is closed so re-clicking the same CoreSkill works
    if (!open && window.location.hash === `#${skill.slug}`) {
      history.replaceState(null, '', window.location.pathname)
    }
  }

  const subSkillsList = (
    <>
      <div className="Xhidden print:hidden flex flex-wrap justify-items-start justify-center gap-3">
        {skill.subSkills?.map((subSkill, index) => <SubSkill key={index} skill={subSkill} /> )}
      </div>
      <div className="hidden print:block w-full text-justify">
        {skill.subSkills?.map((subSkill, index) => <PrintSubSkill key={index} skill={subSkill} /> )}
      </div>
    </>
  )

  return (
    <Card id={skill.slug}>
      <CardHeader>
        <CardTitle>
          <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <a className="text-sky-800 dark:text-sky-200 hover:underline cursor-pointer font-bold text-center block ">
                {skill.name} ({yearsOfExperience})
              </a>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle>{skill.name}{yearsOfExperience && ` - ${yearsOfExperience}`}</DialogTitle>
              <p>{skill.description}</p>
              {subSkillsList}
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subSkillsList}
      </CardContent>
    </Card>
  )
}
