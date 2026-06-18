# API de Torneos de Fútbol - Cuadrangulares

Backend para sistema de gestión de torneo de fútbol compuesto por 8 equipos sorteados en dos cuadrangulares (Grupo A y Grupo B).

## 📋 Descripción del Proyecto

Esta API permite administrar un torneo de fútbol con la siguiente estructura:

- **8 equipos** divididos automáticamente en **2 grupos** (Grupo A y Grupo B)
- **4 equipos por grupo** con modalidad "todos contra todos"
- **24 partidos totales** (12 partidos por grupo con ida y vuelta)
- Cálculo automático de **posiciones y estadísticas**
- Registro y modificación de **marcadores**

## 🏗️ Arquitectura

La aplicación sigue una **arquitectura en capas** bajo principios **SOLID**:

```
src/
├── config/              # Configuración (Supabase, variables de entorno)
├── controllers/         # Manejo de request/response
├── services/            # Lógica de negocio
├── repositories/        # Acceso a datos (Supabase)
├── models/              # DTOs y entidades
├── routes/              # Definición de endpoints
├── middlewares/         # Manejo de errores, logs, validación
├── validators/          # Reglas de validación
├── errors/              # Errores personalizados
├── utils/               # Funciones auxiliares
├── docs/                # Documentación (Swagger)
├── database/            # Scripts SQL
├── app.js               # Configuración de Express
└── server.js            # Punto de entrada
```

### Responsabilidades por Capa

**Controllers:**

- Manejan request y response HTTP
- No contienen lógica de negocio

**Services:**

- Contienen toda la lógica de negocio
- Reglas de validación complejas
- Orquestación de operaciones

**Repositories:**

- Acceso exclusivo a datos
- Todas las consultas a Supabase
- Mapeo de DTOs

**Models:**

- Definición de DTOs y entidades
- Estructuras de datos

## 🛠️ Stack Tecnológico

| Categoría                | Tecnología            |
| ------------------------ | --------------------- |
| **Runtime**              | Node.js               |
| **Framework**            | Express.js            |
| **Base de Datos**        | PostgreSQL (Supabase) |
| **Documentación**        | Swagger OpenAPI       |
| **Validaciones**         | express-validator     |
| **Variables de Entorno** | dotenv                |
| **Seguridad**            | helmet, cors          |
| **Calidad de Código**    | ESLint, Prettier      |

## 📦 Instalación

### Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Cuenta en [Supabase](https://supabase.com)

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone <url-repositorio>
   cd backend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Editar `.env` con tus credenciales de Supabase

4. **Ejecutar migraciones de BD**
   - Ir a Supabase Console
   - Abrir el SQL Editor
   - Ejecutar el contenido de `src/database/init.sql`

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

### Modo Producción

```bash
npm start
```

## 📝 Variables de Entorno

Crear archivo `.env` con:

```env
PORT=3000
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📚 Documentación API

### Swagger

Acceder a: `http://localhost:3000/api/docs`

### Endpoints

#### 🏈 Equipos

| Método   | Endpoint           | Descripción               |
| -------- | ------------------ | ------------------------- |
| `POST`   | `/api/equipos`     | Crear equipo              |
| `GET`    | `/api/equipos`     | Obtener todos los equipos |
| `GET`    | `/api/equipos/:id` | Obtener equipo por ID     |
| `PUT`    | `/api/equipos/:id` | Actualizar equipo         |
| `DELETE` | `/api/equipos/:id` | Eliminar equipo           |

**Ejemplo POST:**

```json
{
  "nombre": "Real Madrid"
}
```

#### 🎲 Sorteo

| Método | Endpoint      | Descripción                |
| ------ | ------------- | -------------------------- |
| `POST` | `/api/sorteo` | Realizar sorteo automático |

**Requisito:** Exactamente 8 equipos registrados

#### 👥 Grupos

| Método | Endpoint                          | Descripción                 |
| ------ | --------------------------------- | --------------------------- |
| `GET`  | `/api/grupos`                     | Obtener todos los grupos    |
| `GET`  | `/api/grupos/:id`                 | Obtener grupo por ID        |
| `GET`  | `/api/grupos/:grupoId/posiciones` | Obtener tabla de posiciones |

#### ⚽ Partidos

| Método | Endpoint                     | Descripción                |
| ------ | ---------------------------- | -------------------------- |
| `GET`  | `/api/partidos`              | Obtener todos los partidos |
| `GET`  | `/api/partidos/:id`          | Obtener partido por ID     |
| `PUT`  | `/api/partidos/:id/marcador` | Actualizar marcador        |

**Ejemplo PUT marcador:**

```json
{
  "golesLocal": 2,
  "golesVisitante": 1
}
```

## 📊 Modelo de Datos

### Tabla: grupos

```
id UUID (PK)
nombre VARCHAR(50) UNIQUE
created_at TIMESTAMP
```

