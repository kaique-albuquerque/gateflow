import { useMemo, useState } from 'react';
import { Plus, Users } from 'lucide-react';
import type { Morador, MoradorForm } from '@/types/morador';
import { MORADOR_STATUS } from '@/constants/status';
import { BLOCOS } from '@/constants/options';
import { PAGE_SIZE } from '@/constants/pagination';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceTable } from '@/components/ui/ResourceTable';
import { Select } from '@/components/ui/Select';
import { MoradorDetailModal } from '@/components/residents/MoradorDetailModal';
import { MoradorFormModal } from '@/components/residents/MoradorFormModal';
import { createMoradorColumns } from '@/components/residents/morador-columns';
import { useListQuery } from '@/hooks/useListQuery';
import { useMoradores } from '@/hooks/useMoradores';
import { pluralize } from '@/utils/format';
import { matches } from '@/utils/search';
import { toStatusOptions } from '@/utils/status-options';

const STATUS_OPTIONS = toStatusOptions(MORADOR_STATUS);
const BLOCO_OPTIONS = BLOCOS.map((bloco) => ({ value: bloco, label: `Bloco ${bloco}` }));

const searchMorador = (morador: Morador, query: string) =>
  matches(query, morador.nome, morador.documento, morador.email, morador.unidade, morador.bloco);

export default function MoradoresPage() {
  const { moradores, loading, error, reload, pending, criar, editar, excluir } = useMoradores();

  const [statusFilter, setStatusFilter] = useState('ativo');
  const [blocoFilter, setBlocoFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Morador | null>(null);
  const [detail, setDetail] = useState<Morador | null>(null);
  const [removing, setRemoving] = useState<Morador | null>(null);

  const filtered = useMemo(
    () =>
      moradores.filter(
        (morador) =>
          (!statusFilter || morador.status === statusFilter) &&
          (!blocoFilter || morador.bloco === blocoFilter),
      ),
    [moradores, statusFilter, blocoFilter],
  );

  const list = useListQuery(filtered, searchMorador);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const save = (form: MoradorForm) => {
    if (editing) editar(editing.id, form, closeForm);
    else criar(form, closeForm);
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const columns = createMoradorColumns({
    onDetail: setDetail,
    onEdit: (morador) => {
      setEditing(morador);
      setFormOpen(true);
    },
    onRemove: setRemoving,
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Moradores"
        subtitle={pluralize(moradores.length, 'morador cadastrado', 'moradores cadastrados')}
        actions={
          <Button icon={Plus} onClick={openCreate}>
            Novo morador
          </Button>
        }
      />

      <ResourceTable
        columns={columns}
        items={list.pageItems}
        rowKey={(morador) => morador.id}
        loading={loading}
        error={error}
        onRetry={reload}
        searchValue={list.query}
        onSearchChange={list.setQuery}
        searchPlaceholder="Buscar por nome, e-mail ou unidade"
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        onPageChange={list.setPage}
        filters={
          <>
            <Select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              options={STATUS_OPTIONS}
              placeholder="Todos os status"
              aria-label="Filtrar por situação"
              className="w-full sm:w-40"
            />
            <Select
              value={blocoFilter}
              onChange={(event) => setBlocoFilter(event.target.value)}
              options={BLOCO_OPTIONS}
              placeholder="Todos os blocos"
              aria-label="Filtrar por bloco"
              className="w-full sm:w-40"
            />
          </>
        }
        empty={
          <EmptyState
            icon={Users}
            title="Nenhum morador encontrado"
            description="Cadastre os moradores para vincular visitantes e entregas às unidades."
            action={
              <Button size="sm" icon={Plus} onClick={openCreate}>
                Cadastrar morador
              </Button>
            }
          />
        }
      />

      <MoradorFormModal
        open={formOpen}
        morador={editing}
        loading={pending}
        onClose={closeForm}
        onSubmit={save}
      />

      <MoradorDetailModal morador={detail} onClose={() => setDetail(null)} />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Excluir morador"
        description={`O cadastro de ${removing?.nome ?? ''} será removido. Visitantes já registrados permanecem no histórico.`}
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
