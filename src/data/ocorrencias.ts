import type { Ocorrencia } from '@/types/ocorrencia';
import { shiftISO } from '@/utils/datetime';

export const seedOcorrencias: Ocorrencia[] = [
  {
    id: 'OCO-001',
    titulo: 'Leitor de QR Code da garagem instável',
    descricao:
      'O leitor da entrada de veículos apresenta falha intermitente. A portaria está liberando manualmente enquanto a manutenção não é concluída.',
    categoria: 'operacional',
    responsavel: 'Marina Alves',
    criadoEm: shiftISO(0, '07:50'),
    status: 'aberta',
  },
  {
    id: 'OCO-002',
    titulo: 'Encomenda não retirada há 4 dias',
    descricao:
      'Pacote destinado ao bloco C, unidade 101, segue na portaria. Morador avisado por telefone em duas ocasiões.',
    categoria: 'entrega',
    responsavel: 'Cleber Nunes',
    criadoEm: shiftISO(-1, '14:20'),
    status: 'em_andamento',
  },
  {
    id: 'OCO-003',
    titulo: 'Visitante sem identificação na portaria social',
    descricao:
      'Pessoa tentou acessar o bloco B sem documento e sem confirmação do morador. Entrada negada conforme procedimento.',
    categoria: 'seguranca',
    responsavel: 'Rafael Souza',
    criadoEm: shiftISO(-1, '10:15'),
    status: 'resolvida',
  },
  {
    id: 'OCO-004',
    titulo: 'Portão de pedestres com fechamento lento',
    descricao:
      'Mola hidráulica do portão social perdeu pressão. Prestador acionado para avaliação na próxima semana.',
    categoria: 'acesso',
    responsavel: 'Marina Alves',
    criadoEm: shiftISO(-2, '16:40'),
    status: 'em_andamento',
  },
  {
    id: 'OCO-005',
    titulo: 'Interfonia do bloco A sem áudio',
    descricao:
      'Moradores relatam ausência de áudio na interfonia. Testes indicam problema no módulo da guarita.',
    categoria: 'operacional',
    responsavel: 'Cleber Nunes',
    criadoEm: shiftISO(-4, '09:10'),
    status: 'resolvida',
  },
];
