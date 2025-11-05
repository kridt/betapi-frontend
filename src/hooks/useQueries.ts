import { useQuery } from '@tanstack/react-query';
import {
  fetchTop20Leagues,
  fetchUpcomingMatches,
  fetchMatchSummary,
  fetchMatchDetails,
  fetchMatchOdds,
  fetchMatchModel,
  fetchMatchH2H,
  fetchHealth,
} from '../lib/api';
import { ODDS_POLL_INTERVAL } from '../lib/queryClient';

// Leagues
export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues', 'top20'],
    queryFn: fetchTop20Leagues,
    staleTime: 3600000, // 1 hour
  });
};

// Upcoming matches for a league
export const useUpcomingMatches = (leagueId: string | number, limit = 10) => {
  return useQuery({
    queryKey: ['matches', 'upcoming', leagueId, limit],
    queryFn: () => fetchUpcomingMatches(leagueId, limit),
    enabled: !!leagueId,
    staleTime: 300000, // 5 minutes
  });
};

// Match summary
export const useMatchSummary = (matchId: string | number) => {
  return useQuery({
    queryKey: ['match', matchId, 'summary'],
    queryFn: () => fetchMatchSummary(matchId),
    enabled: !!matchId,
    staleTime: 180000, // 3 minutes
  });
};

// Match details
export const useMatchDetails = (matchId: string | number) => {
  return useQuery({
    queryKey: ['match', matchId, 'details'],
    queryFn: () => fetchMatchDetails(matchId),
    enabled: !!matchId,
    staleTime: 300000, // 5 minutes
  });
};

// Match odds (with polling for live updates)
export const useMatchOdds = (matchId: string | number) => {
  return useQuery({
    queryKey: ['match', matchId, 'odds'],
    queryFn: () => fetchMatchOdds(matchId),
    enabled: !!matchId,
    staleTime: 60000, // 1 minute
    refetchInterval: ODDS_POLL_INTERVAL, // Poll for live updates
  });
};

// Match model (EV calculations) - also polls
export const useMatchModel = (matchId: string | number) => {
  return useQuery({
    queryKey: ['match', matchId, 'model'],
    queryFn: () => fetchMatchModel(matchId),
    enabled: !!matchId,
    staleTime: 60000, // 1 minute
    refetchInterval: ODDS_POLL_INTERVAL, // Poll for live EV updates
  });
};

// Match H2H
export const useMatchH2H = (matchId: string | number) => {
  return useQuery({
    queryKey: ['match', matchId, 'h2h'],
    queryFn: () => fetchMatchH2H(matchId),
    enabled: !!matchId,
    staleTime: 600000, // 10 minutes
  });
};

// Health check
export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Check every 30 seconds
  });
};
