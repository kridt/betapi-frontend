import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { League } from '../types';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

interface LeagueCardProps {
  league: League;
}

export function LeagueCard({ league }: LeagueCardProps) {
  const { isFavorite, toggleFavorite } = useStore();
  const favorite = isFavorite(String(league.league_id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(String(league.league_id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/league/${league.league_id}`}
        className="block bg-surface rounded-lg p-4 hover:bg-surface2 transition-colors relative group"
      >
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-surface2 transition-colors"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star
            className={cn(
              'w-4 h-4 transition-colors',
              favorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
            )}
          />
        </button>

        <div className="flex items-center gap-3">
          {league.logo ? (
            <img
              src={league.logo}
              alt={league.name}
              className="w-12 h-12 object-contain rounded-full bg-surface2 p-1"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-surface2 flex items-center justify-center">
              <span className="text-xs text-muted font-medium">
                {league.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-text truncate group-hover:text-positive transition-colors">
              {league.name}
            </h3>
            <p className="text-xs text-muted mt-0.5">{league.country}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
