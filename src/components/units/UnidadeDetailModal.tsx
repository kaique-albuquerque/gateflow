import type { UnidadeView } from '@/types/unidade';
import { MORADOR_STATUS, UNIDADE_SITUACAO } from '@/constants/status';
import { DetailList } from '@/components/ui/DetailList';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { pluralize } from '@/utils/format';

interface UnidadeDetailModalProps {
  unidade: UnidadeView | null;
  onClose: () => void;
}

export function UnidadeDetailModal({ unidade, onClose }: UnidadeDetailModalProps) {
  return (
    <Modal
      open={Boolean(unidade)}
      title={unidade ? `Apto ${unidade.bloco}-${unidade.numero}` : 'Detalhes da unidade'}
      description="Moradores vinculados e situação da unidade."
      onClose={onClose}
    >
      {unidade && (
        <div className="space-y-5">
          <StatusBadge meta={UNIDADE_SITUACAO[unidade.situacao]} />

          <DetailList
            fields={[
              { label: 'Bloco', value: unidade.bloco },
              { label: 'Unidade', value: unidade.numero },
              { label: 'Responsável', value: unidade.responsavel ?? 'Sem morador vinculado' },
              { label: 'Dependentes', value: pluralize(unidade.totalDependentes, 'dependente', 'dependentes') },
            ]}
          />

          <div>
            <h3 className="mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Moradores ({unidade.moradores.length})
            </h3>
            {unidade.moradores.length === 0 ? (
              <p className="rounded-lg bg-slate-50 px-3 py-4 text-xs text-slate-500">
                Nenhum morador cadastrado nesta unidade. Use o módulo de moradores para vincular um responsável.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200">
                {unidade.moradores.map((morador) => (
                  <li key={morador.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <span className="truncate text-sm text-slate-800">{morador.nome}</span>
                    <StatusBadge
                      meta={MORADOR_STATUS[morador.status === 'ativo' ? 'ativo' : 'inativo']}
                      withDot={false}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
