import type { DashboardData, DashboardStats } from '@/types/dashboard';

export const DASHBOARD_COPY = {
  title: 'Visão geral da operação',
  subtitle: 'Indicadores calculados em tempo real a partir dos registros da portaria.',
} as const;

export const EMPTY_DASHBOARD: DashboardData = {
  stats: {
    moradores: 0,
    aguardando: 0,
    presentes: 0,
    entradasHoje: 0,
    encomendasPendentes: 0,
    ocorrenciasAbertas: 0,
  },
  movimentacoes: [],
  ultimosAcessos: [],
  visitantesAguardando: [],
  entregasRecentes: [],
  ocorrenciasAbertas: [],
};

export const STAT_LABELS: Record<keyof DashboardStats, string> = {
  moradores: 'Moradores cadastrados',
  aguardando: 'Visitantes aguardando',
  presentes: 'Pessoas no condomínio',
  entradasHoje: 'Entradas hoje',
  encomendasPendentes: 'Encomendas a retirar',
  ocorrenciasAbertas: 'Ocorrências abertas',
};
