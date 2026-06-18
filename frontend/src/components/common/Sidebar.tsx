import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Dices,
  Trophy,
  Table,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const sidebarItems = [
  { path: '/', label: 'Equipos', icon: Users },
  { path: '/sorteo', label: 'Sorteo', icon: Dices },
  { path: '/partidos', label: 'Partidos', icon: Trophy },
  { path: '/posiciones', label: 'Posiciones', icon: Table },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Sincronizar isCollapsed con el tamaño de pantalla
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // lg breakpoint

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Pantalla grande: mostrar sidebar
        setIsCollapsed(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <>
      {/* Botón de toggle móvil */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed bottom-6 right-6 z-40 lg:hidden bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 max-w-xs overflow-hidden z-30 lg:static lg:w-64 transition-all duration-300',
          isCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'
        )}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-center">Torneo FC</h2>
                <p className="text-xs text-start text-zinc-400">OATI - UD</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative',
                      isActive
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                    )}
                  >
                    <Icon size={20} />
                    <span className="font-medium flex-1">{item.label}</span>
                    {isActive && (
                      <div className="absolute inset-0 border-l-2 border-emerald-500 rounded-lg pointer-events-none" />
                    )}
                    {isActive && <ChevronRight size={16} />}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 text-center">
              Cuadrangulares 2026
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop móvil */}
      <AnimatePresence>
        {!isCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
