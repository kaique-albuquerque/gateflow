import { useMemo, useState } from 'react';
import { Plus, Wrench } from 'lucide-react';
import type { Prestador, PrestadorForm } from '@/types/prestador';
import { PRESTADOR_STATUS } from '@/constants/status';
import { PAGE_SIZE } from '@/constants/pagination';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceTable } from '@/components/ui/ResourceTable';
import { StatusFilter } from '@/components/ui/StatusFilter';
import { PrestadorFormModal } from '@/components/providers/PrestadorFormModal';
import { createPrestadorColumns } from '@/components/providers/prestador-columns';
import { usePrestadores } from '@/hooks/usePrestadores';
import { useListQuery } from '@/hooks/useListQuery';
import { matches } from '@/utils/search';
import { pluralize } from '@/utils/format';

const searchPrestador = (prestador: Prestador, query: string) =>
  matches(query, prestador.nome, prestador.empresa, prestador.servico, prestador.unidade);

export default function PrestadoresPage() {
  const {
    prestadores,
    loading,
    error,
    reload,
    pending,
    criar,
    editar,
    excluir,
    registrarEntrada,
    registrarSaida,
  } = usePrestadores();

  const [statusFilter, setStatusFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Prestador | null>(null);
  const [removing, setRemoving] = useState<Prestador | null>(null);

  const filtered = useMemo(
    () => prestadores.filter((prestador) => !statusFilter || prestador.status === statusFilter),
    [prestadores, statusFilter],
  );

  const list = useListQuery(filtered, searchPrestador);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const save = (form: PrestadorForm) => {
    if (editing) editar(editing.id, form, closeForm);
    else criar(form, closeForm);
  };

  const emServico = prestadores.filter((prestador) => prestador.status === 'no_local').length;

  const columns = createPrestadorColumns({
    pending,
    onEdit: (prestador) => {
      setEditing(prestador);
      setFormOpen(true);
    },
    onRemove: setRemoving,
    onEntrada: registrarEntrada,
    onSaida: registrarSaida,
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Prestadores"
        subtitle={`${pluralize(emServico, 'prestador em serviço', 'prestadores em serviço')} no condomínio`}
        actions={
          <Button icon={Plus} onClick={openCreate}>
            Novo prestador
          </Button>
        }
      />

      <ResourceTable
        columns={columns}
        items={list.pageItems}
        rowKey={(prestador) => prestador.id}
        loading={loading}
        error={error}
        onRetry={reload}
        searchValue={list.query}
        onSearchChange={list.setQuery}
        searchPlaceholder="Buscar por nome, empresa ou serviço"
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        onPageChange={list.setPage}
        filters={<StatusFilter map={PRESTADOR_STATUS} value={statusFilter} onChange={setStatusFilter} />}
        empty={
          <EmptyState
            icon={Wrench}
            title="Nenhum prestador encontrado"
            description="Cadastre os profissionais autorizados a executar serviços no condomínio."
            action={
              <Button size="sm" icon={Plus} onClick={openCreate}>
                Cadastrar prestador
              </Button>
            }
          />
        }
      />

      <PrestadorFormModal
        open={formOpen}
        prestador={editing}
        loading={pending}
        onClose={closeForm}
        onSubmit={save}
      />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Excluir prestador"
        description={`O cadastro de ${removing?.nome ?? ''} será removido permanentemente.`}
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
