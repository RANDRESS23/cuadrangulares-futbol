import express from 'express';
import { ControladorGrupos } from '../controllers/ControladorGrupos.js';
import { ControladorPosiciones } from '../controllers/ControladorPosiciones.js';
import {
  validarUUID,
  manejarErroresValidacion,
} from '../validators/validadores.js';

const router = express.Router();

/**
 * @swagger
 * /api/grupos:
 *   get:
 *     tags:
 *       - Grupos
 *     summary: Obtener todos los grupos
 *     description: |
 *       Retorna una lista con todos los grupos (cuadrangulares) del torneo.
 *       
 *       **Información del sistema:**
 *       - El sistema maneja 2 grupos fijos: Grupo A y Grupo B
 *       - Cada grupo debe tener 4 equipos después del sorteo
 *       - Los grupos se crean automáticamente al iniciar el sistema
 *       
 *       **Casos de uso:**
 *       - Verificar la estructura del torneo
 *       - Consultar IDs de grupos para otras operaciones
 *       - Validar que el sorteo se realizó correctamente
 *     operationId: obtenerTodosGrupos
 *     responses:
 *       '200':
 *         description: Lista de grupos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Grupo'
 *             examples:
 *               exitoso:
 *                 summary: Lista de grupos
 *                 value:
 *                   exito: true
 *                   mensaje: "Grupos obtenidos"
 *                   datos:
 *                     - id: "550e8400-e29b-41d4-a716-446655440000"
 *                       nombre: "Grupo A"
 *                     - id: "660e8400-e29b-41d4-a716-446655440001"
 *                       nombre: "Grupo B"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/', ControladorGrupos.obtenerTodos);

/**
 * @swagger
 * /api/grupos/{id}:
 *   get:
 *     tags:
 *       - Grupos
 *     summary: Obtener un grupo por ID
 *     description: |
 *       Retorna la información detallada de un grupo específico mediante su UUID.
 *       
 *       **Validaciones:**
 *       - El ID debe ser un UUID válido
 *       - El grupo debe existir en el sistema
 *       
 *       **Información retornada:**
 *       - ID y nombre del grupo
 *       
 *       **Nota:** Para obtener los equipos de un grupo, use GET /api/equipos
 *       y filtre por grupoId, o consulte las posiciones del grupo.
 *     operationId: obtenerGrupoPorId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del grupo a consultar
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       '200':
 *         description: Grupo encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/Grupo'
 *             examples:
 *               encontrado:
 *                 summary: Grupo encontrado
 *                 value:
 *                   exito: true
 *                   mensaje: "Grupo obtenido"
 *                   datos:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     nombre: "Grupo A"
 *       '400':
 *         description: UUID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               exito: false
 *               mensaje: "Error de validación"
 *               errores:
 *                 - campo: "id"
 *                   mensaje: "ID debe ser un UUID válido"
 *       '404':
 *         description: Grupo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               exito: false
 *               mensaje: "Grupo no encontrado"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/:id', validarUUID, manejarErroresValidacion, ControladorGrupos.obtenerPorId);

/**
 * @swagger
 * /api/grupos/{grupoId}/posiciones:
 *   get:
 *     tags:
 *       - Posiciones
 *     summary: Obtener tabla de posiciones de un grupo
 *     description: |
 *       Retorna la tabla de posiciones completa de un grupo específico.
 *       
 *       **Cálculo de posiciones:**
 *       - **Puntos (pts):** 3 por victoria, 1 por empate, 0 por derrota
 *       - **Partidos jugados (pj):** Total de partidos disputados
 *       - **Partidos ganados (pg):** Partidos ganados
 *       - **Partidos empatados (pe):** Partidos empatados
 *       - **Partidos perdidos (pp):** Partidos perdidos
 *       - **Goles a favor (gf):** Total de goles anotados
 *       - **Goles en contra (gc):** Total de goles recibidos
 *       - **Diferencia de gol (dg):** gf - gc
 *       
 *       **Criterios de ordenamiento:**
 *       1. Mayor cantidad de puntos
 *       2. Mayor diferencia de gol
 *       3. Mayor cantidad de goles a favor
 *       
 *       **Validaciones:**
 *       - El grupoId debe ser un UUID válido
 *       - El grupo debe existir
 *       - El grupo debe tener equipos asignados
 *       
 *       **Casos de uso:**
 *       - Consultar el estado actual del torneo
 *       - Determinar clasificaciones
 *       - Generar reportes de estadísticas
 *     operationId: obtenerTablaPosiciones
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         required: true
 *         description: UUID del grupo para obtener su tabla de posiciones
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       '200':
 *         description: Tabla de posiciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Posicion'
 *             examples:
 *               exitoso:
 *                 summary: Tabla de posiciones con datos
 *                 value:
 *                   exito: true
 *                   mensaje: "Tabla de posiciones obtenida"
 *                   datos:
 *                     - equipoId: "660e8400-e29b-41d4-a716-446655440001"
 *                       equipoNombre: "Real Madrid"
 *                       pj: 3
 *                       pg: 2
 *                       pe: 1
 *                       pp: 0
 *                       gf: 7
 *                       gc: 2
 *                       dg: 5
 *                       pts: 7
 *                     - equipoId: "770e8400-e29b-41d4-a716-446655440002"
 *                       equipoNombre: "FC Barcelona"
 *                       pj: 3
 *                       pg: 2
 *                       pe: 0
 *                       pp: 1
 *                       gf: 6
 *                       gc: 3
 *                       dg: 3
 *                       pts: 6
 *                     - equipoId: "880e8400-e29b-41d4-a716-446655440003"
 *                       equipoNombre: "Manchester United"
 *                       pj: 3
 *                       pg: 1
 *                       pe: 1
 *                       pp: 1
 *                       gf: 4
 *                       gc: 4
 *                       dg: 0
 *                       pts: 4
 *                     - equipoId: "990e8400-e29b-41d4-a716-446655440004"
 *                       equipoNombre: "Bayern Munich"
 *                       pj: 3
 *                       pg: 0
 *                       pe: 0
 *                       pp: 3
 *                       gf: 1
 *                       gc: 9
 *                       dg: -8
 *                       pts: 0
 *               sin_partidos:
 *                 summary: Tabla sin partidos jugados
 *                 value:
 *                   exito: true
 *                   mensaje: "Tabla de posiciones obtenida"
 *                   datos:
 *                     - equipoId: "660e8400-e29b-41d4-a716-446655440001"
 *                       equipoNombre: "Real Madrid"
 *                       pj: 0
 *                       pg: 0
 *                       pe: 0
 *                       pp: 0
 *                       gf: 0
 *                       gc: 0
 *                       dg: 0
 *                       pts: 0
 *                     - equipoId: "770e8400-e29b-41d4-a716-446655440002"
 *                       equipoNombre: "FC Barcelona"
 *                       pj: 0
 *                       pg: 0
 *                       pe: 0
 *                       pp: 0
 *                       gf: 0
 *                       gc: 0
 *                       dg: 0
 *                       pts: 0
 *                     - equipoId: "880e8400-e29b-41d4-a716-446655440003"
 *                       equipoNombre: "Manchester United"
 *                       pj: 0
 *                       pg: 0
 *                       pe: 0
 *                       pp: 0
 *                       gf: 0
 *                       gc: 0
 *                       dg: 0
 *                       pts: 0
 *                     - equipoId: "990e8400-e29b-41d4-a716-446655440004"
 *                       equipoNombre: "Bayern Munich"
 *                       pj: 0
 *                       pg: 0
 *                       pe: 0
 *                       pp: 0
 *                       gf: 0
 *                       gc: 0
 *                       dg: 0
 *                       pts: 0
 *       '400':
 *         description: UUID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *       '404':
 *         description: Grupo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get(
  '/:grupoId/posiciones',
  validarUUID,
  manejarErroresValidacion,
  ControladorPosiciones.obtenerTabla
);

export default router;
