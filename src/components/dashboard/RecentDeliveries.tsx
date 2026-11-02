import { Package } from 'lucide-react';
import type { Entrega } from '@/types/entrega';
import { ENTREGA_STATUS, ENTREGA_TIPO } from '@/constants/status';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { shortDateTime } from '@/utils/datetime';
import { unitLabel } from '@/utils/format';

export function RecentDeliveries({ entregas }: { entregas: Entrega[] }) {
  return (
    <Card title="Entregas recentes" description="Pacotes recebidos na portaria" padded={false}>
      {entregas.length === 0 ? (
        <EmptyState icon={Package} title="Nenhuma entrega registrada" description="As encomendas recebidas aparecem aqui." />
      ) : (
        <ul className="divide-y divide-slate-100">
          {entregas.map((entrega) => (
            <li key={entrega.id} className="flex items-center gap-3 px-5 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Package className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{entrega.destinatario}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {ENTREGA_TIPO[entrega.tipo]} · {unitLabel(entrega.bloco, entrega.unidade)}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge meta={ENTREGA_STATUS[entrega.status]} />
                <p className="mt-1 text-[11px] text-slate-400">{shortDateTime(entrega.recebidoEm)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
