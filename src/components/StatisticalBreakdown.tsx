import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, Activity, Info } from 'lucide-react';
import type { StatisticalMetadata } from '../types';

interface StatisticalBreakdownProps {
  metadata?: StatisticalMetadata;
  homeTeam: string;
  awayTeam: string;
}

export function StatisticalBreakdown({ metadata, homeTeam, awayTeam }: StatisticalBreakdownProps) {
  if (!metadata) {
    return (
      <div className="bg-surface rounded-lg p-4">
        <p className="text-sm text-muted">Statistical analysis not available</p>
      </div>
    );
  }

  const { h2h_summary, home_form, away_form, home_expected_goals, away_expected_goals } = metadata;

  const totalH2H = h2h_summary.homeWins + h2h_summary.draws + h2h_summary.awayWins;
  const homeWinPct = totalH2H > 0 ? (h2h_summary.homeWins / totalH2H) * 100 : 0;
  const awayWinPct = totalH2H > 0 ? (h2h_summary.awayWins / totalH2H) * 100 : 0;

  const homeFormPct = home_form.matchCount > 0
    ? ((home_form.wins + home_form.draws * 0.5) / home_form.matchCount) * 100
    : 0;
  const awayFormPct = away_form.matchCount > 0
    ? ((away_form.wins + away_form.draws * 0.5) / away_form.matchCount) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Model Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-300">
            <p className="font-medium mb-1">Statistical Model (Poisson Distribution)</p>
            <p className="text-blue-400/80">
              Probabilities calculated from {h2h_summary.matchCount} H2H matches, {home_form.matchCount} home team matches,
              and {away_form.matchCount} away team matches.
            </p>
          </div>
        </div>
      </div>

      {/* Expected Goals */}
      <div className="bg-surface rounded-lg p-4">
        <h4 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Expected Goals (xG)
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted mb-1">{homeTeam}</p>
            <p className="text-2xl font-bold text-text">{home_expected_goals.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted mb-1">{awayTeam}</p>
            <p className="text-2xl font-bold text-text">{away_expected_goals.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-3 h-2 bg-surface2 rounded-full overflow-hidden flex">
          <div
            className="bg-primary"
            style={{ width: `${(home_expected_goals / (home_expected_goals + away_expected_goals)) * 100}%` }}
          />
          <div
            className="bg-accent"
            style={{ width: `${(away_expected_goals / (home_expected_goals + away_expected_goals)) * 100}%` }}
          />
        </div>
      </div>

      {/* Head to Head */}
      {totalH2H > 0 && (
        <div className="bg-surface rounded-lg p-4">
          <h4 className="text-sm font-semibold text-text mb-3">
            Head-to-Head ({totalH2H} matches)
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{homeTeam} wins</span>
              <span className="font-medium text-text">{h2h_summary.homeWins} ({homeWinPct.toFixed(0)}%)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">Draws</span>
              <span className="font-medium text-text">{h2h_summary.draws}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{awayTeam} wins</span>
              <span className="font-medium text-text">{h2h_summary.awayWins} ({awayWinPct.toFixed(0)}%)</span>
            </div>
            <div className="mt-3 pt-3 border-t border-surface2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Avg goals (H2H)</span>
                <span className="font-mono text-text">
                  {h2h_summary.avgHomeGoals.toFixed(1)} - {h2h_summary.avgAwayGoals.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Form */}
      <div className="bg-surface rounded-lg p-4">
        <h4 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Recent Form (Last {Math.max(home_form.matchCount, away_form.matchCount)} Matches)
        </h4>

        {/* Home Team */}
        <div className="mb-4 pb-4 border-b border-surface2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-text">{homeTeam}</p>
            <div className="flex items-center gap-1">
              {homeFormPct >= 60 ? (
                <TrendingUp className="w-3 h-3 text-positive" />
              ) : homeFormPct <= 40 ? (
                <TrendingDown className="w-3 h-3 text-negative" />
              ) : null}
              <span className="text-xs text-muted">{homeFormPct.toFixed(0)}% points</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-2">
            <div className="text-center">
              <p className="text-xs text-muted">Record</p>
              <p className="text-sm font-mono text-text">
                {home_form.wins}-{home_form.draws}-{home_form.losses}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted">Goals/Game</p>
              <p className="text-sm font-mono text-positive">{home_form.goalsScored.toFixed(1)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted">Conceded</p>
              <p className="text-sm font-mono text-negative">{home_form.goalsConceded.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-text">{awayTeam}</p>
            <div className="flex items-center gap-1">
              {awayFormPct >= 60 ? (
                <TrendingUp className="w-3 h-3 text-positive" />
              ) : awayFormPct <= 40 ? (
                <TrendingDown className="w-3 h-3 text-negative" />
              ) : null}
              <span className="text-xs text-muted">{awayFormPct.toFixed(0)}% points</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-muted">Record</p>
              <p className="text-sm font-mono text-text">
                {away_form.wins}-{away_form.draws}-{away_form.losses}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted">Goals/Game</p>
              <p className="text-sm font-mono text-positive">{away_form.goalsScored.toFixed(1)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted">Conceded</p>
              <p className="text-sm font-mono text-negative">{away_form.goalsConceded.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Summary */}
      <div className="bg-surface2 rounded-lg p-3">
        <p className="text-xs text-muted leading-relaxed">
          <span className="font-medium text-text">How probabilities are calculated:</span>
          <br />
          Expected goals are calculated using team attack strength, defensive weakness, and home advantage (15% boost).
          Poisson distribution is then applied to determine match outcome probabilities. H2H data is weighted at 30%,
          recent form at 70%.
        </p>
      </div>
    </motion.div>
  );
}
