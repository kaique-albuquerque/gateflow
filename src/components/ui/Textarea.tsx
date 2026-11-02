import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/format';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ invalid, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'field-area',
        invalid && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
