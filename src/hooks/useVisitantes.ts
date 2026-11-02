import { useCallback } from 'react';
import type { EntityId } from '@/types/common';
import type { Visitante, VisitanteForm } from '@/types/visitante';
import { visitantesService, acessosService } from '@/services/api';
import { DEMO_USER } from '@/constants/app';
import { useAsyncData } from './useAsyncData';
import { useServiceAction } from './useServiceAction';
import { nowISO } from '@/utils/datetime';

export function useVisitantes() {
  const load = useCallback(() => visitantesService.list(), []);
  const { data, loading, error, reload } = useAsyncData<Visitante[]>(load, []);
  const { execute, pending } = useServiceAction();

  const criar = (form: VisitanteForm, onDone?: () => void) =>
    execute(() => visitantesService.create(form), {
      successMessage: 'Visitante cadastrado com sucesso.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const editar = (id: EntityId, form: VisitanteForm, onDone?: () => void) =>
    execute(() => visitantesService.update(id, form), {
      successMessage: 'Cadastro atualizado.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const excluir = (id: EntityId, onDone?: () => void) =>
    execute(() => visitantesService.remove(id), {
      successMessage: 'Visitante removido.',
      onDone: () => {
        reload();
        onDone?.();
      },
    });

  const autorizar = (visitante: Visitante) =>
    execute(() => visitantesService.atualizarStatus(visitante.id, 'autorizado'), {
      successMessage: `Entrada de ${visitante.nome} autorizada.`,
      onDone: reload,
    });

  const negar = (visitante: Visitante) =>
    execute(() => visitantesService.atualizarStatus(visitante.id, 'negado'), {
      successMessage: `Entrada de ${visitante.nome} negada.`,
      onDone: reload,
    });

  const registrarEntrada = (visitante: Visitante) =>
    execute(
      async () => {
        await visitantesService.registrarEntrada(visitante.id);
        await acessosService.registrar({
          pessoa: visitante.nome,
          tipo: 'visitante',
          bloco: visitante.bloco,
          unidade: visitante.unidade,
          entradaEm: nowISO(),
          autorizadoPor: DEMO_USER.nome,
        });
      },
      { successMessage: `${visitante.nome} entrou no condomínio.`, onDone: reload },
    );

  const registrarSaida = (visitante: Visitante) =>
    execute(
      async () => {
        await visitantesService.registrarSaida(visitante.id);
        const acessos = await acessosService.list();
        const aberto = acessos.find(
          (acesso) => acesso.pessoa === visitante.nome && acesso.tipo === 'visitante' && !acesso.saidaEm,
        );
        if (aberto) await acessosService.registrarSaida(aberto.id);
      },
      { successMessage: `Saída de ${visitante.nome} registrada.`, onDone: reload },
    );

  return { visitantes: data, loading, error, reload, pending, criar, editar, excluir, autorizar, negar, registrarEntrada, registrarSaida };
}
