import { EDUCATION } from '@workspace/data/resume';
import Section from '@/components/Section';
import CompactCard from '@/components/CompactCard';
import { ExternalLink, GraduationCap } from "lucide-react"

export default function Education() {
  return (
    <Section title="Education" icon={<GraduationCap className="size-6 inline" />}>
      <div className="grid grid-cols-2 justify-center gap-3 w-full">
        {EDUCATION.map((degree, index) => (
          <CompactCard key={index}>
            <div className="px-3 py-2.5 flex flex-col gap-1">
              <div className="font-semibold text-foreground">{degree.title}</div>
              <h3 className="text-muted-foreground">
                <a href={degree.institutionUrl} className="hover:underline">
                  {degree.institution} <ExternalLink className="inline h-3 w-3 mb-1 print:hidden" />
                </a>
              </h3>
              <p className="text-xs text-muted-foreground">🗓 {degree.startDate} - {degree.endDate}</p>
              <p className="text-xs text-muted-foreground">{degree.description}</p>
            </div>
          </CompactCard>
        ))}
      </div>
    </Section>
  )
}
