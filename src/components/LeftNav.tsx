import { Link, useLocation } from 'react-router-dom';
import { Home, Star, TrendingUp, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { icon: Home, label: 'Leagues', path: '/' },
  { icon: Star, label: 'Favorites', path: '/favorites' },
  { icon: TrendingUp, label: 'Top EV', path: '/top-ev' },
];

export function LeftNav() {
  const location = useLocation();
  const { isNavCollapsed, toggleNav } = useStore();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isNavCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleNav}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Navigation Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isNavCollapsed ? '-100%' : 0,
        }}
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen bg-surface border-r border-surface2 z-50',
          'w-64 lg:translate-x-0 transition-transform duration-300'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-surface2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-positive rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-page" />
              </div>
              <div>
                <p className="text-sm font-bold text-text">EV Betting</p>
                <p className="text-xs text-muted">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleNav();
                    }
                  }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-positive/10 text-positive'
                      : 'text-muted hover:bg-surface2 hover:text-text'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-surface2">
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-surface2 hover:text-text transition-colors w-full"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
