export const ROUTES = {
  dashboard: '/',
  visitantes: '/visitantes',
  moradores: '/moradores',
  unidades: '/unidades',
  entregas: '/entregas',
  acessos: '/acessos',
  prestadores: '/prestadores',
  ocorrencias: '/ocorrencias',
  dispositivos: '/dispositivos',
  configuracoes: '/configuracoes',
} as const;

export type RouteKey = keyof typeof ROUTES;
