import { cn } from '@workspace/ui/lib/utils';
import { ReactNode } from 'react';

export default function Section({
  title,
  icon,
  children,
  className,
}: {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col items-center gap-3 print:gap-2 w-full", className)}>
      {title && (
        <h2 className="text-xl print:text-lg font-medium text-brand">
          {icon} {title}
        </h2>
      )}
      {children}
    </section>
  )
}
