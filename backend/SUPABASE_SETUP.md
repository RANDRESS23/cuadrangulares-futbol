# Configuración de Supabase

Guía paso a paso para configurar la base de datos en Supabase.

## 1. Crear Proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com)
2. Hacer clic en "Start Your Project"
3. Crear una cuenta o ingresar
4. Hacer clic en "New Project"
5. Completar los datos:
   - **Project Name:** `cuadrangulares-futbol`
   - **Database Password:** Guardar en lugar seguro
   - **Region:** Seleccionar la más cercana
6. Hacer clic en "Create new project"
7. Esperar a que se cree (2-3 minutos)

## 2. Obtener Credenciales

1. Ir a **Project Settings** (engranaje inferior izquierda)
2. Ir a **API** en el menú lateral
3. Copiar:
   - **Project URL** → `SUPABASE_URL`
   - **Anon Public** → `SUPABASE_KEY`
   - **Service Role** → `SUPABASE_SERVICE_ROLE_KEY` (guardar en secreto)

## 3. Crear Tablas

1. En Supabase, ir a **SQL Editor**
2. Hacer clic en **New Query**
3. Copiar y ejecutar el contenido de `src/database/init.sql`
4. Hacer clic en **Run**

## 4. Configurar Archivo .env

1. En la carpeta `backend/`, editar o crear `.env`
2. Pegar las credenciales:

```env
PORT=3000
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 5. Verificar Conexión

1. Ejecutar el servidor:
   ```bash
   npm run dev
   ```

2. Si ves en la consola:
   ```
   ✓ Grupos inicializados
   ✓ Servidor ejecutándose en puerto 3000
   ```
   ¡La configuración es exitosa!

## 6. Verificar en Supabase

1. Ir a **Table Editor** en Supabase
2. Ver las tablas creadas:
   - `grupos`
   - `equipos`
   - `partidos`

3. Verificar que `grupos` tiene dos registros:
   - "Grupo A"
   - "Grupo B"

## ⚠️ Seguridad

- Nunca compartir la `SUPABASE_SERVICE_ROLE_KEY`
- Añadir `.env` a `.gitignore` (ya está configurado)
- En producción, usar variables de entorno seguras

## 🔗 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase JavaScript Library](https://supabase.com/docs/reference/javascript)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🆘 Troubleshooting

### Error: "SUPABASE_URL y SUPABASE_KEY son requeridas"

**Solución:** Verificar que `.env` existe y tiene las variables correctas

### Error: "Conexión rechazada"

**Solución:** 
- Verificar las credenciales de Supabase
- Verificar conexión a internet
- Comprobar que las tablas existen en Supabase

### Error: "Tabla no existe"

**Solución:** Ejecutar nuevamente el script `init.sql` en Supabase SQL Editor

### El servidor inicia pero los endpoints no funcionan

**Solución:**
- Verificar que Supabase tiene las tablas correctas
- Revisar los logs en la consola
- Comprobar que las credenciales son correctas
