import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../constants/index';

export interface Equipo {
  id: string;
  nombre: string;
  grupoId?: string;
  grupo?: string;
}

export interface CreateEquipoInput {
  nombre: string;
}

export interface UpdateEquipoInput {
  nombre: string;
}

class EquiposService {
  async obtenerEquipos(): Promise<Equipo[]> {
    const { data } = await axiosInstance.get(ENDPOINTS.EQUIPOS);
    return data.datos || data;
  }

  async obtenerEquipo(id: string): Promise<Equipo> {
    const { data } = await axiosInstance.get(`${ENDPOINTS.EQUIPOS}/${id}`);
    return data.datos || data;
  }

  async crearEquipo(input: CreateEquipoInput): Promise<Equipo> {
    const { data } = await axiosInstance.post(ENDPOINTS.EQUIPOS, input);
    return data.datos || data;
  }

  async actualizarEquipo(id: string, input: UpdateEquipoInput): Promise<Equipo> {
    const { data } = await axiosInstance.put(`${ENDPOINTS.EQUIPOS}/${id}`, input);
    return data.datos || data;
  }

  async eliminarEquipo(id: string): Promise<void> {
    await axiosInstance.delete(`${ENDPOINTS.EQUIPOS}/${id}`);
  }
}

export const equiposService = new EquiposService();
