import type { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/format';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ invalid, className, ...rest }: InputProps) {
  return (
    <input
      className={cn('field', invalid && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
