import type { SelectOption } from '@/types/common';

export const BLOCOS = ['A', 'B', 'C'] as const;

export const MOTIVOS_VISITA: SelectOption[] = [
  { value: 'Visita social', label: 'Visita social' },
  { value: 'Visita familiar', label: 'Visita familiar' },
  { value: 'Entrega de documento', label: 'Entrega de documento' },
  { value: 'Manutenção', label: 'Manutenção' },
  { value: 'Corretor de imóveis', label: 'Corretor de imóveis' },
  { value: 'Outro', label: 'Outro' },
];

export const TRANSPORTADORAS: SelectOption[] = [
  { value: 'Correios', label: 'Correios' },
  { value: 'Mercado Livre', label: 'Mercado Livre' },
  { value: 'Amazon', label: 'Amazon' },
  { value: 'Jadlog', label: 'Jadlog' },
  { value: 'Loggi', label: 'Loggi' },
  { value: 'Motoboy próprio', label: 'Motoboy próprio' },
];

export const SERVIDORES_TURNO = ['Marina Alves', 'Rafael Souza', 'Cleber Nunes'] as const;

export const SERVICOS_PRESTADOR: SelectOption[] = [
  { value: 'Manutenção elétrica', label: 'Manutenção elétrica' },
  { value: 'Manutenção hidráulica', label: 'Manutenção hidráulica' },
  { value: 'Limpeza', label: 'Limpeza' },
  { value: 'Instalação de internet', label: 'Instalação de internet' },
  { value: 'Jardinagem', label: 'Jardinagem' },
  { value: 'Outro', label: 'Outro' },
];
