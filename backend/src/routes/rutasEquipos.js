import express from 'express';
import { ControladorEquipos } from '../controllers/ControladorEquipos.js';
import {
  validarNombreEquipo,
  validarUUID,
  manejarErroresValidacion,
} from '../validators/validadores.js';

const router = express.Router();

/**
 * POST /api/equipos
 * Crear nuevo equipo
 */
router.post('/', validarNombreEquipo, manejarErroresValidacion, ControladorEquipos.crear);

/**
 * GET /api/equipos
 * Obtener todos los equipos
 */
router.get('/', ControladorEquipos.obtenerTodos);

/**
 * GET /api/equipos/:id
 * Obtener equipo por ID
 */
router.get('/:id', validarUUID, manejarErroresValidacion, ControladorEquipos.obtenerPorId);

/**
 * PUT /api/equipos/:id
 * Actualizar equipo
 */
router.put(
  '/:id',
  validarUUID,
  validarNombreEquipo,
  manejarErroresValidacion,
  ControladorEquipos.actualizar
);

/**
 * DELETE /api/equipos/:id
 * Eliminar equipo
 */
router.delete('/:id', validarUUID, manejarErroresValidacion, ControladorEquipos.eliminar);

export default router;
