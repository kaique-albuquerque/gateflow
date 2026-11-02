import type { Dispositivo } from '@/types/dispositivo';
import { shiftISO } from '@/utils/datetime';

export const seedDispositivos: Dispositivo[] = [
  {
    id: 'DIS-001',
    nome: 'Controladora principal',
    tipo: 'controladora',
    modelo: 'Intelbras SS 3540 MF',
    local: 'Guarita principal',
    status: 'conectado',
    atualizadoEm: shiftISO(0, '08:05'),
  },
  {
    id: 'DIS-002',
    nome: 'Leitor de QR Code social',
    tipo: 'qr',
    modelo: 'Intelbras QR 100',
    local: 'Entrada de pedestres',
    status: 'conectado',
    atualizadoEm: shiftISO(0, '08:06'),
  },
  {
    id: 'DIS-003',
    nome: 'Câmera garagem',
    tipo: 'camera',
    modelo: 'Intelbras VIP 1230 B',
    local: 'Rampa de acesso',
    status: 'desconectado',
    atualizadoEm: shiftISO(-1, '19:42'),
  },
  {
    id: 'DIS-004',
    nome: 'Fechadura eletrônica bloco A',
    tipo: 'fechadura',
    modelo: 'Intelbras FE 2010',
    local: 'Porta de serviço bloco A',
    status: 'conectado',
    atualizadoEm: shiftISO(0, '07:58'),
  },
  {
    id: 'DIS-005',
    nome: 'Central de interfonia',
    tipo: 'interfonia',
    modelo: 'Intelbras XPE 3110',
    local: 'Guarita principal',
    status: 'nao_configurado',
    atualizadoEm: shiftISO(-6, '11:20'),
  },
  {
    id: 'DIS-006',
    nome: 'Câmera portaria social',
    tipo: 'camera',
    modelo: 'Intelbras VIP 3220',
    local: 'Portaria social',
    status: 'conectado',
    atualizadoEm: shiftISO(0, '08:00'),
  },
];
