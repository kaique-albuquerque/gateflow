import { Cpu, Info } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
import { DispositivoCard } from '@/components/devices/DispositivoCard';
import { useDispositivos } from '@/hooks/useDispositivos';
import { pluralize } from '@/utils/format';

export default function DispositivosPage() {
  const { dispositivos, loading, error, reload, pending, simularConexao, reiniciarSimulacao } = useDispositivos();

  const conectados = dispositivos.filter((dispositivo) => dispositivo.status === 'conectado').length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dispositivos"
        subtitle={`${pluralize(conectados, 'equipamento conectado', 'equipamentos conectados')} de ${dispositivos.length}`}
        actions={
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone="success" withDot>
              {conectados} online
            </Badge>
            <Badge tone="danger" withDot>
              {dispositivos.length - conectados} offline
            </Badge>
          </div>
        }
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs text-sky-900">
        <Info className="mt-0.5 size-4 shrink-0 text-sky-600" aria-hidden />
        <p>
          <strong className="font-semibold">Ambiente de demonstração.</strong> Nenhuma comunicação real é
          feita com os equipamentos — os botões apenas simulam a mudança de status.
        </p>
      </div>

      {error ? (
        <div className="surface">
          <ErrorState message={error} onRetry={reload} />
        </div>
      ) : loading ? (
        <div className="surface">
          <LoadingState label="Consultando dispositivos..." />
        </div>
      ) : dispositivos.length === 0 ? (
        <div className="surface">
          <EmptyState
            icon={Cpu}
            title="Nenhum dispositivo cadastrado"
            description="Os equipamentos da portaria aparecerão aqui quando forem configurados."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dispositivos.map((dispositivo) => (
            <DispositivoCard
              key={dispositivo.id}
              dispositivo={dispositivo}
              pending={pending}
              onConectar={simularConexao}
              onDesconectar={reiniciarSimulacao}
            />
          ))}
        </div>
      )}
    </div>
  );
}
