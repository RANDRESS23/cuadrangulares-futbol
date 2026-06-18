# Estructura del Proyecto - Vista Completa

```
backend/
│
├── 📁 src/
│   ├── 📁 config/
│   │   ├── config.js              # Configuración y validación de variables de entorno
│   │   └── supabase.js            # Cliente de Supabase
│   │
│   ├── 📁 controllers/
│   │   ├── ControladorEquipos.js  # Manejo de requests/responses de equipos
│   │   ├── ControladorGrupos.js   # Manejo de requests/responses de grupos
│   │   ├── ControladorPartidos.js # Manejo de requests/responses de partidos
│   │   ├── ControladorPosiciones.js # Manejo de posiciones
│   │   └── ControladorSorteo.js   # Manejo del sorteo
│   │
│   ├── 📁 services/
│   │   ├── ServicioEquipos.js     # Lógica de negocio de equipos
│   │   ├── ServicioGrupos.js      # Lógica de negocio de grupos
│   │   ├── ServicioPartidos.js    # Lógica de negocio de partidos
│   │   ├── ServicioPosiciones.js  # Cálculo de posiciones
│   │   └── ServicioSorteo.js      # Lógica del sorteo automático
│   │
│   ├── 📁 repositories/
│   │   ├── RepositorioEquipos.js  # Acceso a datos de equipos (Supabase)
│   │   ├── RepositorioGrupos.js   # Acceso a datos de grupos
│   │   └── RepositorioPartidos.js # Acceso a datos de partidos
│   │
│   ├── 📁 models/
│   │   ├── RespuestaApi.js        # DTO estándar de respuesta API
│   │   ├── EquipoDTO.js           # DTO de equipo
│   │   ├── GrupoDTO.js            # DTO de grupo
│   │   ├── PartidoDTO.js          # DTO de partido
│   │   └── EstadisticasEquipo.js  # DTO de estadísticas
│   │
│   ├── 📁 routes/
│   │   ├── rutasEquipos.js        # Rutas POST/GET/PUT/DELETE /api/equipos
│   │   ├── rutasGrupos.js         # Rutas GET /api/grupos y posiciones
│   │   ├── rutasPartidos.js       # Rutas GET/PUT /api/partidos
│   │   └── rutasSorteo.js         # Rutas POST /api/sorteo
│   │
│   ├── 📁 middlewares/
│   │   ├── manejo-errores.js      # Middleware globalizado de errores
│   │   └── logs.js                # Configuración de morgan
│   │
│   ├── 📁 validators/
│   │   └── validadores.js         # Validaciones con express-validator
│   │
│   ├── 📁 errors/
│   │   └── ErroresPersonalizados.js # 8 tipos de errores personalizados
│   │
│   ├── 📁 docs/
│   │   └── swagger.js             # Configuración Swagger OpenAPI
│   │
│   ├── 📁 database/
│   │   └── init.sql               # Script SQL para crear tablas
│   │
│   ├── app.js                     # Configuración de Express
│   └── server.js                  # Punto de entrada de la aplicación
│
├── 📄 package.json                # Dependencias y scripts
├── 📄 .env                        # Variables de entorno (llenar)
├── 📄 .env.example                # Template de variables
├── 📄 .eslintrc.json              # Configuración ESLint
├── 📄 .prettierrc                 # Configuración Prettier
├── 📄 .gitignore                  # Archivos a ignorar
├── 📄 jest.config.js              # Configuración Jest
│
├── 📄 README.md                   # Documentación principal
├── 📄 SUPABASE_SETUP.md           # Guía configuración Supabase
├── 📄 ARQUITECTURA.md             # Documentación técnica detallada
└── 📄 ESTRUCTURA.md               # Este archivo

════════════════════════════════════════════════════════════

ESTADÍSTICAS:

Directorios:        13
Archivos totales:   40+
Líneas de código:   2500+

ENDPOINTS:

POST   /api/equipos                     Crear equipo
GET    /api/equipos                     Obtener equipos
GET    /api/equipos/:id                 Obtener equipo
PUT    /api/equipos/:id                 Actualizar equipo
DELETE /api/equipos/:id                 Eliminar equipo

POST   /api/sorteo                      Realizar sorteo

GET    /api/grupos                      Obtener grupos
GET    /api/grupos/:id                  Obtener grupo
GET    /api/grupos/:grupoId/posiciones Tabla de posiciones

GET    /api/partidos                    Obtener partidos
GET    /api/partidos/:id                Obtener partido
PUT    /api/partidos/:id/marcador       Actualizar marcador

════════════════════════════════════════════════════════════

FLUJO DE UNA REQUEST:

HTTP Request
    │
    ├─ Express Router (rutasEquipos.js)
    │
    ├─ Validators (validadores.js)
    │   └─ Si hay error → HTTP 400
    │
    ├─ Controller (ControladorEquipos)
    │
    ├─ Service (ServicioEquipos)
    │   └─ Lógica de negocio
    │   └─ Validaciones complejas
    │
    ├─ Repository (RepositorioEquipos)
    │   └─ Consultas a Supabase
    │
    ├─ Supabase API
    │
    └─ Response (RespuestaApi)
        └─ HTTP Response

════════════════════════════════════════════════════════════

DEPENDENCIAS PRINCIPALES:

✓ express               Framework HTTP
✓ @supabase/supabase-js Cliente BD
✓ express-validator    Validaciones
✓ helmet               Seguridad HTTP
✓ cors                 CORS middleware
✓ swagger-*            Documentación OpenAPI
✓ uuid                 Generación de UUIDs
✓ dotenv               Variables entorno
✓ jest                 Testing
✓ nodemon              Dev reloading
✓ eslint + prettier    Calidad de código

════════════════════════════════════════════════════════════

COMANDOS ÚTILES:

npm run dev              # Desarrollo con auto-reload
npm start                # Producción
npm test                 # Ejecutar tests
npm run lint             # Verificar código
npm run lint:fix         # Corregir automáticamente
npm run format           # Formatear con Prettier

════════════════════════════════════════════════════════════

PATRONES IMPLEMENTADOS:

✓ Repository Pattern       Abstracción acceso a datos
✓ Service Layer Pattern    Lógica de negocio centralizada
✓ DTO Pattern             Transferencia de datos tipada
✓ Error Handling          Errores personalizados con códigos
✓ Validation Middleware   Validación con express-validator
✓ Async/Await            Código asincrónico limpio
✓ Separation of Concerns  Cada capa con responsabilidad única

════════════════════════════════════════════════════════════

REGLAS DE NEGOCIO IMPLEMENTADAS:

1. ✓ Máximo 8 equipos
2. ✓ Nombres únicos
3. ✓ Dos grupos (A y B)
4. ✓ Sorteo automático (Fisher-Yates)
5. ✓ Fixture todos contra todos (24 partidos con ida y vuelta)
6. ✓ No re-sorteo si ya hay partidos
7. ✓ Cálculo dinámico de posiciones
8. ✓ Criterios de desempate (puntos, DG, GF)
9. ✓ Sistema de puntuación (3-1-0)
10. ✓ Registro/modificación de marcadores

════════════════════════════════════════════════════════════

BASE DE DATOS (PostgreSQL):

Tablas:
├─ grupos
│  ├─ id (UUID PK)
│  ├─ nombre (VARCHAR)
│  └─ created_at (TIMESTAMP)
│
├─ equipos
│  ├─ id (UUID PK)
│  ├─ nombre (VARCHAR UNIQUE)
│  ├─ grupo_id (UUID FK)
│  └─ created_at (TIMESTAMP)
│
└─ partidos
   ├─ id (UUID PK)
   ├─ grupo_id (UUID FK)
   ├─ equipo_local_id (UUID FK)
   ├─ equipo_visitante_id (UUID FK)
   ├─ goles_local (INTEGER)
   ├─ goles_visitante (INTEGER)
   ├─ jugado (BOOLEAN)
   └─ created_at (TIMESTAMP)

Índices:
├─ idx_equipos_grupo_id
├─ idx_partidos_grupo_id
├─ idx_partidos_equipo_local
└─ idx_partidos_equipo_visitante

════════════════════════════════════════════════════════════

SEGURIDAD IMPLEMENTADA:

✓ Helmet              Headers de seguridad HTTP
✓ CORS                Control de origen cruzado
✓ express-validator   Validación de entradas
✓ Sanitización        Automática en express
✓ UUIDs               Identificadores de recursos
✓ Error Handling      Información mínima en producción

════════════════════════════════════════════════════════════

DOCUMENTACIÓN:

✓ README.md           Documentación principal (100+ líneas)
✓ SUPABASE_SETUP.md   Guía configuración BD
✓ ARQUITECTURA.md     Documentación técnica detallada
✓ EJEMPLOS_USO.md     Ejemplos prácticos de requests
✓ Swagger OpenAPI     Documentación interactiva en /api/docs

════════════════════════════════════════════════════════════

VERSION: 1.0.0
ESTADO: ✓ COMPLETO Y LISTO PARA USAR
ÚLTIMA ACTUALIZACIÓN: 2024
```

## 🚀 Para Iniciar

1. Configurar `.env` con credenciales de Supabase
2. Ejecutar SQL script en Supabase
3. `npm run dev`
4. Acceder a `http://localhost:3000/api/docs`

## 📚 Documentación

- Principal: [README.md](README.md)
- Supabase: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- Técnica: [ARQUITECTURA.md](ARQUITECTURA.md)
