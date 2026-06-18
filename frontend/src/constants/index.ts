// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Endpoints
export const ENDPOINTS = {
  EQUIPOS: '/equipos',
  SORTEO: '/sorteo',
  GRUPOS: '/grupos',
  PARTIDOS: '/partidos',
  POSICIONES: '/posiciones',
};

// Mensajes
export const MESSAGES = {
  SUCCESS: 'Operación completada exitosamente',
  ERROR: 'Ocurrió un error inesperado',
  LOADING: 'Cargando...',
  CONFIRMAR_ELIMINAR: '¿Estás seguro de que deseas eliminar este elemento?',
};

// Estados de partidos
export const MATCH_STATUS = {
  PENDIENTE: 'pendiente',
  EN_JUEGO: 'en_juego',
  FINALIZADO: 'finalizado',
};

// Columnas de tabla de posiciones
export const POSICIONES_COLUMNS = [
  { label: 'Posición', key: 'posicion' },
  { label: 'Equipo', key: 'nombre' },
  { label: 'PJ', key: 'pj' },
  { label: 'PG', key: 'pg' },
  { label: 'PE', key: 'pe' },
  { label: 'PP', key: 'pp' },
  { label: 'GF', key: 'gf' },
  { label: 'GC', key: 'gc' },
  { label: 'DG', key: 'dg' },
  { label: 'PTS', key: 'pts' },
];

// Animaciones
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
};
