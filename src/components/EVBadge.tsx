import { cn, formatEV, getEVColor } from '../lib/utils';

interface EVBadgeProps {
  ev: number;
  className?: string;
}

export function EVBadge({ ev, className }: EVBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getEVColor(ev),
        className
      )}
    >
      {formatEV(ev)}
    </span>
  );
}
