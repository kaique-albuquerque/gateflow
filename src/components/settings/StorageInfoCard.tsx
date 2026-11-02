import { useMemo } from 'react';
import { Database } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ALL_COLLECTIONS } from '@/constants/collections';
import { STORAGE_PREFIX } from '@/constants/app';

export function StorageInfoCard() {
  const storedKeys = useMemo(
    () => Object.keys(window.localStorage).filter((key) => key.startsWith(STORAGE_PREFIX)).length,
    [],
  );

  return (
    <Card title="Armazenamento local" description="Onde os dados desta demonstração ficam salvos.">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <Database className="size-4" aria-hidden />
        </span>
        <div className="space-y-2 text-xs leading-relaxed text-slate-600">
          <p>
            Os registros são persistidos no <strong className="font-semibold">LocalStorage</strong> do
            navegador, sob o prefixo <code className="rounded bg-slate-100 px-1 py-0.5">{STORAGE_PREFIX}</code>.
          </p>
          <dl className="flex flex-wrap gap-x-6 gap-y-1">
            <div className="flex gap-1.5">
              <dt className="text-slate-400">Coleções:</dt>
              <dd className="font-medium text-slate-800">{ALL_COLLECTIONS.length}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="text-slate-400">Chaves gravadas:</dt>
              <dd className="font-medium text-slate-800">{storedKeys}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Card>
  );
}
