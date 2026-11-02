export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function required(value: string | null | undefined, label: string): string | undefined {
  return value && value.trim().length > 0 ? undefined : `${label} é obrigatório`;
}

export function emailField(value: string): string | undefined {
  if (!value.trim()) return 'E-mail é obrigatório';
  return EMAIL_PATTERN.test(value.trim()) ? undefined : 'Informe um e-mail válido';
}

export function phoneField(value: string): string | undefined {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Telefone é obrigatório';
  return digits.length >= 10 ? undefined : 'Informe DDD + número';
}

export function numberField(value: number, label: string, max = 20): string | undefined {
  if (Number.isNaN(value) || value < 0) return `${label} inválido`;
  return value > max ? `${label} deve ser menor que ${max}` : undefined;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
