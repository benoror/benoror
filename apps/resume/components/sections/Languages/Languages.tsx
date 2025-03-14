import { LANGUAGES } from '@/lib/data/LANGUAGES';

export default function Languages() {
  return (
    <section className="Languages w-full flex flex-col gap-5 print:gap-2">
      <h2 className="text-2xl font-bold text-center print:text-xl">Languages</h2>
      <div className="flex flex-col gap-4 print:hidden">
        {LANGUAGES.map((language, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">{language.name}</h3>
            <p className="text-md">{language.proficiency}</p>
          </div>
        ))}
      </div>
      <div className="hidden print:flex flex-col gap-1 ">
        {LANGUAGES.map((language, index) => (
          <div key={index} className="flex flex-row gap-1">
            <h3 className="text-md">{language.name}:</h3>
            <p className="text-md">{language.proficiency}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
