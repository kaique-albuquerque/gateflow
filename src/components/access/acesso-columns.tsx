import { LogOut, Trash2 } from 'lucide-react';
import type { Acesso } from '@/types/acesso';
import { ACESSO_STATUS, ACESSO_TIPO } from '@/constants/status';
import type { Column } from '@/components/ui/DataTable';
import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/IconButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { shortDateTime } from '@/utils/datetime';
import { unitLabel } from '@/utils/format';

export interface AcessoColumnsHandlers {
  pending: boolean;
  onSaida: (acesso: Acesso) => void;
  onRemove: (acesso: Acesso) => void;
}

export function createAcessoColumns(handlers: AcessoColumnsHandlers): Column<Acesso>[] {
  return [
    {
      key: 'pessoa',
      header: 'Pessoa',
      render: (acesso) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={acesso.pessoa} />
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900">{acesso.pessoa}</p>
            <p className="text-xs text-slate-500">{ACESSO_TIPO[acesso.tipo]}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'destino',
      header: 'Destino',
      render: (acesso) => (
        <div>
          <p className="text-slate-800">Apto {unitLabel(acesso.bloco, acesso.unidade)}</p>
          <p className="text-xs text-slate-500">por {acesso.autorizadoPor}</p>
        </div>
      ),
    },
    {
      key: 'entrada',
      header: 'Entrada',
      render: (acesso) => <span className="text-slate-800">{shortDateTime(acesso.entradaEm)}</span>,
    },
    {
      key: 'saida',
      header: 'Saída',
      render: (acesso) => (
        <span className={acesso.saidaEm ? 'text-slate-800' : 'text-xs text-slate-400'}>
          {acesso.saidaEm ? shortDateTime(acesso.saidaEm) : 'Ainda no local'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (acesso) => <StatusBadge meta={ACESSO_STATUS[acesso.status]} />,
    },
    {
      key: 'acoes',
      header: '',
      align: 'right',
      render: (acesso) => (
        <div className="flex items-center justify-end gap-0.5">
          {!acesso.saidaEm && acesso.status === 'no_local' && (
            <IconButton
              icon={LogOut}
              label="Registrar saída"
              onClick={() => handlers.onSaida(acesso)}
              disabled={handlers.pending}
            />
          )}
          <IconButton
            icon={Trash2}
            label="Excluir registro"
            tone="danger"
            onClick={() => handlers.onRemove(acesso)}
            disabled={handlers.pending}
          />
        </div>
      ),
    },
  ];
}
