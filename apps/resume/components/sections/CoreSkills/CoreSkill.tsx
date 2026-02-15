'use client'

import AnimatedProgress from '@/components/AnimatedProgress';
import { ISkill } from '@workspace/data/types/resume';

export default function CoreSkill({ skill }: { skill: ISkill}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(skill.slug ?? '')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('expand-skill', { detail: { slug: skill.slug } }))
  }

  return (
    <div className="CoreSkill w-full">
      <a onClick={handleClick} className="text-brand hover:underline cursor-pointer text-center">
        <div>{skill.name}</div>
        <AnimatedProgress value={skill.level ?? 0} />
      </a>
    </div>
  )
}
