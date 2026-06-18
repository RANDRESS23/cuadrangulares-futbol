import express from 'express';
import { ControladorSorteo } from '../controllers/ControladorSorteo.js';

const router = express.Router();

/**
 * POST /api/sorteo
 * Realizar sorteo automático
 */
router.post('/', ControladorSorteo.realizar);

export default router;
