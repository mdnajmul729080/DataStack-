import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label' | 'code' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'muted' | 'dim' | 'label' | 'code' | 'badge';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    h1: 'text-[18px] font-semibold tracking-tight text-[var(--text)]',
    h2: 'text-[15px] font-semibold text-[var(--text)]',
    h3: 'text-[13px] font-medium text-[var(--text)]',
    body: 'text-[12.5px] font-normal text-[var(--text)]',
    muted: 'text-[11.5px] font-normal text-[var(--text-muted)]',
    dim: 'text-[10.5px] font-normal text-[var(--text-dim)]',
    label: 'text-[11px] font-medium uppercase tracking-wider text-[var(--text-dim)]',
    code: 'text-[11px] font-mono text-[var(--accent)] bg-[var(--bg-hover)] px-1.5 py-0.5 border border-[var(--border)]',
    badge: 'text-[10px] font-medium px-1.5 py-0.5 border border-[var(--border)] text-[var(--text-muted)] inline-flex items-center gap-1',
  };

  return (
    <Component
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
