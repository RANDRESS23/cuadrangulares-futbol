import { RepositorioPartidos } from '../repositories/RepositorioPartidos.js';
import { RepositorioEquipos } from '../repositories/RepositorioEquipos.js';
import { PartidoNoEncontradoError } from '../errors/ErroresPersonalizados.js';

/**
 * Servicio para operaciones con partidos
 */
export class ServicioPartidos {
  constructor() {
    this.repositorioPartidos = new RepositorioPartidos();
    this.repositorioEquipos = new RepositorioEquipos();
  }

  /**
   * Obtener todos los partidos
   */
  async obtenerTodos() {
    return await this.repositorioPartidos.obtenerTodos();
  }

  /**
   * Obtener partido por ID
   */
  async obtenerPorId(id) {
    const partido = await this.repositorioPartidos.obtenerPorId(id);
    if (!partido) {
      throw new PartidoNoEncontradoError();
    }
    return partido;
  }

  /**
   * Obtener partidos por grupo
   */
  async obtenerPorGrupo(grupoId) {
    return await this.repositorioPartidos.obtenerPorGrupo(grupoId);
  }

  /**
   * Generar fixture (partidos) para un grupo
   */
  async generarFixture(grupoId, equiposDelGrupo) {
    const partidos = [];

    // Todos contra todos: combinaciones de 2 equipos
    for (let i = 0; i < equiposDelGrupo.length; i++) {
      for (let j = i + 1; j < equiposDelGrupo.length; j++) {
        const equipoLocal = equiposDelGrupo[i];
        const equipoVisitante = equiposDelGrupo[j];

        // Crear dos partidos: uno con cada equipo como local
        const partido1 = await this.repositorioPartidos.crearPartido(
          grupoId,
          equipoLocal.id,
          equipoVisitante.id
        );
        partidos.push(partido1);

        const partido2 = await this.repositorioPartidos.crearPartido(
          grupoId,
          equipoVisitante.id,
          equipoLocal.id
        );
        partidos.push(partido2);
      }
    }

    return partidos;
  }

  /**
   * Actualizar marcador de un partido
   */
  async actualizarMarcador(id, golesLocal, golesVisitante) {
    const partido = await this.repositorioPartidos.obtenerPorId(id);
    if (!partido) {
      throw new PartidoNoEncontradoError();
    }

    return await this.repositorioPartidos.actualizarMarcador(
      id,
      golesLocal,
      golesVisitante
    );
  }

  /**
   * Contar partidos totales
   */
  async contar() {
    return await this.repositorioPartidos.contar();
  }

  /**
   * Eliminar todos los partidos
   */
  async eliminarTodos() {
    await this.repositorioPartidos.eliminarTodos();
  }
}
