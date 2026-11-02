import type { UnidadeBase } from '@/types/unidade';

function unidade(
  bloco: string,
  numero: string,
  situacao: UnidadeBase['situacao'] = 'ocupada',
): UnidadeBase {
  return { id: `${bloco}-${numero}`, bloco, numero, situacao };
}

/** Malha fixa de unidades do condomínio demonstrativo. */
export const unidadesBase: UnidadeBase[] = [
  unidade('A', '101'),
  unidade('A', '102'),
  unidade('A', '201'),
  unidade('A', '202', 'manutencao'),
  unidade('A', '301'),
  unidade('A', '302'),
  unidade('B', '101'),
  unidade('B', '102'),
  unidade('B', '201'),
  unidade('B', '202', 'vazia'),
  unidade('B', '301'),
  unidade('C', '101'),
  unidade('C', '201', 'manutencao'),
  unidade('C', '301'),
  unidade('C', '302', 'vazia'),
];
