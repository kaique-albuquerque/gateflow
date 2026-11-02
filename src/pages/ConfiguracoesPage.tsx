import { Info, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { APP_DESCRIPTION, APP_NAME, APP_SUBTITLE, APP_VERSION, DEMO_USER } from '@/constants/app';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResetDemoCard } from '@/components/settings/ResetDemoCard';
import { StorageInfoCard } from '@/components/settings/StorageInfoCard';
import { initials } from '@/utils/format';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Configurações"
        subtitle="Perfil de acesso, informações do sistema e dados da demonstração"
        actions={
          <Badge tone="brand" withDot>
            v{APP_VERSION}
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Conta de demonstração" description="Usuário simulado da portaria.">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
              {initials(DEMO_USER.nome)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{DEMO_USER.nome}</p>
              <p className="text-xs text-slate-500">{DEMO_USER.cargo}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="size-3.5 text-slate-400" aria-hidden />
              <dt className="sr-only">E-mail</dt>
              <dd className="truncate">{DEMO_USER.email}</dd>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="size-3.5 text-slate-400" aria-hidden />
              <dt className="sr-only">Permissão</dt>
              <dd>Acesso total ao condomínio</dd>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <UserRound className="size-3.5 text-slate-400" aria-hidden />
              <dt className="sr-only">Perfil</dt>
              <dd>Autenticação simulada &middot; sem senha</dd>
            </div>
          </dl>
        </Card>

        <Card title="Sobre o GateFlow" description={`${APP_NAME} ${APP_SUBTITLE}`}>
          <p className="text-xs leading-relaxed text-slate-600">{APP_DESCRIPTION}</p>
          <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
            <li>React 19 + TypeScript + Vite</li>
            <li>Tailwind CSS v4 com design tokens próprios</li>
            <li>Dados simulados com persistência em LocalStorage</li>
          </ul>
          <p className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            Projeto demonstrativo: nenhuma informação real de condomínio é coletada ou enviada.
          </p>
        </Card>

        <StorageInfoCard />
        <ResetDemoCard />
      </div>
    </div>
  );
}
