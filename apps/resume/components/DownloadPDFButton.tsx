'use client'

import { Button } from '@workspace/ui/components/button'
import { Download } from 'lucide-react'

export default function DownloadPDFButton(){
  
  function handleClick() {
    window.open('Ben Orozco - Resume.pdf', '_blank')
  }

  return (
    <Button onClick={handleClick} className="print:hidden cursor-pointer" variant={'outline'} size="icon">
      <Download width={20} strokeWidth={1} />
    </Button>
  )

}
