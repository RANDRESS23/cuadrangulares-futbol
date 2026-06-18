# ⚽ Torneo FC

<!-- Badges -->
<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2+-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

</div>

---

## 🎯 Descripción del Proyecto

**Torneo FC** es una aplicación web moderna y completa para la gestión de torneos de fútbol. Permite organizar y administrar un torneo con **8 equipos** distribuidos automáticamente en **2 cuadrangulares** (Grupo A y Grupo B), generando **24 partidos totales** con la modalidad "todos contra todos".

La aplicación calcula automáticamente posiciones, estadísticas, goleadores y proporciona una interfaz interactiva para seguimiento en tiempo real del torneo.

### ✨ Características Principales

- ⚡ **Sorteo Automático**: Distribución equilibrada de 8 equipos en 2 grupos de 4
- 📊 **Cálculo Automático**: Posiciones, puntos, goles favor/en contra y diferencia de goles
- 📱 **Interfaz Responsive**: Diseño moderno y funcional en todos los dispositivos
- 🔄 **Actualización en Tiempo Real**: Cambios instantáneos sin recargar la página
- 📈 **Estadísticas Detalladas**: Tracking completo de equipos, jugadores y partidos
- 🎉 **Efectos Visuales**: Animaciones y confeti para momentos especiales
- 🔒 **API Segura**: Validación y manejo robusto de errores
- 📖 **Documentación Swagger**: API completamente documentada e interactiva
- 🗄️ **Base de Datos PostgreSQL**: Persistencia de datos en Supabase

