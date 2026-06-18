import express from 'express';
import { ControladorEquipos } from '../controllers/ControladorEquipos.js';
import {
  validarNombreEquipo,
  validarUUID,
  manejarErroresValidacion,
} from '../validators/validadores.js';

const router = express.Router();

/**
 * @swagger
 * /api/equipos:
 *   post:
 *     tags:
 *       - Equipos
 *     summary: Crear un nuevo equipo
 *     description: |
 *       Crea un nuevo equipo en el sistema. El equipo se crea sin asignar a ningún grupo.
 *       Para asignar el equipo a un grupo, se debe realizar el sorteo automático.
 *       
 *       **Validaciones:**
 *       - El nombre debe tener entre 3 y 100 caracteres
 *       - El nombre no puede estar vacío
 *       
 *       **Flujo recomendado:**
 *       1. Crear 8 equipos (4 para cada cuadrangular)
 *       2. Realizar el sorteo para asignarlos a grupos
 *       3. Los partidos se generan automáticamente después del sorteo
 *     operationId: crearEquipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipoCrear'
 *           examples:
 *             ejemplo_exitoso:
 *               summary: Ejemplo de creación exitosa
 *               value:
 *                 nombre: "Real Madrid"
 *             ejemplo_minimo:
 *               summary: Ejemplo con nombre mínimo
 *               value:
 *                 nombre: "ABC"
 *     responses:
 *       '201':
 *         description: Equipo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/Equipo'
 *             examples:
 *               exitoso:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   exito: true
 *                   mensaje: "Equipo creado exitosamente"
 *                   datos:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     nombre: "Real Madrid"
 *                     grupoId: null
 *                     creadoEn: "2024-01-15T10:30:00Z"
 *       '400':
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             examples:
 *               nombre_corto:
 *                 summary: Nombre muy corto
 *                 value:
 *                   exito: false
 *                   mensaje: "Error de validación"
 *                   errores:
 *                     - campo: "nombre"
 *                       mensaje: "El nombre debe tener entre 3 y 100 caracteres"
 *               nombre_vacio:
 *                 summary: Nombre vacío
 *                 value:
 *                   exito: false
 *                   mensaje: "Error de validación"
 *                   errores:
 *                     - campo: "nombre"
 *                       mensaje: "El nombre del equipo es requerido"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.post('/', validarNombreEquipo, manejarErroresValidacion, ControladorEquipos.crear);

/**
 * @swagger
 * /api/equipos:
 *   get:
 *     tags:
 *       - Equipos
 *     summary: Obtener todos los equipos
 *     description: |
 *       Retorna una lista con todos los equipos registrados en el sistema,
 *       independientemente de si están asignados a un grupo o no.
 *       
 *       **Información retornada:**
 *       - ID del equipo
 *       - Nombre del equipo
 *       - ID del grupo asignado (si aplica)
 *       - Fecha de creación
 *       
 *       **Casos de uso:**
 *       - Verificar cuántos equipos hay registrados
 *       - Listar equipos disponibles para el sorteo
 *       - Consultar equipos antes de realizar operaciones
 *     operationId: obtenerTodosEquipos
 *     responses:
 *       '200':
 *         description: Lista de equipos obtenida exitosamente
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
 *                         $ref: '#/components/schemas/Equipo'
 *             examples:
 *               con_equipos:
 *                 summary: Lista con equipos
 *                 value:
 *                   exito: true
 *                   mensaje: "Equipos obtenidos"
 *                   datos:
 *                     - id: "550e8400-e29b-41d4-a716-446655440000"
 *                       nombre: "Real Madrid"
 *                       grupoId: "660e8400-e29b-41d4-a716-446655440001"
 *                       creadoEn: "2024-01-15T10:30:00Z"
 *                     - id: "660e8400-e29b-41d4-a716-446655440001"
 *                       nombre: "FC Barcelona"
 *                       grupoId: "660e8400-e29b-41d4-a716-446655440001"
 *                       creadoEn: "2024-01-15T11:00:00Z"
 *               sin_equipos:
 *                 summary: Lista vacía
 *                 value:
 *                   exito: true
 *                   mensaje: "Equipos obtenidos"
 *                   datos: []
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/', ControladorEquipos.obtenerTodos);

/**
 * @swagger
 * /api/equipos/{id}:
 *   get:
 *     tags:
 *       - Equipos
 *     summary: Obtener un equipo por ID
 *     description: |
 *       Retorna la información detallada de un equipo específico mediante su UUID.
 *       
 *       **Validaciones:**
 *       - El ID debe ser un UUID válido
 *       - El equipo debe existir en el sistema
 *       
 *       **Información retornada:**
 *       - Todos los datos del equipo incluyendo grupo asignado
 *       - Fecha de creación
 *     operationId: obtenerEquipoPorId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del equipo a consultar
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       '200':
 *         description: Equipo encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/Equipo'
 *             examples:
 *               encontrado:
 *                 summary: Equipo encontrado
 *                 value:
 *                   exito: true
 *                   mensaje: "Equipo obtenido"
 *                   datos:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     nombre: "Real Madrid"
 *                     grupoId: "660e8400-e29b-41d4-a716-446655440001"
 *                     creadoEn: "2024-01-15T10:30:00Z"
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
 *         description: Equipo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *             example:
 *               exito: false
 *               mensaje: "Equipo no encontrado"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 */
