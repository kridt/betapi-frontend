import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, RefreshCw, AlertCircle, TrendingUp } from 'lucide-react';
import { useMatchSummary, useMatchModel } from '../hooks/useQueries';
import { OddsTable } from '../components/OddsTable';
import { MarketFilters } from '../components/MarketFilters';
import { TableSkeleton } from '../components/Skeleton';
import { StatisticalBreakdown } from '../components/StatisticalBreakdown';
import { MatchStatsPredictions } from '../components/MatchStatsPredictions';
import { formatDate, getStatusColor, cn } from '../lib/utils';

export function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useMatchSummary(matchId || '');
  const {
    data: model,
    isLoading: modelLoading,
    error: modelError,
    dataUpdatedAt,
  } = useMatchModel(matchId || '');

  const isLoading = summaryLoading || modelLoading;
  const error = summaryError || modelError;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leagues
        </Link>
      </motion.div>

      {/* Match Header */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-lg p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted" />
              <div>
                <p className="text-sm text-muted">{formatDate(summary.start_time)}</p>
                <p className="text-xs text-muted mt-0.5">{summary.league.name}</p>
              </div>
            </div>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium self-start md:self-auto',
                getStatusColor(summary.status)
              )}
            >
              {summary.status.toUpperCase()}
            </span>
          </div>

          {/* Teams */}
          <div className="space-y-4">
            {/* Home Team */}
            <div className="flex items-center gap-4">
              {summary.home_logo ? (
                <img
                  src={summary.home_logo}
                  alt={summary.home_team}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-surface2 flex items-center justify-center">
                  <span className="text-muted font-bold">H</span>
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-text">{summary.home_team}</h2>
                <p className="text-sm text-muted">Home</p>
              </div>
              {summary.score && (
                <span className="text-3xl font-bold text-positive">
                  {summary.score.split('-')[0]}
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-4">
              {summary.away_logo ? (
                <img
                  src={summary.away_logo}
                  alt={summary.away_team}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-surface2 flex items-center justify-center">
                  <span className="text-muted font-bold">A</span>
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-text">{summary.away_team}</h2>
                <p className="text-sm text-muted">Away</p>
              </div>
              {summary.score && (
                <span className="text-3xl font-bold text-positive">
                  {summary.score.split('-')[1]}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-500">Failed to load match data</p>
            <p className="text-xs text-red-400 mt-1">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Filters & Probabilities */}
        <div className="lg:col-span-1 space-y-6">
          <MarketFilters />

          {/* Statistical Breakdown */}
          {model?.markets.metadata && summary && (
            <StatisticalBreakdown
              metadata={model.markets.metadata}
              homeTeam={summary.home_team}
              awayTeam={summary.away_team}
            />
          )}

          {/* Last Updated */}
          {dataUpdatedAt && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <RefreshCw className="w-3 h-3" />
              <span>Updated {new Date(dataUpdatedAt).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Right Column - Odds Table & Stats Predictions */}
        <div className="lg:col-span-3 space-y-6">
          {isLoading && <TableSkeleton rows={10} />}

          {model && model.markets.all_opportunities && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              {model.markets.all_opportunities.length > 0 ? (
                <OddsTable opportunities={model.markets.all_opportunities} />
              ) : (
                <div className="bg-surface rounded-lg p-12 text-center">
                  <TrendingUp className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
                  <p className="text-text font-medium">No EV opportunities found</p>
                  <p className="text-sm text-muted mt-1">
                    Adjust filters or wait for odds to update
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Match Statistics Predictions */}
          {model?.markets.stats_predictions && summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MatchStatsPredictions
                predictions={model.markets.stats_predictions}
                homeTeam={summary.home_team}
                awayTeam={summary.away_team}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
