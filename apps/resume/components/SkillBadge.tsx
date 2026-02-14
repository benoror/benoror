import { ComponentProps } from 'react';
import { Badge } from '@workspace/ui/components/badge';
import { cn } from '@workspace/ui/lib/utils';

export default function SkillBadge({ children, className, ...props }: ComponentProps<typeof Badge>) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-normal bg-sky-100 decoration-sky-700 text-sky-800 dark:bg-sky-900 dark:decoration-sky-200 dark:text-sky-200 hover:decoration-solid py-0 px-1 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}