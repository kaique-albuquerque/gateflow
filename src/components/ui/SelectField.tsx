import type { SelectOption } from '@/types/common';
import { Field } from './Field';
import { Select } from './Select';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  error,
  required,
  placeholder,
  className,
}: SelectFieldProps) {
  return (
    <Field label={label} htmlFor={id} error={error} required={required} className={className}>
      <Select
        id={id}
        value={value}
        options={options}
        placeholder={placeholder}
        invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}
