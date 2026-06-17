import { ServicioGrupos } from '../services/ServicioGrupos.js';
import { RespuestaApi } from '../models/RespuestaApi.js';

const servicio = new ServicioGrupos();

/**
 * Controlador de Grupos
 */
export class ControladorGrupos {
  /**
   * GET /api/grupos
   * Obtener todos los grupos
   */
  static async obtenerTodos(req, res, next) {
    try {
      const grupos = await servicio.obtenerTodos();
      res.json(RespuestaApi.exito('Grupos obtenidos', grupos));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/grupos/:id
   * Obtener grupo por ID
   */
  static async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const grupo = await servicio.obtenerPorId(id);
      res.json(RespuestaApi.exito('Grupo obtenido', grupo));
    } catch (error) {
      next(error);
    }
  }
}
