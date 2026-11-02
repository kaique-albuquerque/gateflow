import { useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Prestador, PrestadorForm } from '@/types/prestador';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { useForm } from '@/hooks/useForm';
import { hasErrors, phoneField, required } from '@/utils/validators';
import {
  BLOCOS_OPTIONS,
  SERVICO_OPTIONS,
  emptyPrestadorForm,
  toPrestadorForm,
} from './prestador-form.model';

interface PrestadorFormModalProps {
  open: boolean;
  prestador: Prestador | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (form: PrestadorForm) => void;
}

export function PrestadorFormModal({ open, prestador, loading, onClose, onSubmit }: PrestadorFormModalProps) {
  const { values, errors, setField, setErrors, reset } = useForm<PrestadorForm>(emptyPrestadorForm());

  useEffect(() => {
    if (open) reset(prestador ? toPrestadorForm(prestador) : emptyPrestadorForm());
  }, [open, prestador, reset]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      nome: required(values.nome, 'Nome'),
      documento: required(values.documento, 'Documento'),
      empresa: required(values.empresa, 'Empresa'),
      telefone: phoneField(values.telefone),
      unidade: required(values.unidade, 'Unidade'),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={prestador ? 'Editar prestador' : 'Novo prestador'}
      description="Cadastre o profissional antes de liberar a entrada."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form="prestador-form" loading={loading}>
            {prestador ? 'Salvar alterações' : 'Cadastrar prestador'}
          </Button>
        </>
      }
    >
      <form id="prestador-form" onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="nome"
          label="Nome completo"
          className="sm:col-span-2"
          required
          value={values.nome}
          error={errors.nome}
          onChange={(value) => setField('nome', value)}
          placeholder="Ex.: Antônio Ferreira"
        />
        <TextField
          id="documento"
          label="Documento"
          required
          value={values.documento}
          error={errors.documento}
          onChange={(value) => setField('documento', value)}
          placeholder="00.000.000-0"
        />
        <TextField
          id="telefone"
          label="Telefone"
          required
          value={values.telefone}
          error={errors.telefone}
          onChange={(value) => setField('telefone', value)}
          placeholder="(11) 90000-0000"
        />
        <TextField
          id="empresa"
          label="Empresa"
          className="sm:col-span-2"
          required
          value={values.empresa}
          error={errors.empresa}
          onChange={(value) => setField('empresa', value)}
          placeholder="Ex.: Elétrica Silva"
        />
        <SelectField
          id="servico"
          label="Serviço"
          className="sm:col-span-2"
          required
          value={values.servico}
          options={SERVICO_OPTIONS}
          onChange={(value) => setField('servico', value)}
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
      </form>
    </Modal>
  );
}
