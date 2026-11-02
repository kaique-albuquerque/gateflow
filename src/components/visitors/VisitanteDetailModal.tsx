import type { Visitante } from '@/types/visitante';
import { VISITANTE_STATUS } from '@/constants/status';
import { DetailList } from '@/components/ui/DetailList';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDateTime, formatTime } from '@/utils/datetime';
import { formatPhone, unitLabel } from '@/utils/format';

interface VisitanteDetailModalProps {
  visitante: Visitante | null;
  onClose: () => void;
}

export function VisitanteDetailModal({ visitante, onClose }: VisitanteDetailModalProps) {
  return (
    <Modal
      open={Boolean(visitante)}
      title={visitante?.nome ?? 'Detalhes do visitante'}
      description="Informações completas do cadastro e da visita."
      onClose={onClose}
    >
      {visitante && (
        <div className="space-y-5">
          <StatusBadge meta={VISITANTE_STATUS[visitante.status]} />
          <DetailList
            fields={[
              { label: 'Documento', value: visitante.documento },
              { label: 'Telefone', value: formatPhone(visitante.telefone) },
              { label: 'Destino', value: `Apto ${unitLabel(visitante.bloco, visitante.unidade)}` },
              { label: 'Morador responsável', value: visitante.morador },
              { label: 'Motivo', value: visitante.motivo, full: true },
              { label: 'Data da visita', value: visitante.dataVisita },
              { label: 'Horário previsto', value: visitante.horaPrevista },
              { label: 'Entrada registrada', value: formatDateTime(visitante.entradaEm) },
              { label: 'Saída registrada', value: visitante.saidaEm ? formatTime(visitante.saidaEm) : '—' },
              { label: 'Cadastrado em', value: formatDateTime(visitante.criadoEm) },
            ]}
          />
        </div>
      )}
    </Modal>
  );
}
