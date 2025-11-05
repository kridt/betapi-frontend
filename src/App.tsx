import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { TopBar } from './components/TopBar';
import { LeftNav } from './components/LeftNav';
import { HomePage } from './pages/HomePage';
import { LeaguePage } from './pages/LeaguePage';
import { MatchPage } from './pages/MatchPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <TopBar />
      <div className="flex">
        <LeftNav />
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/league/:leagueId" element={<LeaguePage />} />
            <Route path="/match/:matchId" element={<MatchPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
