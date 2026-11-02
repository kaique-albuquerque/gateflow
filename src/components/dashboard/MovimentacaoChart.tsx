import type { MovimentacaoDia } from '@/types/dashboard';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/format';

const BAR_MIN_HEIGHT = 4;

function Legend() {
  return (
    <div className="flex items-center gap-3 text-[11px] text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-brand-600" /> Entradas
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-slate-300" /> Saídas
      </span>
    </div>
  );
}

export function MovimentacaoChart({ serie }: { serie: MovimentacaoDia[] }) {
  const max = Math.max(1, ...serie.flatMap((dia) => [dia.entradas, dia.saidas]));

  return (
    <Card title="Movimentação dos últimos 7 dias" description="Entradas e saídas registradas pela portaria" action={<Legend />}>
      {serie.length === 0 ? (
        <p className="py-12 text-center text-xs text-slate-500">Sem movimentações registradas.</p>
      ) : (
        <div className="flex h-44 items-end gap-2 sm:gap-4">
          {serie.map((dia) => (
            <div key={dia.dia} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end justify-center gap-1">
                <span
                  title={`${dia.entradas} entrada(s)`}
                  className="w-2.5 rounded-t bg-brand-600 transition-all sm:w-3"
                  style={{ height: `${Math.max(BAR_MIN_HEIGHT, (dia.entradas / max) * 100)}%` }}
                />
                <span
                  title={`${dia.saidas} saída(s)`}
                  className={cn('w-2.5 rounded-t bg-slate-300 transition-all sm:w-3')}
                  style={{ height: `${Math.max(BAR_MIN_HEIGHT, (dia.saidas / max) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-slate-500 capitalize">{dia.rotulo}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
