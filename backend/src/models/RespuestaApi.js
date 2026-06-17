/**
 * Respuesta estándar de API
 * @template T El tipo de datos en la respuesta
 */
export class RespuestaApi {
  constructor(exito, mensaje, datos = null) {
    this.exito = exito;
    this.mensaje = mensaje;
    if (datos !== undefined && datos !== null) {
      this.datos = datos;
    }
  }

  static exito(mensaje, datos = null) {
    return new RespuestaApi(true, mensaje, datos);
  }

  static error(mensaje) {
    return new RespuestaApi(false, mensaje);
  }
}
