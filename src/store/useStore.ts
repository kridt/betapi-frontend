import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MarketType } from '../types';

interface AppState {
  // Favorites
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Market filter
  selectedMarket: MarketType;
  setSelectedMarket: (market: MarketType) => void;

  // EV threshold
  minEV: number;
  setMinEV: (ev: number) => void;

  // Sorting
  sortBy: 'ev' | 'odds' | 'probability';
  sortOrder: 'asc' | 'desc';
  setSorting: (sortBy: 'ev' | 'odds' | 'probability', sortOrder: 'asc' | 'desc') => void;

  // UI state
  isNavCollapsed: boolean;
  toggleNav: () => void;

  // Reset all filters
  resetFilters: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Favorites
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, id])],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        })),
      toggleFavorite: (id) => {
        const state = get();
        if (state.favorites.includes(id)) {
          state.removeFavorite(id);
        } else {
          state.addFavorite(id);
        }
      },
      isFavorite: (id) => get().favorites.includes(id),

      // Market filter
      selectedMarket: 'ALL',
      setSelectedMarket: (market) => set({ selectedMarket: market }),

      // EV threshold
      minEV: parseFloat(import.meta.env.VITE_MIN_EV_THRESHOLD || '4.0'),
      setMinEV: (ev) => set({ minEV: ev }),

      // Sorting
      sortBy: 'ev',
      sortOrder: 'desc',
      setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

      // UI state
      isNavCollapsed: false,
      toggleNav: () => set((state) => ({ isNavCollapsed: !state.isNavCollapsed })),

      // Reset
      resetFilters: () =>
        set({
          selectedMarket: 'ALL',
          minEV: parseFloat(import.meta.env.VITE_MIN_EV_THRESHOLD || '4.0'),
          sortBy: 'ev',
          sortOrder: 'desc',
        }),
    }),
    {
      name: 'ev-betting-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        selectedMarket: state.selectedMarket,
        minEV: state.minEV,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        isNavCollapsed: state.isNavCollapsed,
      }),
    }
  )
);
