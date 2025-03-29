import { EDUCATION } from '@workspace/data/resume';

export default function Education() {
  return (
    <section className="Education flex flex-col items-center gap-5 print:gap-2 w-full">
      <h2 className="text-2xl font-bold print:text-xl mb-4">🎓 Education</h2>
      <div className="flex flex-col gap-4 w-full">
        {EDUCATION.map((degree, index) => (
          <div key={index} className="flex flex-col gap-1">
            <p className="text-md font-bold print:text-md">{degree.title}</p>
            <h3 className="text-md print:text-sm">
              <a href={degree.institutionUrl}>{degree.institution}</a>
            </h3>
            <p className="text-sm">🗓 {degree.startDate} - {degree.endDate}</p>
            <p className="text-sm">{degree.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
