'use client'

import { Button } from '@workspace/ui/components/button'
import { Download } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function DownloadPDFButton(){
  const pathname = usePathname()

  if (pathname !== '/') {
    return null
  }

  function handleClick() {
    window.open('Ben Orozco - Resume.pdf', '_blank')
  }

  return (
    <Button onClick={handleClick} className="print:hidden cursor-pointer text-foreground" variant={'outline'} size="icon">
      <Download width={20} strokeWidth={1.25} className="text-foreground" />
    </Button>
  )

}
