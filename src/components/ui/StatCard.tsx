import type { LucideIcon } from 'lucide-react';
import type { Tone } from '@/types/common';
import { cn } from '@/utils/format';

const ICON_TONES: Record<Tone, string> = {
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-rose-50 text-rose-600',
  info: 'bg-sky-50 text-sky-600',
  neutral: 'bg-slate-100 text-slate-500',
  brand: 'bg-brand-50 text-brand-600',
};

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, icon: Icon, tone = 'brand', hint, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        'surface flex items-start justify-between gap-3 p-4 text-left transition-shadow',
        onClick && 'cursor-pointer hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:outline-none',
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        {hint && <p className="mt-1 text-[11px] leading-snug text-slate-400">{hint}</p>}
      </div>
      <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', ICON_TONES[tone])}>
        <Icon className="size-4" aria-hidden />
      </span>
    </div>
  );
}
