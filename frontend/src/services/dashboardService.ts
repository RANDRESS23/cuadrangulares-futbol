import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../constants/index';

export interface DashboardStats {
  equiposRegistrados: number;
  gruposCreados: number;
  partidosGenerados: number;
  partidosJugados: number;
}

export interface DashboardData {
  stats: DashboardStats;
  graficoPartidos: {
    jugados: number;
    pendientes: number;
  };
}

class DashboardService {
  async obtenerDatos(): Promise<DashboardData> {
    const [equipos, grupos, partidos] = await Promise.all([
      axiosInstance.get(ENDPOINTS.EQUIPOS),
      axiosInstance.get(ENDPOINTS.GRUPOS),
      axiosInstance.get(ENDPOINTS.PARTIDOS),
    ]);

    const equiposData = equipos.data.datos || equipos.data;
    const gruposData = grupos.data.datos || grupos.data;
    const partidosData = partidos.data.datos || partidos.data;

    const partidosJugados = Array.isArray(partidosData)
      ? partidosData.filter((p) => p.golesLocal !== null && p.golesVisitante !== null).length
      : 0;

    return {
      stats: {
        equiposRegistrados: Array.isArray(equiposData) ? equiposData.length : 0,
        gruposCreados: Array.isArray(gruposData) ? gruposData.length : 0,
        partidosGenerados: Array.isArray(partidosData) ? partidosData.length : 0,
        partidosJugados,
      },
      graficoPartidos: {
        jugados: partidosJugados,
        pendientes: (Array.isArray(partidosData) ? partidosData.length : 0) - partidosJugados,
      },
    };
  }
}

export const dashboardService = new DashboardService();
