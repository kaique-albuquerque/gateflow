import type { Visitante } from '@/types/visitante';
import { VISITANTE_STATUS } from '@/constants/status';
import type { Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { VisitanteRowActions } from './VisitanteRowActions';
import { formatDate } from '@/utils/datetime';
import { unitLabel } from '@/utils/format';

export interface VisitanteColumnsHandlers {
  pending: boolean;
  onDetail: (visitante: Visitante) => void;
  onEdit: (visitante: Visitante) => void;
  onRemove: (visitante: Visitante) => void;
  onAutorizar: (visitante: Visitante) => void;
  onNegar: (visitante: Visitante) => void;
  onEntrada: (visitante: Visitante) => void;
  onSaida: (visitante: Visitante) => void;
}

export function createVisitanteColumns(handlers: VisitanteColumnsHandlers): Column<Visitante>[] {
  return [
    {
      key: 'visitante',
      header: 'Visitante',
      render: (visitante) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{visitante.nome}</p>
          <p className="text-xs text-slate-500">
            {visitante.documento} · {visitante.telefone}
          </p>
        </div>
      ),
    },
    {
      key: 'destino',
      header: 'Destino',
      render: (visitante) => (
        <div>
          <p className="text-slate-800">Apto {unitLabel(visitante.bloco, visitante.unidade)}</p>
          <p className="text-xs text-slate-500">{visitante.morador}</p>
        </div>
      ),
    },
    {
      key: 'visita',
      header: 'Visita',
      render: (visitante) => (
        <div>
          <p className="text-slate-800">
            {formatDate(visitante.dataVisita)} · {visitante.horaPrevista}
          </p>
          <p className="text-xs text-slate-500">{visitante.motivo}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (visitante) => <StatusBadge meta={VISITANTE_STATUS[visitante.status]} />,
    },
    {
      key: 'acoes',
      header: '',
      align: 'right',
      render: (visitante) => (
        <VisitanteRowActions
          visitante={visitante}
          disabled={handlers.pending}
          onDetail={() => handlers.onDetail(visitante)}
          onEdit={() => handlers.onEdit(visitante)}
          onRemove={() => handlers.onRemove(visitante)}
          onAutorizar={() => handlers.onAutorizar(visitante)}
          onNegar={() => handlers.onNegar(visitante)}
          onEntrada={() => handlers.onEntrada(visitante)}
          onSaida={() => handlers.onSaida(visitante)}
        />
      ),
    },
  ];
}
