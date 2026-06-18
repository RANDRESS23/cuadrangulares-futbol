import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Torneos de Fútbol - Cuadrangulares',
      version: '1.0.0',
      description: `
## Sistema de Gestión de Torneos de Fútbol

API REST completa para la gestión de torneos de fútbol con formato de cuadrangulares. 
Este sistema permite administrar equipos, realizar sorteos automáticos, gestionar grupos, 
partidos y tablas de posiciones.

### Características Principales

- **Gestión de Equipos**: CRUD completo para administrar equipos participantes
- **Sorteo Automático**: Distribución aleatoria de equipos en dos grupos (cuadrangulares)
- **Gestión de Grupos**: Consulta de grupos y sus equipos asignados
- **Gestión de Partidos**: Administración de partidos y actualización de marcadores
- **Tablas de Posiciones**: Cálculo automático de estadísticas y clasificaciones

### Reglas del Torneo

- Cada cuadrangular consta de 4 equipos
- Cada equipo juega contra todos los demás de su grupo con ida y vuelta (6 partidos)
- Sistema de puntos: 3 puntos por victoria, 1 por empate, 0 por derrota
- Criterios de desempate: Diferencia de gol, luego goles a favor
      `,
    },
    tags: [
      {
        name: 'Equipos',
        description: 'Operaciones CRUD para la gestión de equipos',
      },
      {
        name: 'Sorteo',
        description: 'Realización de sorteos automáticos para distribución de equipos',
      },
      {
        name: 'Grupos',
        description: 'Gestión y consulta de grupos del torneo',
      },
      {
        name: 'Partidos',
        description: 'Administración de partidos y marcadores',
      },
      {
        name: 'Posiciones',
        description: 'Consulta de tablas de posiciones y estadísticas',
      },
      {
        name: 'Salud',
        description: 'Endpoints de verificación de estado del sistema',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Autenticación JWT token (opcional para desarrollo)',
        },
      },
      schemas: {
        RespuestaExitosa: {
          type: 'object',
          description: 'Respuesta estándar para operaciones exitosas',
          properties: {
            exito: {
              type: 'boolean',
              example: true,
              description: 'Indica si la operación fue exitosa',
            },
            mensaje: {
              type: 'string',
              example: 'Operación exitosa',
              description: 'Mensaje descriptivo del resultado',
            },
            datos: {
              oneOf: [
                { type: 'object' },
                { type: 'array' },
                { type: 'null' },
              ],
              description: 'Datos retornados por la operación (puede ser null)',
            },
          },
          required: ['exito', 'mensaje'],
        },
        RespuestaError: {
          type: 'object',
          description: 'Respuesta estándar para errores',
          properties: {
            exito: {
              type: 'boolean',
              example: false,
              description: 'Siempre false para respuestas de error',
            },
            mensaje: {
              type: 'string',
              example: 'Descripción del error',
              description: 'Mensaje descriptivo del error',
            },
            errores: {
              type: 'array',
              description: 'Lista de errores de validación (si aplica)',
              items: {
                type: 'object',
                properties: {
                  campo: {
                    type: 'string',
                    example: 'nombre',
                    description: 'Nombre del campo con error',
                  },
                  mensaje: {
                    type: 'string',
                    example: 'El nombre es requerido',
                    description: 'Mensaje de error específico del campo',
                  },
                },
              },
            },
          },
          required: ['exito', 'mensaje'],
        },
        Equipo: {
          type: 'object',
          description: 'Representación de un equipo de fútbol',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Identificador único del equipo (UUID v4)',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            nombre: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              description: 'Nombre del equipo',
              example: 'Real Madrid',
            },
            grupoId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              description: 'ID del grupo al que está asignado (null si no asignado)',
              example: null,
            },
            creadoEn: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de creación del equipo',
              example: '2024-01-15T10:30:00Z',
            },
          },
          required: ['id', 'nombre'],
        },
        EquipoCrear: {
          type: 'object',
          description: 'Datos requeridos para crear un nuevo equipo',
          properties: {
            nombre: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              description: 'Nombre del equipo (entre 3 y 100 caracteres)',
              example: 'FC Barcelona',
            },
          },
          required: ['nombre'],
        },
        EquipoActualizar: {
          type: 'object',
          description: 'Datos para actualizar un equipo existente',
          properties: {
            nombre: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              description: 'Nuevo nombre del equipo (entre 3 y 100 caracteres)',
              example: 'FC Barcelona',
            },
          },
          required: ['nombre'],
        },
        Grupo: {
          type: 'object',
          description: 'Representación de un grupo/cuadrangular',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Identificador único del grupo',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            nombre: {
              type: 'string',
              description: 'Nombre del grupo',
              example: 'Grupo A',
            },
          },
          required: ['id', 'nombre'],
        },
        Partido: {
          type: 'object',
          description: 'Representación de un partido del torneo',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Identificador único del partido',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            grupoId: {
              type: 'string',
              format: 'uuid',
              description: 'ID del grupo al que pertenece el partido',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            equipoLocalId: {
              type: 'string',
              format: 'uuid',
              description: 'ID del equipo local',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            equipoVisitanteId: {
              type: 'string',
              format: 'uuid',
              description: 'ID del equipo visitante',
              example: '660e8400-e29b-41d4-a716-446655440001',
            },
            golesLocal: {
              type: 'integer',
              minimum: 0,
              nullable: true,
              description: 'Goles anotados por el equipo local',
              example: 2,
            },
            golesVisitante: {
              type: 'integer',
              minimum: 0,
              nullable: true,
              description: 'Goles anotados por el equipo visitante',
              example: 1,
            },
            jugado: {
              type: 'boolean',
              description: 'Indica si el partido ya fue jugado',
              example: true,
            },
            creadoEn: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de creación del partido',
              example: '2024-01-15T10:30:00Z',
            },
          },
          required: ['id', 'grupoId', 'equipoLocalId', 'equipoVisitanteId', 'jugado'],
        },
        MarcadorActualizar: {
          type: 'object',
          description: 'Datos para actualizar el marcador de un partido',
          properties: {
            golesLocal: {
              type: 'integer',
              minimum: 0,
              description: 'Goles anotados por el equipo local',
              example: 3,
            },
            golesVisitante: {
              type: 'integer',
              minimum: 0,
              description: 'Goles anotados por el equipo visitante',
              example: 1,
            },
          },
          required: ['golesLocal', 'golesVisitante'],
        },
        Posicion: {
          type: 'object',
          description: 'Estadísticas de un equipo en la tabla de posiciones',
          properties: {
            equipoId: {
              type: 'string',
              format: 'uuid',
              description: 'ID del equipo',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            equipoNombre: {
              type: 'string',
              description: 'Nombre del equipo',
              example: 'Real Madrid',
            },
            pj: {
              type: 'integer',
              minimum: 0,
              description: 'Partidos jugados',
              example: 3,
            },
            pg: {
              type: 'integer',
              minimum: 0,
              description: 'Partidos ganados (3 puntos cada uno)',
              example: 2,
            },
            pe: {
              type: 'integer',
              minimum: 0,
              description: 'Partidos empatados (1 punto cada uno)',
              example: 0,
            },
            pp: {
              type: 'integer',
              minimum: 0,
              description: 'Partidos perdidos (0 puntos)',
              example: 1,
            },
            gf: {
              type: 'integer',
              minimum: 0,
              description: 'Goles a favor',
              example: 6,
            },
            gc: {
              type: 'integer',
              minimum: 0,
              description: 'Goles en contra',
              example: 2,
            },
            dg: {
              type: 'integer',
              description: 'Diferencia de gol (goles a favor - goles en contra)',
              example: 4,
            },
            pts: {
              type: 'integer',
              minimum: 0,
              description: 'Puntos totales (3 por victoria, 1 por empate)',
              example: 6,
            },
          },
          required: ['equipoId', 'equipoNombre', 'pj', 'pg', 'pe', 'pp', 'gf', 'gc', 'dg', 'pts'],
        },
        SorteoResultado: {
          type: 'object',
          description: 'Resultado del sorteo automático',
          properties: {
            mensaje: {
              type: 'string',
              example: 'Sorteo realizado exitosamente',
            },
            grupos: {
              type: 'array',
              description: 'Grupos con sus equipos asignados',
              items: {
                type: 'object',
                properties: {
                  grupo: {
                    $ref: '#/components/schemas/Grupo',
                  },
                  equipos: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Equipo',
                    },
                  },
                },
              },
            },
          },
          required: ['mensaje', 'grupos'],
        },
        HealthCheck: {
          type: 'object',
          description: 'Estado de salud del sistema',
          properties: {
            estado: {
              type: 'string',
              enum: ['ok', 'error'],
              example: 'ok',
              description: 'Estado del sistema',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z',
              description: 'Fecha y hora de la verificación',
            },
          },
          required: ['estado', 'timestamp'],
        },
        ErrorValidacion: {
          type: 'object',
          description: 'Detalle de un error de validación',
          properties: {
            campo: {
              type: 'string',
              example: 'nombre',
              description: 'Nombre del campo que falló la validación',
            },
            mensaje: {
              type: 'string',
              example: 'El nombre debe tener entre 3 y 100 caracteres',
              description: 'Mensaje de error específico',
            },
          },
          required: ['campo', 'mensaje'],
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export const configurarSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve);
  app.get('/api/docs', swaggerUi.setup(specs, { explorer: true }));
};
