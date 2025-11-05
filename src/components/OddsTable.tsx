import { motion } from 'framer-motion';
import { TrendingUp, ExternalLink } from 'lucide-react';
import type { EVOpportunity } from '../types';
import { EVBadge } from './EVBadge';
import { formatOdds, formatProbability } from '../lib/utils';
import { useStore } from '../store/useStore';

interface OddsTableProps {
  opportunities: EVOpportunity[];
}

export function OddsTable({ opportunities }: OddsTableProps) {
  const { sortBy, sortOrder, minEV, selectedMarket } = useStore();

  // Filter by market
  const filtered = opportunities.filter((opp) => {
    if (selectedMarket === 'ALL') return opp.ev_pct >= minEV;
    return opp.market === selectedMarket && opp.ev_pct >= minEV;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'ev':
        comparison = a.ev_pct - b.ev_pct;
        break;
      case 'odds':
        comparison = a.bookmaker_odds - b.bookmaker_odds;
        break;
      case 'probability':
        comparison = a.probability - b.probability;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (sorted.length === 0) {
    return (
      <div className="bg-surface rounded-lg p-8 text-center">
        <div className="text-muted mb-2">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
        </div>
        <p className="text-text font-medium">No EV opportunities found</p>
        <p className="text-sm text-muted mt-1">
          Try adjusting your filters or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface2">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Market
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Outcome
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Bookmaker
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">
                Odds
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">
                Fair Odds
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">
                Probability
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">
                EV%
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface2">
            {sorted.map((opp, index) => (
              <motion.tr
                key={`${opp.bookmaker}-${opp.market}-${opp.outcome}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-surface2 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm font-medium text-text">{opp.market}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-text capitalize">{opp.outcome}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted capitalize">{opp.bookmaker}</span>
                    <ExternalLink className="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <span className="text-sm font-mono text-text">{formatOdds(opp.bookmaker_odds)}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <span className="text-sm font-mono text-muted">{formatOdds(opp.fair_odds)}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <span className="text-sm text-muted">{formatProbability(opp.probability)}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <EVBadge ev={opp.ev_pct} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-surface2 px-4 py-3 text-sm text-muted">
        Showing {sorted.length} {sorted.length === 1 ? 'opportunity' : 'opportunities'} with EV ≥ {minEV}%
      </div>
    </div>
  );
}
