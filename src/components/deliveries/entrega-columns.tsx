import { Bell, PackageCheck, Trash2 } from 'lucide-react';
import type { Entrega } from '@/types/entrega';
import { ENTREGA_STATUS, ENTREGA_TIPO } from '@/constants/status';
import type { Column } from '@/components/ui/DataTable';
import { IconButton } from '@/components/ui/IconButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDateTime } from '@/utils/datetime';
import { unitLabel } from '@/utils/format';

export interface EntregaColumnsHandlers {
  pending: boolean;
  onNotificar: (entrega: Entrega) => void;
  onRetirar: (entrega: Entrega) => void;
  onRemove: (entrega: Entrega) => void;
}

export function createEntregaColumns(handlers: EntregaColumnsHandlers): Column<Entrega>[] {
  return [
    {
      key: 'destinatario',
      header: 'Destinatário',
      render: (entrega) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{entrega.destinatario}</p>
          <p className="text-xs text-slate-500">Apto {unitLabel(entrega.bloco, entrega.unidade)}</p>
        </div>
      ),
    },
    {
      key: 'entrega',
      header: 'Entrega',
      render: (entrega) => (
        <div>
          <p className="text-slate-800">{ENTREGA_TIPO[entrega.tipo]}</p>
          <p className="text-xs text-slate-500">
            {entrega.transportadora} · {entrega.codigoRastreio}
          </p>
        </div>
      ),
    },
    {
      key: 'recebido',
      header: 'Recebido em',
      render: (entrega) => (
        <div>
          <p className="text-slate-800">{formatDateTime(entrega.recebidoEm)}</p>
          <p className="text-xs text-slate-500">por {entrega.recebidoPor}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (entrega) => <StatusBadge meta={ENTREGA_STATUS[entrega.status]} />,
    },
    {
      key: 'acoes',
      header: '',
      align: 'right',
      render: (entrega) => (
        <div className="flex items-center justify-end gap-0.5">
          {entrega.status === 'recebida' && (
            <IconButton
              icon={Bell}
              label="Notificar morador"
              onClick={() => handlers.onNotificar(entrega)}
              disabled={handlers.pending}
            />
          )}
          {entrega.status !== 'entregue' && (
            <IconButton
              icon={PackageCheck}
              label="Registrar retirada"
              onClick={() => handlers.onRetirar(entrega)}
              disabled={handlers.pending}
            />
          )}
          <IconButton
            icon={Trash2}
            label="Excluir do histórico"
            tone="danger"
            onClick={() => handlers.onRemove(entrega)}
            disabled={handlers.pending}
          />
        </div>
      ),
    },
  ];
}
