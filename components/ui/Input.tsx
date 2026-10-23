import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  compact?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, compact = false, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10.5px] font-semibold text-[var(--text-muted)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-2.5 flex items-center pointer-events-none text-[var(--text-dim)]">
              <Icon name={icon} size={13} />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-[var(--bg-main)] text-[var(--text)] border border-[var(--border-strong)] placeholder:text-[var(--text-dim)] transition-colors focus:outline-none focus:border-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed',
              compact ? 'h-[28px] px-2 text-[11px]' : 'h-[32px] px-2.5 text-[12px]',
              icon && 'pl-8',
              error && 'border-[var(--danger)]',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-[10.5px] text-[var(--danger)]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[10.5px] font-semibold text-[var(--text-muted)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full bg-[var(--bg-main)] text-[var(--text)] border border-[var(--border-strong)] p-2.5 text-[12px] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)] min-h-[64px] resize-y font-mono',
            error && 'border-[var(--danger)]',
            className
          )}
          {...props}
        />
        {error && <span className="text-[10.5px] text-[var(--danger)]">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  compact?: boolean;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, compact = false, options, children, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[10.5px] font-semibold text-[var(--text-muted)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full bg-[var(--bg-main)] text-[var(--text)] border border-[var(--border-strong)] focus:outline-none focus:border-[var(--accent)] cursor-pointer',
            compact ? 'h-[28px] px-1.5 text-[11px]' : 'h-[32px] px-2 text-[11.5px]',
            error && 'border-[var(--danger)]',
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[var(--bg-elevated)] text-[var(--text)]">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <span className="text-[10.5px] text-[var(--danger)]">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
