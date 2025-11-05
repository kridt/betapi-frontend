import { motion } from 'framer-motion';
import { Trophy, AlertCircle } from 'lucide-react';
import { useLeagues } from '../hooks/useQueries';
import { LeagueCard } from '../components/LeagueCard';
import { LeagueCardSkeleton } from '../components/Skeleton';

export function HomePage() {
  const { data: leagues, isLoading, error } = useLeagues();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Trophy className="w-8 h-8 text-positive" />
        <div>
          <h1 className="text-2xl font-bold text-text">Top 20 Football Leagues</h1>
          <p className="text-sm text-muted">Select a league to view upcoming matches and EV opportunities</p>
        </div>
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-500">Failed to load leagues</p>
            <p className="text-xs text-red-400 mt-1">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <LeagueCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Leagues Grid */}
      {leagues && leagues.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {leagues.map((league, index) => (
            <motion.div
              key={league.league_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <LeagueCard league={league} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {leagues && leagues.length === 0 && !isLoading && (
        <div className="bg-surface rounded-lg p-12 text-center">
          <Trophy className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-text font-medium">No leagues available</p>
          <p className="text-sm text-muted mt-1">Check back later for updates</p>
        </div>
      )}
    </div>
  );
}
