import type { EntityId } from '@/types/common';
import type { Dispositivo, DispositivoStatus } from '@/types/dispositivo';
import { COLLECTIONS } from '@/constants/collections';
import { seedDispositivos } from '@/data/dispositivos';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Dispositivo>(COLLECTIONS.dispositivos, seedDispositivos);

export const dispositivosService = {
  list: () => repository.list(),

  atualizarStatus: (id: EntityId, status: DispositivoStatus) =>
    repository.update(id, { status, atualizadoEm: nowISO() }),

  /** Simula a reconexão do equipamento (nenhuma comunicação real é feita). */
  simularConexao: (id: EntityId) =>
    repository.update(id, { status: 'conectado', atualizadoEm: nowISO() }),
};
