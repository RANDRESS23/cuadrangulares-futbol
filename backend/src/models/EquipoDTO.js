/**
 * Equipo DTO
 */
export class EquipoDTO {
  constructor(id, nombre, grupoId = null, creadoEn = null) {
    this.id = id;
    this.nombre = nombre;
    this.grupoId = grupoId;
    this.creadoEn = creadoEn;
  }
}
