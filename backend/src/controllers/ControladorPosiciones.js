import { ServicioPosiciones } from '../services/ServicioPosiciones.js';
import { RespuestaApi } from '../models/RespuestaApi.js';

const servicio = new ServicioPosiciones();

/**
 * Controlador de Posiciones
 */
export class ControladorPosiciones {
  /**
   * GET /api/grupos/:grupoId/posiciones
   * Obtener tabla de posiciones de un grupo
   */
  static async obtenerTabla(req, res, next) {
    try {
      const { grupoId } = req.params;
      const posiciones = await servicio.calcularPosiciones(grupoId);
      res.json(RespuestaApi.exito('Tabla de posiciones obtenida', posiciones));
    } catch (error) {
      next(error);
    }
  }
}
