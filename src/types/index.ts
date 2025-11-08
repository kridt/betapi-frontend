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
  reason?: string;
}

export interface TeamForm {
  goalsScored: number;
  goalsConceded: number;
  wins: number;
  draws: number;
  losses: number;
  matchCount: number;
}

export interface H2HSummary {
  homeWins: number;
  draws: number;
  awayWins: number;
  avgHomeGoals: number;
  avgAwayGoals: number;
  matchCount: number;
}

export interface DataQuality {
  h2h_matches: number;
  home_form_matches: number;
  away_form_matches: number;
  reliability: number;
}

export interface StatisticalMetadata {
  model: string;
  home_expected_goals: number;
  away_expected_goals: number;
  h2h_summary: H2HSummary;
  home_form: TeamForm;
  away_form: TeamForm;
}

export interface StatPrediction {
  total?: number | {
    prediction: number;
    range?: { min: number; max: number };
    confidence: number;
    markets?: Array<{
      market: string;
      prediction: string;
      probability: number;
      reasoning: string;
    }>;
    historical?: {
      note: string;
      recent_matches: string;
      h2h_note: string;
    };
  };
  home: number;
  away: number;
  confidence?: number;
}

export interface StatsPredictions {
  corners: StatPrediction;
  shots: StatPrediction;
  shots_on_target: StatPrediction;
  offsides: StatPrediction;
  fouls: StatPrediction;
  cards: StatPrediction;
}

export interface EVData {
  probabilities: Record<string, number>;
  fair_odds: Record<string, number>;
  opportunities: EVOpportunity[];
  explanation?: string;
  data_quality?: DataQuality;
  expected_total_goals?: number;
  team_scoring?: {
    home_avg: number;
    away_avg: number;
  };
}

export interface MatchModel {
  match_id: string | number;
  timestamp: string;
  min_ev_threshold: number;
  model_type?: string;
  markets: {
    '1X2': EVData | null;
    'O/U 2.5': EVData | null;
    'BTTS': EVData | null;
    all_opportunities: EVOpportunity[];
    metadata?: StatisticalMetadata;
    stats_predictions?: StatsPredictions;
  };
  match_info?: {
    home_team: string;
    away_team: string;
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
