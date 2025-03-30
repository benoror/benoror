import { LANGUAGES } from '@workspace/data/resume';
import Language from '@/components/sections/Languages/Language';
import { Earth } from "lucide-react"

export default function Languages() {
  return (
    <section className="Languages w-full">
      <h2 className="text-2xl text-center mb-4 print:text-xl font-medium text-sky-800 dark:text-sky-200">
        <Earth className="size-6 inline" /> Languages
      </h2>
      <div className="flex flex-row justify-center gap-4">
        {LANGUAGES.map((language, index) => (
          <Language key={index} language={language} />
        ))}
      </div>
    </section>
  )
}
