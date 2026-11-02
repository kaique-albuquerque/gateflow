import type { ReactNode } from 'react';
import { cn } from '@/utils/format';

export interface DetailField {
  label: string;
  value: ReactNode;
  full?: boolean;
}

export function DetailList({ fields }: { fields: DetailField[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.label} className={cn('min-w-0', field.full && 'sm:col-span-2')}>
          <dt className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            {field.label}
          </dt>
          <dd className="mt-1 text-sm break-words text-slate-800">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
