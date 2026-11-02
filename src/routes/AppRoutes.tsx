import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { AppLayout } from '@/components/layout/AppLayout';
import AcessosPage from '@/pages/AcessosPage';
import ConfiguracoesPage from '@/pages/ConfiguracoesPage';
import DashboardPage from '@/pages/DashboardPage';
import DispositivosPage from '@/pages/DispositivosPage';
import EntregasPage from '@/pages/EntregasPage';
import MoradoresPage from '@/pages/MoradoresPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OcorrenciasPage from '@/pages/OcorrenciasPage';
import PrestadoresPage from '@/pages/PrestadoresPage';
import UnidadesPage from '@/pages/UnidadesPage';
import VisitantesPage from '@/pages/VisitantesPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.visitantes} element={<VisitantesPage />} />
        <Route path={ROUTES.moradores} element={<MoradoresPage />} />
        <Route path={ROUTES.unidades} element={<UnidadesPage />} />
        <Route path={ROUTES.entregas} element={<EntregasPage />} />
        <Route path={ROUTES.acessos} element={<AcessosPage />} />
        <Route path={ROUTES.prestadores} element={<PrestadoresPage />} />
        <Route path={ROUTES.ocorrencias} element={<OcorrenciasPage />} />
        <Route path={ROUTES.dispositivos} element={<DispositivosPage />} />
        <Route path={ROUTES.configuracoes} element={<ConfiguracoesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
