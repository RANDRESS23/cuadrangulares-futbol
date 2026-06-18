import dotenv from 'dotenv';

dotenv.config();

export const config = {
  puerto: process.env.PORT || 3000,
  ambiente: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  esDesarrollo: process.env.NODE_ENV === 'development',
};

export const validarConfig = () => {
  const requeridosPara = {
    todos: ['SUPABASE_URL', 'SUPABASE_KEY'],
  };

  const varRequeridas = requeridosPara.todos;

  const faltantes = varRequeridas.filter((v) => !process.env[v]);

  if (faltantes.length > 0) {
    throw new Error(`Variables de entorno faltantes: ${faltantes.join(', ')}`);
  }
};
