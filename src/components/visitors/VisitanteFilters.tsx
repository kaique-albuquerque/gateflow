import { BLOCOS } from '@/constants/options';
import { VISITANTE_STATUS } from '@/constants/status';
import { Select } from '@/components/ui/Select';
import { toStatusOptions } from '@/utils/status-options';

const STATUS_OPTIONS = toStatusOptions(VISITANTE_STATUS);
const BLOCO_OPTIONS = BLOCOS.map((bloco) => ({ value: bloco, label: `Bloco ${bloco}` }));

interface VisitanteFiltersProps {
  status: string;
  bloco: string;
  onStatusChange: (value: string) => void;
  onBlocoChange: (value: string) => void;
}

export function VisitanteFilters({ status, bloco, onStatusChange, onBlocoChange }: VisitanteFiltersProps) {
  return (
    <>
      <Select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        options={STATUS_OPTIONS}
        placeholder="Todos os status"
        aria-label="Filtrar por status"
        className="w-full sm:w-48"
      />
      <Select
        value={bloco}
        onChange={(event) => onBlocoChange(event.target.value)}
        options={BLOCO_OPTIONS}
        placeholder="Todos os blocos"
        aria-label="Filtrar por bloco"
        className="w-full sm:w-40"
      />
    </>
  );
}
