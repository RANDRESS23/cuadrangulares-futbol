import express from 'express';
import { ControladorPartidos } from '../controllers/ControladorPartidos.js';
import {
  validarUUID,
  validarGoles,
  manejarErroresValidacion,
} from '../validators/validadores.js';

const router = express.Router();

/**
 * @swagger
 * /api/partidos:
 *   get:
 *     tags:
 *       - Partidos
 *     summary: Obtener todos los partidos
 *     description: |
 *       Retorna una lista con todos los partidos del torneo, de ambos grupos.
 *       
 *       **Información retornada:**
 *       - ID del partido
 *       - ID del grupo al que pertenece
 *       - IDs de equipos local y visitante
 *       - Marcador (goles local y visitante)
 *       - Estado del partido (jugado o no jugado)
 *       - Fecha de creación
 *       
 *       **Estados del partido:**
 *       - **No jugado:** golesLocal y golesVisitante son null, jugado es false
 *       - **Jugado:** golesLocal y golesVisitante tienen valores, jugado es true
 *       
 *       **Casos de uso:**
 *       - Consultar todos los partidos del torneo
 *       - Verificar qué partidos falta jugar
 *       - Obtener información para actualizar marcadores
 *       - Generar reportes de resultados
 *     operationId: obtenerTodosPartidos
 *     responses:
 *       '200':
 *         description: Lista de partidos obtenida exitosamente
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
 *                         $ref: '#/components/schemas/Partido'
 *             examples:
 *               con_partidos:
 *                 summary: Lista con partidos
 *                 value:
 *                   exito: true
 *                   mensaje: "Partidos obtenidos"
 *                   datos:
 *                     - id: "550e8400-e29b-41d4-a716-446655440000"
 *                       grupoId: "660e8400-e29b-41d4-a716-446655440000"
 *                       equipoLocalId: "770e8400-e29b-41d4-a716-446655440001"
 *                       equipoVisitanteId: "880e8400-e29b-41d4-a716-446655440002"
 *                       golesLocal: 2
 *                       golesVisitante: 1
 *                       jugado: true
 *                       creadoEn: "2024-01-15T10:30:00Z"
 *                     - id: "660e8400-e29b-41d4-a716-446655440001"
 *                       grupoId: "660e8400-e29b-41d4-a716-446655440000"
 *                       equipoLocalId: "990e8400-e29b-41d4-a716-446655440003"
 *                       equipoVisitanteId: "aa0e8400-e29b-41d4-a716-446655440004"
 *                       golesLocal: null
 *                       golesVisitante: null
 *                       jugado: false
 *                       creadoEn: "2024-01-15T11:00:00Z"
 *               sin_partidos:
 *                 summary: Lista vacía (antes del sorteo)
 *                 value:
 *                   exito: true
 *                   mensaje: "Partidos obtenidos"
 *                   datos: []
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/', ControladorPartidos.obtenerTodos);

/**
 * @swagger
 * /api/partidos/{id}:
 *   get:
 *     tags:
 *       - Partidos
 *     summary: Obtener un partido por ID
 *     description: |
 *       Retorna la información detallada de un partido específico mediante su UUID.
 *       
 *       **Validaciones:**
 *       - El ID debe ser un UUID válido
 *       - El partido debe existir en el sistema
 *       
 *       **Información retornada:**
 *       - Todos los datos del partido incluyendo marcador actual
 *       - Estado del partido (jugado o pendiente)
 *       
 *       **Casos de uso:**
 *       - Consultar detalles de un partido específico
 *       - Verificar el marcador antes de actualizar
 *       - Obtener información para mostrar en la interfaz
 *     operationId: obtenerPartidoPorId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del partido a consultar
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       '200':
 *         description: Partido encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/Partido'
 *             examples:
 *               jugado:
 *                 summary: Partido ya jugado
 *                 value:
 *                   exito: true
 *                   mensaje: "Partido obtenido"
 *                   datos:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     grupoId: "660e8400-e29b-41d4-a716-446655440000"
 *                     equipoLocalId: "770e8400-e29b-41d4-a716-446655440001"
 *                     equipoVisitanteId: "880e8400-e29b-41d4-a716-446655440002"
 *                     golesLocal: 2
 *                     golesVisitante: 1
 *                     jugado: true
 *                     creadoEn: "2024-01-15T10:30:00Z"
 *               pendiente:
 *                 summary: Partido pendiente de jugar
 *                 value:
 *                   exito: true
 *                   mensaje: "Partido obtenido"
 *                   datos:
 *                     id: "660e8400-e29b-41d4-a716-446655440001"
 *                     grupoId: "660e8400-e29b-41d4-a716-446655440000"
 *                     equipoLocalId: "990e8400-e29b-41d4-a716-446655440003"
 *                     equipoVisitanteId: "aa0e8400-e29b-41d4-a716-446655440004"
 *                     golesLocal: null
 *                     golesVisitante: null
 *                     jugado: false
 *                     creadoEn: "2024-01-15T11:00:00Z"
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
 *         description: Partido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               exito: false
 *               mensaje: "Partido no encontrado"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/:id', validarUUID, manejarErroresValidacion, ControladorPartidos.obtenerPorId);

/**
 * @swagger
 * /api/partidos/{id}/marcador:
 *   put:
 *     tags:
 *       - Partidos
 *     summary: Actualizar el marcador de un partido
 *     description: |
 *       Actualiza el marcador de un partido específico, registrando los goles
 *       anotados por cada equipo.
 *       
 *       **Validaciones:**
 *       - El ID del partido debe ser un UUID válido
 *       - El partido debe existir
 *       - Los goles deben ser números enteros no negativos
 *       
 *       **Efectos de la actualización:**
 *       - El partido se marca como jugado (jugado = true)
 *       - Se actualizan las estadísticas de ambos equipos
 *       - Se recalcula automáticamente la tabla de posiciones del grupo
 *       - Los puntos se asignan según el resultado (3 por victoria, 1 por empate)
 *       
 *       **Sistema de puntos:**
 *       - **Victoria:** 3 puntos para el ganador, 0 para el perdedor
 *       - **Empate:** 1 punto para cada equipo
 *       - **Derrota:** 0 puntos
 *       
 *       **Consideraciones:**
 *       - Se puede actualizar el marcador múltiples veces (correcciones)
 *       - Cada actualización recalcula las posiciones
 *       - No hay restricción de tiempo para actualizar
 *       
 *       **Flujo recomendado:**
 *       1. Consultar el partido con GET /api/partidos/{id}
 *       2. Actualizar el marcador con PUT /api/partidos/{id}/marcador
 *       3. Verificar las posiciones con GET /api/grupos/{grupoId}/posiciones
 *     operationId: actualizarMarcador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del partido a actualizar
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarcadorActualizar'
 *           examples:
 *             victoria_local:
 *               summary: Victoria del equipo local
 *               value:
 *                 golesLocal: 3
 *                 golesVisitante: 1
 *             empate:
 *               summary: Empate entre ambos equipos
 *               value:
 *                 golesLocal: 2
 *                 golesVisitante: 2
 *             victoria_visitante:
 *               summary: Victoria del equipo visitante
 *               value:
 *                 golesLocal: 0
 *                 golesVisitante: 2
 *             goleada:
 *               summary: Goleada del equipo local
 *               value:
 *                 golesLocal: 5
 *                 golesVisitante: 0
 *     responses:
 *       '200':
 *         description: Marcador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/Partido'
 *             examples:
 *               exitoso:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   exito: true
 *                   mensaje: "Marcador actualizado exitosamente"
 *                   datos:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     grupoId: "660e8400-e29b-41d4-a716-446655440000"
 *                     equipoLocalId: "770e8400-e29b-41d4-a716-446655440001"
 *                     equipoVisitanteId: "880e8400-e29b-41d4-a716-446655440002"
 *                     golesLocal: 3
 *                     golesVisitante: 1
 *                     jugado: true
 *                     creadoEn: "2024-01-15T10:30:00Z"
 *       '400':
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             examples:
 *               uuid_invalido:
 *                 summary: UUID inválido
 *                 value:
 *                   exito: false
 *                   mensaje: "Error de validación"
 *                   errores:
 *                     - campo: "id"
 *                       mensaje: "ID debe ser un UUID válido"
 *               goles_negativos:
 *                 summary: Goles negativos
 *                 value:
 *                   exito: false
 *                   mensaje: "Error de validación"
 *                   errores:
 *                     - campo: "golesLocal"
 *                       mensaje: "Goles locales debe ser un número entero no negativo"
 *       '404':
 *         description: Partido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               exito: false
 *               mensaje: "Partido no encontrado"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.put(
  '/:id/marcador',
  validarUUID,
  validarGoles,
  manejarErroresValidacion,
  ControladorPartidos.actualizarMarcador
);

export default router;
