import { NavLink } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { APP_SUBTITLE, APP_VERSION } from '@/constants/app';
import { NAV_GROUPS } from '@/constants/navigation';
import { cn } from '@/utils/format';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-[264px] shrink-0 flex-col border-r border-white/5 bg-slate-900">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
          <ShieldCheck className="size-5" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">GateFlow</p>
          <p className="text-[11px] text-slate-400">{APP_SUBTITLE}</p>
        </div>
      </div>

      <nav className="scroll-thin flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onNavigate}
                    className={({ isActive }) => cn('nav-item', isActive && 'nav-item-active')}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/5 p-3">
        <div className="rounded-lg bg-white/5 px-3 py-2.5">
          <p className="text-[11px] font-medium text-slate-300">Ambiente demonstrativo</p>
          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">
            Dados salvos no navegador · v{APP_VERSION}
          </p>
        </div>
      </div>
    </aside>
  );
}
