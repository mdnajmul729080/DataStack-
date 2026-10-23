import React from 'react';
import { cn } from '@/lib/utils';

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  className,
  children,
  ...props
}) => (
  <form className={cn('flex flex-col gap-3', className)} {...props}>
    {children}
  </form>
);

export const FormField: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex flex-col gap-1 w-full', className)} {...props}>
    {children}
  </div>
);

export const FormRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-3 w-full', className)} {...props}>
    {children}
  </div>
);

export const FormSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
}> = ({ label, checked, onChange, description, disabled = false }) => (
  <label
    className={cn(
      'flex items-center justify-between p-2.5 border border-[var(--border)] bg-[var(--bg-main)] cursor-pointer select-none transition-colors hover:bg-[var(--bg-hover)]',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    <div className="flex flex-col">
      <span className="text-[12px] font-medium text-[var(--text)]">{label}</span>
      {description && <span className="text-[10.5px] text-[var(--text-dim)]">{description}</span>}
    </div>
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
    />
  </label>
);

export default Form;
