import { EDUCATION } from '@/lib/data/EDUCATION';

export default function Education() {
  return (
    <section className="Education flex flex-col items-center gap-5 print:gap-2 w-full">
      <h2 className="text-2xl font-bold print:text-xl">Education</h2>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <p className="text-md">{EDUCATION.degree}</p>
          <h3 className="text-sm font-bold">{EDUCATION.institution}</h3>
          <p className="text-sm">{EDUCATION.since} - {EDUCATION.until}</p>
          <p className="text-sm">{EDUCATION.description}</p>
        </div>
      </div>
    </section>
  )
}
