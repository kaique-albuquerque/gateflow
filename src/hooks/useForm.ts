import { useCallback, useState } from 'react';
import type { FieldErrors } from '@/utils/validators';

/** Estado de formulário controlado com erros por campo. */
export function useForm<T extends object>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors<string>>({});

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key as string]: undefined }));
  }, []);

  const reset = useCallback((next: T) => {
    setValues(next);
    setErrors({});
  }, []);

  return { values, errors, setField, setErrors, reset };
}
