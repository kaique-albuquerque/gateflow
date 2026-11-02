import {
  Building2,
  ClipboardList,
  Cpu,
  DoorOpen,
  LayoutDashboard,
  Package,
  Settings,
  UserRound,
  Users,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from './routes';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Operação',
    items: [
      { to: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: ROUTES.visitantes, label: 'Visitantes', icon: UserRound },
      { to: ROUTES.acessos, label: 'Acessos', icon: DoorOpen },
      { to: ROUTES.entregas, label: 'Entregas', icon: Package },
    ],
  },
  {
    title: 'Cadastros',
    items: [
      { to: ROUTES.moradores, label: 'Moradores', icon: Users },
      { to: ROUTES.unidades, label: 'Unidades', icon: Building2 },
      { to: ROUTES.prestadores, label: 'Prestadores', icon: Wrench },
    ],
  },
  {
    title: 'Gestão',
    items: [
      { to: ROUTES.ocorrencias, label: 'Ocorrências', icon: ClipboardList },
      { to: ROUTES.dispositivos, label: 'Dispositivos', icon: Cpu },
      { to: ROUTES.configuracoes, label: 'Configurações', icon: Settings },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items);
