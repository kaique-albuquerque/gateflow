import type { SelectOption, StatusMap } from '@/types/common';

/** Converte um mapa de status em opções de filtro/seleção. */
export function toStatusOptions<T extends string>(map: StatusMap<T>): SelectOption[] {
  return (Object.keys(map) as T[]).map((value) => ({ value, label: map[value].label }));
}

export function toValueOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));
}
