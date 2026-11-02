import { Check, Pencil, Play, Trash2 } from 'lucide-react';
import type { Ocorrencia } from '@/types/ocorrencia';
import { OCORRENCIA_CATEGORIA, OCORRENCIA_STATUS } from '@/constants/status';
import type { Column } from '@/components/ui/DataTable';
import { IconButton } from '@/components/ui/IconButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { shortDateTime } from '@/utils/datetime';

export interface OcorrenciaColumnsHandlers {
  pending: boolean;
  onEdit: (ocorrencia: Ocorrencia) => void;
  onRemove: (ocorrencia: Ocorrencia) => void;
  onIniciar: (ocorrencia: Ocorrencia) => void;
  onResolver: (ocorrencia: Ocorrencia) => void;
}

export function createOcorrenciaColumns(handlers: OcorrenciaColumnsHandlers): Column<Ocorrencia>[] {
  return [
    {
      key: 'ocorrencia',
      header: 'Ocorrência',
      render: (ocorrencia) => (
        <div className="min-w-0 max-w-xs">
          <p className="font-medium text-slate-900">{ocorrencia.titulo}</p>
          <p className="line-clamp-2 text-xs text-slate-500">{ocorrencia.descricao}</p>
        </div>
      ),
    },
    {
      key: 'categoria',
      header: 'Categoria',
      render: (ocorrencia) => (
        <div>
          <p className="text-slate-800">{OCORRENCIA_CATEGORIA[ocorrencia.categoria]}</p>
          <p className="text-xs text-slate-500">{ocorrencia.responsavel}</p>
        </div>
      ),
    },
    {
      key: 'criado',
      header: 'Registrada em',
      render: (ocorrencia) => <span className="text-slate-800">{shortDateTime(ocorrencia.criadoEm)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (ocorrencia) => <StatusBadge meta={OCORRENCIA_STATUS[ocorrencia.status]} />,
    },
    {
      key: 'acoes',
      header: '',
      align: 'right',
      render: (ocorrencia) => (
        <div className="flex items-center justify-end gap-0.5">
          {ocorrencia.status === 'aberta' && (
            <IconButton
              icon={Play}
              label="Iniciar tratativa"
              onClick={() => handlers.onIniciar(ocorrencia)}
              disabled={handlers.pending}
            />
          )}
          {ocorrencia.status === 'em_andamento' && (
            <IconButton
              icon={Check}
              label="Marcar como resolvida"
              onClick={() => handlers.onResolver(ocorrencia)}
              disabled={handlers.pending}
            />
          )}
          <IconButton icon={Pencil} label="Editar ocorrência" onClick={() => handlers.onEdit(ocorrencia)} />
          <IconButton
            icon={Trash2}
            label="Excluir ocorrência"
            tone="danger"
            onClick={() => handlers.onRemove(ocorrencia)}
          />
        </div>
      ),
    },
  ];
}
