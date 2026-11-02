import { useCallback, useMemo } from 'react';
import type { UnidadeView } from '@/types/unidade';
import { moradoresService } from '@/services/api';
import { unidadesBase } from '@/data/unidades';
import { useAsyncData } from './useAsyncData';

/** Consolida a malha de unidades com os moradores cadastrados. */
export function useUnidades() {
  const load = useCallback(() => moradoresService.list(), []);
  const { data, loading, error, reload } = useAsyncData(load, []);

  const unidades = useMemo<UnidadeView[]>(
    () =>
      unidadesBase.map((base) => {
        const moradoresDaUnidade = data.filter(
          (morador) => morador.bloco === base.bloco && morador.unidade === base.numero,
        );
        const ativos = moradoresDaUnidade.filter((morador) => morador.status === 'ativo');
        const situacao = base.situacao === 'manutencao' || ativos.length === 0 ? base.situacao : 'ocupada';

        return {
          ...base,
          situacao,
          responsavel: ativos[0]?.nome ?? null,
          totalMoradores: moradoresDaUnidade.length,
          totalDependentes: moradoresDaUnidade.reduce((total, morador) => total + morador.dependentes, 0),
          moradores: moradoresDaUnidade.map((morador) => ({
            id: morador.id,
            nome: morador.nome,
            status: morador.status,
          })),
        };
      }),
    [data],
  );

  return { unidades, loading, error, reload };
}
