import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/useToast';

interface ExecuteOptions {
  onDone?: () => void;
  successMessage?: string;
}

/**
 * Padroniza o ciclo de vida de uma ação de serviço: estado pendente,
 * feedback de sucesso e mensagem de erro amigável.
 */
export function useServiceAction() {
  const { notify } = useToast();
  const [pending, setPending] = useState(false);

  const execute = useCallback(
    async <T,>(action: () => Promise<T>, options: ExecuteOptions = {}): Promise<T | null> => {
      setPending(true);
      try {
        const result = await action();
        if (options.successMessage) notify(options.successMessage, 'success');
        options.onDone?.();
        return result;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Não foi possível concluir a ação.';
        notify(message, 'danger');
        return null;
      } finally {
        setPending(false);
      }
    },
    [notify],
  );

  return { execute, pending };
}
