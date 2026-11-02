import type { EntityId } from '@/types/common';
import type { Entrega, EntregaForm } from '@/types/entrega';
import { COLLECTIONS } from '@/constants/collections';
import { seedEntregas } from '@/data/entregas';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Entrega>(COLLECTIONS.entregas, seedEntregas);

export const entregasService = {
  list: () => repository.list(),
  find: (id: EntityId) => repository.find(id),

  create: (data: EntregaForm) =>
    repository.create({
      ...data,
      recebidoEm: data.recebidoEm ?? nowISO(),
      recebidoPor: data.recebidoPor ?? 'Marina Alves',
      status: 'recebida',
      retiradoPor: null,
      retiradoEm: null,
    }),

  update: (id: EntityId, data: EntregaForm) => repository.update(id, data),
  remove: (id: EntityId) => repository.remove(id),

  notificarMorador: (id: EntityId) => repository.update(id, { status: 'aguardando' }),

  registrarRetirada: (id: EntityId, retiradoPor: string) =>
    repository.update(id, { status: 'entregue', retiradoPor, retiradoEm: nowISO() }),
};
