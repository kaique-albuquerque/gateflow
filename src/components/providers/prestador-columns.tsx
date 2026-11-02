import { LogIn, LogOut, Pencil, Trash2 } from 'lucide-react';
import type { Prestador } from '@/types/prestador';
import { PRESTADOR_STATUS } from '@/constants/status';
import type { Column } from '@/components/ui/DataTable';
import { IconButton } from '@/components/ui/IconButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDateTime } from '@/utils/datetime';
import { formatPhone, unitLabel } from '@/utils/format';

export interface PrestadorColumnsHandlers {
  pending: boolean;
  onEdit: (prestador: Prestador) => void;
  onRemove: (prestador: Prestador) => void;
  onEntrada: (prestador: Prestador) => void;
  onSaida: (prestador: Prestador) => void;
}

export function createPrestadorColumns(handlers: PrestadorColumnsHandlers): Column<Prestador>[] {
  return [
    {
      key: 'prestador',
      header: 'Prestador',
      render: (prestador) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{prestador.nome}</p>
          <p className="text-xs text-slate-500">
            {prestador.empresa} · {formatPhone(prestador.telefone)}
          </p>
        </div>
      ),
    },
    {
      key: 'servico',
      header: 'Serviço',
      render: (prestador) => (
        <div>
          <p className="text-slate-800">{prestador.servico}</p>
          <p className="text-xs text-slate-500">Apto {unitLabel(prestador.bloco, prestador.unidade)}</p>
        </div>
      ),
    },
    {
      key: 'entrada',
      header: 'Entrada',
      render: (prestador) => <span className="text-slate-800">{formatDateTime(prestador.entradaEm)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (prestador) => <StatusBadge meta={PRESTADOR_STATUS[prestador.status]} />,
    },
    {
      key: 'acoes',
      header: '',
      align: 'right',
      render: (prestador) => (
        <div className="flex items-center justify-end gap-0.5">
          {prestador.status === 'aguardando' && (
            <IconButton
              icon={LogIn}
              label="Liberar entrada"
              onClick={() => handlers.onEntrada(prestador)}
              disabled={handlers.pending}
            />
          )}
          {prestador.status === 'no_local' && (
            <IconButton
              icon={LogOut}
              label="Registrar saída"
              onClick={() => handlers.onSaida(prestador)}
              disabled={handlers.pending}
            />
          )}
          <IconButton icon={Pencil} label="Editar prestador" onClick={() => handlers.onEdit(prestador)} />
          <IconButton
            icon={Trash2}
            label="Excluir prestador"
            tone="danger"
            onClick={() => handlers.onRemove(prestador)}
          />
        </div>
      ),
    },
  ];
}
