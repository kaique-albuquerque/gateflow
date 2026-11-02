import type { SelectHTMLAttributes } from 'react';
import type { SelectOption } from '@/types/common';
import { cn } from '@/utils/format';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
}

export function Select({ options, placeholder, invalid, className, ...rest }: SelectProps) {
  return (
    <select
      className={cn('field cursor-pointer pr-8', invalid && 'border-rose-400', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
