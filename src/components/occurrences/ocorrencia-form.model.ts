import type { Ocorrencia, OcorrenciaForm, OcorrenciaStatus } from '@/types/ocorrencia';
import { OCORRENCIA_CATEGORIA, OCORRENCIA_STATUS } from '@/constants/status';
import { SERVIDORES_TURNO } from '@/constants/options';
import type { SelectOption } from '@/types/common';
import { toStatusOptions, toValueOptions } from '@/utils/status-options';

export const CATEGORIA_OPTIONS = toValueOptions(OCORRENCIA_CATEGORIA);

export const STATUS_OPTIONS = toStatusOptions(OCORRENCIA_STATUS);

export const RESPONSAVEL_OPTIONS: SelectOption[] = SERVIDORES_TURNO.map((nome) => ({
  value: nome,
  label: nome,
}));

export const emptyOcorrenciaForm = (): OcorrenciaForm => ({
  titulo: '',
  descricao: '',
  categoria: 'operacional',
  responsavel: SERVIDORES_TURNO[0],
  status: 'aberta',
});

export const toOcorrenciaForm = (ocorrencia: Ocorrencia): OcorrenciaForm => ({
  titulo: ocorrencia.titulo,
  descricao: ocorrencia.descricao,
  categoria: ocorrencia.categoria,
  responsavel: ocorrencia.responsavel,
  status: ocorrencia.status,
});

export const STATUS_TRANSITIONS: Record<OcorrenciaStatus, OcorrenciaStatus | null> = {
  aberta: 'em_andamento',
  em_andamento: 'resolvida',
  resolvida: null,
};
