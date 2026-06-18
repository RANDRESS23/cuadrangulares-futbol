import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partidosService, type ActualizarResultadoInput } from '../services/partidosService';
import { toast } from 'sonner';

const PARTIDOS_QUERY_KEY = ['partidos'];

export function usePartidos() {
  return useQuery({
    queryKey: PARTIDOS_QUERY_KEY,
    queryFn: () => partidosService.obtenerPartidos(),
  });
}

export function usePartido(id: string | undefined) {
  return useQuery({
    queryKey: ['partidos', id],
    queryFn: () => partidosService.obtenerPartido(id!),
    enabled: !!id,
  });
}

export function useActualizarResultado() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ActualizarResultadoInput }) =>
      partidosService.actualizarResultado(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTIDOS_QUERY_KEY });
      toast.success('Resultado actualizado exitosamente');
    },
    onError: (error: any) => {
      const messageError = error?.response?.data?.mensaje || 'Error al actualizar el resultado';
      toast.error(messageError);
    },
  });
}
