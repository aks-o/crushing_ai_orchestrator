import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { trpc } from './lib/trpc';
import { httpBatchLink } from '@trpc/client';

import Dashboard from './pages/Dashboard';
import BrandCreator from './pages/BrandCreator';
import BrandLayout from './pages/BrandLayout';
import Library from './pages/Library';
import Settings from './pages/Settings';

import IdentitySection from './sections/IdentitySection';
import ColorSystemSection from './sections/ColorSystemSection';
import TypographySection from './sections/TypographySection';
import TokensSection from './sections/TokensSection';
import LogoSection from './sections/LogoSection';
import ComponentsSection from './sections/ComponentsSection';
import GuidelinesSection from './sections/GuidelinesSection';
import ExportSection from './sections/ExportSection';

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
});

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<BrandCreator />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/brand/:brandId" element={<BrandLayout />}>
                <Route path="identity" element={<IdentitySection />} />
                <Route path="colors" element={<ColorSystemSection />} />
                <Route path="typography" element={<TypographySection />} />
                <Route path="tokens" element={<TokensSection />} />
                <Route path="logos" element={<LogoSection />} />
                <Route path="components" element={<ComponentsSection />} />
                <Route path="guidelines" element={<GuidelinesSection />} />
                <Route path="export" element={<ExportSection />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
