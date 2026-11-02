import type { EntityId } from './common';

export type AcessoTipo = 'visitante' | 'prestador' | 'entregador' | 'morador';

export type AcessoStatus = 'no_local' | 'finalizado' | 'negado';

export interface Acesso {
  id: EntityId;
  pessoa: string;
  tipo: AcessoTipo;
  bloco: string;
  unidade: string;
  entradaEm: string;
  saidaEm: string | null;
  autorizadoPor: string;
  status: AcessoStatus;
}

export type AcessoForm = Omit<Acesso, 'id' | 'saidaEm' | 'status'> & {
  status?: AcessoStatus;
};
