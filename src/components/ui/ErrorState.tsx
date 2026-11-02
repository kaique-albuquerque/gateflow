import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <AlertCircle className="size-5" />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Não foi possível concluir</h3>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RotateCcw} onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
