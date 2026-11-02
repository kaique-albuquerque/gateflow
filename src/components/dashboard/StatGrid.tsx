import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Building2, Clock4, DoorOpen, LogIn, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { DashboardStats } from '@/types/dashboard';
import type { Tone } from '@/types/common';
import { STAT_LABELS } from '@/constants/dashboard';
import { ROUTES } from '@/constants/routes';
import { StatCard } from '@/components/ui/StatCard';

interface StatConfig {
  key: keyof DashboardStats;
  icon: LucideIcon;
  tone: Tone;
  route: string;
  hint: string;
}

const CARDS: StatConfig[] = [
  { key: 'moradores', icon: Building2, tone: 'brand', route: ROUTES.moradores, hint: 'Moradores com cadastro ativo' },
  { key: 'aguardando', icon: Clock4, tone: 'warning', route: ROUTES.visitantes, hint: 'Aguardando liberação na portaria' },
  { key: 'presentes', icon: DoorOpen, tone: 'success', route: ROUTES.acessos, hint: 'Acessos ainda sem registro de saída' },
  { key: 'entradasHoje', icon: LogIn, tone: 'info', route: ROUTES.acessos, hint: 'Entradas registradas hoje' },
  { key: 'encomendasPendentes', icon: Package, tone: 'info', route: ROUTES.entregas, hint: 'Encomendas aguardando retirada' },
  { key: 'ocorrenciasAbertas', icon: AlertTriangle, tone: 'danger', route: ROUTES.ocorrencias, hint: 'Chamados abertos ou em andamento' },
];

export function StatGrid({ stats }: { stats: DashboardStats }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {CARDS.map(({ key, icon, tone, route, hint }) => (
        <StatCard
          key={key}
          label={STAT_LABELS[key]}
          value={stats[key]}
          icon={icon}
          tone={tone}
          hint={hint}
          onClick={() => navigate(route)}
        />
      ))}
    </div>
  );
}
