import { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@workspace/ui/lib/utils';

type VisibilityProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

type PrintDisplay = 'block' | 'inline' | 'flex' | 'inline-flex';

export function ScreenOnly<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: VisibilityProps<T>) {
  const Component = (as ?? 'div') as ElementType;
  return <Component className={cn('print:hidden', className)} {...props} />;
}

export function PrintOnly<T extends ElementType = 'div'>({
  as,
  className,
  display = 'block',
  ...props
}: VisibilityProps<T> & { display?: PrintDisplay }) {
  const Component = (as ?? 'div') as ElementType;
  const printDisplayClass = {
    block: 'print:block',
    inline: 'print:inline',
    flex: 'print:flex',
    'inline-flex': 'print:inline-flex',
  }[display];

  return <Component className={cn('hidden', printDisplayClass, className)} {...props} />;
}
