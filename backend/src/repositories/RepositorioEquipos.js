import { supabase } from '../config/supabase.js';
import { EquipoDTO } from '../models/EquipoDTO.js';

/**
 * Repositorio para operaciones con equipos
 */
export class RepositorioEquipos {
  /**
   * Crear un equipo
   */
  async crearEquipo(nombre) {
    const { data, error } = await supabase
      .from('equipos')
      .insert([{ nombre }])
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const equipo = data[0];
      return new EquipoDTO(equipo.id, equipo.nombre, equipo.grupo_id, equipo.created_at);
    }

    throw new Error('No se pudo crear el equipo');
  }

  /**
   * Obtener todos los equipos
   */
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map(
      (equipo) => new EquipoDTO(equipo.id, equipo.nombre, equipo.grupo_id, equipo.created_at)
    );
  }

  /**
   * Obtener un equipo por ID
   */
  async obtenerPorId(id) {
    const { data, error } = await supabase.from('equipos').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    if (data) {
      return new EquipoDTO(data.id, data.nombre, data.grupo_id, data.created_at);
    }

    return null;
  }

  /**
   * Obtener equipo por nombre
   */
  async obtenerPorNombre(nombre) {
    const { data, error } = await supabase
      .from('equipos')
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
      return new EquipoDTO(data.id, data.nombre, data.grupo_id, data.created_at);
    }

    return null;
  }

  /**
   * Actualizar equipo
   */
  async actualizar(id, nombre) {
    const { data, error } = await supabase
      .from('equipos')
      .update({ nombre })
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const equipo = data[0];
      return new EquipoDTO(equipo.id, equipo.nombre, equipo.grupo_id, equipo.created_at);
    }

    return null;
  }

  /**
   * Eliminar equipo
   */
  async eliminar(id) {
    const { error } = await supabase.from('equipos').delete().eq('id', id);

    if (error) {
      throw error;
    }
  }

  /**
   * Contar equipos
   */
  async contar() {
    const { count, error } = await supabase
      .from('equipos')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return count || 0;
  }

  /**
   * Obtener equipos sin grupo asignado
   */
  async obtenerSinGrupo() {
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .is('grupo_id', null)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map(
      (equipo) => new EquipoDTO(equipo.id, equipo.nombre, equipo.grupo_id, equipo.created_at)
    );
  }

  /**
   * Obtener equipos por grupo
   */
  async obtenerPorGrupo(grupoId) {
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .eq('grupo_id', grupoId)
      .order('nombre', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map(
      (equipo) => new EquipoDTO(equipo.id, equipo.nombre, equipo.grupo_id, equipo.created_at)
    );
  }

  /**
   * Asignar grupo a equipo
   */
  async asignarGrupo(equipoId, grupoId) {
    const { data, error } = await supabase
      .from('equipos')
      .update({ grupo_id: grupoId })
      .eq('id', equipoId)
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const equipo = data[0];
      return new EquipoDTO(equipo.id, equipo.nombre, equipo.grupo_id, equipo.created_at);
    }

    return null;
  }

  /**
   * Limpiar grupos de todos los equipos
   */
  async limpiarGrupos() {
    const { error } = await supabase
      .from('equipos')
      .update({ grupo_id: null })
      .is('grupo_id', null);

    if (error) {
      throw error;
    }
  }

  /**
   * Verificar si existen partidos para equipos
   */
  async existenPartidosParaEquipos() {
    const { count, error } = await supabase
      .from('partidos')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return count > 0;
  }
}
