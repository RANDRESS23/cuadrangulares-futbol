import { z } from 'zod';

export const crearEquipoSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50, 'El nombre no puede exceder 50 caracteres'),
});

export type CrearEquipoFormData = z.infer<typeof crearEquipoSchema>;

export const editarEquipoSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50, 'El nombre no puede exceder 50 caracteres'),
});

export type EditarEquipoFormData = z.infer<typeof editarEquipoSchema>;
