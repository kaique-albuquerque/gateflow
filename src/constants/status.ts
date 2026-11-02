import type { StatusMap } from '@/types/common';
import type { VisitanteStatus } from '@/types/visitante';
import type { MoradorStatus } from '@/types/morador';
import type { UnidadeSituacao } from '@/types/unidade';
import type { EntregaStatus, EntregaTipo } from '@/types/entrega';
import type { AcessoStatus, AcessoTipo } from '@/types/acesso';
import type { PrestadorStatus } from '@/types/prestador';
import type { OcorrenciaCategoria, OcorrenciaStatus } from '@/types/ocorrencia';
import type { DispositivoStatus, DispositivoTipo } from '@/types/dispositivo';

export const VISITANTE_STATUS: StatusMap<VisitanteStatus> = {
  aguardando: { label: 'Aguardando autorização', tone: 'warning' },
  autorizado: { label: 'Autorizado', tone: 'info' },
  negado: { label: 'Entrada negada', tone: 'danger' },
  no_local: { label: 'No condomínio', tone: 'success' },
  finalizado: { label: 'Visita finalizada', tone: 'neutral' },
};

export const MORADOR_STATUS: StatusMap<MoradorStatus> = {
  ativo: { label: 'Ativo', tone: 'success' },
  inativo: { label: 'Inativo', tone: 'neutral' },
};

export const UNIDADE_SITUACAO: StatusMap<UnidadeSituacao> = {
  ocupada: { label: 'Ocupada', tone: 'success' },
  vazia: { label: 'Sem morador', tone: 'warning' },
  manutencao: { label: 'Em manutenção', tone: 'info' },
};

export const ENTREGA_STATUS: StatusMap<EntregaStatus> = {
  recebida: { label: 'Recebida', tone: 'info' },
  aguardando: { label: 'Aguardando retirada', tone: 'warning' },
  entregue: { label: 'Entregue ao morador', tone: 'success' },
};

export const ENTREGA_TIPO: Record<EntregaTipo, string> = {
  encomenda: 'Encomenda',
  documento: 'Documento',
  alimento: 'Alimento',
  outro: 'Outro',
};

export const ACESSO_STATUS: StatusMap<AcessoStatus> = {
  no_local: { label: 'No condomínio', tone: 'success' },
  finalizado: { label: 'Finalizado', tone: 'neutral' },
  negado: { label: 'Negado', tone: 'danger' },
};

export const ACESSO_TIPO: Record<AcessoTipo, string> = {
  visitante: 'Visitante',
  prestador: 'Prestador de serviço',
  entregador: 'Entregador',
  morador: 'Morador',
};

export const PRESTADOR_STATUS: StatusMap<PrestadorStatus> = {
  aguardando: { label: 'Aguardando entrada', tone: 'warning' },
  no_local: { label: 'Em serviço', tone: 'success' },
  finalizado: { label: 'Serviço concluído', tone: 'neutral' },
};

export const OCORRENCIA_STATUS: StatusMap<OcorrenciaStatus> = {
  aberta: { label: 'Aberta', tone: 'danger' },
  em_andamento: { label: 'Em andamento', tone: 'warning' },
  resolvida: { label: 'Resolvida', tone: 'success' },
};

export const OCORRENCIA_CATEGORIA: Record<OcorrenciaCategoria, string> = {
  acesso: 'Acesso',
  entrega: 'Entrega',
  seguranca: 'Segurança',
  operacional: 'Operacional',
  outro: 'Outro',
};

export const DISPOSITIVO_STATUS: StatusMap<DispositivoStatus> = {
  conectado: { label: 'Conectado', tone: 'success' },
  desconectado: { label: 'Desconectado', tone: 'danger' },
  nao_configurado: { label: 'Não configurado', tone: 'neutral' },
};

export const DISPOSITIVO_TIPO: Record<DispositivoTipo, string> = {
  controladora: 'Controladora de acesso',
  qr: 'Leitor de QR Code',
  camera: 'Câmera IP',
  fechadura: 'Fechadura eletrônica',
  interfonia: 'Sistema de interfonia',
};
