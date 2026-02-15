import { ComponentProps } from 'react';
import { Badge } from '@workspace/ui/components/badge';
import { cn } from '@workspace/ui/lib/utils';

export default function SkillBadge({ children, className, ...props }: ComponentProps<typeof Badge>) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-normal text-sm py-0 px-1.5",
        "bg-brand-bg text-brand",
        "border border-sky-200/60 dark:border-sky-700/40",
        "hover:bg-sky-200 dark:hover:bg-sky-800",
        "hover:border-sky-300 dark:hover:border-sky-600",
        "hover:shadow-sm",
        "transition-all duration-150",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}
