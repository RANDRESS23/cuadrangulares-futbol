import { ServicioEquipos } from '../services/ServicioEquipos.js';
import { RespuestaApi } from '../models/RespuestaApi.js';

const servicio = new ServicioEquipos();

/**
 * Controlador de Equipos
 */
export class ControladorEquipos {
  /**
   * POST /api/equipos
   * Crear nuevo equipo
   */
  static async crear(req, res, next) {
    try {
      const { nombre } = req.body;
      const equipo = await servicio.crearEquipo(nombre);
      res.status(201).json(
        RespuestaApi.exito('Equipo creado exitosamente', equipo)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/equipos
   * Obtener todos los equipos
   */
  static async obtenerTodos(req, res, next) {
    try {
      const equipos = await servicio.obtenerTodos();
      res.json(RespuestaApi.exito('Equipos obtenidos', equipos));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/equipos/:id
   * Obtener equipo por ID
   */
  static async obtenerPorId(req, res, next) {
    try {
      const { id } = req.params;
      const equipo = await servicio.obtenerPorId(id);
      res.json(RespuestaApi.exito('Equipo obtenido', equipo));
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/equipos/:id
   * Actualizar equipo
   */
  static async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const equipo = await servicio.actualizarEquipo(id, nombre);
      res.json(RespuestaApi.exito('Equipo actualizado exitosamente', equipo));
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/equipos/:id
   * Eliminar equipo
   */
  static async eliminar(req, res, next) {
    try {
      const { id } = req.params;
      await servicio.eliminarEquipo(id);
      res.json(RespuestaApi.exito('Equipo eliminado exitosamente'));
    } catch (error) {
      next(error);
    }
  }
}
