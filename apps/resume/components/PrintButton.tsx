'use client'

import { Button } from '@workspace/ui/components/button'
import { Printer } from 'lucide-react'

export default function PrintButton(){
  
  function handlePrint() {
      window.print()
  }

  return (
    <Button onClick={handlePrint} className="px-2 py-1 print:hidden" variant={'outline'}>
      <Printer width={20} strokeWidth={1} />
    </Button>
  )

}