### Tabla: equipos

```
id UUID (PK)
nombre VARCHAR(100) UNIQUE
grupo_id UUID (FK)
created_at TIMESTAMP
```

### Tabla: partidos

```
id UUID (PK)
grupo_id UUID (FK)
equipo_local_id UUID (FK)
equipo_visitante_id UUID (FK)
goles_local INTEGER
goles_visitante INTEGER
jugado BOOLEAN
created_at TIMESTAMP
```

## 🎯 Reglas de Negocio

1. **Límite de equipos:** Máximo 8 equipos
2. **Nombres únicos:** No se permiten nombres duplicados
3. **Dos grupos:** Grupo A y Grupo B (creados automáticamente)
4. **Sorteo automático:** Mezcla aleatoria de 8 equipos (4 por grupo)
5. **No re-sorteo:** No se puede volver a sortear una vez generados los partidos
6. **Fixture:** Todos contra todos (6 partidos por grupo)
7. **Posiciones dinámicas:** Calculadas sobre la marcha, no almacenadas

## 🏆 Sistema de Puntuación

| Resultado | Puntos |
| --------- | ------ |
| Victoria  | 3      |
| Empate    | 1      |
| Derrota   | 0      |

## 📈 Estadísticas

Cada equipo cuenta con:

| Sigla   | Descripción                 |
| ------- | --------------------------- |
| **PJ**  | Partidos Jugados            |
| **PG**  | Partidos Ganados            |
| **PE**  | Partidos Empatados          |
| **PP**  | Partidos Perdidos           |
| **GF**  | Goles a Favor               |
| **GC**  | Goles en Contra             |
| **DG**  | Diferencia de Gol (GF - GC) |
| **PTS** | Puntos                      |

## 🏁 Criterios de Desempate

1. Mayor cantidad de puntos
2. Mejor diferencia de gol
3. Más goles a favor

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Ejecutar en modo desarrollo con nodemon

# Testing
npm test                 # Ejecutar tests
npm run test:watch      # Modo watch
npm run test:coverage   # Cobertura

# Calidad de Código
npm run lint            # ESLint
npm run lint:fix        # Corregir automáticamente
npm run format          # Prettier
npm run format:check    # Verificar formato
```

## ✅ Validaciones

### Equipo

- **Nombre:** Obligatorio
- **Longitud:** Mínimo 3, máximo 100 caracteres
- **Unicidad:** No permite duplicados

### Marcador

- **Goles:** Enteros no negativos (>= 0)

### IDs

- **Formato:** UUID válido

## 🔐 Seguridad

- **Helmet:** Headers de seguridad HTTP
- **CORS:** Control de origen cruzado
- **Validación:** express-validator
- **Sanitización:** Automática en express
- **Manejo de errores:** Información mínima en producción

### Cobertura

```bash
npm run test:coverage
```

## 📝 Respuestas API

### Éxito

```json
{
  "exito": true,
  "mensaje": "Descripción de la operación",
  "datos": {
    /* objeto o array */
  }
}
```

### Error

```json
{
  "exito": false,
  "mensaje": "Descripción del error"
}
```

## 🚨 Errores Personalizados

- `EquipoNoEncontradoError` (404)
- `GrupoNoEncontradoError` (404)
- `PartidoNoEncontradoError` (404)
- `LimiteEquiposError` (400)
- `SorteoYaRealizadoError` (400)
- `NombreDuplicadoError` (400)
- `InsuficientesEquiposError` (400)
- `IdInvalidoError` (400)

## 🔄 Flujo de Negocio

1. **Registro de Equipos**
   - Usuario registra hasta 8 equipos

2. **Sorteo**
   - Sistema mezcla aleatoriamente los equipos
   - Asigna 4 al Grupo A y 4 al Grupo B
   - Genera automáticamente los 12 partidos

3. **Registro de Partidos**
   - Usuario registra marcadores conforme se juegan

4. **Consulta de Posiciones**
   - Sistema calcula dinámicamente tabla de posiciones
   - Aplica criterios de desempate

## 🛠️ Desarrollo

### Estructura de Carpetas

```
backend/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── supabase.js
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validators/
│   ├── errors/
│   ├── docs/
│   ├── database/
│   ├── app.js
│   └── server.js
├── tests/
│   ├── unit/
│   └── integration/
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── package.json
└── README.md
```

### Convenciones de Código

- **Nombres en español** para variables, funciones y tablas
- **Funciones pequeñas y enfocadas** (principio de responsabilidad única)
- **Manejo explícito de errores**
- **Comentarios solo cuando aportan valor**
- **Sin duplicación de código**

### Linting y Formateo

```bash
# Verificar
npm run lint
npm run format:check

# Corregir automáticamente
npm run lint:fix
npm run format
```

## 📱 Cliente

El frontend para esta API se encuentra en: `/frontend`

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crear rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request
