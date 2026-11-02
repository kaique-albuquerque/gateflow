import { useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Morador, MoradorForm, MoradorStatus } from '@/types/morador';
import { BLOCOS } from '@/constants/options';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { useForm } from '@/hooks/useForm';
import { emailField, hasErrors, required } from '@/utils/validators';
import { BLOCOS_OPTIONS, emptyMoradorValues, moradorStatusOptions, toMoradorValues, toMoradorForm } from './morador-form.model';
import type { MoradorValues } from './morador-form.model';

interface MoradorFormModalProps {
  open: boolean;
  morador: Morador | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (form: MoradorForm) => void;
}

export function MoradorFormModal({ open, morador, loading, onClose, onSubmit }: MoradorFormModalProps) {
  const { values, errors, setField, setErrors, reset } = useForm<MoradorValues>(emptyMoradorValues());

  useEffect(() => {
    if (open) reset(morador ? toMoradorValues(morador) : emptyMoradorValues());
  }, [open, morador, reset]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      nome: required(values.nome, 'Nome'),
      documento: required(values.documento, 'Documento'),
      email: emailField(values.email),
      telefone: required(values.telefone, 'Telefone'),
      unidade: required(values.unidade, 'Unidade'),
      dependentes: required(values.dependentes, 'Dependentes'),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    onSubmit(toMoradorForm(values));
  };

  return (
    <Modal
      open={open}
      title={morador ? 'Editar morador' : 'Novo morador'}
      description="Mantenha o cadastro atualizado para agilizar autorizações."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form="morador-form" loading={loading}>
            {morador ? 'Salvar alterações' : 'Cadastrar morador'}
          </Button>
        </>
      }
    >
      <form id="morador-form" onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="nome"
          label="Nome completo"
          className="sm:col-span-2"
          required
          value={values.nome}
          error={errors.nome}
          onChange={(value) => setField('nome', value)}
          placeholder="Ex.: Ana Paula Ribeiro"
        />
        <TextField
          id="documento"
          label="Documento (RG/CPF)"
          required
          value={values.documento}
          error={errors.documento}
          onChange={(value) => setField('documento', value)}
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
          id="email"
          label="E-mail"
          type="email"
          className="sm:col-span-2"
          required
          value={values.email}
          error={errors.email}
          onChange={(value) => setField('email', value)}
          placeholder="morador@email.com"
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
          placeholder="Ex.: 201"
        />
        <TextField
          id="dependentes"
          label="Dependentes"
          type="number"
          min={0}
          max={20}
          required
          value={values.dependentes}
          error={errors.dependentes}
          onChange={(value) => setField('dependentes', value)}
          hint="Quantidade de pessoas que residem com o morador."
        />
        <SelectField
          id="status"
          label="Situação"
          required
          value={values.status}
          options={moradorStatusOptions}
          onChange={(value) => setField('status', value as MoradorStatus)}
        />
      </form>
    </Modal>
  );
}
