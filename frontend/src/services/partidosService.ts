import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../constants/index';

export interface Partido {
  id: string;
  equipoLocalId: string;
  equipoVisitanteId: string;
  equipoLocal: {
    id: string;
    nombre: string;
  };
  equipoVisitante: {
    id: string;
    nombre: string;
  };
  golesLocal: number | null;
  golesVisitante: number | null;
  estado: string;
  grupoId?: string;
}

export interface ActualizarResultadoInput {
  golesLocal: number;
  golesVisitante: number;
}

class PartidosService {
  async obtenerPartidos(): Promise<Partido[]> {
    const { data } = await axiosInstance.get(ENDPOINTS.PARTIDOS);
    return data.datos || data;
  }

  async obtenerPartido(id: string): Promise<Partido> {
    const { data } = await axiosInstance.get(`${ENDPOINTS.PARTIDOS}/${id}`);
    return data.datos || data;
  }

  async actualizarResultado(id: string, input: ActualizarResultadoInput): Promise<Partido> {
    const { data } = await axiosInstance.put(`${ENDPOINTS.PARTIDOS}/${id}/marcador`, input);
    return data.datos || data;
  }
}

export const partidosService = new PartidosService();
