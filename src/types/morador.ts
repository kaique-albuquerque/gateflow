import type { EntityId } from './common';

export type MoradorStatus = 'ativo' | 'inativo';

export interface Morador {
  id: EntityId;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  bloco: string;
  unidade: string;
  dependentes: number;
  status: MoradorStatus;
  criadoEm: string;
}

export type MoradorForm = Omit<Morador, 'id' | 'criadoEm'> & { id?: EntityId };
