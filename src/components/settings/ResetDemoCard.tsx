import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useServiceAction } from '@/hooks/useServiceAction';
import { resetDemoData } from '@/services/api';

export function ResetDemoCard() {
  const [open, setOpen] = useState(false);
  const { execute, pending } = useServiceAction();

  const confirm = () =>
    execute(() => resetDemoData(), {
      successMessage: 'Dados de demonstração restaurados.',
      onDone: () => window.location.reload(),
    });

  return (
    <Card
      title="Dados de demonstração"
      description="Restaure a massa de dados original para apresentar o produto do zero."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-md text-xs leading-relaxed text-slate-500">
          A ação remove registros criados, edições e exclusões salvas neste navegador. Visitantes,
          moradores, entregas, acessos, prestadores, ocorrências e dispositivos voltam ao estado inicial.
        </p>
        <Button variant="danger" icon={RotateCcw} onClick={() => setOpen(true)}>
          Restaurar dados
        </Button>
      </div>

      <ConfirmDialog
        open={open}
        title="Restaurar dados de demonstração"
        description="Todos os registros locais serão substituídos pela massa inicial. Esta ação não pode ser desfeita."
        confirmLabel="Restaurar"
        loading={pending}
        onClose={() => setOpen(false)}
        onConfirm={confirm}
      />
    </Card>
  );
}
