import { Check, UserRound, X } from 'lucide-react';
import type { Visitante } from '@/types/visitante';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { formatTime } from '@/utils/datetime';
import { unitLabel } from '@/utils/format';

interface PendingVisitorsProps {
  visitantes: Visitante[];
  pending: boolean;
  onAutorizar: (visitante: Visitante) => void;
  onNegar: (visitante: Visitante) => void;
}

export function PendingVisitors({ visitantes, pending, onAutorizar, onNegar }: PendingVisitorsProps) {
  return (
    <Card
      title="Aguardando autorização"
      description="Libere ou negue a entrada sem sair do painel"
      padded={false}
    >
      {visitantes.length === 0 ? (
        <EmptyState
          icon={UserRound}
          title="Nenhum visitante na fila"
          description="Todas as solicitações de entrada já foram tratadas."
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {visitantes.map((visitante) => (
            <li key={visitante.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
              <Avatar name={visitante.nome} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{visitante.nome}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {unitLabel(visitante.bloco, visitante.unidade)} · {visitante.motivo}
                </p>
              </div>
              <span className="text-[11px] text-slate-400">{formatTime(visitante.criadoEm)}</span>
              <div className="flex items-center gap-1.5">
                <Button size="sm" variant="success" icon={Check} disabled={pending} onClick={() => onAutorizar(visitante)}>
                  Autorizar
                </Button>
                <Button size="sm" variant="secondary" icon={X} disabled={pending} onClick={() => onNegar(visitante)}>
                  Negar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
