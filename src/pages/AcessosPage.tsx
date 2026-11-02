import { useMemo, useState } from 'react';
import { DoorOpen } from 'lucide-react';
import type { Acesso, AcessoTipo } from '@/types/acesso';
import { ACESSO_STATUS, ACESSO_TIPO } from '@/constants/status';
import { PAGE_SIZE } from '@/constants/pagination';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceTable } from '@/components/ui/ResourceTable';
import { Select } from '@/components/ui/Select';
import { StatusFilter } from '@/components/ui/StatusFilter';
import { createAcessoColumns } from '@/components/access/acesso-columns';
import { useAcessos } from '@/hooks/useAcessos';
import { useListQuery } from '@/hooks/useListQuery';
import { matches } from '@/utils/search';
import { pluralize } from '@/utils/format';
import { toValueOptions } from '@/utils/status-options';

const TIPO_OPTIONS = toValueOptions(ACESSO_TIPO);

const searchAcesso = (acesso: Acesso, query: string) =>
  matches(query, acesso.pessoa, acesso.unidade, acesso.bloco, acesso.autorizadoPor);

export default function AcessosPage() {
  const { acessos, loading, error, reload, pending, registrarSaida, excluir } = useAcessos();

  const [statusFilter, setStatusFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [removing, setRemoving] = useState<Acesso | null>(null);

  const filtered = useMemo(
    () =>
      acessos.filter(
        (acesso) =>
          (!statusFilter || acesso.status === statusFilter) &&
          (!tipoFilter || acesso.tipo === (tipoFilter as AcessoTipo)),
      ),
    [acessos, statusFilter, tipoFilter],
  );

  const list = useListQuery(filtered, searchAcesso);
  const noLocal = acessos.filter((acesso) => acesso.status === 'no_local').length;

  const columns = createAcessoColumns({ pending, onSaida: registrarSaida, onRemove: setRemoving });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Acessos"
        subtitle={`${pluralize(noLocal, 'pessoa no condomínio', 'pessoas no condomínio')} · ${pluralize(acessos.length, 'registro total', 'registros totais')}`}
      />

      <ResourceTable
        columns={columns}
        items={list.pageItems}
        rowKey={(acesso) => acesso.id}
        loading={loading}
        error={error}
        onRetry={reload}
        searchValue={list.query}
        onSearchChange={list.setQuery}
        searchPlaceholder="Buscar por pessoa ou unidade"
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        onPageChange={list.setPage}
        filters={
          <>
            <StatusFilter map={ACESSO_STATUS} value={statusFilter} onChange={setStatusFilter} />
            <Select
              value={tipoFilter}
              onChange={(event) => setTipoFilter(event.target.value)}
              options={TIPO_OPTIONS}
              placeholder="Todos os tipos"
              aria-label="Filtrar por tipo"
              className="w-full sm:w-48"
            />
          </>
        }
        empty={
          <EmptyState
            icon={DoorOpen}
            title="Nenhum acesso encontrado"
            description="Os acessos liberados na portaria aparecem aqui automaticamente."
          />
        }
      />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Excluir registro de acesso"
        description={`O acesso de ${removing?.pessoa ?? ''} será removido do histórico.`}
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
