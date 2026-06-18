# Documentación Técnica Detallada

Guía técnica profunda de la arquitectura y patrones utilizados.

## Arquitectura de Capas

### 1. Controllers (Controladores)

**Responsabilidades:**

- Recibir HTTP requests
- Delegar lógica al Service
- Retornar HTTP responses

**Ubicación:** `src/controllers/`

**Patrón:**

```javascript
// Solo manejo de HTTP
static async crear(req, res, next) {
  try {
    const resultado = await servicio.crearEquipo(req.body.nombre);
    res.status(201).json(RespuestaApi.exito('...', resultado));
  } catch (error) {
    next(error); // Delegar al middleware de errores
  }
}
```

### 2. Services (Servicios)

**Responsabilidades:**

- Lógica de negocio
- Validaciones complejas
- Orquestación de operaciones
- No interactúan directamente con HTTP

**Ubicación:** `src/services/`

**Patrón:**

```javascript
async crearEquipo(nombre) {
  // Validaciones de negocio
  const cantidad = await this.repositorio.contar();
  if (cantidad >= 8) throw new LimiteEquiposError();

  // Lógica de negocio
  const existente = await this.repositorio.obtenerPorNombre(nombre);
  if (existente) throw new NombreDuplicadoError();

  // Delegar acceso a datos
  return await this.repositorio.crearEquipo(nombre);
}
```

### 3. Repositories (Repositorios)

**Responsabilidades:**

- Acceso exclusivo a BD
- Mapeo de datos a DTOs
- Consultas a Supabase
- Manejo de errores de BD

**Ubicación:** `src/repositories/`

**Patrón:**

```javascript
async crearEquipo(nombre) {
  const { data, error } = await supabase
    .from('equipos')
    .insert([{ nombre }])
    .select();

  if (error) throw error;

  // Mapear a DTO
  return new EquipoDTO(data[0].id, data[0].nombre, ...);
}
```

### 4. Models (Modelos)

**Responsabilidades:**

- Definir DTOs (Data Transfer Objects)
- Estructuras de datos
- Validación de tipos

**Ubicación:** `src/models/`

**Ejemplo DTO:**

```javascript
export class EquipoDTO {
  constructor(id, nombre, grupoId = null, creadoEn = null) {
    this.id = id;
    this.nombre = nombre;
    this.grupoId = grupoId;
    this.creadoEn = creadoEn;
  }
}
```

## Patrones de Diseño Utilizados

### 1. Repository Pattern

**Propósito:** Abstraer el acceso a datos

**Ventajas:**

- Fácil de testear (mockear repos)
- Cambiar BD sin afectar lógica
- Centralizar queries

### 2. Service Layer Pattern

**Propósito:** Centralizar lógica de negocio

**Ventajas:**

- Reutilizable en distintos controladores
- Testeable independientemente
- Fácil mantenimiento

### 3. DTO Pattern

**Propósito:** Transferir datos entre capas

**Ventajas:**

- Desacoplar modelos de BD de API
- Control de qué datos se exponen
- Tipo seguro

## Flujo de una Request

```
HTTP Request
    ↓
Router (rutasEquipos.js)
    ↓
Validators (validadores.js)
    ↓
Controller (ControladorEquipos)
    ↓
Service (ServicioEquipos)
    ↓
Repository (RepositorioEquipos)
    ↓
Supabase API
    ↓
Service (procesa resultado)
    ↓
Controller (formatea respuesta)
    ↓
HTTP Response
```

## Manejo de Errores

### Jerarquía de Errores

```
Error
  └─ ErrorPersonalizado (código HTTP)
      ├─ EquipoNoEncontradoError (404)
      ├─ LimiteEquiposError (400)
      ├─ SorteoYaRealizadoError (400)
      └─ ...
```

### Propagación de Errores

1. **Repository** → Lanza error de Supabase o personalizado
2. **Service** → Captura y lanza ErrorPersonalizado
3. **Controller** → Captura y delega a middleware (next(error))
4. **Middleware** → Retorna respuesta HTTP normalizada
