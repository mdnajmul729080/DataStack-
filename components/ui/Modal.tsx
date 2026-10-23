import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-[440px]',
    md: 'max-w-[520px]',
    lg: 'max-w-[640px]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/60 backdrop-blur-[1px]">
      <div
        className={cn(
          'w-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text)] flex flex-col max-h-[min(84dvh,680px)] overflow-hidden animate-in fade-in zoom-in-95 duration-100',
          maxWidthStyles[maxWidth]
        )}
      >
        <div className="flex items-start justify-between gap-3 p-3.5 sm:px-4 sm:py-3.5 border-b border-[var(--border)] shrink-0">
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold text-[var(--text)] leading-tight">{title}</h2>
            {description && (
              <p className="text-[11px] text-[var(--text-muted)] mt-1">{description}</p>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-7 h-7 text-[var(--text-dim)] hover:text-[var(--text)]"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>

        <div className="p-3.5 sm:p-4 overflow-y-auto flex-1 text-[12px] flex flex-col gap-3">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2 p-3 sm:px-4 border-t border-[var(--border)] bg-[var(--bg-sidebar)] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
