import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/helpers';

export function Header() {
  const location = useLocation();

  // Mapa de rutas a títulos
  const routeTitles: Record<string, string> = {
    '/': 'Equipos',
    '/sorteo': 'Sorteo',
    '/partidos': 'Partidos',
    '/posiciones': 'Posiciones',
    '/configuracion': 'Configuración',
  };

  const title = routeTitles[location.pathname] || 'Dashboard';

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="h2 text-white">{title}</h1>
          <p className="text-zinc-400 text-start text-sm mt-1">
            {formatDate(new Date())}
          </p>
        </div>
      </motion.div>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-zinc-400 text-sm">Sistema Activo</span>
      </div>
    </div>
  );
}
