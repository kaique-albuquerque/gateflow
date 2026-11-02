import type { UnidadeView } from '@/types/unidade';
import { UNIDADE_SITUACAO } from '@/constants/status';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { pluralize } from '@/utils/format';

interface UnidadeCardProps {
  unidade: UnidadeView;
  onClick: () => void;
}

export function UnidadeCard({ unidade, onClick }: UnidadeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="surface w-full p-4 text-left transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">
            Apto {unidade.bloco}-{unidade.numero}
          </p>
          <p className="truncate text-xs text-slate-500">
            {unidade.responsavel ?? 'Sem morador vinculado'}
          </p>
        </div>
        <StatusBadge meta={UNIDADE_SITUACAO[unidade.situacao]} withDot={false} />
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        {pluralize(unidade.totalMoradores, 'morador', 'moradores')} ·{' '}
        {pluralize(unidade.totalDependentes, 'dependente', 'dependentes')}
      </p>
    </button>
  );
}
