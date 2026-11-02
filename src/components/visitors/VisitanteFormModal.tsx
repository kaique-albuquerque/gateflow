import { useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Visitante, VisitanteForm } from '@/types/visitante';
import { MOTIVOS_VISITA } from '@/constants/options';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { useForm } from '@/hooks/useForm';
import { hasErrors, phoneField, required } from '@/utils/validators';
import { BLOCOS_OPTIONS, emptyVisitanteForm, toVisitanteForm } from './visitante-form.model';

interface VisitanteFormModalProps {
  open: boolean;
  visitante: Visitante | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (form: VisitanteForm) => void;
}

export function VisitanteFormModal({ open, visitante, loading, onClose, onSubmit }: VisitanteFormModalProps) {
  const { values, errors, setField, setErrors, reset } = useForm<VisitanteForm>(emptyVisitanteForm());

  useEffect(() => {
    if (open) reset(visitante ? toVisitanteForm(visitante) : emptyVisitanteForm());
  }, [open, visitante, reset]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      nome: required(values.nome, 'Nome'),
      documento: required(values.documento, 'Documento'),
      telefone: phoneField(values.telefone),
      unidade: required(values.unidade, 'Unidade'),
      morador: required(values.morador, 'Morador responsável'),
      dataVisita: required(values.dataVisita, 'Data da visita'),
      horaPrevista: required(values.horaPrevista, 'Horário previsto'),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={visitante ? 'Editar visitante' : 'Novo visitante'}
      description="Autorize a entrada antes de liberar a catraca."
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" form="visitante-form" loading={loading}>
            {visitante ? 'Salvar alterações' : 'Cadastrar visitante'}
          </Button>
        </>
      }
    >
      <form id="visitante-form" onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="nome"
          label="Nome completo"
          className="sm:col-span-2"
          required
          value={values.nome}
          error={errors.nome}
          onChange={(value) => setField('nome', value)}
          placeholder="Ex.: Carlos Henrique Lima"
        />
        <TextField
          id="documento"
          label="Documento (RG/CPF)"
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
        <TextField
          id="morador"
          label="Morador responsável"
          className="sm:col-span-2"
          required
          value={values.morador}
          error={errors.morador}
          onChange={(value) => setField('morador', value)}
          placeholder="Quem autorizou a visita"
        />
        <SelectField
          id="motivo"
          label="Motivo da visita"
          className="sm:col-span-2"
          value={values.motivo}
          options={MOTIVOS_VISITA}
          onChange={(value) => setField('motivo', value)}
        />
        <TextField
          id="dataVisita"
          label="Data da visita"
          type="date"
          required
          value={values.dataVisita}
          error={errors.dataVisita}
          onChange={(value) => setField('dataVisita', value)}
        />
        <TextField
          id="horaPrevista"
          label="Horário previsto"
          type="time"
          required
          value={values.horaPrevista}
          error={errors.horaPrevista}
          onChange={(value) => setField('horaPrevista', value)}
        />
      </form>
    </Modal>
  );
}
