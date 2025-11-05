# EV Betting Frontend

React + Vite + TypeScript frontend for the EV Betting Dashboard.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```bash
VITE_API_BASE=http://localhost:3001/api
VITE_ODDS_POLL_INTERVAL=60000
VITE_MIN_EV_THRESHOLD=4.0
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # UI components
│   ├── TopBar.tsx      # Header with time and API status
│   ├── LeftNav.tsx     # Navigation sidebar
│   ├── LeagueCard.tsx  # League display card
│   ├── MatchCard.tsx   # Match display card
│   ├── OddsTable.tsx   # Main odds table with EV
│   ├── EVBadge.tsx     # EV percentage badge
│   ├── ProbabilityBar.tsx  # Probability visualization
│   ├── MarketFilters.tsx   # Filter controls
│   └── Skeleton.tsx    # Loading skeletons
│
├── pages/              # Route pages
│   ├── HomePage.tsx    # Top 20 leagues grid
│   ├── LeaguePage.tsx  # League matches list
│   └── MatchPage.tsx   # Match details + EV opportunities
│
├── hooks/              # Custom hooks
│   └── useQueries.ts   # React Query hooks for API
│
├── lib/                # Libraries and utilities
│   ├── api.ts          # API client functions
│   ├── utils.ts        # Helper functions
│   └── queryClient.ts  # React Query configuration
│
├── store/              # State management
│   └── useStore.ts     # Zustand store
│
├── types/              # TypeScript types
│   └── index.ts        # All type definitions
│
└── App.tsx             # Main app with routing
```

## Features

### Auto-Polling
- Odds and EV data refresh every 60 seconds automatically
- Health check every 30 seconds
- Configurable via `VITE_ODDS_POLL_INTERVAL`

### State Management (Zustand)
- Favorites (persisted to localStorage)
- Market filters (1X2, O/U 2.5, BTTS)
- EV threshold slider
- Sort preferences

### Theming
Custom Tailwind colors defined in `tailwind.config.js`:
- `page`: #071B26 (background)
- `surface`: #0D2430 (cards)
- `text`: #E6F1F5 (primary text)
- `muted`: #9BB7C4 (secondary text)
- `positive`: #00BCD4 (teal for EV+)
- `negative`: #E57373 (red for EV-)

### Animations (Framer Motion)
- Page transitions
- Hover effects with lift
- Staggered list animations
- Smooth filter transitions

## Key Components

### OddsTable
Displays all EV opportunities with:
- Market type (1X2, O/U 2.5, BTTS)
- Bookmaker name
- Offered odds vs Fair odds
- Probability
- EV% (color-coded)

### MarketFilters
Controls for:
- Market selection (buttons)
- EV threshold (slider: 0-20%)
- Reset filters button

### ProbabilityBar
Visual representation of fair probabilities for outcomes with animated bars.

## Routing

- `/` - Home page (top 20 leagues)
- `/league/:leagueId` - League detail (upcoming matches)
- `/match/:matchId` - Match detail (odds + EV opportunities)

## TypeScript

Strict mode enabled. All types defined in `src/types/index.ts`:
- `League`
- `Match`
- `MatchSummary`
- `OddsMarket`
- `EVOpportunity`
- `MatchModel`
- etc.

## Performance

- **Code splitting**: Routes lazy-loaded
- **React Query caching**: Reduces unnecessary API calls
- **Memoization**: Used in components with expensive calculations
- **Tailwind purging**: Removes unused CSS in production

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)

## Development

The dev server supports:
- Hot Module Replacement (HMR)
- TypeScript type checking
- ESLint linting
- Fast refresh

## Building

```bash
npm run build
```

Output in `dist/` folder. Deploy to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

## Tips

1. **Backend must be running** on port 3001 for API calls to work
2. **Clear browser cache** if changes don't appear
3. **Check console** for API errors or TypeScript issues
4. **Adjust polling interval** if you hit API rate limits
