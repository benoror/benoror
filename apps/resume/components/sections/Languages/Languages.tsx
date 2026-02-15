import { LANGUAGES } from '@workspace/data/resume';
import Language from '@/components/sections/Languages/Language';
import Section from '@/components/Section';
import { Earth } from "lucide-react"

export default function Languages() {
  return (
    <Section title="Languages" icon={<Earth />}>
      <div className="flex flex-row justify-center gap-8 w-2/3">
        {LANGUAGES.map((language, index) => (
          <Language key={index} language={language} />
        ))}
      </div>
    </Section>
  )
}
