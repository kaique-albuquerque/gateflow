export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Busca tolerante a acentos e caixa em múltiplos campos. */
export function matches(query: string, ...fields: (string | null | undefined)[]): boolean {
  const term = normalize(query);
  if (!term) return true;
  return fields.some((field) => normalize(field ?? '').includes(term));
}
