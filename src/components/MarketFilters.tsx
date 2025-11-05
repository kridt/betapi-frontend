import { SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { MarketType } from '../types';
import { cn } from '../lib/utils';

const MARKET_OPTIONS: { value: MarketType; label: string }[] = [
  { value: 'ALL', label: 'All Markets' },
  { value: '1X2', label: '1X2' },
  { value: 'O/U 2.5', label: 'Over/Under 2.5' },
  { value: 'BTTS', label: 'Both Teams to Score' },
];

export function MarketFilters() {
  const { selectedMarket, setSelectedMarket, minEV, setMinEV, resetFilters } = useStore();

  return (
    <div className="bg-surface rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted" />
          <h3 className="text-sm font-semibold text-text">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-muted hover:text-text transition-colors flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Market Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted">Market Type</label>
        <div className="flex flex-wrap gap-2">
          {MARKET_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMarket(option.value)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                selectedMarket === option.value
                  ? 'bg-positive text-page'
                  : 'bg-surface2 text-muted hover:bg-surface2/80 hover:text-text'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* EV Threshold Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted">Minimum EV %</label>
          <span className="text-xs font-mono text-positive">{minEV.toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="0.5"
          value={minEV}
          onChange={(e) => setMinEV(parseFloat(e.target.value))}
          className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-muted">
          <span>0%</span>
          <span>20%</span>
        </div>
      </div>

      {/* Current Filter Summary */}
      <div className="pt-3 border-t border-surface2 text-xs text-muted">
        <p>
          Showing <span className="text-positive font-medium">{selectedMarket}</span> with EV ≥{' '}
          <span className="text-positive font-medium">{minEV.toFixed(1)}%</span>
        </p>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00BCD4;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00BCD4;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