router.get('/:id', validarUUID, manejarErroresValidacion, ControladorEquipos.obtenerPorId);

/**
 * @swagger
 * /api/equipos/{id}:
 *   put:
 *     tags:
 *       - Equipos
 *     summary: Actualizar un equipo
 *     description: |
 *       Actualiza el nombre de un equipo existente. Solo se puede modificar el nombre,
 *       otros campos como el ID o el grupo asignado son inmutables.
 *       
 *       **Validaciones:**
 *       - El ID debe ser un UUID válido
 *       - El equipo debe existir
 *       - El nuevo nombre debe tener entre 3 y 100 caracteres
 *       
 *       **Consideraciones:**
 *       - Esta operación no afecta los partidos ya programados
 *       - El historial de partidos mantiene el nombre original
 *     operationId: actualizarEquipo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del equipo a actualizar
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipoActualizar'
 *           examples:
 *             ejemplo_exitoso:
 *               summary: Ejemplo de actualización exitosa
 *               value:
 *                 nombre: "Real Madrid CF"
 *     responses:
 *       '200':
 *         description: Equipo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RespuestaExitosa'
 *                 - type: object
 *                   properties:
 *                     datos:
 *                       $ref: '#/components/schemas/Equipo'
 *             examples:
 *               exitoso:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   exito: true
 *                   mensaje: "Equipo actualizado exitosamente"
 *                   datos:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     nombre: "Real Madrid CF"
 *                     grupoId: "660e8400-e29b-41d4-a716-446655440001"
 *                     creadoEn: "2024-01-15T10:30:00Z"
 *       '400':
 *         description: Error de validación (UUID inválido o nombre inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *       '404':
 *         description: Equipo no encontrado
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
router.put(
  '/:id',
  validarUUID,
  validarNombreEquipo,
  manejarErroresValidacion,
  ControladorEquipos.actualizar
);

/**
 * @swagger
 * /api/equipos/{id}:
 *   delete:
 *     tags:
 *       - Equipos
 *     summary: Eliminar un equipo
 *     description: |
 *       Elimina un equipo del sistema permanentemente.
 *       
 *       **Validaciones:**
 *       - El ID debe ser un UUID válido
 *       - El equipo debe existir
 *       
 *       **Advertencias:**
 *       - Esta operación es irreversible
 *       
 *       **Recomendación:**
 *       - Verificar que el equipo no tenga partidos jugados antes de eliminar
 *       - Considerar usar actualización en lugar de eliminación para mantener historial
 *     operationId: eliminarEquipo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID del equipo a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       '200':
 *         description: Equipo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaExitosa'
 *             examples:
 *               exitoso:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   exito: true
 *                   mensaje: "Equipo eliminado exitosamente"
 *                   datos: null
 *       '400':
 *         description: UUID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaError'
 *       '404':
 *         description: Equipo no encontrado
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
router.delete('/:id', validarUUID, manejarErroresValidacion, ControladorEquipos.eliminar);

export default router;
