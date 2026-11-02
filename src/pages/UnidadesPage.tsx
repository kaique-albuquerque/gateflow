import { useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import type { UnidadeView } from '@/types/unidade';
import { BLOCOS } from '@/constants/options';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
import { UnidadeCard } from '@/components/units/UnidadeCard';
import { UnidadeDetailModal } from '@/components/units/UnidadeDetailModal';
import { useUnidades } from '@/hooks/useUnidades';
import { pluralize } from '@/utils/format';

export default function UnidadesPage() {
  const { unidades, loading, error, reload } = useUnidades();
  const [selected, setSelected] = useState<UnidadeView | null>(null);

  const resumo = useMemo(
    () => ({
      ocupadas: unidades.filter((unidade) => unidade.situacao === 'ocupada').length,
      vazias: unidades.filter((unidade) => unidade.situacao === 'vazia').length,
      manutencao: unidades.filter((unidade) => unidade.situacao === 'manutencao').length,
    }),
    [unidades],
  );

  const blocos = useMemo(
    () => BLOCOS.map((bloco) => ({ bloco, lista: unidades.filter((unidade) => unidade.bloco === bloco) })),
    [unidades],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Unidades"
        subtitle={`${pluralize(unidades.length, 'unidade monitorada', 'unidades monitoradas')} em ${BLOCOS.length} blocos`}
        actions={
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone="success" withDot>
              {resumo.ocupadas} ocupadas
            </Badge>
            <Badge tone="warning" withDot>
              {resumo.vazias} sem morador
            </Badge>
            <Badge tone="info" withDot>
              {resumo.manutencao} em manutenção
            </Badge>
          </div>
        }
      />

      {error ? (
        <div className="surface">
          <ErrorState message={error} onRetry={reload} />
        </div>
      ) : loading ? (
        <div className="surface">
          <LoadingState label="Consolidando unidades..." />
        </div>
      ) : unidades.length === 0 ? (
        <div className="surface">
          <EmptyState
            icon={Building2}
            title="Nenhuma unidade cadastrada"
            description="A malha de unidades do condomínio ainda não foi configurada."
          />
        </div>
      ) : (
        <div className="space-y-6">
          {blocos.map(({ bloco, lista }) => (
            <section key={bloco} className="space-y-2.5">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900">Bloco {bloco}</h2>
                <span className="text-[11px] text-slate-400">
                  {pluralize(lista.length, 'unidade', 'unidades')} ·{' '}
                  {lista.filter((unidade) => unidade.situacao === 'ocupada').length} ocupadas
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {lista.map((unidade) => (
                  <UnidadeCard key={unidade.id} unidade={unidade} onClick={() => setSelected(unidade)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <UnidadeDetailModal unidade={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
