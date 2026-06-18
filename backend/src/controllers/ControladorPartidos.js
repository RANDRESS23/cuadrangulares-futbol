import { ServicioPartidos } from '../services/ServicioPartidos.js';
import { RespuestaApi } from '../models/RespuestaApi.js';

const servicio = new ServicioPartidos();

/**
 * Controlador de Partidos
 */
export class ControladorPartidos {
  /**
   * GET /api/partidos
   * Obtener todos los partidos
   */
  static async obtenerTodos(req, res, next) {
    try {
      const partidos = await servicio.obtenerTodos();
      res.json(RespuestaApi.exito('Partidos obtenidos', partidos));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/partidos/:id
   * Obtener partido por ID
   */
  static async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const partido = await servicio.obtenerPorId(id);
      res.json(RespuestaApi.exito('Partido obtenido', partido));
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/partidos/:id/marcador
   * Actualizar marcador
   */
  static async actualizarMarcador(req, res, next) {
    try {
      const { id } = req.params;
      const { golesLocal, golesVisitante } = req.body;
      const partido = await servicio.actualizarMarcador(id, golesLocal, golesVisitante);
      res.json(
        RespuestaApi.exito('Marcador actualizado exitosamente', partido)
      );
    } catch (error) {
      next(error);
    }
  }
}
