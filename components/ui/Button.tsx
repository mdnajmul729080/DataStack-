import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon';
  size?: 'default' | 'sm' | 'xs' | 'icon';
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'secondary',
      size = 'default',
      icon,
      iconPosition = 'left',
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-normal transition-colors select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-transparent whitespace-nowrap outline-none';

    const variantStyles = {
      primary:
        'bg-[var(--accent)] text-[var(--text-on-accent)] hover:bg-[var(--accent-hover)] border-[var(--accent)]',
      secondary:
        'bg-[var(--bg-elevated)] text-[var(--text)] border-[var(--border-strong)] hover:bg-[var(--bg-hover)]',
      ghost:
        'bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] border-transparent',
      danger:
        'bg-transparent text-[var(--danger)] border-[var(--danger)] hover:bg-[var(--danger-soft)]',
      icon:
        'bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] border-transparent p-0',
    };

    const sizeStyles = {
      default: 'h-[32px] px-[14px] text-[12.5px] gap-[7px]',
      sm: 'h-[27px] px-[10px] text-[11.5px] gap-[5px]',
      xs: 'h-[24px] px-[7px] text-[10.5px] gap-[4px]',
      icon: 'w-[30px] h-[30px] p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          size === 'icon' ? sizeStyles.icon : sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Icon name="Loader2" size={size === 'sm' || size === 'xs' ? 12 : 14} className="animate-spin" />
        ) : (
          icon && iconPosition === 'left' && (
            <Icon name={icon} size={size === 'sm' || size === 'xs' ? 12 : 14} />
          )
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && (
          <Icon name={icon} size={size === 'sm' || size === 'xs' ? 12 : 14} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
