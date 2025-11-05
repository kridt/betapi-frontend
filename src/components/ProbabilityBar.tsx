import { cn, formatProbability } from '../lib/utils';

interface ProbabilityBarProps {
  probabilities: {
    home?: number;
    draw?: number;
    away?: number;
    over?: number;
    under?: number;
    yes?: number;
    no?: number;
  };
  className?: string;
}

export function ProbabilityBar({ probabilities, className }: ProbabilityBarProps) {
  const entries = Object.entries(probabilities).filter(([, prob]) => prob !== undefined);

  if (entries.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      {entries.map(([outcome, prob]) => (
        <div key={outcome} className="flex items-center gap-2">
          <span className="text-xs text-muted w-12 capitalize">{outcome}</span>
          <div className="flex-1 bg-surface2 rounded-full h-2 overflow-hidden">
            <div
              className="bg-positive h-full transition-all duration-300"
              style={{ width: `${(prob * 100).toFixed(1)}%` }}
            />
          </div>
          <span className="text-xs text-text w-12 text-right">
            {formatProbability(prob)}
          </span>
        </div>
      ))}
    </div>
  );
}
