import { useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Ocorrencia, OcorrenciaForm } from '@/types/ocorrencia';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { TextareaField } from '@/components/ui/TextareaField';
import { useForm } from '@/hooks/useForm';
import { hasErrors, required } from '@/utils/validators';
import {
  CATEGORIA_OPTIONS,
  RESPONSAVEL_OPTIONS,
  STATUS_OPTIONS,
  emptyOcorrenciaForm,
  toOcorrenciaForm,
} from './ocorrencia-form.model';

interface OcorrenciaFormModalProps {
  open: boolean;
  ocorrencia: Ocorrencia | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (form: OcorrenciaForm) => void;
}

export function OcorrenciaFormModal({ open, ocorrencia, loading, onClose, onSubmit }: OcorrenciaFormModalProps) {
  const { values, errors, setField, setErrors, reset } = useForm<OcorrenciaForm>(emptyOcorrenciaForm());

  useEffect(() => {
    if (open) reset(ocorrencia ? toOcorrenciaForm(ocorrencia) : emptyOcorrenciaForm());
  }, [open, ocorrencia, reset]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      titulo: required(values.titulo, 'Título'),
      descricao: required(values.descricao, 'Descrição'),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={ocorrencia ? 'Editar ocorrência' : 'Nova ocorrência'}
      description="Registre o problema para acompanhar a tratativa."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form="ocorrencia-form" loading={loading}>
            {ocorrencia ? 'Salvar alterações' : 'Registrar ocorrência'}
          </Button>
        </>
      }
    >
      <form id="ocorrencia-form" onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="titulo"
          label="Título"
          className="sm:col-span-2"
          required
          value={values.titulo}
          error={errors.titulo}
          onChange={(value) => setField('titulo', value)}
          placeholder="Ex.: Portão da garagem não fecha"
        />
        <TextareaField
          id="descricao"
          label="Descrição"
          className="sm:col-span-2"
          required
          rows={4}
          value={values.descricao}
          error={errors.descricao}
          onChange={(value) => setField('descricao', value)}
          placeholder="Detalhe o que aconteceu e onde"
        />
        <SelectField
          id="categoria"
          label="Categoria"
          required
          value={values.categoria}
          options={CATEGORIA_OPTIONS}
          onChange={(value) => setField('categoria', value as OcorrenciaForm['categoria'])}
        />
        <SelectField
          id="responsavel"
          label="Responsável"
          required
          value={values.responsavel}
          options={RESPONSAVEL_OPTIONS}
          onChange={(value) => setField('responsavel', value)}
        />
        <SelectField
          id="status"
          label="Status"
          className="sm:col-span-2"
          required
          value={values.status}
          options={STATUS_OPTIONS}
          onChange={(value) => setField('status', value as OcorrenciaForm['status'])}
        />
      </form>
    </Modal>
  );
}
