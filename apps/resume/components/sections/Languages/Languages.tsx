import Language from '@/components/sections/Languages/Language';
import Section from '@/components/Section';
import type { ILanguageEntry } from '@workspace/data/types/resume';
import { Earth } from "lucide-react"

export default function Languages({ languages }: { languages: ILanguageEntry[] }) {
  return (
    <Section title="Languages" icon={<Earth />}>
      <div className="flex flex-row justify-center gap-8 w-2/3">
        {languages.map((language, index) => (
          <Language key={index} language={language} />
        ))}
      </div>
    </Section>
  )
}
