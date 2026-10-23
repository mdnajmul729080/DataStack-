import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 14,
  className,
  color,
}) => {
  const LucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>>)[name];

  if (!LucideIcon) {
    const Fallback = LucideIcons.Activity;
    return <Fallback size={size} className={cn('shrink-0 text-current', className)} style={{ color }} />;
  }

  return (
    <LucideIcon
      size={size}
      className={cn('shrink-0 text-current transition-colors', className)}
      style={{ color }}
    />
  );
};

export default Icon;
