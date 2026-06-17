import { supabase } from '../config/supabase.js';
import { PartidoDTO } from '../models/PartidoDTO.js';

/**
 * Repositorio para operaciones con partidos
 */
export class RepositorioPartidos {
  /**
   * Crear partido
   */
  async crearPartido(grupoId, equipoLocalId, equipoVisitanteId) {
    const { data, error } = await supabase
      .from('partidos')
      .insert([
        {
          grupo_id: grupoId,
          equipo_local_id: equipoLocalId,
          equipo_visitante_id: equipoVisitanteId,
          jugado: false,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return this._mapearDTO(data[0]);
    }

    throw new Error('No se pudo crear el partido');
  }

  /**
   * Obtener todos los partidos
   */
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('partidos')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map((partido) => this._mapearDTO(partido));
  }

  /**
   * Obtener partido por ID
   */
  async obtenerPorId(id) {
    const { data, error } = await supabase.from('partidos').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    if (data) {
      return this._mapearDTO(data);
    }

    return null;
  }

  /**
   * Obtener partidos por grupo
   */
  async obtenerPorGrupo(grupoId) {
    const { data, error } = await supabase
      .from('partidos')
      .select('*')
      .eq('grupo_id', grupoId)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map((partido) => this._mapearDTO(partido));
  }

  /**
   * Actualizar marcador del partido
   */
  async actualizarMarcador(id, golesLocal, golesVisitante) {
    const { data, error } = await supabase
      .from('partidos')
      .update({
        goles_local: golesLocal,
        goles_visitante: golesVisitante,
        jugado: true,
      })
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return this._mapearDTO(data[0]);
    }

    return null;
  }

  /**
   * Contar partidos
   */
  async contar() {
    const { count, error } = await supabase
      .from('partidos')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return count || 0;
  }

  /**
   * Eliminar todos los partidos
   */
  async eliminarTodos() {
    const { error } = await supabase.from('partidos').delete().neq('id', 'null');

    if (error) {
      throw error;
    }
  }

  /**
   * Obtener partidos de un equipo en un grupo
   */
  async obtenerPartidosEquipoGrupo(equipoId, grupoId) {
    const { data, error } = await supabase
      .from('partidos')
      .select('*')
      .eq('grupo_id', grupoId)
      .or(`equipo_local_id.eq.${equipoId},equipo_visitante_id.eq.${equipoId}`)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data || []).map((partido) => this._mapearDTO(partido));
  }

  /**
   * Mapear datos de BD a DTO
   */
  _mapearDTO(datos) {
    return new PartidoDTO(
      datos.id,
      datos.grupo_id,
      datos.equipo_local_id,
      datos.equipo_visitante_id,
      datos.goles_local,
      datos.goles_visitante,
      datos.jugado,
      datos.created_at
    );
  }
}
