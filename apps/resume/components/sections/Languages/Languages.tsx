import { LANGUAGES } from '@workspace/data/resume';
import Language from '@/components/sections/Languages/Language';
import Section from '@/components/Section';
import { Earth } from "lucide-react"

export default function Languages() {
  return (
    <Section title="Languages" icon={<Earth className="size-6 inline" />}>
      <div className="flex flex-row justify-center gap-8 w-full">
        {LANGUAGES.map((language, index) => (
          <Language key={index} language={language} />
        ))}
      </div>
    </Section>
  )
}
