import { Check, Eye, LogIn, LogOut, Pencil, Trash2, X } from 'lucide-react';
import type { Visitante } from '@/types/visitante';
import { IconButton } from '@/components/ui/IconButton';

interface VisitanteRowActionsProps {
  visitante: Visitante;
  disabled?: boolean;
  onDetail: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onAutorizar: () => void;
  onNegar: () => void;
  onEntrada: () => void;
  onSaida: () => void;
}

export function VisitanteRowActions({
  visitante,
  disabled,
  onDetail,
  onEdit,
  onRemove,
  onAutorizar,
  onNegar,
  onEntrada,
  onSaida,
}: VisitanteRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      {visitante.status === 'aguardando' && (
        <>
          <IconButton icon={Check} label="Autorizar entrada" onClick={onAutorizar} disabled={disabled} />
          <IconButton icon={X} label="Negar entrada" tone="danger" onClick={onNegar} disabled={disabled} />
        </>
      )}
      {visitante.status === 'autorizado' && (
        <IconButton icon={LogIn} label="Registrar entrada" onClick={onEntrada} disabled={disabled} />
      )}
      {visitante.status === 'no_local' && (
        <IconButton icon={LogOut} label="Registrar saída" onClick={onSaida} disabled={disabled} />
      )}
      <IconButton icon={Eye} label="Ver detalhes" onClick={onDetail} />
      <IconButton icon={Pencil} label="Editar cadastro" onClick={onEdit} />
      <IconButton icon={Trash2} label="Excluir visitante" tone="danger" onClick={onRemove} />
    </div>
  );
}
