import express from 'express';
import { ControladorPartidos } from '../controllers/ControladorPartidos.js';
import {
  validarUUID,
  validarGoles,
  manejarErroresValidacion,
} from '../validators/validadores.js';

const router = express.Router();

/**
 * GET /api/partidos
 * Obtener todos los partidos
 */
router.get('/', ControladorPartidos.obtenerTodos);

/**
 * GET /api/partidos/:id
 * Obtener partido por ID
 */
router.get('/:id', validarUUID, manejarErroresValidacion, ControladorPartidos.obtenerPorId);

/**
 * PUT /api/partidos/:id/marcador
 * Actualizar marcador
 */
router.put(
  '/:id/marcador',
  validarUUID,
  validarGoles,
  manejarErroresValidacion,
  ControladorPartidos.actualizarMarcador
);

export default router;
