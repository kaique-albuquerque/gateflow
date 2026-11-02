import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/format';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  tone?: 'default' | 'danger';
  disabled?: boolean;
}

export function IconButton({ icon: Icon, label, onClick, tone = 'default', disabled }: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        tone === 'danger'
          ? 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
