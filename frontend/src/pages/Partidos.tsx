import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePartidos, useActualizarResultado } from "../hooks/usePartidos";
import {
  actualizarResultadoSchema,
  type ActualizarResultadoFormData,
} from "../schemas/partidoSchema";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Dialog } from "../components/ui/Dialog";
import { Badge } from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useEquipos } from "../hooks/useEquipos";
import { useGrupos } from "../hooks/useGrupos";
import { handleConfetti } from "../utils/confetti";

export default function Partidos() {
  const { data: partidos = [], isLoading } = usePartidos();
  const { data: equipos = [] } = useEquipos();
  const { data: grupos = [] } = useGrupos();
  const actualizarResultado = useActualizarResultado();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedPartidoId, setSelectedPartidoId] = useState<string | null>(
    null,
  );

  const partidosFinales = useMemo(() => {
    return partidos.map((partido) => {
      const equipoLocal = equipos.find((e) => e.id === partido.equipoLocalId);
      const equipoVisitante = equipos.find(
        (e) => e.id === partido.equipoVisitanteId,
      );
      const grupo = grupos.find((g) => g.id === equipoLocal?.grupoId);

      return {
        ...partido,
        equipoLocal: {
          id: equipoLocal?.id || partido.equipoLocalId,
          nombre: equipoLocal?.nombre || "Equipo Local",
        },
        equipoVisitante: {
          id: equipoVisitante?.id || partido.equipoVisitanteId,
          nombre: equipoVisitante?.nombre || "Equipo Visitante",
        },
        grupo,
      };
    });
  }, [partidos, equipos, grupos]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActualizarResultadoFormData>({
    resolver: zodResolver(actualizarResultadoSchema),
  });

  const handleOpenDialog = (partidoId: string) => {
    setSelectedPartidoId(partidoId);
    const partido = partidosFinales.find((p) => p.id === partidoId);
    if (partido) {
      reset({
        golesLocal: partido.golesLocal ?? 0,
        golesVisitante: partido.golesVisitante ?? 0,
      });
    }
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setSelectedPartidoId(null);
    reset({ golesLocal: 0, golesVisitante: 0 });
  };

  const onSubmit = async (data: ActualizarResultadoFormData) => {
    if (!selectedPartidoId) return;
    try {
      await actualizarResultado.mutateAsync({
        id: selectedPartidoId,
        input: {
          golesLocal: data.golesLocal,
          golesVisitante: data.golesVisitante,
        },
      });
      handleConfetti();
      handleCloseDialog();
    } catch (error) {
      console.error("Error al actualizar el resultado:", error);
    }
  };

  const getStatusBadge = (
    golesLocal: number | null,
    golesVisitante: number | null,
  ) => {
    if (golesLocal === null || golesVisitante === null) {
      return <Badge variant="warning">Pendiente</Badge>;
    }
    return <Badge variant="success">Finalizado</Badge>;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {partidosFinales.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center card"
        >
          <p className="text-zinc-400">No hay partidos generados</p>
        </motion.div>
      ) : (
        partidosFinales.map((partido, index) => (
          <motion.div
            key={partido.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="hidden relative justify-between items-center py-6 md:flex">
                {/* Equipo Local */}
                <div className="flex-1 pr-6 text-right">
                  <p className="text-lg font-bold text-white">
                    {partido.equipoLocal.nombre}
                  </p>
                  <p className="text-sm text-zinc-400">Local</p>
                </div>

                <div
                  className={
                    partido.grupo?.nombre === "Grupo A"
                      ? "text-emerald-400 absolute top-0 left-0 font-semibold text-sm"
                      : "text-cyan-400 absolute top-0 left-0 font-semibold text-sm"
                  }
                >
                  {partido.grupo?.nombre}
                </div>

                {/* Marcador */}
                <div className="flex gap-4 justify-center items-center px-6 py-4 rounded-lg bg-zinc-800 min-w-32">
                  <span className="text-3xl font-bold text-white">
                    {partido.golesLocal ?? "-"}
                  </span>
                  <span className="text-zinc-500">vs</span>
                  <span className="text-3xl font-bold text-white">
                    {partido.golesVisitante ?? "-"}
                  </span>
                </div>

                {/* Equipo Visitante */}
                <div className="flex-1 pl-6 text-left">
                  <p className="text-lg font-bold text-white">
                    {partido.equipoVisitante.nombre}
                  </p>
                  <p className="text-sm text-zinc-400">Visitante</p>
                </div>

                {/* Estado y Acción */}
                <div className="flex gap-4 items-center ml-6">
                  {getStatusBadge(partido.golesLocal, partido.golesVisitante)}
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Edit2 size={16} />}
                    onClick={() => handleOpenDialog(partido.id)}
                  >
                    Actualizar
                  </Button>
                </div>
              </CardContent>

              <CardContent className="flex relative flex-col gap-y-4 justify-between items-center pt-7 pb-3 md:hidden">
                <div className="flex justify-between items-center">
                  {/* Equipo Local */}
                  <div className="flex-1 pr-6 text-right">
                    <p className="text-lg font-bold text-white">
                      {partido.equipoLocal.nombre}
                    </p>
                    <p className="text-sm text-zinc-400">Local</p>
                  </div>

                  {/* Equipo Visitante */}
                  <div className="flex-1 pl-6 text-left">
                    <p className="text-lg font-bold text-white">
                      {partido.equipoVisitante.nombre}
                    </p>
                    <p className="text-sm text-zinc-400">Visitante</p>
                  </div>
                </div>

                <div
                  className={
                    partido.grupo?.nombre === "Grupo A"
                      ? "text-emerald-400 absolute top-0 left-0 font-semibold text-sm"
                      : "text-cyan-400 absolute top-0 left-0 font-semibold text-sm"
                  }
                >
                  {partido.grupo?.nombre}
                </div>

                {/* Marcador */}
                <div className="flex gap-4 justify-center items-center px-6 py-4 rounded-lg bg-zinc-800 min-w-32">
                  <span className="text-3xl font-bold text-white">
                    {partido.golesLocal ?? "-"}
                  </span>
                  <span className="text-zinc-500">vs</span>
                  <span className="text-3xl font-bold text-white">
                    {partido.golesVisitante ?? "-"}
                  </span>
                </div>

                {getStatusBadge(partido.golesLocal, partido.golesVisitante)}

                {/* Estado y Acción */}
                <div className="flex gap-4 items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Edit2 size={16} />}
                    onClick={() => handleOpenDialog(partido.id)}
                    className="w-full"
                  >
                    Actualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}

      {/* Dialog para actualizar resultado */}
      <Dialog
        isOpen={isOpenDialog}
        onClose={handleCloseDialog}
        title="Actualizar Resultado"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Goles Local"
            type="number"
            min="0"
            max="99"
            {...register("golesLocal", { valueAsNumber: true })}
            error={errors.golesLocal?.message}
          />
          <Input
            label="Goles Visitante"
            type="number"
            min="0"
            max="99"
            {...register("golesVisitante", { valueAsNumber: true })}
            error={errors.golesVisitante?.message}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={actualizarResultado.isPending}
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseDialog}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Dialog>
    </motion.div>
  );
}
