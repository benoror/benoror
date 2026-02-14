'use client'

import { Progress } from '@workspace/ui/components/progress';
import { ISkill } from '@workspace/data/types/resume';
import { useEffect, useState } from 'react';

export default function CoreSkill({ skill }: { skill: ISkill}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(skill.level ?? 0), 100)
    return () => clearTimeout(timer)
  }, [skill.level])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(skill.slug ?? '')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('open-skill-dialog', { detail: { slug: skill.slug } }))
  }

  return (
    <div className="CoreSkill w-full md:w-[45%] lg:w-[22%] print:w-[22%] mb-4">
      <a onClick={handleClick} className="text-sky-800 dark:text-sky-200 hover:underline cursor-pointer text-center">
        <div>{skill.name}</div>
        <Progress value={progress} classNameIndicator="bg-sky-900 dark:bg-sky-200" />
      </a>
    </div>
  )
}
