/** Identificador padrão de entidades do sistema. */
export type EntityId = string;

/** Paleta semântica usada por badges, gráficos e indicadores. */
export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export interface StatusMeta {
  label: string;
  tone: Tone;
}

/** Mapa de status -> rótulo + tom, garantindo tradução completa em tempo de compilação. */
export type StatusMap<T extends string> = Record<T, StatusMeta>;
