import type { Prestador } from '@/types/prestador';
import { shiftISO } from '@/utils/datetime';

function prestador(
  data: Pick<Prestador, 'id' | 'nome' | 'empresa' | 'servico' | 'bloco' | 'unidade'> &
    Partial<Prestador>,
): Prestador {
  return {
    documento: 'CPF 000.000.000-00',
    telefone: '(11) 90000-0000',
    entradaEm: null,
    saidaEm: null,
    status: 'aguardando',
    criadoEm: shiftISO(0, '08:00'),
    ...data,
  };
}

export const seedPrestadores: Prestador[] = [
  prestador({
    id: 'PRE-001',
    nome: 'Rogério Pinheiro',
    documento: 'CPF 221.118.447-90',
    empresa: 'Pinheiro Elétrica',
    telefone: '(11) 98812-7712',
    servico: 'Manutenção elétrica',
    bloco: 'A',
    unidade: '202',
    entradaEm: shiftISO(0, '08:10'),
    status: 'no_local',
  }),
  prestador({
    id: 'PRE-002',
    nome: 'Silvana Correia',
    documento: 'CPF 338.774.112-04',
    empresa: 'Clean Prime',
    telefone: '(11) 99640-2288',
    servico: 'Limpeza',
    bloco: 'B',
    unidade: '202',
    entradaEm: shiftISO(0, '09:35'),
    status: 'no_local',
  }),
  prestador({
    id: 'PRE-003',
    nome: 'Anderson Prado',
    documento: 'CPF 447.220.118-33',
    empresa: 'NetFibra',
    telefone: '(11) 97411-5522',
    servico: 'Instalação de internet',
    bloco: 'C',
    unidade: '302',
    status: 'aguardando',
  }),
  prestador({
    id: 'PRE-004',
    nome: 'Vera Nogueira',
    documento: 'CPF 556.118.220-71',
    empresa: 'Jardim Vivo',
    telefone: '(11) 98220-3344',
    servico: 'Jardinagem',
    bloco: 'A',
    unidade: '101',
    status: 'aguardando',
  }),
  prestador({
    id: 'PRE-005',
    nome: 'Henrique Lopes',
    documento: 'CPF 660.447.118-22',
    empresa: 'Hidra Serviços',
    telefone: '(11) 99012-4477',
    servico: 'Manutenção hidráulica',
    bloco: 'A',
    unidade: '302',
    entradaEm: shiftISO(-1, '09:04'),
    saidaEm: shiftISO(-1, '11:30'),
    status: 'finalizado',
    criadoEm: shiftISO(-1, '08:55'),
  }),
];
