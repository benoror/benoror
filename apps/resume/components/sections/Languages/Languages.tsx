import { LANGUAGES } from '@workspace/data/resume';
import Language from '@/components/sections/Languages/Language';

export default function Languages() {
  return (
    <section className="Languages w-full">
      <h2 className="text-2xl font-bold text-center mb-4 print:text-xl">Languages</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {LANGUAGES.map((language, index) => (
          <Language key={index} language={language} />
        ))}
      </div>
    </section>
  )
}
