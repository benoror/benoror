import { INTERESTS } from '@workspace/data/personal';
import { Badge } from '@workspace/ui/components/badge';

export default function Interests() {
  return (
    <section className="Interests w-full flex flex-col gap-5 print:gap-2">
      <h2 className="text-2xl font-bold text-center print:text-xl">Interests</h2>
      <div className="flex flex-row flex-wrap gap-1 print:hidden">
        {INTERESTS.map((interest, index) => (
          <Badge className="text-nowrap" key={index}>{interest}</Badge>
        ))}
      </div>
      <div className="hidden print:block">
        {INTERESTS.join(', ')}
      </div>
    </section>
  )
}
