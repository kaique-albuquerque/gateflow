import { useCallback } from 'react';
import type { EntityId } from '@/types/common';
import type { Acesso } from '@/types/acesso';
import { acessosService } from '@/services/api';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';

export function useAcessos() {
  const load = useCallback(() => acessosService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Acesso[]>(load, []);
  const { execute, pending } = useServiceAction();

  const registrarSaida = (acesso: Acesso) =>
    execute(() => acessosService.registrarSaida(acesso.id), {
      successMessage: `Saída de ${acesso.pessoa} registrada.`,
      onDone: reload,
    });

  const excluir = (id: EntityId, onDone?: () => void) =>
    execute(() => acessosService.remove(id), {
      successMessage: 'Registro de acesso removido.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  return { acessos: data, loading, error, reload, pending, registrarSaida, excluir };
}
