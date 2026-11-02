import type { InputHTMLAttributes } from 'react';
import { Field } from './Field';
import { Input } from './Input';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'> {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  className?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  className,
  required,
  ...rest
}: TextFieldProps) {
  return (
    <Field label={label} htmlFor={id} error={error} hint={hint} required={required} className={className}>
      <Input
        id={id}
        value={value}
        required={required}
        invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    </Field>
  );
}
