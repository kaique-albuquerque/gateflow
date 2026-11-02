import { cn, initials } from '@/utils/format';

interface AvatarProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md';
}

const SIZES = { sm: 'size-8 text-[11px]', md: 'size-9 text-xs' };

export function Avatar({ name, className, size = 'sm' }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 font-semibold text-white',
        SIZES[size],
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
