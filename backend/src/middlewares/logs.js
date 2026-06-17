import morgan from 'morgan';

/**
 * Configurar morgan para logging de requests
 */
export const configurarLogs = (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
  } else {
    app.use(morgan('dev'));
  }
};
