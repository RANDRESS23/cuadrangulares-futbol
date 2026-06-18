import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { MainLayout } from './layouts/MainLayout';
import Equipos from './pages/Equipos';
import Sorteo from './pages/Sorteo';
import Partidos from './pages/Partidos';
import Posiciones from './pages/Posiciones';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos
    },
  },
});

function AppContent() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Equipos />} />
        <Route path="/sorteo" element={<Sorteo />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/posiciones" element={<Posiciones />} />
      </Routes>
    </MainLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
      <Toaster theme="dark" position="top-right" />
    </QueryClientProvider>
  );
}
