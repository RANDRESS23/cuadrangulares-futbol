import { ServicioSorteo } from '../services/ServicioSorteo.js';
import { RespuestaApi } from '../models/RespuestaApi.js';

const servicio = new ServicioSorteo();

/**
 * Controlador de Sorteo
 */
export class ControladorSorteo {
  /**
   * POST /api/sorteo
   * Realizar sorteo automático
   */
  static async realizar(req, res, next) {
    try {
      const resultado = await servicio.realizarSorteo();
      res.json(
        RespuestaApi.exito('Sorteo realizado exitosamente', resultado)
      );
    } catch (error) {
      next(error);
    }
  }
}
