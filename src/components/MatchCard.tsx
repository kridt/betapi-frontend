import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { Match } from '../types';
import { formatDate, getStatusColor, cn } from '../lib/utils';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/match/${match.match_id}`}
        className="block bg-surface rounded-lg p-4 hover:bg-surface2 transition-colors"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Clock className="w-3 h-3" />
            <span>{formatDate(match.start_time)}</span>
          </div>
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              getStatusColor(match.status)
            )}
          >
            {match.status.toUpperCase()}
          </span>
        </div>

        {/* Teams */}
        <div className="space-y-2">
          {/* Home Team */}
          <div className="flex items-center gap-2">
            {match.home_logo ? (
              <img
                src={match.home_logo}
                alt={match.home_team}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded bg-surface2 flex items-center justify-center">
                <span className="text-xs text-muted">H</span>
              </div>
            )}
            <span className="text-sm text-text font-medium flex-1 truncate">
              {match.home_team}
            </span>
            {match.score && (
              <span className="text-sm font-bold text-positive">
                {match.score.split('-')[0]}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-2">
            {match.away_logo ? (
              <img
                src={match.away_logo}
                alt={match.away_team}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded bg-surface2 flex items-center justify-center">
                <span className="text-xs text-muted">A</span>
              </div>
            )}
            <span className="text-sm text-text font-medium flex-1 truncate">
              {match.away_team}
            </span>
            {match.score && (
              <span className="text-sm font-bold text-positive">
                {match.score.split('-')[1]}
              </span>
            )}
          </div>
        </div>

        {/* League Name */}
        {match.league_name && (
          <div className="mt-3 pt-3 border-t border-surface2">
            <span className="text-xs text-muted">{match.league_name}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
