import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { configurarLogs } from './middlewares/logs.js';
import { manejarErrores, middleware404 } from './middlewares/manejo-errores.js';
import { configurarSwagger } from './docs/swagger.js';

// Importar rutas
import rutasEquipos from './routes/rutasEquipos.js';
import rutasSorteo from './routes/rutasSorteo.js';
import rutasGrupos from './routes/rutasGrupos.js';
import rutasPartidos from './routes/rutasPartidos.js';

// Crear aplicación Express
const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());

// Middlewares de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logs
configurarLogs(app);

// Documentación Swagger
configurarSwagger(app);

// Rutas de salud
app.get('/health', (req, res) => {
  res.json({ estado: 'ok', timestamp: new Date().toISOString() });
});

// Rutas de API
app.use('/api/equipos', rutasEquipos);
app.use('/api/sorteo', rutasSorteo);
app.use('/api/grupos', rutasGrupos);
app.use('/api/partidos', rutasPartidos);

// Middleware 404
app.use(middleware404);

// Middleware de manejo de errores (debe ser el último)
app.use(manejarErrores);

export default app;
