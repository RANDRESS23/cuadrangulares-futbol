import app from './app.js';
import { config, validarConfig } from './config/config.js';
import { ServicioGrupos } from './services/ServicioGrupos.js';

// Validar variables de entorno
try {
  validarConfig();
} catch (error) {
  console.error('Error de configuración:', error.message);
  process.exit(1);
}

const PORT = config.puerto;

// Función para inicializar la aplicación
const inicializarApp = async () => {
  try {
    // Inicializar grupos
    const servicioGrupos = new ServicioGrupos();
    await servicioGrupos.inicializarGrupos();
    console.log('✓ Grupos inicializados');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`
    ╔════════════════════════════════════════════════════════════╗
    ║     API de Torneos de Fútbol - Cuadrangulares              ║
    ║                    v1.0.0                                  ║
    ╚════════════════════════════════════════════════════════════╝
    `);
      console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
      console.log(`✓ Ambiente: ${config.ambiente}`);
      console.log(`✓ API disponible en: http://localhost:${PORT}/api`);
      console.log(`✓ Documentación en: http://localhost:${PORT}/api/docs`);
      console.log('');
    });
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Manejar errores no capturados
process.on('unhandledRejection', (reason) => {
  console.error('Promesa rechazada no manejada:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});

// Iniciar aplicación
inicializarApp();
