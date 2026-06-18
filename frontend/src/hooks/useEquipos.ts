import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { equiposService, type CreateEquipoInput, type UpdateEquipoInput } from '../services/equiposService';
import { toast } from 'sonner';

const EQUIPOS_QUERY_KEY = ['equipos'];

export function useEquipos() {
  return useQuery({
    queryKey: EQUIPOS_QUERY_KEY,
    queryFn: () => equiposService.obtenerEquipos(),
  });
}

export function useEquipo(id: string | undefined) {
  return useQuery({
    queryKey: ['equipos', id],
    queryFn: () => equiposService.obtenerEquipo(id!),
    enabled: !!id,
  });
}

export function useCrearEquipo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateEquipoInput) => equiposService.crearEquipo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EQUIPOS_QUERY_KEY });
      toast.success('Equipo creado exitosamente');
    },
    onError: (error: any) => {
      const messageError = error?.response?.data?.mensaje || 'Error al crear el equipo';
      toast.error(messageError);
    },
  });
}

export function useActualizarEquipo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateEquipoInput }) =>
      equiposService.actualizarEquipo(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EQUIPOS_QUERY_KEY });
      toast.success('Equipo actualizado exitosamente');
    },
    onError: (error: any) => {
      const messageError = error?.response?.data?.mensaje || 'Error al actualizar el equipo';
      toast.error(messageError);
    },
  });
}

export function useEliminarEquipo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => equiposService.eliminarEquipo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EQUIPOS_QUERY_KEY });
      toast.success('Equipo eliminado exitosamente');
    },
    onError: () => {
      const messageError = 'Error al eliminar el equipo, el sorteo ya fue realizado';
      toast.error(messageError);
    },
  });
}
