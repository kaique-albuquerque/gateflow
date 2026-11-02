import type { StatusMap } from '@/types/common';
import { toStatusOptions } from '@/utils/status-options';
import { Select } from './Select';

interface StatusFilterProps<T extends string> {
  map: StatusMap<T>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Filtro de status alimentado por um `StatusMap`, evitando listas duplicadas. */
export function StatusFilter<T extends string>({
  map,
  value,
  onChange,
  placeholder = 'Todos os status',
  className = 'w-full sm:w-52',
}: StatusFilterProps<T>) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      options={toStatusOptions(map)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={className}
    />
  );
}
