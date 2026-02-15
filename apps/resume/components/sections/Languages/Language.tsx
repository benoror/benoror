import AnimatedProgress from '@/components/AnimatedProgress';

export default function Language({ language }: { language: any }) {
  return (
    <div className="Language w-full">
      <div className="text-center print:text-brand-print">{language.name}</div>
      <AnimatedProgress value={language.level ?? 0} />
      <div className="text-sm text-muted-foreground text-center">{language.proficiency}</div>
    </div>
  )
}
