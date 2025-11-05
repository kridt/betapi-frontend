import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format timestamp to Malta timezone
 */
export function formatDate(timestamp: string | number, format = 'DD/MM/YYYY HH:mm'): string {
  return dayjs.unix(Number(timestamp)).tz('Europe/Malta').format(format);
}

/**
 * Format EV percentage with color
 */
export function formatEV(ev: number): string {
  return ev > 0 ? `+${ev.toFixed(2)}%` : `${ev.toFixed(2)}%`;
}

/**
 * Get EV color class
 */
export function getEVColor(ev: number): string {
  if (ev >= 10) return 'text-positive font-bold';
  if (ev >= 5) return 'text-positive';
  if (ev >= 0) return 'text-green-400';
  return 'text-negative';
}

/**
 * Format probability as percentage
 */
export function formatProbability(prob: number): string {
  return `${(prob * 100).toFixed(1)}%`;
}

/**
 * Format odds
 */
export function formatOdds(odds: number): string {
  return odds.toFixed(2);
}

/**
 * Get status color
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'live':
      return 'bg-red-500 text-white';
    case 'scheduled':
      return 'bg-blue-500 text-white';
    case 'finished':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-surface2 text-muted';
  }
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Sort opportunities by criteria
 */
export function sortOpportunities<T extends { ev_pct: number; bookmaker_odds: number; probability: number }>(
  opportunities: T[],
  sortBy: 'ev' | 'odds' | 'probability',
  sortOrder: 'asc' | 'desc'
): T[] {
  const sorted = [...opportunities].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'ev':
        comparison = a.ev_pct - b.ev_pct;
        break;
      case 'odds':
        comparison = a.bookmaker_odds - b.bookmaker_odds;
        break;
      case 'probability':
        comparison = a.probability - b.probability;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  return sorted;
}
