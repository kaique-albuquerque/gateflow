import type { Morador } from '@/types/morador';
import { MORADOR_STATUS } from '@/constants/status';
import { DetailList } from '@/components/ui/DetailList';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate, formatDateTime } from '@/utils/datetime';
import { formatPhone, pluralize, unitLabel } from '@/utils/format';

interface MoradorDetailModalProps {
  morador: Morador | null;
  onClose: () => void;
}

export function MoradorDetailModal({ morador, onClose }: MoradorDetailModalProps) {
  return (
    <Modal
      open={Boolean(morador)}
      title={morador?.nome ?? 'Detalhes do morador'}
      description="Dados de contato e vínculo com a unidade."
      onClose={onClose}
    >
      {morador && (
        <div className="space-y-5">
          <StatusBadge meta={MORADOR_STATUS[morador.status]} />
          <DetailList
            fields={[
              { label: 'Documento', value: morador.documento },
              { label: 'Telefone', value: formatPhone(morador.telefone) },
              { label: 'E-mail', value: morador.email },
              { label: 'Unidade', value: `Apto ${unitLabel(morador.bloco, morador.unidade)}` },
              {
                label: 'Dependentes',
                value: morador.dependentes === 0 ? 'Nenhum' : pluralize(morador.dependentes, 'dependente', 'dependentes'),
              },
              { label: 'Cadastrado em', value: formatDateTime(morador.criadoEm) },
              { label: 'Última atualização', value: formatDate(morador.criadoEm) },
            ]}
          />
        </div>
      )}
    </Modal>
  );
}
