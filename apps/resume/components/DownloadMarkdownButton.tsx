'use client'

import { Button } from '@workspace/ui/components/button'
import { FileText } from 'lucide-react'

export default function DownloadMarkdownButton() {
  function handleClick() {
    window.open('resume.md', '_blank')
  }

  return (
    <Button onClick={handleClick} className="print:hidden cursor-pointer" variant={'outline'} size="icon">
      <FileText width={20} strokeWidth={1} />
    </Button>
  )
}
