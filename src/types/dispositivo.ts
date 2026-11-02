import type { EntityId } from './common';

export type DispositivoTipo =
  | 'controladora'
  | 'qr'
  | 'camera'
  | 'fechadura'
  | 'interfonia';

export type DispositivoStatus = 'conectado' | 'desconectado' | 'nao_configurado';

export interface Dispositivo {
  id: EntityId;
  nome: string;
  tipo: DispositivoTipo;
  modelo: string;
  local: string;
  status: DispositivoStatus;
  atualizadoEm: string;
}
