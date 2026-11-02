import { Field } from './Field';
import { Textarea } from './Textarea';

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  className?: string;
}

export function TextareaField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  rows = 4,
  placeholder,
  className,
}: TextareaFieldProps) {
  return (
    <Field label={label} htmlFor={id} error={error} required={required} className={className}>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}
