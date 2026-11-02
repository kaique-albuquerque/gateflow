import { Camera, Cpu, Fingerprint, QrCode, Radio, RotateCcw, Wifi } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Dispositivo, DispositivoTipo } from '@/types/dispositivo';
import { DISPOSITIVO_STATUS, DISPOSITIVO_TIPO } from '@/constants/status';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { shortDateTime } from '@/utils/datetime';

const TIPO_ICON: Record<DispositivoTipo, LucideIcon> = {
  controladora: Cpu,
  qr: QrCode,
  camera: Camera,
  fechadura: Fingerprint,
  interfonia: Radio,
};

interface DispositivoCardProps {
  dispositivo: Dispositivo;
  pending: boolean;
  onConectar: (dispositivo: Dispositivo) => void;
  onDesconectar: (dispositivo: Dispositivo) => void;
}

export function DispositivoCard({ dispositivo, pending, onConectar, onDesconectar }: DispositivoCardProps) {
  const Icon = TIPO_ICON[dispositivo.tipo];
  const conectado = dispositivo.status === 'conectado';

  return (
    <article className="surface flex flex-col gap-3 p-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Icon className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{dispositivo.nome}</p>
            <p className="truncate text-xs text-slate-500">{DISPOSITIVO_TIPO[dispositivo.tipo]}</p>
          </div>
        </div>
        <StatusBadge meta={DISPOSITIVO_STATUS[dispositivo.status]} />
      </header>

      <dl className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <dt className="text-slate-400 uppercase">Modelo</dt>
          <dd className="truncate text-slate-700">{dispositivo.modelo}</dd>
        </div>
        <div>
          <dt className="text-slate-400 uppercase">Local</dt>
          <dd className="truncate text-slate-700">{dispositivo.local}</dd>
        </div>
      </dl>

      <footer className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="text-[11px] text-slate-400">
          Atualizado em {shortDateTime(dispositivo.atualizadoEm)}
        </span>
        {conectado ? (
          <Button
            size="sm"
            variant="secondary"
            icon={RotateCcw}
            disabled={pending}
            onClick={() => onDesconectar(dispositivo)}
          >
            Simular queda
          </Button>
        ) : (
          <Button size="sm" icon={Wifi} disabled={pending} onClick={() => onConectar(dispositivo)}>
            Simular conexão
          </Button>
        )}
      </footer>
    </article>
  );
}
