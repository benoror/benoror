'use client'

import { Progress } from '@workspace/ui/components/progress';
import { useEffect, useState } from 'react';

export default function AnimatedProgress({ value }: { value: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <Progress
      value={progress}
      classNameIndicator="bg-brand-indicator print:bg-brand-indicator"
    />
  )
}
