import { useLocation } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { DEMO_USER } from '@/constants/app';
import { NAV_ITEMS } from '@/constants/navigation';
import { Avatar } from '@/components/ui/Avatar';

interface TopbarProps {
  onOpenMenu: () => void;
}

export function Topbar({ onOpenMenu }: TopbarProps) {
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((item) => item.to === pathname);
  const title = current?.label ?? 'GateFlow';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-white/85 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu de navegação"
        className="inline-flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">GateFlow</p>
        <h2 className="truncate text-sm font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 sm:inline-flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Sistema online
        </span>

        <span className="hidden rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-amber-700 sm:inline-flex">
          DEMO
        </span>

        <button
          type="button"
          aria-label="Notificações (2 novas)"
          className="relative inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          onClick={() => window.alert('Notificações demonstrativas: 2 visitantes aguardando autorização.')}
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="hidden items-center gap-2 border-l border-slate-200 pl-4 sm:flex">
          <Avatar name={DEMO_USER.nome} />
          <div className="leading-tight">
            <p className="text-[13px] font-medium text-slate-800">{DEMO_USER.nome}</p>
            <p className="text-[11px] text-slate-500">{DEMO_USER.cargo}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
