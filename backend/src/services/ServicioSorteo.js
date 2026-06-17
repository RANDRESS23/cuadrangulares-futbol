import { RepositorioEquipos } from '../repositories/RepositorioEquipos.js';
import { RepositorioGrupos } from '../repositories/RepositorioGrupos.js';
import { RepositorioPartidos } from '../repositories/RepositorioPartidos.js';
import {
  InsuficientesEquiposError,
  SorteoYaRealizadoError,
} from '../errors/ErroresPersonalizados.js';
import { ServicioPartidos } from './ServicioPartidos.js';

/**
 * Servicio para operaciones de sorteo
 */
export class ServicioSorteo {
  constructor() {
    this.repositorioEquipos = new RepositorioEquipos();
    this.repositorioGrupos = new RepositorioGrupos();
    this.repositorioPartidos = new RepositorioPartidos();
    this.servicioPartidos = new ServicioPartidos();
  }

  /**
   * Realizar sorteo automático
   * Mezcla 8 equipos aleatoriamente y asigna 4 al Grupo A y 4 al Grupo B
   */
  async realizarSorteo() {
    // Verificar que existan exactamente 8 equipos
    const cantidadEquipos = await this.repositorioEquipos.contar();
    if (cantidadEquipos !== 8) {
      throw new InsuficientesEquiposError();
    }

    // Verificar que no existan partidos generados
    const cantidadPartidos = await this.repositorioPartidos.contar();
    if (cantidadPartidos > 0) {
      throw new SorteoYaRealizadoError();
    }

    // Obtener todos los equipos
    const equipos = await this.repositorioEquipos.obtenerTodos();

    // Mezclar aleatoriamente los equipos (Fisher-Yates shuffle)
    const equiposMezclados = this._mezclarEquipos([...equipos]);

    // Obtener los grupos
    const grupoA = await this.repositorioGrupos.obtenerPorNombre('Grupo A');
    const grupoB = await this.repositorioGrupos.obtenerPorNombre('Grupo B');

    if (!grupoA || !grupoB) {
      throw new Error('Los grupos no han sido inicializados');
    }

    // Asignar 4 equipos a cada grupo
    const equiposGrupoA = equiposMezclados.slice(0, 4);
    const equiposGrupoB = equiposMezclados.slice(4, 8);

    // Actualizar equipos con sus grupos
    for (const equipo of equiposGrupoA) {
      await this.repositorioEquipos.asignarGrupo(equipo.id, grupoA.id);
    }

    for (const equipo of equiposGrupoB) {
      await this.repositorioEquipos.asignarGrupo(equipo.id, grupoB.id);
    }

    // Generar fixture para Grupo A
    await this.servicioPartidos.generarFixture(grupoA.id, equiposGrupoA);

    // Generar fixture para Grupo B
    await this.servicioPartidos.generarFixture(grupoB.id, equiposGrupoB);

    return {
      grupoA: {
        id: grupoA.id,
        nombre: grupoA.nombre,
        equipos: equiposGrupoA,
      },
      grupoB: {
        id: grupoB.id,
        nombre: grupoB.nombre,
        equipos: equiposGrupoB,
      },
    };
  }

  /**
   * Mezclar equipos usando algoritmo Fisher-Yates
   */
  _mezclarEquipos(equipos) {
    for (let i = equipos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [equipos[i], equipos[j]] = [equipos[j], equipos[i]];
    }
    return equipos;
  }
}
