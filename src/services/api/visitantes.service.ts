import type { EntityId } from '@/types/common';
import type { Visitante, VisitanteForm, VisitanteStatus } from '@/types/visitante';
import { COLLECTIONS } from '@/constants/collections';
import { seedVisitantes } from '@/data/visitantes';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Visitante>(COLLECTIONS.visitantes, seedVisitantes);

export const visitantesService = {
  list: () => repository.list(),
  find: (id: EntityId) => repository.find(id),

  create: (data: VisitanteForm) =>
    repository.create({
      ...data,
      status: data.status ?? 'aguardando',
      entradaEm: null,
      saidaEm: null,
      criadoEm: nowISO(),
    }),

  update: (id: EntityId, data: VisitanteForm) => repository.update(id, data),
  remove: (id: EntityId) => repository.remove(id),

  atualizarStatus: (id: EntityId, status: VisitanteStatus) =>
    repository.update(id, { status }),

  registrarEntrada: (id: EntityId) =>
    repository.update(id, { status: 'no_local', entradaEm: nowISO(), saidaEm: null }),

  registrarSaida: (id: EntityId) =>
    repository.update(id, { status: 'finalizado', saidaEm: nowISO() }),
};
