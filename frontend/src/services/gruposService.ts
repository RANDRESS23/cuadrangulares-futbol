import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../constants/index';

export interface Grupo {
  id: string;
  nombre: string;
  equipos: Array<{
    id: string;
    nombre: string;
  }>;
}

class GruposService {
  async obtenerGrupos(): Promise<Grupo[]> {
    const { data } = await axiosInstance.get(ENDPOINTS.GRUPOS);
    return data.datos || data;
  }

  async obtenerGrupo(id: string): Promise<Grupo> {
    const { data } = await axiosInstance.get(`${ENDPOINTS.GRUPOS}/${id}`);
    return data.datos || data;
  }
}

export const gruposService = new GruposService();
