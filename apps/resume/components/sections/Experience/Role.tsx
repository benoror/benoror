import { IRole } from '@workspace/data/types/resume';
import Achievement from '@/components/sections/Experience/Achievement'

export default function Role({ index, role }: { role: IRole, index: number }) {
  return (
    <div className="Role flex flex-col gap-1">
      <h3 className="text-md font-bold print:text-md">{role.title}</h3>
      <a className="text-md print:text-sm underline" href={role.companyUrl}>{role.company}</a>
      <p className="text-md print:text-sm">{role.location}</p>
      <p className="text-md print:text-sm">🗓 {role.startDate} - {role.endDate}</p>
      {Array.isArray(role.achievements) && role.achievements.length > 0 ? (
        <details open={index < 2}>
          <summary className="text-md print:text-sm cursor-pointer">{role.description}</summary>
          <ul className="pl-8 md:pl-4 list-disc list-outside md:list-inside space-x-6">
            {role.achievements.map((achievement, index) => (
              <Achievement key={index} achievement={achievement} />
            ))}
          </ul>
        </details>
      ) : (
        <p className="text-md print:text-sm">{role.description}</p>
      )}
    </div>
  );
}
