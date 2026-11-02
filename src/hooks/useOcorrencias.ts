import { useCallback } from 'react';
import type { EntityId } from '@/types/common';
import type { Ocorrencia, OcorrenciaForm, OcorrenciaStatus } from '@/types/ocorrencia';
import { ocorrenciasService } from '@/services/api';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';

export function useOcorrencias() {
  const load = useCallback(() => ocorrenciasService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Ocorrencia[]>(load, []);
  const { execute, pending } = useServiceAction();

  const criar = (form: OcorrenciaForm, onDone?: () => void) =>
    execute(() => ocorrenciasService.create(form), {
      successMessage: 'Ocorrência registrada.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const editar = (id: EntityId, form: OcorrenciaForm, onDone?: () => void) =>
    execute(() => ocorrenciasService.update(id, form), {
      successMessage: 'Ocorrência atualizada.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const excluir = (id: EntityId, onDone?: () => void) =>
    execute(() => ocorrenciasService.remove(id), {
      successMessage: 'Ocorrência removida.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const alterarStatus = (ocorrencia: Ocorrencia, status: OcorrenciaStatus) =>
    execute(() => ocorrenciasService.atualizarStatus(ocorrencia.id, status), {
      successMessage: 'Status da ocorrência atualizado.',
      onDone: reload,
    });

  return { ocorrencias: data, loading, error, reload, pending, criar, editar, excluir, alterarStatus };
}
