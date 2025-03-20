'use client'

import { Progress } from '@workspace/ui/components/progress';
import { useEffect, useState } from 'react';

export default function Language({ language }: { language: any }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(language.level ?? 0), 100)
    return () => clearTimeout(timer)
  }, [language.level])

  return (
    <div className="Language w-full md:w-[45%] lg:w-[22%] print:w-[22%] mb-4">
      <a href={`#${language.name}`}>
        <div className="text-center">{language.name}</div>
        <Progress value={progress} />
        <div className="text-sm text-muted-foreground text-center">{language.proficiency}</div>
      </a>
    </div>
  )
}
