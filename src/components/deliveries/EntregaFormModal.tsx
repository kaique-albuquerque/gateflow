import { useEffect } from 'react';
import type { FormEvent } from 'react';
import type { EntregaForm } from '@/types/entrega';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { useForm } from '@/hooks/useForm';
import { hasErrors, required } from '@/utils/validators';
import {
  BLOCOS_OPTIONS,
  TIPO_OPTIONS,
  TRANSPORTADORA_OPTIONS,
  emptyEntregaForm,
} from './entrega-form.model';

interface EntregaFormModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (form: EntregaForm) => void;
}

export function EntregaFormModal({ open, loading, onClose, onSubmit }: EntregaFormModalProps) {
  const { values, errors, setField, setErrors, reset } = useForm<EntregaForm>(emptyEntregaForm());

  useEffect(() => {
    if (open) reset(emptyEntregaForm());
  }, [open, reset]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      destinatario: required(values.destinatario, 'Destinatário'),
      unidade: required(values.unidade, 'Unidade'),
      codigoRastreio: required(values.codigoRastreio, 'Código de rastreio'),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title="Registrar entrega"
      description="A encomenda entra como recebida e pode ser notificada ao morador."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form="entrega-form" loading={loading}>
            Registrar entrega
          </Button>
        </>
      }
    >
      <form id="entrega-form" onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="destinatario"
          label="Destinatário"
          className="sm:col-span-2"
          required
          value={values.destinatario}
          error={errors.destinatario}
          onChange={(value) => setField('destinatario', value)}
          placeholder="Ex.: Helena Prado"
        />
        <SelectField
          id="bloco"
          label="Bloco"
          required
          value={values.bloco}
          options={BLOCOS_OPTIONS}
          onChange={(value) => setField('bloco', value)}
        />
        <TextField
          id="unidade"
          label="Unidade"
          required
          value={values.unidade}
          error={errors.unidade}
          onChange={(value) => setField('unidade', value)}
          placeholder="Ex.: 302"
        />
        <SelectField
          id="transportadora"
          label="Transportadora"
          required
          value={values.transportadora}
          options={TRANSPORTADORA_OPTIONS}
          onChange={(value) => setField('transportadora', value)}
        />
        <SelectField
          id="tipo"
          label="Tipo de entrega"
          required
          value={values.tipo}
          options={TIPO_OPTIONS}
          onChange={(value) => setField('tipo', value as EntregaForm['tipo'])}
        />
        <TextField
          id="codigoRastreio"
          label="Código de rastreio"
          className="sm:col-span-2"
          required
          value={values.codigoRastreio}
          error={errors.codigoRastreio}
          onChange={(value) => setField('codigoRastreio', value)}
        />
      </form>
    </Modal>
  );
}
