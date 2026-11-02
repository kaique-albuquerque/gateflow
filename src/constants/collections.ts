export const COLLECTIONS = {
  visitantes: 'visitantes',
  moradores: 'moradores',
  entregas: 'entregas',
  acessos: 'acessos',
  prestadores: 'prestadores',
  ocorrencias: 'ocorrencias',
  dispositivos: 'dispositivos',
} as const;

export type CollectionKey = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export const ALL_COLLECTIONS: CollectionKey[] = Object.values(COLLECTIONS);
