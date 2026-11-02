import type { ReactNode } from 'react';
import { cn } from '@/utils/format';

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  items: T[];
  rowKey: (item: T) => string;
  loading?: boolean;
  empty?: ReactNode;
  skeletonRows?: number;
}

const ALIGN = { left: 'text-left', right: 'text-right', center: 'text-center' } as const;

export function DataTable<T>({
  columns,
  items,
  rowKey,
  loading = false,
  empty,
  skeletonRows = 5,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="divide-y divide-slate-100">
        {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-4 px-4 py-3.5">
            {columns.map((column, columnIndex) => (
              <div
                key={column.key}
                className="h-3 animate-pulse rounded bg-slate-100"
                style={{ width: columnIndex === 0 ? '26%' : `${18 - columnIndex * 2}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) return <>{empty}</>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={cn(column.align && ALIGN[column.align], column.className)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={rowKey(item)}>
              {columns.map((column) => (
                <td key={column.key} className={cn(column.align && ALIGN[column.align], column.className)}>
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
