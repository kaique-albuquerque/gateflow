import type { EntityId } from '@/types/common';

/**
 * Contrato de persistência usado pela camada de serviço.
 * Trocar o mock por uma API REST significa implementar esta interface.
 */
export interface Repository<T extends { id: EntityId }> {
  list(): Promise<T[]>;
  find(id: EntityId): Promise<T | null>;
  create(data: Omit<T, 'id'> & { id?: EntityId }): Promise<T>;
  update(id: EntityId, patch: Partial<T>): Promise<T>;
  remove(id: EntityId): Promise<void>;
  replaceAll(items: T[]): Promise<void>;
}

export type SyncKind = 'created' | 'updated' | 'removed' | 'reset';
