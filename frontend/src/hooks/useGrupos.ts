import { useQuery } from '@tanstack/react-query';
import { gruposService } from '../services/gruposService';

const GRUPOS_QUERY_KEY = ['grupos'];

export function useGrupos() {
  return useQuery({
    queryKey: GRUPOS_QUERY_KEY,
    queryFn: () => gruposService.obtenerGrupos(),
  });
}

export function useGrupo(id: string | undefined) {
  return useQuery({
    queryKey: ['grupos', id],
    queryFn: () => gruposService.obtenerGrupo(id!),
    enabled: !!id,
  });
}
