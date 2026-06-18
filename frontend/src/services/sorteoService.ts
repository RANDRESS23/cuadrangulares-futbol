import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../constants/index';

export interface SorteoResponse {
  id: string;
  grupoA: Array<{
    id: string;
    nombre: string;
  }>;
  grupoB: Array<{
    id: string;
    nombre: string;
  }>;
}

class SorteoService {
  async realizarSorteo(): Promise<SorteoResponse> {
    const { data } = await axiosInstance.post(ENDPOINTS.SORTEO);
    console.log({data});
    
    return data.datos || data;
  }
}

export const sorteoService = new SorteoService();
