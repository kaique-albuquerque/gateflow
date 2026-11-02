import type { EntityId } from './common';

export type UnidadeSituacao = 'ocupada' | 'vazia' | 'manutencao';

export interface UnidadeBase {
  id: EntityId;
  bloco: string;
  numero: string;
  situacao: UnidadeSituacao;
}

/** Visão consolidada: unidade + moradores vinculados. */
export interface UnidadeView extends UnidadeBase {
  responsavel: string | null;
  totalMoradores: number;
  totalDependentes: number;
  moradores: { id: EntityId; nome: string; status: string }[];
}
