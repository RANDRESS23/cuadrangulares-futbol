import { z } from 'zod';

export const actualizarResultadoSchema = z.object({
  golesLocal: z.number().min(0, 'Los goles no pueden ser negativos').max(99, 'Los goles no pueden exceder 99'),
  golesVisitante: z.number().min(0, 'Los goles no pueden ser negativos').max(99, 'Los goles no pueden exceder 99'),
});

export type ActualizarResultadoFormData = z.infer<typeof actualizarResultadoSchema>;
