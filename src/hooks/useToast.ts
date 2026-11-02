import { useContext } from 'react';
import { ToastContext } from '@/contexts/toast-context';
import type { ToastContextValue } from '@/types/toast';

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>.');
  }
  return context;
}
