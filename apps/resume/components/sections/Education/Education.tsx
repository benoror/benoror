import { EDUCATION } from '@workspace/data/resume';
import { ExternalLink, GraduationCap } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default function Education() {
  return (
    <section className="Education flex flex-col items-center gap-5 print:gap-2 w-full">
      <h2 className="text-2xl print:text-xl mb-4 font-medium text-sky-800 dark:text-sky-200">
        <GraduationCap className="size-6 inline" /> Education
      </h2>
      <div className="flex flex-row justify-center gap-16 w-full">
        {EDUCATION.map((degree, index) => (
          <Card key={index} className="w-1/2">
            <CardHeader>
              <CardTitle>{degree.title}</CardTitle>
              <CardDescription>
                <h3 className="text-md print:text-sm">
                  <a href={degree.institutionUrl}>
                    {degree.institution} <ExternalLink className="inline h-3 w-3 mb-1 print:hidden" />
                  </a>
                </h3>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">🗓 {degree.startDate} - {degree.endDate}</p>
              <p className="text-sm">{degree.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
