/**
 * Estadísticas de un equipo
 */
export class EstadisticasEquipo {
  constructor(equipoId, equipoNombre, pj = 0, pg = 0, pe = 0, pp = 0, gf = 0, gc = 0, pts = 0) {
    this.equipoId = equipoId;
    this.equipoNombre = equipoNombre;
    this.pj = pj; // Partidos jugados
    this.pg = pg; // Partidos ganados
    this.pe = pe; // Partidos empatados
    this.pp = pp; // Partidos perdidos
    this.gf = gf; // Goles a favor
    this.gc = gc; // Goles en contra
    this.dg = gf - gc; // Diferencia de gol
    this.pts = pts; // Puntos
  }
}
