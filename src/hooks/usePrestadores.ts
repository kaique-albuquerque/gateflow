import { useCallback } from 'react';
import type { EntityId } from '@/types/common';
import type { Prestador, PrestadorForm } from '@/types/prestador';
import { acessosService, prestadoresService } from '@/services/api';
import { DEMO_USER } from '@/constants/app';
import { nowISO } from '@/utils/datetime';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';

export function usePrestadores() {
  const load = useCallback(() => prestadoresService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Prestador[]>(load, []);
  const { execute, pending } = useServiceAction();

  const criar = (form: PrestadorForm, onDone?: () => void) =>
    execute(() => prestadoresService.create(form), {
      successMessage: 'Prestador cadastrado com sucesso.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const editar = (id: EntityId, form: PrestadorForm, onDone?: () => void) =>
    execute(() => prestadoresService.update(id, form), {
      successMessage: 'Cadastro do prestador atualizado.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const excluir = (id: EntityId, onDone?: () => void) =>
    execute(() => prestadoresService.remove(id), {
      successMessage: 'Prestador removido.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const registrarEntrada = (prestador: Prestador) =>
    execute(
      async () => {
        await prestadoresService.registrarEntrada(prestador.id);
        await acessosService.registrar({
          pessoa: prestador.nome,
          tipo: 'prestador',
          bloco: prestador.bloco,
          unidade: prestador.unidade,
          entradaEm: nowISO(),
          autorizadoPor: DEMO_USER.nome,
        });
      },
      { successMessage: `Entrada de ${prestador.nome} liberada.`, onDone: reload },
    );

  const registrarSaida = (prestador: Prestador) =>
    execute(
      async () => {
        await prestadoresService.registrarSaida(prestador.id);
        const acessos = await acessosService.list();
        const aberto = acessos.find(
          (acesso) => acesso.pessoa === prestador.nome && acesso.tipo === 'prestador' && !acesso.saidaEm,
        );
        if (aberto) await acessosService.registrarSaida(aberto.id);
      },
      { successMessage: `Saída de ${prestador.nome} registrada.`, onDone: reload },
    );

  return { prestadores: data, loading, error, reload, pending, criar, editar, excluir, registrarEntrada, registrarSaida };
}
