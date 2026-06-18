import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEquipos, useCrearEquipo, useActualizarEquipo, useEliminarEquipo } from '../hooks/useEquipos';
import { crearEquipoSchema } from '../schemas/equipoSchema';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog } from '../components/ui/Dialog';
import { SkeletonCard } from '../components/ui/Skeleton';
import { useGrupos } from '../hooks/useGrupos';
import { handleConfetti } from '../utils/confetti';

interface EquipoFormData {
  nombre: string;
}

export default function Equipos() {
  const { data: equipos = [], isLoading } = useEquipos();
  const { data: grupos = [] } = useGrupos();
  const crearEquipo = useCrearEquipo();
  const actualizarEquipo = useActualizarEquipo();
  const eliminarEquipo = useEliminarEquipo();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EquipoFormData>({
    resolver: zodResolver(crearEquipoSchema),
  });

  const equiposFinales = useMemo(() => { 
    return equipos.map((equipo) => {
      const grupo = grupos.find((g) => g.id === equipo.grupoId);

      return {
        ...equipo,
        grupo: grupo ? grupo.nombre : undefined, 
      }})
  }, [equipos, grupos])

  const filteredEquipos = equiposFinales.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOpenDialog = (id?: string) => {
    if (id) {
      setEditingId(id);
      const equipo = equiposFinales.find((e) => e.id === id);
      if (equipo) {
        reset({ nombre: equipo.nombre });
      }
    } else {
      setEditingId(null);
      reset({ nombre: '' });
    }
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setEditingId(null);
    reset({ nombre: '' });
  };

  const onSubmit = async (data: EquipoFormData) => {
    try {
      if (editingId) {
        await actualizarEquipo.mutateAsync({ id: editingId, input: data });
      } else {
        await crearEquipo.mutateAsync(data);
      }
      handleConfetti();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al procesar el equipo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      try {
        await eliminarEquipo.mutateAsync(id);
      } catch (error) {
        console.error('Error al eliminar el equipo:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header con búsqueda y botón */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <Input
            placeholder="Buscar equipo..."
            icon={<Search size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Equipo
        </Button>
      </div>

      {/* Grid de equipos */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredEquipos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center py-12"
        >
          <div className="text-4xl mb-4">⚽</div>
          <p className="text-zinc-400">No hay equipos registrados</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => handleOpenDialog()}
          >
            Crear primer equipo
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipos.map((equipo, index) => (
            <motion.div
              key={equipo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{equipo.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-zinc-400">
                    {equipo.grupo ? (
                      <p className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full inline-block">
                        {equipo.grupo}
                      </p>
                    ) : (
                      <p className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full inline-block">
                        Sin grupo asignado
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Edit2 size={16} />}
                    onClick={() => handleOpenDialog(equipo.id)}
                    className="w-full"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 size={16} />}
                    onClick={() => handleDelete(equipo.id)}
                    className="w-full"
                  >
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dialog para crear/editar */}
      <Dialog
        isOpen={isOpenDialog}
        onClose={handleCloseDialog}
        title={editingId ? 'Editar Equipo' : 'Nuevo Equipo'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nombre del Equipo"
            placeholder="Ej: Real Madrid"
            {...register('nombre')}
            error={errors.nombre?.message}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={crearEquipo.isPending || actualizarEquipo.isPending}
              className="w-full"
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseDialog}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Dialog>
    </motion.div>
  );
}
