import { useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Entrega } from '@/types/entrega';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TextField } from '@/components/ui/TextField';
import { useForm } from '@/hooks/useForm';
import { hasErrors, required } from '@/utils/validators';
import { unitLabel } from '@/utils/format';

interface EntregaRetiradaModalProps {
  entrega: Entrega | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: (retiradoPor: string) => void;
}

interface RetiradaForm {
  retiradoPor: string;
}

export function EntregaRetiradaModal({ entrega, loading, onClose, onConfirm }: EntregaRetiradaModalProps) {
  const { values, errors, setField, setErrors, reset } = useForm<RetiradaForm>({ retiradoPor: '' });

  useEffect(() => {
    if (entrega) reset({ retiradoPor: entrega.destinatario });
  }, [entrega, reset]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = { retiradoPor: required(values.retiradoPor, 'Nome de quem retirou') };
    setErrors(next);
    if (hasErrors(next)) return;
    onConfirm(values.retiradoPor.trim());
  };

  return (
    <Modal
      open={Boolean(entrega)}
      title="Registrar retirada"
      description="Confirme quem retirou a entrega na portaria."
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form="retirada-form" variant="success" loading={loading}>
            Confirmar retirada
          </Button>
        </>
      }
    >
      {entrega && (
        <form id="retirada-form" onSubmit={submit} className="space-y-4">
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p className="font-medium text-slate-800">{entrega.destinatario}</p>
            <p>
              Apto {unitLabel(entrega.bloco, entrega.unidade)} · {entrega.transportadora} ·{' '}
              {entrega.codigoRastreio}
            </p>
          </div>
          <TextField
            id="retiradoPor"
            label="Retirado por"
            required
            value={values.retiradoPor}
            error={errors.retiradoPor}
            onChange={(value) => setField('retiradoPor', value)}
            placeholder="Nome de quem retirou"
          />
        </form>
      )}
    </Modal>
  );
}
