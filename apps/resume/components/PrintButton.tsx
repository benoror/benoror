'use client'

import { Button } from '@workspace/ui/components/button'
import { Printer } from 'lucide-react'

export default function PrintButton(){
  
  function handlePrint() {
      window.print()
  }

  return (
    <Button onClick={handlePrint} className="print:hidden" variant={'outline'} size="icon">
      <Printer width={20} strokeWidth={1} />
    </Button>
  )

}
