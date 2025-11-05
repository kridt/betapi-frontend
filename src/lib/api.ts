import axios from 'axios';
import type {
  League,
  Match,
  MatchSummary,
  MatchDetails,
  OddsMarket,
  MatchModel,
  H2HData,
  HealthCheck,
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Leagues
export const fetchTop20Leagues = async (): Promise<League[]> => {
  const { data } = await api.get('/leagues/top20');
  return data.leagues;
};

// Matches
export const fetchUpcomingMatches = async (
  leagueId: string | number,
  limit = 10
): Promise<Match[]> => {
  const { data } = await api.get('/matches/upcoming', {
    params: { league_id: leagueId, limit },
  });
  return data.matches;
};

// Match Details
export const fetchMatchSummary = async (matchId: string | number): Promise<MatchSummary> => {
  const { data } = await api.get(`/match/${matchId}/summary`);
  return data;
};

export const fetchMatchDetails = async (matchId: string | number): Promise<MatchDetails> => {
  const { data } = await api.get(`/match/${matchId}/details`);
  return data;
};

export const fetchMatchOdds = async (matchId: string | number): Promise<{ markets: OddsMarket[] }> => {
  const { data } = await api.get(`/match/${matchId}/odds`);
  return data;
};

export const fetchMatchModel = async (matchId: string | number): Promise<MatchModel> => {
  const { data } = await api.get(`/match/${matchId}/model`);
  return data;
};

export const fetchMatchH2H = async (matchId: string | number): Promise<H2HData> => {
  const { data } = await api.get(`/match/${matchId}/h2h`);
  return data;
};

// Health
export const fetchHealth = async (): Promise<HealthCheck> => {
  const { data } = await api.get('/health');
  return data;
};
