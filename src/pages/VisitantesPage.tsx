import { useMemo, useState } from 'react';
import { Plus, UserRound } from 'lucide-react';
import type { Visitante, VisitanteForm } from '@/types/visitante';
import { PAGE_SIZE } from '@/constants/pagination';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceTable } from '@/components/ui/ResourceTable';
import { VisitanteDetailModal } from '@/components/visitors/VisitanteDetailModal';
import { VisitanteFilters } from '@/components/visitors/VisitanteFilters';
import { VisitanteFormModal } from '@/components/visitors/VisitanteFormModal';
import { createVisitanteColumns } from '@/components/visitors/visitante-columns';
import { useListQuery } from '@/hooks/useListQuery';
import { useVisitantes } from '@/hooks/useVisitantes';
import { pluralize } from '@/utils/format';
import { matches } from '@/utils/search';

const searchVisitante = (visitante: Visitante, query: string) =>
  matches(query, visitante.nome, visitante.documento, visitante.morador, visitante.unidade, visitante.bloco);

export default function VisitantesPage() {
  const {
    visitantes,
    loading,
    error,
    reload,
    pending,
    criar,
    editar,
    excluir,
    autorizar,
    negar,
    registrarEntrada,
    registrarSaida,
  } = useVisitantes();

  const [statusFilter, setStatusFilter] = useState('');
  const [blocoFilter, setBlocoFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Visitante | null>(null);
  const [detail, setDetail] = useState<Visitante | null>(null);
  const [removing, setRemoving] = useState<Visitante | null>(null);

  const filtered = useMemo(
    () =>
      visitantes.filter(
        (visitante) =>
          (!statusFilter || visitante.status === statusFilter) &&
          (!blocoFilter || visitante.bloco === blocoFilter),
      ),
    [visitantes, statusFilter, blocoFilter],
  );

  const list = useListQuery(filtered, searchVisitante);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const save = (form: VisitanteForm) => {
    if (editing) editar(editing.id, form, closeForm);
    else criar(form, closeForm);
  };

  const columns = createVisitanteColumns({
    pending,
    onDetail: setDetail,
    onEdit: (visitante) => {
      setEditing(visitante);
      setFormOpen(true);
    },
    onRemove: setRemoving,
    onAutorizar: autorizar,
    onNegar: negar,
    onEntrada: registrarEntrada,
    onSaida: registrarSaida,
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Visitantes"
        subtitle={`${pluralize(visitantes.length, 'cadastro monitorado', 'cadastros monitorados')} na portaria`}
        actions={
          <Button icon={Plus} onClick={openCreate}>
            Novo visitante
          </Button>
        }
      />

      <ResourceTable
        columns={columns}
        items={list.pageItems}
        rowKey={(visitante) => visitante.id}
        loading={loading}
        error={error}
        onRetry={reload}
        searchValue={list.query}
        onSearchChange={list.setQuery}
        searchPlaceholder="Buscar por nome, documento ou morador"
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        onPageChange={list.setPage}
        filters={
          <VisitanteFilters
            status={statusFilter}
            bloco={blocoFilter}
            onStatusChange={setStatusFilter}
            onBlocoChange={setBlocoFilter}
          />
        }
        empty={
          <EmptyState
            icon={UserRound}
            title="Nenhum visitante encontrado"
            description="Ajuste os filtros ou cadastre uma nova visita para liberar a entrada."
            action={
              <Button size="sm" icon={Plus} onClick={openCreate}>
                Cadastrar visitante
              </Button>
            }
          />
        }
      />

      <VisitanteFormModal
        open={formOpen}
        visitante={editing}
        loading={pending}
        onClose={closeForm}
        onSubmit={save}
      />

      <VisitanteDetailModal visitante={detail} onClose={() => setDetail(null)} />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Excluir visitante"
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
