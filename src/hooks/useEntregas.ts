import { useCallback } from 'react';
import type { EntityId } from '@/types/common';
import type { Entrega, EntregaForm } from '@/types/entrega';
import { entregasService } from '@/services/api';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';

export function useEntregas() {
  const load = useCallback(() => entregasService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Entrega[]>(load, []);
  const { execute, pending } = useServiceAction();

  const criar = (form: EntregaForm, onDone?: () => void) =>
    execute(() => entregasService.create(form), {
      successMessage: 'Entrega registrada na portaria.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const excluir = (id: EntityId, onDone?: () => void) =>
    execute(() => entregasService.remove(id), {
      successMessage: 'Entrega removida do histórico.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const notificar = (entrega: Entrega) =>
    execute(() => entregasService.notificarMorador(entrega.id), {
      successMessage: `Notificação enviada para ${entrega.destinatario}.`,
      onDone: reload,
    });

  const registrarRetirada = (id: EntityId, retiradoPor: string, onDone?: () => void) =>
    execute(() => entregasService.registrarRetirada(id, retiradoPor), {
      successMessage: 'Retirada registrada com sucesso.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  return { entregas: data, loading, error, reload, pending, criar, excluir, notificar, registrarRetirada };
}
