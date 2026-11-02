import { APP_NAME, APP_VERSION } from '@/constants/app';

export function AppFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 px-4 py-4 text-[11px] text-slate-400 sm:px-6">
      <span>
        {APP_NAME} · demonstração com backend simulado, sem integração real com equipamentos.
      </span>
      <span className="font-medium text-slate-500">v{APP_VERSION}</span>
    </footer>
  );
}
