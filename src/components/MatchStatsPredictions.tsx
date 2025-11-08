import { motion } from 'framer-motion';
import { TrendingUp, Target, AlertCircle, Info, Flag, Activity } from 'lucide-react';

interface StatPrediction {
  total?: {
    prediction: number;
    range?: { min: number; max: number };
    confidence: number;
    markets?: Array<{
      market: string;
      prediction: string;
      probability: number;
      reasoning: string;
    }>;
  };
  home: number;
  away: number;
  confidence?: number;
}

interface StatsPredictions {
  corners: StatPrediction;
  shots: StatPrediction;
  shots_on_target: StatPrediction;
  offsides: StatPrediction;
  fouls: StatPrediction;
  cards: StatPrediction;
}

interface MatchStatsPredictionsProps {
  predictions?: StatsPredictions;
  homeTeam: string;
  awayTeam: string;
}

export function MatchStatsPredictions({ predictions, homeTeam, awayTeam }: MatchStatsPredictionsProps) {
  if (!predictions) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-positive';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-muted';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 70) return 'bg-positive/10 border-positive/20';
    if (confidence >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-surface2 border-surface2';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-text">Match Statistics Predictions</h3>
        </div>
        <p className="text-xs text-muted">
          Based on expected goals and historical team averages. Confidence levels indicate prediction reliability.
        </p>
      </div>

      {/* Corners */}
      {predictions.corners && (
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-text">Corners</h4>
            </div>
            <span className={`text-xs ${getConfidenceColor(predictions.corners.total?.confidence || 0)}`}>
              {predictions.corners.total?.confidence}% confidence
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <p className="text-xs text-muted mb-1">{homeTeam}</p>
              <p className="text-xl font-bold text-text">{predictions.corners.home}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">Total</p>
              <p className="text-2xl font-bold text-primary">{predictions.corners.total?.prediction}</p>
              {predictions.corners.total?.range && (
                <p className="text-xs text-muted mt-1">
                  ({predictions.corners.total.range.min}-{predictions.corners.total.range.max})
                </p>
              )}
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">{awayTeam}</p>
              <p className="text-xl font-bold text-text">{predictions.corners.away}</p>
            </div>
          </div>

          {/* Historical Context */}
          {predictions.corners.total?.historical && (
            <div className="mt-3 pt-3 border-t border-surface2">
              <p className="text-xs text-muted mb-1">
                📊 {predictions.corners.total.historical.recent_matches}
              </p>
            </div>
          )}

          {/* Corner Markets */}
          {predictions.corners.total?.markets && predictions.corners.total.markets.length > 0 && (
            <div className="mt-3 pt-3 border-t border-surface2 space-y-2">
              <p className="text-xs font-medium text-text mb-2">
                Value Markets ({predictions.corners.total.markets.length} opportunities):
              </p>
              {predictions.corners.total.markets.map((market, idx) => {
                const fairOdds = (1 / market.probability).toFixed(2);
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded border ${getConfidenceBg(market.probability * 100)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text">
                        {market.market} → <span className="text-primary">{market.prediction}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">
                          Fair: {fairOdds}
                        </span>
                        <span className={`text-xs font-semibold ${getConfidenceColor(market.probability * 100)}`}>
                          {(market.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted">{market.reasoning}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Shots */}
      {predictions.shots && (
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-text">Shots</h4>
            </div>
            <span className={`text-xs ${getConfidenceColor(predictions.shots.total?.confidence || 0)}`}>
              {predictions.shots.total?.confidence}% confidence
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-muted mb-1">{homeTeam}</p>
              <p className="text-xl font-bold text-text">{predictions.shots.home}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">Total</p>
              <p className="text-2xl font-bold text-primary">{predictions.shots.total?.prediction}</p>
              {predictions.shots.total?.range && (
                <p className="text-xs text-muted mt-1">
                  ({predictions.shots.total.range.min}-{predictions.shots.total.range.max})
                </p>
              )}
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">{awayTeam}</p>
              <p className="text-xl font-bold text-text">{predictions.shots.away}</p>
            </div>
          </div>
        </div>
      )}

      {/* Shots on Target */}
      {predictions.shots_on_target && (
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-positive" />
              <h4 className="text-sm font-semibold text-text">Shots on Target</h4>
            </div>
            <span className={`text-xs ${getConfidenceColor(predictions.shots_on_target.total?.confidence || 0)}`}>
              {predictions.shots_on_target.total?.confidence}% confidence
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-muted mb-1">{homeTeam}</p>
              <p className="text-xl font-bold text-text">{predictions.shots_on_target.home}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">Total</p>
              <p className="text-2xl font-bold text-positive">{predictions.shots_on_target.total?.prediction}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">{awayTeam}</p>
              <p className="text-xl font-bold text-text">{predictions.shots_on_target.away}</p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Offsides */}
        {predictions.offsides && (
          <div className="bg-surface rounded-lg p-3">
            <p className="text-xs text-muted mb-2">Offsides</p>
            <p className="text-lg font-bold text-text mb-1">{predictions.offsides.total}</p>
            <div className="flex justify-between text-xs text-muted">
              <span>{predictions.offsides.home}</span>
              <span>{predictions.offsides.away}</span>
            </div>
            <p className={`text-xs mt-2 ${getConfidenceColor(predictions.offsides.confidence || 0)}`}>
              {predictions.offsides.confidence}%
            </p>
          </div>
        )}

        {/* Fouls */}
        {predictions.fouls && (
          <div className="bg-surface rounded-lg p-3">
            <p className="text-xs text-muted mb-2">Fouls</p>
            <p className="text-lg font-bold text-text mb-1">{predictions.fouls.total}</p>
            <div className="flex justify-between text-xs text-muted">
              <span>{predictions.fouls.home}</span>
              <span>{predictions.fouls.away}</span>
            </div>
            <p className={`text-xs mt-2 ${getConfidenceColor(predictions.fouls.confidence || 0)}`}>
              {predictions.fouls.confidence}%
            </p>
          </div>
        )}

        {/* Cards */}
        {predictions.cards && (
          <div className="bg-surface rounded-lg p-3">
            <p className="text-xs text-muted mb-2">Cards</p>
            <p className="text-lg font-bold text-text mb-1">{predictions.cards.total}</p>
            <div className="flex justify-between text-xs text-muted">
              <span>{predictions.cards.home}</span>
              <span>{predictions.cards.away}</span>
            </div>
            <p className={`text-xs mt-2 ${getConfidenceColor(predictions.cards.confidence || 0)}`}>
              {predictions.cards.confidence}%
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-surface2 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted leading-relaxed">
            <span className="font-medium text-text">Note:</span> These predictions are calculated based on expected goals
            and league averages. Higher attacking intent (more expected goals) correlates with more corners, shots, and
            other attacking statistics. Confidence levels indicate prediction reliability.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
