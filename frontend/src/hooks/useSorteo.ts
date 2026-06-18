import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sorteoService } from '../services/sorteoService';
import { toast } from 'sonner';

export function useRealizarSorteo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => sorteoService.realizarSorteo(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos'] });
      queryClient.invalidateQueries({ queryKey: ['partidos'] });
      toast.success('Sorteo realizado exitosamente');
    },
    onError: (error: any) => {
      const messageError = error?.response?.data?.mensaje || 'Error al realizar el sorteo';
      toast.error(messageError);
    },
  });
}
