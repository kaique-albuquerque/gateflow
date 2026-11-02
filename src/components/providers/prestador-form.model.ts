import type { Prestador, PrestadorForm } from '@/types/prestador';
import { BLOCOS, SERVICOS_PRESTADOR } from '@/constants/options';

export const BLOCOS_OPTIONS = BLOCOS.map((bloco) => ({ value: bloco, label: `Bloco ${bloco}` }));

export const SERVICO_OPTIONS = SERVICOS_PRESTADOR;

export const emptyPrestadorForm = (): PrestadorForm => ({
  nome: '',
  documento: '',
  empresa: '',
  telefone: '',
  servico: SERVICOS_PRESTADOR[0].value,
  bloco: BLOCOS[0],
  unidade: '',
});

export const toPrestadorForm = (prestador: Prestador): PrestadorForm => ({
  nome: prestador.nome,
  documento: prestador.documento,
  empresa: prestador.empresa,
  telefone: prestador.telefone,
  servico: prestador.servico,
  bloco: prestador.bloco,
  unidade: prestador.unidade,
});
