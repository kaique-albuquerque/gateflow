import type { ReactNode } from 'react';
import type { StatusMeta } from '@/types/common';
import { Badge } from './Badge';

interface StatusBadgeProps {
  meta: StatusMeta;
  withDot?: boolean;
}

export function StatusBadge({ meta, withDot = true }: StatusBadgeProps) {
  return (
    <Badge tone={meta.tone} withDot={withDot}>
      {meta.label}
    </Badge>
  );
}
