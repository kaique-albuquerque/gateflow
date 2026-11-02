import type { EntityId } from './common';

export type VisitanteStatus =
  | 'aguardando'
  | 'autorizado'
  | 'negado'
  | 'no_local'
  | 'finalizado';

export interface Visitante {
  id: EntityId;
  nome: string;
  documento: string;
  telefone: string;
  bloco: string;
  unidade: string;
  morador: string;
  motivo: string;
  dataVisita: string;
  horaPrevista: string;
  status: VisitanteStatus;
  entradaEm: string | null;
  saidaEm: string | null;
  criadoEm: string;
}

/** Dados coletados no formulário de cadastro/edição. */
export type VisitanteForm = Omit<
  Visitante,
  'id' | 'criadoEm' | 'entradaEm' | 'saidaEm' | 'status'
> & { status?: VisitanteStatus };
