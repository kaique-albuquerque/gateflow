import { useCallback } from 'react';
import type { Dispositivo } from '@/types/dispositivo';
import { dispositivosService } from '@/services/api';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';

export function useDispositivos() {
  const load = useCallback(() => dispositivosService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Dispositivo[]>(load, []);
  const { execute, pending } = useServiceAction();

  const simularConexao = (dispositivo: Dispositivo) =>
    execute(() => dispositivosService.simularConexao(dispositivo.id), {
      successMessage: `${dispositivo.nome} reconectado (simulação).`,
      onDone: reload,
    });

  const reiniciarSimulacao = (dispositivo: Dispositivo) =>
    execute(() => dispositivosService.atualizarStatus(dispositivo.id, 'desconectado'), {
      successMessage: `${dispositivo.nome} marcado como desconectado (simulação).`,
      onDone: reload,
    });

  return { dispositivos: data, loading, error, reload, pending, simularConexao, reiniciarSimulacao };
}
