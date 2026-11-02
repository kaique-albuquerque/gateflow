import { AlertTriangle } from 'lucide-react';
import type { Ocorrencia } from '@/types/ocorrencia';
import { OCORRENCIA_CATEGORIA, OCORRENCIA_STATUS } from '@/constants/status';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { shortDateTime } from '@/utils/datetime';

export function OpenOccurrences({ ocorrencias }: { ocorrencias: Ocorrencia[] }) {
  return (
    <Card title="Ocorrências em aberto" description="Itens que ainda exigem tratativa" padded={false}>
      {ocorrencias.length === 0 ? (
        <EmptyState
          icon={AlertTriangle}
          title="Nenhuma ocorrência em aberto"
          description="A operação está sem pendências registradas."
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {ocorrencias.map((ocorrencia) => (
            <li key={ocorrencia.id} className="px-5 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{ocorrencia.titulo}</p>
                  <p className="truncate text-[11px] text-slate-500">
                    {OCORRENCIA_CATEGORIA[ocorrencia.categoria]} · {ocorrencia.responsavel}
                  </p>
                </div>
                <StatusBadge meta={OCORRENCIA_STATUS[ocorrencia.status]} />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">{shortDateTime(ocorrencia.criadoEm)}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
