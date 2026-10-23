import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'dashed' | 'active';
  compact?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  compact = false,
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)]',
    subtle: 'bg-[var(--bg-main)] border border-[var(--border)] text-[var(--text)]',
    dashed: 'bg-[var(--bg-main)] border border-dashed border-[var(--border-strong)] text-[var(--text)]',
    active: 'bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--text)]',
  };

  return (
    <div
      className={cn(
        'transition-colors',
        variantStyles[variant],
        compact ? 'p-2.5' : 'p-3.5 sm:p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'flex items-center justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-[var(--border)]',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn('text-[13px] font-semibold text-[var(--text)] leading-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('text-[11px] text-[var(--text-muted)] leading-normal', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('text-[12px]', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'flex items-center justify-between gap-2 pt-2.5 mt-2.5 border-t border-[var(--border)] text-[11px]',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
