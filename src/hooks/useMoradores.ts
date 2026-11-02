import { useCallback } from 'react';
import type { EntityId } from '@/types/common';
import type { Morador, MoradorForm } from '@/types/morador';
import { moradoresService } from '@/services/api';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';

export function useMoradores() {
  const load = useCallback(() => moradoresService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Morador[]>(load, []);
  const { execute, pending } = useServiceAction();

  const criar = (form: MoradorForm, onDone?: () => void) =>
    execute(() => moradoresService.create(form), {
      successMessage: 'Morador cadastrado com sucesso.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const editar = (id: EntityId, form: MoradorForm, onDone?: () => void) =>
    execute(() => moradoresService.update(id, form), {
      successMessage: 'Cadastro do morador atualizado.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const excluir = (id: EntityId, onDone?: () => void) =>
    execute(() => moradoresService.remove(id), {
      successMessage: 'Morador removido.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  return { moradores: data, loading, error, reload, pending, criar, editar, excluir };
}
