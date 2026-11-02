import type { Visitante, VisitanteForm } from '@/types/visitante';
import { BLOCOS, MOTIVOS_VISITA } from '@/constants/options';
import { nowTimeInput, todayInput } from '@/utils/datetime';

export const BLOCOS_OPTIONS = BLOCOS.map((bloco) => ({ value: bloco, label: `Bloco ${bloco}` }));

export const emptyVisitanteForm = (): VisitanteForm => ({
  nome: '',
  documento: '',
  telefone: '',
  bloco: BLOCOS[0],
  unidade: '',
  morador: '',
  motivo: MOTIVOS_VISITA[0].value,
  dataVisita: todayInput(),
  horaPrevista: nowTimeInput(),
});

export const toVisitanteForm = (visitante: Visitante): VisitanteForm => ({
  nome: visitante.nome,
  documento: visitante.documento,
  telefone: visitante.telefone,
  bloco: visitante.bloco,
  unidade: visitante.unidade,
  morador: visitante.morador,
  motivo: visitante.motivo,
  dataVisita: visitante.dataVisita,
  horaPrevista: visitante.horaPrevista,
});
