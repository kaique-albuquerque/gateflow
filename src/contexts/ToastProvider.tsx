import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ToastMessage } from '@/types/toast';
import { ToastContext } from './toast-context';
import { ToastViewport } from '@/components/ui/ToastViewport';
import { createId } from '@/utils/id';

const AUTO_DISMISS_MS = 4000;
const MAX_VISIBLE = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (text: string, tone: ToastMessage['tone'] = 'success') => {
      const toast: ToastMessage = { id: createId('toast'), text, tone };
      setToasts((current) => [...current, toast].slice(-MAX_VISIBLE));
      window.setTimeout(() => dismiss(toast.id), AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
