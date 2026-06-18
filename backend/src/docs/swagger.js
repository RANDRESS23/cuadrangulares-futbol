import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Torneos de Fútbol - Cuadrangulares',
      version: '1.0.0',
      description: 'Backend para sistema de gestión de torneo de fútbol con dos cuadrangulares',
      contact: {
        name: 'Soporte',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://api.example.com',
        description: 'Servidor de producción',
      },
    ],
    components: {
      schemas: {
        RespuestaExitosa: {
          type: 'object',
          properties: {
            exito: {
              type: 'boolean',
              example: true,
            },
            mensaje: {
              type: 'string',
              example: 'Operación exitosa',
            },
            datos: {
              type: 'object',
            },
          },
        },
        RespuestaError: {
          type: 'object',
          properties: {
            exito: {
              type: 'boolean',
              example: false,
            },
            mensaje: {
              type: 'string',
              example: 'Descripción del error',
            },
          },
        },
        Equipo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            nombre: {
              type: 'string',
              example: 'Real Madrid',
            },
            grupoId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              example: null,
            },
            creadoEn: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z',
            },
          },
        },
        Grupo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            nombre: {
              type: 'string',
              example: 'Grupo A',
            },
          },
        },
        Partido: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            grupoId: {
              type: 'string',
              format: 'uuid',
            },
            equipoLocalId: {
              type: 'string',
              format: 'uuid',
            },
            equipoVisitanteId: {
              type: 'string',
              format: 'uuid',
            },
            golesLocal: {
              type: 'integer',
              nullable: true,
              example: 2,
            },
            golesVisitante: {
              type: 'integer',
              nullable: true,
              example: 1,
            },
            jugado: {
              type: 'boolean',
              example: true,
            },
            creadoEn: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Posicion: {
          type: 'object',
          properties: {
            equipoId: {
              type: 'string',
              format: 'uuid',
            },
            equipoNombre: {
              type: 'string',
              example: 'Real Madrid',
            },
            pj: {
              type: 'integer',
              description: 'Partidos jugados',
              example: 6,
            },
            pg: {
              type: 'integer',
              description: 'Partidos ganados',
              example: 4,
            },
            pe: {
              type: 'integer',
              description: 'Partidos empatados',
              example: 1,
            },
            pp: {
              type: 'integer',
              description: 'Partidos perdidos',
              example: 1,
            },
            gf: {
              type: 'integer',
              description: 'Goles a favor',
              example: 12,
            },
            gc: {
              type: 'integer',
              description: 'Goles en contra',
              example: 5,
            },
            dg: {
              type: 'integer',
              description: 'Diferencia de gol',
              example: 7,
            },
            pts: {
              type: 'integer',
              description: 'Puntos',
              example: 13,
            },
          },
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
