import { supabase } from '../config/supabase.js';
import { GrupoDTO } from '../models/GrupoDTO.js';

/**
 * Repositorio para operaciones con grupos
 */
export class RepositorioGrupos {
  /**
   * Obtener todos los grupos
   */
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('grupos')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map((grupo) => new GrupoDTO(grupo.id, grupo.nombre));
  }

  /**
   * Obtener grupo por ID
   */
  async obtenerPorId(id) {
    const { data, error } = await supabase.from('grupos').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    if (data) {
      return new GrupoDTO(data.id, data.nombre);
    }

    return null;
  }

  /**
   * Obtener grupo por nombre
   */
  async obtenerPorNombre(nombre) {
    const { data, error } = await supabase
      .from('grupos')
      .select('*')
      .eq('nombre', nombre)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    if (data) {
      return new GrupoDTO(data.id, data.nombre);
    }

    return null;
  }

  /**
   * Crear grupo
   */
  async crearGrupo(nombre) {
    const { data, error } = await supabase
      .from('grupos')
      .insert([{ nombre }])
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return new GrupoDTO(data[0].id, data[0].nombre);
    }

    throw new Error('No se pudo crear el grupo');
  }

  /**
   * Inicializar grupos (Grupo A y Grupo B)
   */
  async inicializarGrupos() {
    // Verificar si ya existen
    const grupoA = await this.obtenerPorNombre('Grupo A');
    const grupoB = await this.obtenerPorNombre('Grupo B');

    if (!grupoA) {
      await this.crearGrupo('Grupo A');
    }

    if (!grupoB) {
      await this.crearGrupo('Grupo B');
    }
  }
}
