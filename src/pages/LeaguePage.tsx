import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import { useUpcomingMatches } from '../hooks/useQueries';
import { MatchCard } from '../components/MatchCard';
import { MatchCardSkeleton } from '../components/Skeleton';

export function LeaguePage() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const { data: matches, isLoading, error } = useUpcomingMatches(leagueId || '', 10);

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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Calendar className="w-8 h-8 text-positive" />
        <div>
          <h1 className="text-2xl font-bold text-text">Upcoming Matches</h1>
          <p className="text-sm text-muted">League ID: {leagueId}</p>
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
            <p className="text-sm font-medium text-red-500">Failed to load matches</p>
            <p className="text-xs text-red-400 mt-1">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Matches Grid */}
      {matches && matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {matches.map((match, index) => (
            <motion.div
              key={match.match_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <MatchCard match={match} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {matches && matches.length === 0 && !isLoading && (
        <div className="bg-surface rounded-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-text font-medium">No upcoming matches</p>
          <p className="text-sm text-muted mt-1">Check back later for new fixtures</p>
        </div>
      )}
    </div>
  );
}
