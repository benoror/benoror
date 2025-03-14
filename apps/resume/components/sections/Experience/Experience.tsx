import Role from '@/components/sections/Experience/Role/Role'
import { ROLES } from '@/lib/data/ALL_ROLES'

export default function Experience() {
  return (
    <section className="Experience flex flex-col items-center gap-5 print:gap-4">
      <h2 className="text-2xl font-bold print:text-xl">Experience</h2>
      <div className="flex flex-col gap-4">
        {ROLES.map((role, index) => (<Role key={index} role={role} />))}
      </div>
    </section>
  )
}
