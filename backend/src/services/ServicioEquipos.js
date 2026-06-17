import { RepositorioEquipos } from '../repositories/RepositorioEquipos.js';
import {
  EquipoNoEncontradoError,
  LimiteEquiposError,
  NombreDuplicadoError,
} from '../errors/ErroresPersonalizados.js';

/**
 * Servicio para operaciones con equipos
 */
export class ServicioEquipos {
  constructor() {
    this.repositorio = new RepositorioEquipos();
  }

  /**
   * Crear un nuevo equipo
   */
  async crearEquipo(nombre) {
    // Validar cantidad de equipos
    const cantidad = await this.repositorio.contar();
    if (cantidad >= 8) {
      throw new LimiteEquiposError();
    }

    // Validar nombre duplicado
    const existente = await this.repositorio.obtenerPorNombre(nombre);
    if (existente) {
      throw new NombreDuplicadoError();
    }

    return await this.repositorio.crearEquipo(nombre);
  }

  /**
   * Obtener todos los equipos
   */
  async obtenerTodos() {
    return await this.repositorio.obtenerTodos();
  }

  /**
   * Obtener equipo por ID
   */
  async obtenerPorId(id) {
    const equipo = await this.repositorio.obtenerPorId(id);
    if (!equipo) {
      throw new EquipoNoEncontradoError();
    }
    return equipo;
  }

  /**
   * Actualizar equipo
   */
  async actualizarEquipo(id, nombre) {
    // Verificar que existe
    const equipo = await this.repositorio.obtenerPorId(id);
    if (!equipo) {
      throw new EquipoNoEncontradoError();
    }

    // Validar nombre duplicado (excluyendo el equipo actual)
    const existente = await this.repositorio.obtenerPorNombre(nombre);
    if (existente && existente.id !== id) {
      throw new NombreDuplicadoError();
    }

    return await this.repositorio.actualizar(id, nombre);
  }

  /**
   * Eliminar equipo
   */
  async eliminarEquipo(id) {
    const equipo = await this.repositorio.obtenerPorId(id);
    if (!equipo) {
      throw new EquipoNoEncontradoError();
    }

    await this.repositorio.eliminar(id);
  }
}
