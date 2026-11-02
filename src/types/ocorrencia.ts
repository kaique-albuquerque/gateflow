import type { EntityId } from './common';

export type OcorrenciaCategoria =
  | 'acesso'
  | 'entrega'
  | 'seguranca'
  | 'operacional'
  | 'outro';

export type OcorrenciaStatus = 'aberta' | 'em_andamento' | 'resolvida';

export interface Ocorrencia {
  id: EntityId;
  titulo: string;
  descricao: string;
  categoria: OcorrenciaCategoria;
  responsavel: string;
  criadoEm: string;
  status: OcorrenciaStatus;
}

export type OcorrenciaForm = Omit<Ocorrencia, 'id' | 'criadoEm'> & {
  criadoEm?: string;
};
