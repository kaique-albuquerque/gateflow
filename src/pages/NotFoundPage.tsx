import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { buttonClasses } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Compass className="size-7" aria-hidden />
      </span>
      <p className="mt-4 text-xs font-semibold tracking-widest text-brand-600 uppercase">Erro 404</p>
      <h1 className="mt-1 text-xl font-semibold text-slate-900">Página não encontrada</h1>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">
        O endereço acessado não existe no GateFlow. Volte ao painel para continuar a operação da
        portaria.
      </p>
      <Link to={ROUTES.dashboard} className={buttonClasses({ className: 'mt-5' })}>
        <Home className="size-4" aria-hidden />
        Voltar ao painel
      </Link>
    </div>
  );
}
