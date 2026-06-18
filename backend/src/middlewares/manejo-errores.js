import { ErrorPersonalizado } from '../errors/ErroresPersonalizados.js';
import { RespuestaApi } from '../models/RespuestaApi.js';

/**
 * Middleware para manejar errores globales
 */
export const manejarErrores = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof ErrorPersonalizado) {
    return res.status(err.codigoEstado).json(
      RespuestaApi.error(err.message)
    );
  }

  if (err.message && err.message.includes('UUID')) {
    return res.status(400).json(
      RespuestaApi.error('ID inválido o no es un UUID válido')
    );
  }

  // Error de Supabase
  if (err.code === 'PGRST116') {
    return res.status(404).json(RespuestaApi.error('Recurso no encontrado'));
  }

  // Error por defecto
  const codigoEstado = err.codigoEstado || 500;
  const mensaje = process.env.NODE_ENV === 'development'
    ? err.message
    : 'Error interno del servidor';

  res.status(codigoEstado).json(RespuestaApi.error(mensaje));
};

/**
 * Middleware para rutas no encontradas
 */
export const middleware404 = (req, res) => {
  res.status(404).json(RespuestaApi.error('Ruta no encontrada'));
};
