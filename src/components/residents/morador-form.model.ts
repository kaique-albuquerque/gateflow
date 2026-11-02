import type { Morador, MoradorForm, MoradorStatus } from '@/types/morador';
import type { SelectOption } from '@/types/common';
import { BLOCOS } from '@/constants/options';
import { MORADOR_STATUS } from '@/constants/status';

export const BLOCOS_OPTIONS = BLOCOS.map((bloco) => ({ value: bloco, label: `Bloco ${bloco}` }));

export const moradorStatusOptions: SelectOption[] = (
  Object.keys(MORADOR_STATUS) as MoradorStatus[]
).map((status) => ({ value: status, label: MORADOR_STATUS[status].label }));

export interface MoradorValues {
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  bloco: string;
  unidade: string;
  dependentes: string;
  status: MoradorStatus;
}

export const emptyMoradorValues = (): MoradorValues => ({
  nome: '',
  documento: '',
  telefone: '',
  email: '',
  bloco: BLOCOS[0],
  unidade: '',
  dependentes: '0',
  status: 'ativo',
});

export const toMoradorValues = (morador: Morador): MoradorValues => ({
  nome: morador.nome,
  documento: morador.documento,
  telefone: morador.telefone,
  email: morador.email,
  bloco: morador.bloco,
  unidade: morador.unidade,
  dependentes: String(morador.dependentes),
  status: morador.status,
});

export const toMoradorForm = (values: MoradorValues): MoradorForm => ({
  nome: values.nome.trim(),
  documento: values.documento.trim(),
  telefone: values.telefone.trim(),
  email: values.email.trim(),
  bloco: values.bloco,
  unidade: values.unidade.trim(),
  dependentes: Number(values.dependentes),
  status: values.status,
});
