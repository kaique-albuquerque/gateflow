import type { EntityId } from '@/types/common';
import type { Ocorrencia, OcorrenciaForm, OcorrenciaStatus } from '@/types/ocorrencia';
import { COLLECTIONS } from '@/constants/collections';
import { seedOcorrencias } from '@/data/ocorrencias';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Ocorrencia>(COLLECTIONS.ocorrencias, seedOcorrencias);

export const ocorrenciasService = {
  list: () => repository.list(),
  find: (id: EntityId) => repository.find(id),

  create: (data: OcorrenciaForm) =>
    repository.create({ ...data, criadoEm: data.criadoEm ?? nowISO() }),

  update: (id: EntityId, data: OcorrenciaForm) => repository.update(id, data),
  remove: (id: EntityId) => repository.remove(id),

  atualizarStatus: (id: EntityId, status: OcorrenciaStatus) =>
    repository.update(id, { status }),
};