---

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library moderna
- **TypeScript** - Type safety
- **Vite** - Build tool rápido
- **TailwindCSS** - Estilos con utilidades
- **React Query** - State management y caching
- **React Router** - Navegación
- **Zod** - Validación de esquemas
- **Framer Motion** - Animaciones fluidas
- **Recharts** - Visualización de datos
- **Lucide React** - Iconos
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Supabase** - Base de datos y autenticación
- **PostgreSQL** - Motor de base de datos
- **Swagger** - Documentación API
- **Morgan** - HTTP logging
- **Helmet** - Seguridad HTTP
- **Validator** - Validación de datos
- **ESLint & Prettier** - Code quality

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida](#-instalación-rápida)
- [Configuración de Supabase](#-configuración-de-supabase)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#-arquitectura)
- [API Documentation](#-api-documentation)
- [Variables de Entorno](#-variables-de-entorno)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contribución](#-contribución)
- [Recursos](#-recursos)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **npm** >= 9.0.0 o **yarn**
- **Git**
- Una cuenta en **Supabase** ([Crear cuenta](https://supabase.com))

Verifica las versiones instaladas:
```bash
node --version
npm --version
```

---

## 🚀 Instalación Rápida

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/cuadrangulares-futbol.git
cd cuadrangulares-futbol
```

### 2. Instalar Dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install --legacy-peer-deps
```

### 3. Configurar Variables de Entorno

**Backend** - Crear `backend/.env`:
```env
PORT=3000
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

CORS_ORIGIN=http://localhost:5173
```

**Frontend** - Crear `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Configurar Base de Datos (Ver Sección Supabase)

### 5. Iniciar Aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Servidor en http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Aplicación en http://localhost:5173
```

---

## 🔧 Configuración de Supabase

### Paso 1: Crear Proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com)
2. Hacer clic en **"Start Your Project"**
3. Crear cuenta o iniciar sesión
4. Hacer clic en **"New Project"**
5. Completar datos:
   - **Project Name**: `cuadrangulares-futbol`
   - **Database Password**: Guardar en lugar seguro
   - **Region**: Seleccionar la más cercana
6. Hacer clic en **"Create new project"** (esperar 2-3 minutos)

### Paso 2: Obtener Credenciales

1. Ir a **Project Settings** (engranaje ⚙️ inferior izquierda)
2. Seleccionar **API** en el menú lateral
3. Copiar:
   - **Project URL** → `SUPABASE_URL`
   - **Anon Public** → `SUPABASE_KEY`
   - **Service Role** → `SUPABASE_SERVICE_ROLE_KEY`

### Paso 3: Ejecutar Script SQL

1. En Supabase, ir a **SQL Editor**
2. Hacer clic en **New Query**
3. Copiar contenido de [`backend/src/database/init.sql`](backend/src/database/init.sql)
4. Ejecutar el script (botón **Run**)
5. Verificar que las tablas se crearon correctamente

### Paso 4: Verificar Conexión

Una vez el servidor backend esté en ejecución, verás:
```
✓ Grupos inicializados
✓ Servidor ejecutándose en puerto 3000
```

---

## 📝 Scripts Disponibles

### Backend

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia servidor en producción |
| `npm run dev` | Inicia servidor en desarrollo (con nodemon) |
| `npm run lint` | Verifica código con ESLint |
| `npm run lint:fix` | Corrige problemas de ESLint |
| `npm run format` | Formatea código con Prettier |
| `npm run format:check` | Verifica formato sin cambiar |

### Frontend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (Vite) |
| `npm run build` | Build para producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Verifica código con ESLint |

---

## 📁 Estructura del Proyecto

```
cuadrangulares-futbol/
├── backend/                          # API REST Node.js + Express
│   ├── src/
│   │   ├── config/                   # Configuración (Supabase, variables)
│   │   ├── controllers/              # Manejadores HTTP (request/response)
│   │   ├── services/                 # Lógica de negocio
│   │   ├── repositories/             # Acceso a datos (Supabase)
│   │   ├── models/                   # DTOs y estructuras de datos
│   │   ├── routes/                   # Definición de endpoints
│   │   ├── middlewares/              # Middlewares (errores, logs)
│   │   ├── validators/               # Reglas de validación
│   │   ├── errors/                   # Errores personalizados
│   │   ├── docs/                     # Configuración Swagger
│   │   ├── database/                 # Scripts SQL
│   │   ├── app.js                    # Configuración Express
│   │   └── server.js                 # Punto de entrada
│   ├── package.json
│   ├── ARQUITECTURA.md               # Documentación técnica detallada
│   ├── ESTRUCTURA.md                 # Descripción detallada de carpetas
│   └── SUPABASE_SETUP.md             # Guía de configuración de BD
│
├── frontend/                         # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/               # Componentes React reutilizables
│   │   │   ├── common/               # Header, Sidebar, Layout
│   │   │   └── ui/                   # Componentes de UI (Button, Card, etc)
│   │   ├── pages/                    # Páginas (Equipos, Partidos, Posiciones, Sorteo)
│   │   ├── layouts/                  # Layouts principales
│   │   ├── hooks/                    # Custom hooks (useEquipos, usePartidos, etc)
│   │   ├── services/                 # Llamadas a API
│   │   ├── schemas/                  # Validación con Zod
│   │   ├── constants/                # Constantes de la app
│   │   ├── utils/                    # Funciones auxiliares
│   │   ├── assets/                   # Imágenes y recursos
│   │   ├── App.tsx                   # Componente raíz
│   │   └── main.tsx                  # Punto de entrada
│   ├── vite.config.ts                # Configuración Vite
│   ├── tailwind.config.js            # Configuración TailwindCSS
│   ├── tsconfig.json                 # Configuración TypeScript
│   ├── package.json
│   └── README.md                     # Documentación frontend específica
│
└── README.md                         # Este archivo

```

> 📖 Para documentación detallada ver [`backend/ARQUITECTURA.md`](backend/ARQUITECTURA.md) y [`backend/ESTRUCTURA.md`](backend/ESTRUCTURA.md)

---

## 🏛️ Arquitectura

La aplicación sigue una **arquitectura en capas** bajo principios **SOLID** para mantener código limpio, mantenible y escalable.

### Flujo de una Solicitud HTTP

```
┌─────────────────┐
│   HTTP Request  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Routes (Enrutador)    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   Middlewares           │
│  (Validación, logs)     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   Controllers           │
│  (Manejo HTTP)          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   Services              │
│  (Lógica de negocio)    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   Repositories          │
│  (Acceso a datos)       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   Supabase/PostgreSQL   │
│  (Base de datos)        │
└─────────────────────────┘
```

### Capas Principales

| Capa | Responsabilidad | Ubicación |
|------|-----------------|-----------|
| **Controllers** | Manejo de request/response HTTP | `src/controllers/` |
| **Services** | Lógica de negocio y validaciones | `src/services/` |
| **Repositories** | Acceso exclusivo a la base de datos | `src/repositories/` |
| **Models** | DTOs y estructuras de datos | `src/models/` |
| **Routes** | Definición de endpoints | `src/routes/` |
| **Middlewares** | Procesamiento transversal (logs, errores) | `src/middlewares/` |

---

## 📚 API Documentation

### 📖 Swagger UI Interactivo

Una vez el servidor backend esté corriendo, accede a la documentación interactiva de la API:

```
http://localhost:3000/api-docs
```

Aquí puedes:
- 📖 Ver todos los endpoints disponibles
- ▶️ Probar endpoints directamente
- 🔍 Explorar parámetros y respuestas
- 💾 Ver ejemplos de solicitud/respuesta

### Endpoints Principales

#### 🎮 Equipos
```http
GET    /api/equipos              # Listar todos los equipos
POST   /api/equipos              # Crear nuevo equipo
GET    /api/equipos/:id          # Obtener equipo específico
PUT    /api/equipos/:id          # Actualizar equipo
DELETE /api/equipos/:id          # Eliminar equipo
```

#### 🏆 Grupos
```http
GET    /api/grupos               # Listar grupos
POST   /api/grupos/:grupoId/equipos  # Equipos por grupo
```

#### ⚽ Partidos
```http
GET    /api/partidos             # Listar todos los partidos
POST   /api/partidos             # Crear nuevo partido
PUT    /api/partidos/:id         # Actualizar partido (marcador)
GET    /api/partidos/grupo/:grupoId  # Partidos por grupo
```

#### 📊 Posiciones
```http
GET    /api/posiciones           # Tabla de posiciones
GET    /api/posiciones/:grupoId  # Posiciones por grupo
```

#### 🎰 Sorteo
```http
POST   /api/sorteo               # Generar sorteo de equipos
GET    /api/sorteo/estado        # Estado actual del sorteo
```

---

## 🌍 Variables de Entorno

### Backend (`.env`)

```bash
# Servidor
PORT=3000                                    # Puerto del servidor
NODE_ENV=development                         # Entorno (development/production)

# Base de Datos
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`.env.local`)

```bash
# API
VITE_API_URL=http://localhost:3000/api
```

⚠️ **Importante:** Nunca compartir credenciales. Agregar archivos `.env` a `.gitignore`.

---

## 📊 Características Principales Detalladas

### 🎯 Sorteo Automático
- Distribución equilibrada de 8 equipos en 2 grupos
- Algoritmo que evita equipos duplicados
- Generación automática de 24 partidos (12 por grupo)

### 📈 Cálculo de Posiciones
- **Criterios de clasificación:**
  - Puntos (3 por victoria, 1 por empate)
  - Diferencia de goles
  - Goles a favor
  - Goles en contra
- Actualización en tiempo real tras cada resultado

### 🎪 Interfaz Moderna
- Diseño responsive con TailwindCSS
- Animaciones fluidas con Framer Motion
- Gráficos interactivos con Recharts
- Efectos visuales (confeti) en eventos especiales

### 🔒 Seguridad
- Validación de datos en frontend y backend
- Helmet para headers HTTP seguros
- CORS configurado
- Gestión robusto de errores

---

## 🚀 Deployment

### Backend - Opciones de Deployment

#### Heroku / Render / Railway
1. Conectar repositorio Git
2. Configurar variables de entorno (Supabase)
3. Script de inicio: `npm start`

### Frontend - Opciones de Deployment

#### Vercel (Recomendado para React)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Arrastrar carpeta 'dist' a Netlify
```

#### GitHub Pages
```bash
npm run build
# Publicar contenido de 'dist'
```

---

## 🆘 Troubleshooting

### Error: "SUPABASE_URL y SUPABASE_KEY son requeridas"
**Solución:** Verificar que `.env` existe en `backend/` y contiene las variables correctas

### Error: "Cannot find module '@supabase/supabase-js'"
**Solución:** 
```bash
cd backend
npm install
```

### Error: "Tabla no existe"
**Solución:** Ejecutar script SQL en Supabase (ver sección [Configuración de Supabase](#-configuración-de-supabase))

### Error: "CORS policy blocked"
**Solución:** Verificar que `CORS_ORIGIN` en `.env` del backend coincida con URL del frontend

### Frontend muestra "API Error" en todos los endpoints
**Solución:** 
1. Verificar que backend está corriendo en `http://localhost:3000`
2. Verificar `VITE_API_URL` en `frontend/.env.local`
3. Revisar consola del navegador (F12) para más detalles

---

## 🤝 Contribución

Las contribuciones son bienvenidas! Para cambios importantes:

1. Fork el repositorio
2. Crear rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Guía de Código
- Seguir estándares de ESLint
- Usar TypeScript en frontend
- Documentar funciones complejas
- Hacer commits claros y descriptivos

---

## 📚 Recursos y Enlaces

### 📖 Documentación del Proyecto
- [`backend/ARQUITECTURA.md`](backend/ARQUITECTURA.md) - Documentación técnica detallada
- [`backend/ESTRUCTURA.md`](backend/ESTRUCTURA.md) - Descripción de carpetas y módulos
- [`backend/SUPABASE_SETUP.md`](backend/SUPABASE_SETUP.md) - Configuración de BD paso a paso
- [`backend/README.md`](backend/README.md) - Específicos del backend
- [`frontend/README.md`](frontend/README.md) - Específicos del frontend

### 🔗 Enlaces Externos
- [Node.js Documentación](https://nodejs.org/docs/)
- [Express.js Guía](https://expressjs.com/)
- [React Documentación](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentación](https://tailwindcss.com/docs)
- [Supabase Guía](https://supabase.com/docs)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [Vite Guía](https://vitejs.dev/guide/)

### 🎓 Tutoriales Recomendados
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [React Query Tutorial](https://react-query.tanstack.com/)
- [Express.js Tutorial Series](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6P3qdAh3xkJfSL7L0E-5Gnn)

---

## 📸 Screenshots y Visuales

> 🖼️ Sección destinada para agregar capturas de pantalla de:
> - Dashboard principal
> - Tabla de posiciones
> - Gestión de partidos
> - Efectos visuales y animaciones
> - Pantalla de sorteo

```markdown
### Dashboard
![Dashboard Screenshot](docs/images/dashboard.png)

### Tabla de Posiciones
![Posiciones Screenshot](docs/images/posiciones.png)

### Gestión de Partidos
![Partidos Screenshot](docs/images/partidos.png)
```

---

## 📋 Información Adicional

### 📊 Datos del Torneo

- **Total Equipos:** 8
- **Grupos:** 2 (Grupo A, Grupo B)
- **Equipos por Grupo:** 4
- **Partidos Totales:** 24
- **Partidos por Grupo:** 12 (6 fechas de ida, 6 de vuelta)
- **Duración:** Torneo de "todos contra todos" (round-robin)

### 🎯 Criterios de Clasificación

1. **Puntos** (3 victoria, 1 empate, 0 derrota)
2. **Diferencia de Goles** (goles favor - goles contra)
3. **Goles a Favor**
4. **Goles en Contra**

---

## 👨‍💻 Autor

Desarrollado con ❤️ para la gestión de torneos de fútbol.

---

<div align="center">

### 🎉 ¡Gracias por usar Torneo FC!

Si te resulta útil, considera dejar una ⭐ en el repositorio

[⬆ Volver al inicio](#-cuadrangulares-fútbol)

</div>
