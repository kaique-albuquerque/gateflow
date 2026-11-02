import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = 'Carregando dados...', className }: LoadingStateProps) {
  return (
    <div className={`flex items-center justify-center gap-2 py-14 text-sm text-slate-500 ${className ?? ''}`}>
      <Loader2 className="size-4 animate-spin text-brand-600" />
      {label}
    </div>
  );
}
