import type { Acesso } from '@/types/acesso';
import type { DashboardData, MovimentacaoDia } from '@/types/dashboard';
import { isToday, toDateInput } from '@/utils/datetime';
import { acessosService } from './acessos.service';
import { entregasService } from './entregas.service';
import { moradoresService } from './moradores.service';
import { ocorrenciasService } from './ocorrencias.service';
import { visitantesService } from './visitantes.service';

const DIAS = 7;

const dateKey = (iso: string | null): string =>
  iso ? toDateInput(new Date(iso)) : '';

const byDateDesc = (a: string | null, b: string | null): number =>
  (b ?? '').localeCompare(a ?? '');

function buildMovimentacoes(acessos: Acesso[]): MovimentacaoDia[] {
  const today = new Date();

  return Array.from({ length: DIAS }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (DIAS - 1 - index));
    const key = toDateInput(date);

    return {
      dia: key,
      rotulo: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      entradas: acessos.filter((acesso) => dateKey(acesso.entradaEm) === key).length,
      saidas: acessos.filter((acesso) => dateKey(acesso.saidaEm) === key).length,
    };
  });
}

export async function loadDashboard(): Promise<DashboardData> {
  const [moradores, visitantes, entregas, acessos, ocorrencias] = await Promise.all([
    moradoresService.list(),
    visitantesService.list(),
    entregasService.list(),
    acessosService.list(),
    ocorrenciasService.list(),
  ]);

  const aguardando = visitantes.filter((visitante) => visitante.status === 'aguardando');
  const abertas = ocorrencias.filter((ocorrencia) => ocorrencia.status !== 'resolvida');

  return {
    stats: {
      moradores: moradores.filter((morador) => morador.status === 'ativo').length,
      aguardando: aguardando.length,
      presentes: acessos.filter((acesso) => acesso.status === 'no_local').length,
      entradasHoje: acessos.filter((acesso) => isToday(acesso.entradaEm)).length,
      encomendasPendentes: entregas.filter((entrega) => entrega.status !== 'entregue').length,
      ocorrenciasAbertas: abertas.length,
    },
    movimentacoes: buildMovimentacoes(acessos),
    ultimosAcessos: [...acessos]
      .sort((a, b) => byDateDesc(a.entradaEm, b.entradaEm))
      .slice(0, 6),
    visitantesAguardando: aguardando.slice(0, 4),
    entregasRecentes: [...entregas]
      .sort((a, b) => byDateDesc(a.recebidoEm, b.recebidoEm))
      .slice(0, 5),
    ocorrenciasAbertas: abertas.slice(0, 3),
  };
}
