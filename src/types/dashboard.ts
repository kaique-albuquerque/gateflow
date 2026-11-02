import type { Acesso } from './acesso';
import type { Entrega } from './entrega';
import type { Ocorrencia } from './ocorrencia';
import type { Visitante } from './visitante';

export interface DashboardStats {
  moradores: number;
  aguardando: number;
  presentes: number;
  entradasHoje: number;
  encomendasPendentes: number;
  ocorrenciasAbertas: number;
}

export interface MovimentacaoDia {
  dia: string;
  rotulo: string;
  entradas: number;
  saidas: number;
}

export interface DashboardData {
  stats: DashboardStats;
  movimentacoes: MovimentacaoDia[];
  ultimosAcessos: Acesso[];
  visitantesAguardando: Visitante[];
  entregasRecentes: Entrega[];
  ocorrenciasAbertas: Ocorrencia[];
}
