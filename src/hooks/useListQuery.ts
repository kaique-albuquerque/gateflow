import { useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';

type SearchFn<T> = (item: T, query: string) => boolean;

/** Combina busca textual (client-side) com paginação e reset automático da página. */
export function useListQuery<T>(items: T[], searchFn: SearchFn<T>, pageSize = PAGE_SIZE) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (query.trim() ? items.filter((item) => searchFn(item, query)) : items),
    [items, query, searchFn],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const pageItems = useMemo(
    () => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filtered, currentPage, pageSize],
  );

  return {
    query,
    setQuery,
    page: currentPage,
    setPage,
    pageItems,
    total: filtered.length,
    totalPages,
    isEmpty: filtered.length === 0,
  };
}
