import React from 'react';
import { cn } from '@/lib/utils';

export const TableWrap: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'w-full overflow-x-auto border border-[var(--border)] bg-[var(--bg-elevated)]',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  children,
  ...props
}) => (
  <table
    className={cn(
      'w-full min-w-[540px] border-collapse text-left text-[11px] whitespace-nowrap',
      className
    )}
    {...props}
  >
    {children}
  </table>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => (
  <thead
    className={cn(
      'bg-[var(--bg-sidebar)] border-b border-[var(--border)] text-[9.5px] font-semibold text-[var(--text-dim)] uppercase tracking-wider',
      className
    )}
    {...props}
  >
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => <tbody className={cn('divide-y divide-[var(--border)]', className)} {...props}>{children}</tbody>;

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => (
  <tr
    className={cn(
      'transition-colors hover:bg-[var(--bg-hover)] text-[var(--text)]',
      className
    )}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <th className={cn('px-2.5 py-1.5 font-medium', className)} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <td className={cn('px-2.5 py-1.5 text-[var(--text-muted)] align-middle', className)} {...props}>
    {children}
  </td>
);

export const TableEmpty: React.FC<{ colSpan: number; message?: string }> = ({
  colSpan,
  message = 'No data available',
}) => (
  <tr>
    <td
      colSpan={colSpan}
      className="px-3 py-6 text-center text-[10.5px] text-[var(--text-dim)] italic"
    >
      {message}
    </td>
  </tr>
);

export default Table;
