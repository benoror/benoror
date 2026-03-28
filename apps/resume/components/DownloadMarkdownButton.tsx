'use client'

import { Button } from '@workspace/ui/components/button'
import Image from 'next/image'
import markdownIcon from '@/app/markdown.svg'

function MarkdownIcon() {
  return (
    <Image
      src={markdownIcon}
      alt="Markdown"
      width={24}
      height={24}
      className="dark:invert"
    />
  )
}

export default function DownloadMarkdownButton() {
  function handleClick() {
    window.open('resume.md', '_blank')
  }

  return (
    <Button onClick={handleClick} className="print:hidden cursor-pointer" variant={'outline'} size="icon">
      <MarkdownIcon />
    </Button>
  )
}
