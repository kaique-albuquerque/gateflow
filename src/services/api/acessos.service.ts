import type { EntityId } from '@/types/common';
import type { Acesso, AcessoForm } from '@/types/acesso';
import { COLLECTIONS } from '@/constants/collections';
import { seedAcessos } from '@/data/acessos';
import { createRepository } from '@/services/mock/repository';
import { nowISO } from '@/utils/datetime';

const repository = createRepository<Acesso>(COLLECTIONS.acessos, seedAcessos);

export const acessosService = {
  list: () => repository.list(),
  find: (id: EntityId) => repository.find(id),

  create: (data: AcessoForm) =>
    repository.create({ ...data, saidaEm: null, status: data.status ?? 'no_local' }),

  remove: (id: EntityId) => repository.remove(id),

  registrarSaida: (id: EntityId) =>
    repository.update(id, { saidaEm: nowISO(), status: 'finalizado' }),

  /** Usado pelos módulos de visitantes e prestadores para alimentar o histórico. */
  registrar: (data: Omit<AcessoForm, 'status'>) =>
    repository.create({ ...data, saidaEm: null, status: 'no_local' }),
};
