import { useMemo, useState } from 'react';
import { Package, Plus } from 'lucide-react';
import type { Entrega } from '@/types/entrega';
import { ENTREGA_STATUS } from '@/constants/status';
import { PAGE_SIZE } from '@/constants/pagination';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceTable } from '@/components/ui/ResourceTable';
import { StatusFilter } from '@/components/ui/StatusFilter';
import { EntregaFormModal } from '@/components/deliveries/EntregaFormModal';
import { EntregaRetiradaModal } from '@/components/deliveries/EntregaRetiradaModal';
import { createEntregaColumns } from '@/components/deliveries/entrega-columns';
import { useEntregas } from '@/hooks/useEntregas';
import { useListQuery } from '@/hooks/useListQuery';
import { matches } from '@/utils/search';
import { pluralize } from '@/utils/format';

const searchEntrega = (entrega: Entrega, query: string) =>
  matches(query, entrega.destinatario, entrega.codigoRastreio, entrega.transportadora, entrega.unidade);

export default function EntregasPage() {
  const { entregas, loading, error, reload, pending, criar, excluir, notificar, registrarRetirada } = useEntregas();

  const [statusFilter, setStatusFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [retirando, setRetirando] = useState<Entrega | null>(null);
  const [removing, setRemoving] = useState<Entrega | null>(null);

  const filtered = useMemo(
    () => entregas.filter((entrega) => !statusFilter || entrega.status === statusFilter),
    [entregas, statusFilter],
  );

  const list = useListQuery(filtered, searchEntrega);
  const aguardando = entregas.filter((entrega) => entrega.status !== 'entregue').length;

  const columns = createEntregaColumns({
    pending,
    onNotificar: notificar,
    onRetirar: setRetirando,
    onRemove: setRemoving,
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Entregas"
        subtitle={`${pluralize(aguardando, 'encomenda aguardando retirada', 'encomendas aguardando retirada')} de ${entregas.length} registradas`}
        actions={
          <Button icon={Plus} onClick={() => setFormOpen(true)}>
            Registrar entrega
          </Button>
        }
      />

      <ResourceTable
        columns={columns}
        items={list.pageItems}
        rowKey={(entrega) => entrega.id}
        loading={loading}
        error={error}
        onRetry={reload}
        searchValue={list.query}
        onSearchChange={list.setQuery}
        searchPlaceholder="Buscar por destinatário ou rastreio"
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        onPageChange={list.setPage}
        filters={<StatusFilter map={ENTREGA_STATUS} value={statusFilter} onChange={setStatusFilter} />}
        empty={
          <EmptyState
            icon={Package}
            title="Nenhuma entrega encontrada"
            description="Registre os pacotes recebidos na portaria para controlar a retirada."
            action={
              <Button size="sm" icon={Plus} onClick={() => setFormOpen(true)}>
                Registrar entrega
              </Button>
            }
          />
        }
      />

      <EntregaFormModal open={formOpen} loading={pending} onClose={() => setFormOpen(false)} onSubmit={(form) => criar(form, () => setFormOpen(false))} />

      <EntregaRetiradaModal
        entrega={retirando}
        loading={pending}
        onClose={() => setRetirando(null)}
        onConfirm={(retiradoPor) => {
          if (retirando) registrarRetirada(retirando.id, retiradoPor, () => setRetirando(null));
        }}
      />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Excluir entrega"
        description={`O registro de ${removing?.destinatario ?? ''} será removido do histórico.`}
        confirmLabel="Excluir"
        loading={pending}
        onClose={() => setRemoving(null)}
        onConfirm={() => {
          if (removing) excluir(removing.id, () => setRemoving(null));
        }}
      />
    </div>
  );
}
