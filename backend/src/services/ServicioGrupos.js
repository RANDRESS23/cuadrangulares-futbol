import { RepositorioGrupos } from '../repositories/RepositorioGrupos.js';
import { GrupoNoEncontradoError } from '../errors/ErroresPersonalizados.js';

/**
 * Servicio para operaciones con grupos
 */
export class ServicioGrupos {
  constructor() {
    this.repositorio = new RepositorioGrupos();
  }

  /**
   * Inicializar grupos (Grupo A y Grupo B)
   */
  async inicializarGrupos() {
    await this.repositorio.inicializarGrupos();
  }

  /**
   * Obtener todos los grupos
   */
  async obtenerTodos() {
    return await this.repositorio.obtenerTodos();
  }

  /**
   * Obtener grupo por ID
   */
  async obtenerPorId(id) {
    const grupo = await this.repositorio.obtenerPorId(id);
    if (!grupo) {
      throw new GrupoNoEncontradoError();
    }
    return grupo;
  }

  /**
   * Obtener grupo por nombre
   */
  async obtenerPorNombre(nombre) {
    const grupo = await this.repositorio.obtenerPorNombre(nombre);
    if (!grupo) {
      throw new GrupoNoEncontradoError();
    }
    return grupo;
  }
}
