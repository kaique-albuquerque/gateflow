import { useMemo, useState } from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import type { Ocorrencia, OcorrenciaForm } from '@/types/ocorrencia';
import { OCORRENCIA_CATEGORIA, OCORRENCIA_STATUS } from '@/constants/status';
import { PAGE_SIZE } from '@/constants/pagination';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceTable } from '@/components/ui/ResourceTable';
import { Select } from '@/components/ui/Select';
import { StatusFilter } from '@/components/ui/StatusFilter';
import { OcorrenciaFormModal } from '@/components/occurrences/OcorrenciaFormModal';
import { createOcorrenciaColumns } from '@/components/occurrences/ocorrencia-columns';
import { useListQuery } from '@/hooks/useListQuery';
import { useOcorrencias } from '@/hooks/useOcorrencias';
import { matches } from '@/utils/search';
import { pluralize } from '@/utils/format';
import { toValueOptions } from '@/utils/status-options';

const CATEGORIA_OPTIONS = toValueOptions(OCORRENCIA_CATEGORIA);

const searchOcorrencia = (ocorrencia: Ocorrencia, query: string) =>
  matches(query, ocorrencia.titulo, ocorrencia.descricao, ocorrencia.responsavel);

export default function OcorrenciasPage() {
  const { ocorrencias, loading, error, reload, pending, criar, editar, excluir, alterarStatus } = useOcorrencias();

  const [statusFilter, setStatusFilter] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Ocorrencia | null>(null);
  const [removing, setRemoving] = useState<Ocorrencia | null>(null);

  const filtered = useMemo(
    () =>
      ocorrencias.filter(
        (ocorrencia) =>
          (!statusFilter || ocorrencia.status === statusFilter) &&
          (!categoriaFilter || ocorrencia.categoria === categoriaFilter),
      ),
    [ocorrencias, statusFilter, categoriaFilter],
  );

  const list = useListQuery(filtered, searchOcorrencia);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const save = (form: OcorrenciaForm) => {
    if (editing) editar(editing.id, form, closeForm);
    else criar(form, closeForm);
  };

  const emAberto = ocorrencias.filter((ocorrencia) => ocorrencia.status !== 'resolvida').length;

  const columns = createOcorrenciaColumns({
    pending,
    onEdit: (ocorrencia) => {
      setEditing(ocorrencia);
      setFormOpen(true);
    },
    onRemove: setRemoving,
    onIniciar: (ocorrencia) => alterarStatus(ocorrencia, 'em_andamento'),
    onResolver: (ocorrencia) => alterarStatus(ocorrencia, 'resolvida'),
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Ocorrências"
        subtitle={`${pluralize(emAberto, 'ocorrência em aberto', 'ocorrências em aberto')} no condomínio`}
        actions={
          <Button icon={Plus} onClick={openCreate}>
            Nova ocorrência
          </Button>
        }
      />

      <ResourceTable
        columns={columns}
        items={list.pageItems}
        rowKey={(ocorrencia) => ocorrencia.id}
        loading={loading}
        error={error}
        onRetry={reload}
        searchValue={list.query}
        onSearchChange={list.setQuery}
        searchPlaceholder="Buscar por título ou responsável"
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        onPageChange={list.setPage}
        filters={
          <>
            <StatusFilter map={OCORRENCIA_STATUS} value={statusFilter} onChange={setStatusFilter} />
            <Select
              value={categoriaFilter}
              onChange={(event) => setCategoriaFilter(event.target.value)}
              options={CATEGORIA_OPTIONS}
              placeholder="Todas as categorias"
              aria-label="Filtrar por categoria"
              className="w-full sm:w-48"
            />
          </>
        }
        empty={
          <EmptyState
            icon={ClipboardList}
            title="Nenhuma ocorrência encontrada"
            description="Registre problemas para acompanhar a tratativa da equipe."
            action={
              <Button size="sm" icon={Plus} onClick={openCreate}>
                Registrar ocorrência
              </Button>
            }
          />
        }
      />

      <OcorrenciaFormModal
        open={formOpen}
        ocorrencia={editing}
        loading={pending}
        onClose={closeForm}
        onSubmit={save}
      />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Excluir ocorrência"
        description={`A ocorrência "${removing?.titulo ?? ''}" será removida do histórico.`}
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
