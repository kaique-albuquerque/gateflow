import type { EntityId } from '@/types/common';
import type { Repository } from '@/interfaces/repository.interface';
import { readStored, writeStored } from '@/services/storage/storage';
import { createId } from '@/utils/id';
import { sleep } from './latency';

/**
 * Repositório simulado com persistência em LocalStorage.
 * Substituir por chamadas HTTP mantém o restante da aplicação intacto.
 */
export function createRepository<T extends { id: EntityId }>(
  collection: string,
  seed: T[],
): Repository<T> {
  const load = (): T[] => {
    const stored = readStored<T[]>(collection);
    if (stored) return stored;
    writeStored(collection, seed);
    return seed;
  };

  const persist = (items: T[]): void => writeStored(collection, items);

  return {
    async list() {
      await sleep();
      return load();
    },

    async find(id) {
      await sleep();
      return load().find((item) => item.id === id) ?? null;
    },

    async create(data) {
      await sleep();
      const items = load();
      const item = { ...data, id: data.id ?? createId(collection.slice(0, 3).toUpperCase()) } as T;
      persist([item, ...items]);
      return item;
    },

    async update(id, patch) {
      await sleep();
      const items = load();
      const current = items.find((item) => item.id === id);
      if (!current) throw new Error('Registro não encontrado.');
      const updated = { ...current, ...patch };
      persist(items.map((item) => (item.id === id ? updated : item)));
      return updated;
    },

    async remove(id) {
      await sleep();
      persist(load().filter((item) => item.id !== id));
    },

    async replaceAll(items) {
      await sleep();
      persist(items);
    },
  };
}
