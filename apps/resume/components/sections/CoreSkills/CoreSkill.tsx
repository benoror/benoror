'use client'

import AnimatedProgress from '@/components/AnimatedProgress';
import { ISkill } from '@workspace/data/types/resume';
import { scrollToSkill } from '@/lib/scrollToSkill';

export default function CoreSkill({ skill }: { skill: ISkill}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSkill(skill.slug ?? '')
  }

  return (
    <div className="CoreSkill w-full">
      <a onClick={handleClick} className="text-brand-emphasis hover:underline cursor-pointer text-center">
        <div>{skill.name}</div>
        <AnimatedProgress value={skill.level ?? 0} />
      </a>
    </div>
  )
}
