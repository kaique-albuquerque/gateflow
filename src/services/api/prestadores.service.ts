import type { EntityId } from '@/types/common';
import type { Prestador, PrestadorForm } from '@/types/prestador';
import { COLLECTIONS } from '@/constants/collections';
import { seedPrestadores } from '@/data/prestadores';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Prestador>(COLLECTIONS.prestadores, seedPrestadores);

export const prestadoresService = {
  list: () => repository.list(),
  find: (id: EntityId) => repository.find(id),

  create: (data: PrestadorForm) =>
    repository.create({ ...data, status: 'aguardando', entradaEm: null, saidaEm: null, criadoEm: nowISO() }),

  update: (id: EntityId, data: PrestadorForm) => repository.update(id, data),
  remove: (id: EntityId) => repository.remove(id),

  registrarEntrada: (id: EntityId) =>
    repository.update(id, { status: 'no_local', entradaEm: nowISO(), saidaEm: null }),

  registrarSaida: (id: EntityId) =>
    repository.update(id, { status: 'finalizado', saidaEm: nowISO() }),
};
