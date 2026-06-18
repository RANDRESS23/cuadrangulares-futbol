import { RepositorioEquipos } from '../repositories/RepositorioEquipos.js';
import { RepositorioPartidos } from '../repositories/RepositorioPartidos.js';
import { EstadisticasEquipo } from '../models/EstadisticasEquipo.js';
import { GrupoNoEncontradoError } from '../errors/ErroresPersonalizados.js';

const PUNTOS_VICTORIA = 3;
const PUNTOS_EMPATE = 1;
const PUNTOS_DERROTA = 0;

/**
 * Servicio para calcular posiciones y estadísticas
 */
export class ServicioPosiciones {
  constructor() {
    this.repositorioEquipos = new RepositorioEquipos();
    this.repositorioPartidos = new RepositorioPartidos();
  }

  /**
   * Calcular tabla de posiciones de un grupo
   */
  async calcularPosiciones(grupoId) {
    // Obtener equipos del grupo
    const equipos = await this.repositorioEquipos.obtenerPorGrupo(grupoId);

    if (equipos.length === 0) {
      throw new GrupoNoEncontradoError();
    }

    // Obtener partidos del grupo
    const partidos = await this.repositorioPartidos.obtenerPorGrupo(grupoId);

    // Inicializar estadísticas
    const estadisticasMap = {};
    for (const equipo of equipos) {
      estadisticasMap[equipo.id] = new EstadisticasEquipo(equipo.id, equipo.nombre);
    }

    // Procesar cada partido
    for (const partido of partidos) {
      if (partido.jugado) {
        const golesLocal = partido.golesLocal;
        const golesVisitante = partido.golesVisitante;

        // Actualizar estadísticas del equipo local
        const estadisticasLocal = estadisticasMap[partido.equipoLocalId];
        estadisticasLocal.pj++;
        estadisticasLocal.gf += golesLocal;
        estadisticasLocal.gc += golesVisitante;

        // Actualizar estadísticas del equipo visitante
        const estadisticasVisitante = estadisticasMap[partido.equipoVisitanteId];
        estadisticasVisitante.pj++;
        estadisticasVisitante.gf += golesVisitante;
        estadisticasVisitante.gc += golesLocal;

        // Determinar resultado y asignar puntos
        if (golesLocal > golesVisitante) {
          // Victoria local
          estadisticasLocal.pg++;
          estadisticasLocal.pts += PUNTOS_VICTORIA;
          // Derrota visitante
          estadisticasVisitante.pp++;
          estadisticasVisitante.pts += PUNTOS_DERROTA;
        } else if (golesLocal < golesVisitante) {
          // Derrota local
          estadisticasLocal.pp++;
          estadisticasLocal.pts += PUNTOS_DERROTA;
          // Victoria visitante
          estadisticasVisitante.pg++;
          estadisticasVisitante.pts += PUNTOS_VICTORIA;
        } else {
          // Empate
          estadisticasLocal.pe++;
          estadisticasLocal.pts += PUNTOS_EMPATE;
          estadisticasVisitante.pe++;
          estadisticasVisitante.pts += PUNTOS_EMPATE;
        }
      }
    }

    // Convertir a array y ordenar por criterios de desempate
    const posiciones = Object.values(estadisticasMap);
    posiciones.sort((a, b) => this._compararEstadisticas(a, b));

    return posiciones;
  }

  /**
   * Comparar estadísticas para ordenamiento (criterios de desempate)
   * 1. Mayor cantidad de puntos
   * 2. Mejor diferencia de gol
   * 3. Más goles a favor
   */
  _compararEstadisticas(a, b) {
    // 1. Por puntos (descendente)
    if (a.pts !== b.pts) {
      return b.pts - a.pts;
    }

    // 2. Por diferencia de gol (descendente)
    const dgA = a.gf - a.gc;
    const dgB = b.gf - b.gc;
    if (dgA !== dgB) {
      return dgB - dgA;
    }

    // 3. Por goles a favor (descendente)
    return b.gf - a.gf;
  }
}
