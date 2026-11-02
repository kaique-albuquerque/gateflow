import { DoorOpen } from 'lucide-react';
import type { Acesso } from '@/types/acesso';
import { ACESSO_STATUS, ACESSO_TIPO } from '@/constants/status';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { shortDateTime, formatTime } from '@/utils/datetime';
import { unitLabel } from '@/utils/format';

export function RecentAccessList({ acessos }: { acessos: Acesso[] }) {
  return (
    <Card title="Últimos acessos" description="Registros mais recentes da portaria" padded={false}>
      {acessos.length === 0 ? (
        <EmptyState icon={DoorOpen} title="Nenhum acesso registrado" description="Os acessos liberados aparecem aqui." />
      ) : (
        <ul className="divide-y divide-slate-100">
          {acessos.map((acesso) => (
            <li key={acesso.id} className="flex items-center gap-3 px-5 py-3">
              <Avatar name={acesso.pessoa} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{acesso.pessoa}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {ACESSO_TIPO[acesso.tipo]} · {unitLabel(acesso.bloco, acesso.unidade)}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge meta={ACESSO_STATUS[acesso.status]} />
                <p className="mt-1 text-[11px] text-slate-400" title={shortDateTime(acesso.entradaEm)}>
                  {formatTime(acesso.entradaEm)}
                  {acesso.saidaEm && ` → ${formatTime(acesso.saidaEm)}`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
