import type { Entrega, EntregaForm } from '@/types/entrega';
import { BLOCOS, TRANSPORTADORAS } from '@/constants/options';
import { ENTREGA_TIPO } from '@/constants/status';
import { createCodigoRastreio } from '@/utils/id';
import { toValueOptions } from '@/utils/status-options';

export const BLOCOS_OPTIONS = BLOCOS.map((bloco) => ({ value: bloco, label: `Bloco ${bloco}` }));

export const TIPO_OPTIONS = toValueOptions(ENTREGA_TIPO);

export const TRANSPORTADORA_OPTIONS = TRANSPORTADORAS;

export const emptyEntregaForm = (): EntregaForm => ({
  destinatario: '',
  bloco: BLOCOS[0],
  unidade: '',
  transportadora: TRANSPORTADORAS[0].value,
  tipo: 'encomenda',
  codigoRastreio: createCodigoRastreio(),
});

export const toEntregaForm = (entrega: Entrega): EntregaForm => ({
  destinatario: entrega.destinatario,
  bloco: entrega.bloco,
  unidade: entrega.unidade,
  transportadora: entrega.transportadora,
  tipo: entrega.tipo,
  codigoRastreio: entrega.codigoRastreio,
});
