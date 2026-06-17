/**
 * Partido DTO
 */
export class PartidoDTO {
  constructor(id, grupoId, equipoLocalId, equipoVisitanteId, golesLocal = null,
    golesVisitante = null, jugado = false, creadoEn = null) {
    this.id = id;
    this.grupoId = grupoId;
    this.equipoLocalId = equipoLocalId;
    this.equipoVisitanteId = equipoVisitanteId;
    this.golesLocal = golesLocal;
    this.golesVisitante = golesVisitante;
    this.jugado = jugado;
    this.creadoEn = creadoEn;
  }
}
