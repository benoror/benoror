'use client'

import { Button } from '@workspace/ui/components/button'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import markdownIcon from '@/app/markdown.svg'
import { getResumeMarkdownPath } from '@/lib/resumeUrls'

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
  const pathname = usePathname()

  if (!pathname || pathname.endsWith('/cover-letter')) {
    return null
  }

  function handleClick() {
    const slug = pathname === '/' ? undefined : pathname.slice(1)
    window.open(getResumeMarkdownPath(slug), '_blank')
  }

  return (
    <Button onClick={handleClick} className="print:hidden cursor-pointer" variant={'outline'} size="icon">
      <MarkdownIcon />
    </Button>
  )
}
