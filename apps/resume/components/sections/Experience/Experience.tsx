import { BriefcaseBusinessIcon } from "lucide-react";
import Role from '@/components/sections/Experience/Role'
import { ROLES } from '@workspace/data/resume'
import { IRole } from '@workspace/data/types/resume';
import { groupBy, sortBy, reduce } from 'lodash-es'

export default function Experience() {
  const byCompany = (roles: IRole[]) => {
    const grouped = groupBy(roles, 'company')
    const resorted = sortBy(grouped, (group: any) => roles.indexOf(group[0]))

    return reduce(resorted, (result: Array<Object>, companyRoles: Array<IRole>) => {
      const company = companyRoles[0]?.company
      result.push({company, roles: companyRoles})
      return result
    }, [])
  }

  return (
    <section className="Experience flex flex-col items-center gap-5 print:gap-4">
      <h2 className="text-2xl font-bold print:text-xl">
        <BriefcaseBusinessIcon className="size-6 inline" /> 💼 Experience
      </h2>
      <div className="flex flex-col gap-4">
        {byCompany(ROLES).map(({company, roles}: {company: string, roles: Array<IRole>}) => (
          <div key={company} className="flex flex-col gap-4">
            <h4 className="text-xl font-bold print:text-lg">{company}</h4>
            {roles.map((role, index) => (<Role key={index} index={index} role={role} />))}
          </div>
        ))}
      </div>
    </section>
  )
}
