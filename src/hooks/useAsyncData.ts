import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/** Executa um carregamento assíncrono com estados de carregamento/erro e recarga manual. */
export function useAsyncData<T>(loader: () => Promise<T>, initial: T) {
  const [state, setState] = useState<AsyncState<T>>({ data: initial, loading: true, error: null });
  const [token, setToken] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    loader()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!active) return;
        const message = error instanceof Error ? error.message : 'Não foi possível carregar os dados.';
        setState((prev) => ({ ...prev, loading: false, error: message }));
      });

    return () => {
      active = false;
    };
  }, [loader, token]);

  const reload = useCallback(() => setToken((value) => value + 1), []);

  return { ...state, reload };
}
