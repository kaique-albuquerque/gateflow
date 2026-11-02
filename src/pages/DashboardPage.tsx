import { RefreshCw } from 'lucide-react';
import type { Visitante } from '@/types/visitante';
import { DASHBOARD_COPY } from '@/constants/dashboard';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
import { MovimentacaoChart } from '@/components/dashboard/MovimentacaoChart';
import { OpenOccurrences } from '@/components/dashboard/OpenOccurrences';
import { PendingVisitors } from '@/components/dashboard/PendingVisitors';
import { RecentAccessList } from '@/components/dashboard/RecentAccessList';
import { RecentDeliveries } from '@/components/dashboard/RecentDeliveries';
import { StatGrid } from '@/components/dashboard/StatGrid';
import { useDashboard } from '@/hooks/useDashboard';
import { useVisitantes } from '@/hooks/useVisitantes';

export default function DashboardPage() {
  const { dashboard, loading, error, reload } = useDashboard();
  const { pending, autorizar, negar } = useVisitantes();

  const handleAutorizar = async (visitante: Visitante) => {
    await autorizar(visitante);
    reload();
  };

  const handleNegar = async (visitante: Visitante) => {
    await negar(visitante);
    reload();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={DASHBOARD_COPY.title}
        subtitle={DASHBOARD_COPY.subtitle}
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={reload} loading={loading}>
            Atualizar
          </Button>
        }
      />

      {error ? (
        <div className="surface">
          <ErrorState message={error} onRetry={reload} />
        </div>
      ) : loading ? (
        <div className="surface">
          <LoadingState label="Carregando indicadores..." />
        </div>
      ) : (
        <>
          <StatGrid stats={dashboard.stats} />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <MovimentacaoChart serie={dashboard.movimentacoes} />
            </div>
            <PendingVisitors
              visitantes={dashboard.visitantesAguardando}
              pending={pending}
              onAutorizar={handleAutorizar}
              onNegar={handleNegar}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <RecentAccessList acessos={dashboard.ultimosAcessos} />
            <div className="space-y-4">
              <RecentDeliveries entregas={dashboard.entregasRecentes} />
              <OpenOccurrences ocorrencias={dashboard.ocorrenciasAbertas} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
