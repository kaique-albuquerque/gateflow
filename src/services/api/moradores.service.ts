import type { EntityId } from '@/types/common';
import type { Morador, MoradorForm } from '@/types/morador';
import { COLLECTIONS } from '@/constants/collections';
import { seedMoradores } from '@/data/moradores';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Morador>(COLLECTIONS.moradores, seedMoradores);

export const moradoresService = {
  list: () => repository.list(),
  find: (id: EntityId) => repository.find(id),
  create: (data: MoradorForm) => repository.create({ ...data, criadoEm: nowISO() }),
  update: (id: EntityId, data: MoradorForm) => repository.update(id, data),
  remove: (id: EntityId) => repository.remove(id),
};
