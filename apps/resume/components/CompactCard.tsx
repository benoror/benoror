import { cn } from '@workspace/ui/lib/utils';
import { ReactNode } from 'react';

export default function CompactCard({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-colors duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
