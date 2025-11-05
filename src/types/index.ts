export interface League {
  league_id: string | number;
  name: string;
  country: string;
  logo: string;
  season_id: number | null;
}

export interface Match {
  match_id: string | number;
  home_team: string;
  away_team: string;
  start_time: string | number;
  status: 'scheduled' | 'live' | 'finished';
  home_logo?: string;
  away_logo?: string;
  league_name?: string;
  score?: string;
}

export interface MatchSummary extends Match {
  league: {
    league_id: string | number;
    name: string;
  };
}

export interface MatchDetails {
  lineups: any;
  stats: any;
  form: {
    home: string[];
    away: string[];
  };
}

export interface OddsMarket {
  market: '1X2' | 'O/U 2.5' | 'BTTS';
  bookmaker: string;
  odds: {
    home?: number;
    draw?: number;
    away?: number;
    over?: number;
    under?: number;
    yes?: number;
    no?: number;
  };
  timestamp?: string | number;
}

export interface EVOpportunity {
  market: string;
  outcome: string;
  bookmaker: string;
  bookmaker_odds: number;
  fair_odds: number;
  probability: number;
  ev_pct: number;
}

export interface EVData {
  probabilities: Record<string, number>;
  fair_odds: Record<string, number>;
  opportunities: EVOpportunity[];
}

export interface MatchModel {
  match_id: string | number;
  timestamp: string;
  min_ev_threshold: number;
  markets: {
    '1X2': EVData | null;
    'O/U 2.5': EVData | null;
    'BTTS': EVData | null;
    all_opportunities: EVOpportunity[];
  };
}

export interface H2HMatch {
  match_id: string | number;
  home_team: string;
  away_team: string;
  score: string;
  date: string;
}

export interface H2HData {
  matches: H2HMatch[];
  stats: {
    home_wins: number;
    draws: number;
    away_wins: number;
  };
}

export interface HealthCheck {
  ok: boolean;
  timestamp: string;
  latency_ms: number;
  environment: string;
  betsapi_configured: boolean;
}

export type MarketType = '1X2' | 'O/U 2.5' | 'BTTS' | 'ALL';

export interface UIState {
  favorites: string[];
  selectedMarket: MarketType;
  minEV: number;
  sortBy: 'ev' | 'odds' | 'probability';
  sortOrder: 'asc' | 'desc';
}
