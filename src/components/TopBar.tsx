import { Activity, Clock, Menu } from 'lucide-react';
import dayjs from 'dayjs';
import { useHealth } from '../hooks/useQueries';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function TopBar() {
  const { data: health } = useHealth();
  const { toggleNav } = useStore();
  const currentTime = dayjs().tz('Europe/Malta').format('HH:mm:ss');

  return (
    <header className="bg-surface border-b border-surface2 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left: Menu + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleNav}
            className="p-2 hover:bg-surface2 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5 text-muted" />
          </button>

          <div>
            <h1 className="text-lg font-bold text-text">EV Betting Dashboard</h1>
            <p className="text-xs text-muted">Expected Value Opportunities</p>
          </div>
        </div>

        {/* Right: Time + API Status */}
        <div className="flex items-center gap-6">
          {/* Timezone */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted" />
            <div className="text-right">
              <p className="text-xs text-muted">Europe/Malta</p>
              <p className="text-xs font-mono text-text">{currentTime}</p>
            </div>
          </div>

          {/* API Status */}
          <div className="flex items-center gap-2">
            <Activity
              className={cn(
                'w-4 h-4',
                health?.ok ? 'text-green-500' : 'text-red-500'
              )}
            />
            <div className="hidden md:block text-right">
              <p className="text-xs text-muted">API Status</p>
              <p
                className={cn(
                  'text-xs font-medium',
                  health?.ok ? 'text-green-500' : 'text-red-500'
                )}
              >
                {health?.ok ? 'Online' : 'Offline'}
                {health?.latency_ms && (
                  <span className="text-muted ml-1">({health.latency_ms}ms)</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
