import { BriefcaseBusinessIcon } from "lucide-react";
import Role from '@/components/sections/Experience/Role'
import { ROLES } from '@workspace/data/resume'

export default function Experience() {
  return (
    <section className="Experience flex flex-col items-center gap-5 print:gap-4">
      <h2 className="text-2xl font-bold print:text-xl">
        <BriefcaseBusinessIcon className="size-6 inline" /> 💼 Experience
      </h2>
      <div className="flex flex-col gap-4">
        {ROLES.map((role, index) => (<Role key={index} index={index} role={role} />))}
      </div>
    </section>
  )
}
