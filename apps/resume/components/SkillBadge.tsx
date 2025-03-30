import { ReactNode } from 'react';
import { Badge } from '@workspace/ui/components/badge';
import { cn } from '@workspace/ui/lib/utils';

export default function SkillBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-normal decoration-sky-700 text-sky-800 dark:decoration-sky-200 dark:text-sky-200 hover:decoration-solid",
        className
      )}
    >
      {children}
    </Badge>
  )
}