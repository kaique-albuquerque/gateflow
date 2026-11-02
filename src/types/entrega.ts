import type { EntityId } from './common';

export type EntregaStatus = 'recebida' | 'aguardando' | 'entregue';

export type EntregaTipo = 'encomenda' | 'documento' | 'alimento' | 'outro';

export interface Entrega {
  id: EntityId;
  destinatario: string;
  bloco: string;
  unidade: string;
  transportadora: string;
  tipo: EntregaTipo;
  codigoRastreio: string;
  recebidoEm: string;
  recebidoPor: string;
  status: EntregaStatus;
  retiradoPor: string | null;
  retiradoEm: string | null;
}

export type EntregaForm = Omit<
  Entrega,
  'id' | 'status' | 'retiradoPor' | 'retiradoEm' | 'recebidoEm' | 'recebidoPor'
> & {
  recebidoEm?: string;
  recebidoPor?: string;
};
