import { Pencil, Trash2, UserRound } from 'lucide-react';
import type { Morador } from '@/types/morador';
import { MORADOR_STATUS } from '@/constants/status';
import type { Column } from '@/components/ui/DataTable';
import { IconButton } from '@/components/ui/IconButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatPhone, pluralize, unitLabel } from '@/utils/format';

export interface MoradorColumnsHandlers {
  onDetail: (morador: Morador) => void;
  onEdit: (morador: Morador) => void;
  onRemove: (morador: Morador) => void;
}

export function createMoradorColumns(handlers: MoradorColumnsHandlers): Column<Morador>[] {
  return [
    {
      key: 'morador',
      header: 'Morador',
      render: (morador) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{morador.nome}</p>
          <p className="text-xs text-slate-500">{morador.email}</p>
        </div>
      ),
    },
    {
      key: 'contato',
      header: 'Contato',
      render: (morador) => (
        <div>
          <p className="text-slate-800">{formatPhone(morador.telefone)}</p>
          <p className="text-xs text-slate-500">{morador.documento}</p>
        </div>
      ),
    },
    {
      key: 'unidade',
      header: 'Unidade',
      render: (morador) => (
        <div>
          <p className="text-slate-800">Apto {unitLabel(morador.bloco, morador.unidade)}</p>
          <p className="text-xs text-slate-500">
            {morador.dependentes === 0
              ? 'Sem dependentes'
              : pluralize(morador.dependentes, 'dependente', 'dependentes')}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (morador) => <StatusBadge meta={MORADOR_STATUS[morador.status]} />,
    },
    {
      key: 'acoes',
      header: '',
      align: 'right',
      render: (morador) => (
        <div className="flex items-center justify-end gap-0.5">
          <IconButton icon={UserRound} label="Ver detalhes" onClick={() => handlers.onDetail(morador)} />
          <IconButton icon={Pencil} label="Editar morador" onClick={() => handlers.onEdit(morador)} />
          <IconButton
            icon={Trash2}
            label="Excluir morador"
            tone="danger"
            onClick={() => handlers.onRemove(morador)}
          />
        </div>
      ),
    },
  ];
}
