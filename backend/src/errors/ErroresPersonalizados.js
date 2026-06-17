/**
 * Error personalizado base
 */
export class ErrorPersonalizado extends Error {
  constructor(mensaje, codigoEstado = 500) {
    super(mensaje);
    this.nombre = this.constructor.name;
    this.codigoEstado = codigoEstado;
  }
}

/**
 * Error cuando no se encuentra un equipo
 */
export class EquipoNoEncontradoError extends ErrorPersonalizado {
  constructor(mensaje = 'Equipo no encontrado') {
    super(mensaje, 404);
  }
}

/**
 * Error cuando no se encuentra un grupo
 */
export class GrupoNoEncontradoError extends ErrorPersonalizado {
  constructor(mensaje = 'Grupo no encontrado') {
    super(mensaje, 404);
  }
}

/**
 * Error cuando no se encuentra un partido
 */
export class PartidoNoEncontradoError extends ErrorPersonalizado {
  constructor(mensaje = 'Partido no encontrado') {
    super(mensaje, 404);
  }
}

/**
 * Error cuando se excede el límite de equipos
 */
export class LimiteEquiposError extends ErrorPersonalizado {
  constructor(mensaje = 'No se pueden registrar más de 8 equipos') {
    super(mensaje, 400);
  }
}

/**
 * Error cuando ya se ha realizado el sorteo
 */
export class SorteoYaRealizadoError extends ErrorPersonalizado {
  constructor(mensaje = 'El sorteo ya ha sido realizado. No se puede volver a sortear.') {
    super(mensaje, 400);
  }
}

/**
 * Error cuando hay duplicación de nombres
 */
export class NombreDuplicadoError extends ErrorPersonalizado {
  constructor(mensaje = 'Ya existe un equipo con este nombre') {
    super(mensaje, 400);
  }
}

/**
 * Error de validación
 */
export class ErrorValidacion extends ErrorPersonalizado {
  constructor(mensaje = 'Error de validación', errores = []) {
    super(mensaje, 400);
    this.errores = errores;
  }
}

/**
 * Error cuando no hay suficientes equipos
 */
export class InsuficientesEquiposError extends ErrorPersonalizado {
  constructor(mensaje = 'Se requieren exactamente 8 equipos para realizar el sorteo') {
    super(mensaje, 400);
  }
}

/**
 * Error de ID inválido
 */
export class IdInvalidoError extends ErrorPersonalizado {
  constructor(mensaje = 'ID inválido o no es un UUID válido') {
    super(mensaje, 400);
  }
}
