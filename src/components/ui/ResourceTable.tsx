import type { ReactNode } from 'react';
import { DataTable } from './DataTable';
import type { Column } from './DataTable';
import { ErrorState } from './ErrorState';
import { ListToolbar } from './ListToolbar';
import { Pagination } from './Pagination';
import { SearchInput } from './SearchInput';

interface ResourceTableProps<T> {
  columns: Column<T>[];
  items: T[];
  rowKey: (item: T) => string;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  empty: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  filters?: ReactNode;
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/** Estrutura padrão de listagem: busca, filtros, tabela e paginação. */
export function ResourceTable<T>({
  columns,
  items,
  rowKey,
  loading,
  error,
  onRetry,
  empty,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: ResourceTableProps<T>) {
  return (
    <section className="surface overflow-hidden">
      <ListToolbar actions={filters}>
        <SearchInput value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
      </ListToolbar>

      {error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : (
        <>
          <DataTable
            columns={columns}
            items={items}
            rowKey={rowKey}
            loading={loading}
            empty={empty}
          />
          {!loading && total > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </section>
  );
}
