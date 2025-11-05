import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 30000, // 30 seconds
    },
  },
});

// Polling interval from env
export const ODDS_POLL_INTERVAL = parseInt(
  import.meta.env.VITE_ODDS_POLL_INTERVAL || '60000'
);
