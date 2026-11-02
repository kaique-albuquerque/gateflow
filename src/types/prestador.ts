import type { EntityId } from './common';

export type PrestadorStatus = 'aguardando' | 'no_local' | 'finalizado';

export interface Prestador {
  id: EntityId;
  nome: string;
  documento: string;
  empresa: string;
  telefone: string;
  servico: string;
  bloco: string;
  unidade: string;
  entradaEm: string | null;
  saidaEm: string | null;
  status: PrestadorStatus;
  criadoEm: string;
}

export type PrestadorForm = Omit<
  Prestador,
  'id' | 'status' | 'entradaEm' | 'saidaEm' | 'criadoEm'
>;
