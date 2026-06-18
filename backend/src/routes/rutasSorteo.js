import express from 'express';
import { ControladorSorteo } from '../controllers/ControladorSorteo.js';

const router = express.Router();

/**
 * @swagger
 * /api/sorteo:
 *   post:
 *     tags:
 *       - Sorteo
 *     summary: Realizar sorteo automático de equipos
 *     description: |
 *       Realiza un sorteo automático para distribuir los equipos registrados en dos grupos (cuadrangulares).
 *       
 *       **Requisitos previos:**
 *       - Debe haber exactamente 8 equipos registrados
 *       - Los equipos no deben estar asignados a ningún grupo
 *       
 *       **Proceso del sorteo:**
 *       1. Se mezclan aleatoriamente todos los equipos
 *       2. Los primeros 4 equipos se asignan al Grupo A
 *       3. Los siguientes 4 equipos se asignan al Grupo B
 *       4. Se generan automáticamente todos los partidos de cada grupo con ida y vuelta (12 por grupo, 24 en total)
 *       
 *       **Partidos generados:**
 *       - Cada equipo juega contra los otros 3 de su grupo
 *       - Se generan todas las combinaciones posibles (round-robin)
 *       - Los partidos se crean con marcador null (no jugados)
 *       
 *       **Flujo recomendado:**
 *       1. Crear 8 equipos usando POST /api/equipos
 *       2. Verificar equipos con GET /api/equipos
 *       3. Realizar sorteo con POST /api/sorteo
 *       4. Consultar grupos con GET /api/grupos
 *       5. Consultar partidos con GET /api/partidos
 *     operationId: realizarSorteo
 *     responses:
 *       '200':
 *         description: Sorteo realizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/SorteoResultado'
 *             examples:
 *               exitoso:
 *                 summary: Respuesta exitosa con grupos asignados
 *                 value:
 *                   exito: true
 *                   mensaje: "Sorteo realizado exitosamente"
 *                   datos:
 *                     mensaje: "Sorteo realizado exitosamente"
 *                     grupos:
 *                       - grupo:
 *                           id: "550e8400-e29b-41d4-a716-446655440000"
 *                           nombre: "Grupo A"
 *                         equipos:
 *                           - id: "660e8400-e29b-41d4-a716-446655440001"
 *                             nombre: "Real Madrid"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440000"
 *                             creadoEn: "2024-01-15T10:30:00Z"
 *                           - id: "770e8400-e29b-41d4-a716-446655440002"
 *                             nombre: "FC Barcelona"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440000"
 *                             creadoEn: "2024-01-15T11:00:00Z"
 *                           - id: "880e8400-e29b-41d4-a716-446655440003"
 *                             nombre: "Manchester United"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440000"
 *                             creadoEn: "2024-01-15T11:30:00Z"
 *                           - id: "990e8400-e29b-41d4-a716-446655440004"
 *                             nombre: "Bayern Munich"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440000"
 *                             creadoEn: "2024-01-15T12:00:00Z"
 *                       - grupo:
 *                           id: "550e8400-e29b-41d4-a716-446655440001"
 *                           nombre: "Grupo B"
 *                         equipos:
 *                           - id: "aa0e8400-e29b-41d4-a716-446655440005"
 *                             nombre: "Paris Saint-Germain"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440001"
 *                             creadoEn: "2024-01-15T12:30:00Z"
 *                           - id: "bb0e8400-e29b-41d4-a716-446655440006"
 *                             nombre: "Chelsea FC"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440001"
 *                             creadoEn: "2024-01-15T13:00:00Z"
 *                           - id: "cc0e8400-e29b-41d4-a716-446655440007"
 *                             nombre: "Juventus"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440001"
 *                             creadoEn: "2024-01-15T13:30:00Z"
 *                           - id: "dd0e8400-e29b-41d4-a716-446655440008"
 *                             nombre: "Inter Milan"
 *                             grupoId: "550e8400-e29b-41d4-a716-446655440001"
 *                             creadoEn: "2024-01-15T14:00:00Z"
 *       '400':
 *         description: Error por cantidad incorrecta de equipos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             examples:
 *               pocos_equipos:
 *                 summary: Menos de 8 equipos
 *                 value:
 *                   exito: false
 *                   mensaje: "Se requieren exactamente 8 equipos para realizar el sorteo"
 *               muchos_equipos:
 *                 summary: Más de 8 equipos
 *                 value:
 *                   exito: false
 *                   mensaje: "Se requieren exactamente 8 equipos para realizar el sorteo"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.post('/', ControladorSorteo.realizar);

export default router;
