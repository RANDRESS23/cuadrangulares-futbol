import express from 'express';
import { ControladorGrupos } from '../controllers/ControladorGrupos.js';
import { ControladorPosiciones } from '../controllers/ControladorPosiciones.js';
import {
  validarUUID,
  manejarErroresValidacion,
} from '../validators/validadores.js';

const router = express.Router();

/**
 * GET /api/grupos
 * Obtener todos los grupos
 */
router.get('/', ControladorGrupos.obtenerTodos);

/**
 * GET /api/grupos/:id
 * Obtener grupo por ID
 */
router.get('/:id', validarUUID, manejarErroresValidacion, ControladorGrupos.obtenerPorId);

/**
 * GET /api/grupos/:grupoId/posiciones
 * Obtener tabla de posiciones
 */
router.get(
  '/:grupoId/posiciones',
  validarUUID,
  manejarErroresValidacion,
  ControladorPosiciones.obtenerTabla
);

export default router;
