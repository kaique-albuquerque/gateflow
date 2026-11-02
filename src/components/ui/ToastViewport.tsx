import { CheckCircle2, Info, TriangleAlert, X, XCircle } from 'lucide-react';
import type { Tone } from '@/types/common';
import type { ToastMessage } from '@/types/toast';
import { cn } from '@/utils/format';

const STYLES: Record<Exclude<Tone, 'brand'>, { icon: typeof Info; accent: string }> = {
  success: { icon: CheckCircle2, accent: 'text-emerald-600' },
  warning: { icon: TriangleAlert, accent: 'text-amber-600' },
  danger: { icon: XCircle, accent: 'text-rose-600' },
  info: { icon: Info, accent: 'text-sky-600' },
  neutral: { icon: Info, accent: 'text-slate-500' },
};

interface ToastViewportProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:right-6 sm:bottom-6 sm:left-auto sm:items-end"
    >
      {toasts.map((toast) => {
        const { icon: Icon, accent } = STYLES[toast.tone];
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm animate-rise items-start gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-pop"
          >
            <Icon className={cn('mt-0.5 size-4 shrink-0', accent)} aria-hidden />
            <p className="flex-1 text-[13px] leading-snug text-slate-700">{toast.text}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Fechar notificação"
              className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
