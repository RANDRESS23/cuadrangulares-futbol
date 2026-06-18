# Torneo FC - Frontend

Aplicación moderna para la gestión de torneos de fútbol con 8 equipos distribuidos en dos cuadrangulares.

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalación

```bash
# Las dependencias ya están instaladas
# Si necesitas instalar nuevamente:
npm install --legacy-peer-deps
```

### Configuración

1. Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

Ajusta la URL según dónde esté corriendo tu backend.

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📦 Stack Tecnológico

- **React** 19.2.6 - Framework de UI
- **Vite** - Build tool y dev server
- **TypeScript** - Type safety
- **TailwindCSS** - Estilos
- **React Router** - Routing
- **Axios** - Cliente HTTP
- **TanStack Query** - Gestión de estado de servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Sonner** - Notificaciones

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── common/         # Componentes comunes (Header, Sidebar)
│   └── ui/            # Componentes UI reutilizables
├── layouts/           # Layouts principales
├── pages/            # Páginas de la aplicación
├── hooks/            # Custom hooks
├── services/         # Servicios API
├── schemas/          # Esquemas de Zod
├── utils/            # Funciones auxiliares
├── constants/        # Constantes
├── assets/           # Activos estáticos
├── App.tsx           # Componente raíz
├── main.tsx          # Punto de entrada
└── index.css         # Estilos globales
```

## 🎨 Características

### Gestión de Equipos

- CRUD completo
- Búsqueda instantánea
- Diseño de tarjetas moderno

### Sorteo

- Animación visual impactante
- Distribución de equipos en dos grupos
- Transiciones suaves

### Partidos

- Visualización moderna de partidos
- Actualización de resultados
- Estados de partidos (pendiente/finalizado)

### Posiciones

- Tabla de clasificación por grupo
- Estadísticas de equipos
- Resaltado del líder

### UX/Diseño

- Tema oscuro elegante
- Animaciones suaves con Framer Motion
- Responsive en mobile, tablet, desktop
- Sidebar colapsable
- Estados de carga con skeletons
- Notificaciones toast
- Validaciones en tiempo real

## 🔧 Configuración Recomendada VS Code

### Extensiones Recomendadas

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter

### Error de CORS

Asegúrate de que tu backend esté configurado con CORS habilitado y que la URL en `.env.local` sea correcta.

### Puerto 5173 en uso

Vite automáticamente usará el próximo puerto disponible.

## 📚 API Endpoints

La aplicación consume los siguientes endpoints:

- `GET /api/equipos` - Obtener todos los equipos
- `POST /api/equipos` - Crear nuevo equipo
- `PUT /api/equipos/:id` - Actualizar equipo
- `DELETE /api/equipos/:id` - Eliminar equipo
- `GET /api/grupos` - Obtener grupos
- `POST /api/sorteo` - Realizar sorteo
- `GET /api/partidos` - Obtener partidos
- `PUT /api/partidos/:id` - Actualizar resultado

## 📝 Notas de Desarrollo

- Los datos se cachean por 5 minutos con React Query
- Las animaciones usan Framer Motion
- Los formularios validan en tiempo real con React Hook Form + Zod
- Los estados de loading muestran skeletons personalizados
- Las notificaciones se muestran con Sonner

## 🚀 Deployment

### Vercel (Recomendado)

1. Push a GitHub
2. Conecta el repo en Vercel
3. Configura `VITE_API_URL` en environment variables
4. Deploy automático en cada push

### Netlify

Similar a Vercel, configura las env vars antes de desplegar.

### Build Estático

```bash
npm run build
# Los archivos compilados estarán en dist/
```

## 📄 Licencia

Proyecto de demostración para prueba técnica.
