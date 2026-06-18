import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useGrupos } from "../hooks/useGrupos";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useEquipos } from "../hooks/useEquipos";
import { useMemo } from "react";
import { usePartidos } from "../hooks/usePartidos";

export default function Posiciones() {
  const { data: grupos = [], isLoading } = useGrupos();
  const { data: equipos = [] } = useEquipos();
  const { data: partidos = [] } = usePartidos();

  const gruposFinales = useMemo(() => {
    return grupos.map((grupo) => {
      const equiposDelGrupo = equipos
        .filter((equipo) => equipo.grupoId === grupo.id)
        .map((equipo) => {
          const partidosEquipo = partidos.filter(
            (partido) =>
              partido.equipoLocalId === equipo.id ||
              partido.equipoVisitanteId === equipo.id,
          );
          const partidosGanados = partidosEquipo.filter(
            (partido) =>
              partido.golesLocal !== null &&
              partido.golesVisitante !== null &&
              ((partido.equipoLocalId === equipo.id &&
                partido.golesLocal > partido.golesVisitante) ||
                (partido.equipoVisitanteId === equipo.id &&
                  partido.golesVisitante > partido.golesLocal)),
          ).length;
          const partidosEmpatados = partidosEquipo.filter(
            (partido) =>
              partido.golesLocal !== null &&
              partido.golesVisitante !== null &&
              partido.golesLocal === partido.golesVisitante,
          ).length;

          return {
            ...equipo,
            partidosJugados: partidosEquipo.length,
            partidosGanados,
            partidosPerdidos: partidosEquipo.filter(
              (partido) =>
                partido.golesLocal !== null &&
                partido.golesVisitante !== null &&
                ((partido.equipoLocalId === equipo.id &&
                  partido.golesLocal < partido.golesVisitante) ||
                  (partido.equipoVisitanteId === equipo.id &&
                    partido.golesVisitante < partido.golesLocal)),
            ).length,
            partidosEmpatados,
            golesFavor: partidosEquipo.reduce((total, partido) => {
              if (partido.equipoLocalId === equipo.id) {
                return total + (partido.golesLocal || 0);
              }
              if (partido.equipoVisitanteId === equipo.id) {
                return total + (partido.golesVisitante || 0);
              }
              return total;
            }, 0),
            golesContra: partidosEquipo.reduce((total, partido) => {
              if (partido.equipoLocalId === equipo.id) {
                return total + (partido.golesVisitante || 0);
              }
              if (partido.equipoVisitanteId === equipo.id) {
                return total + (partido.golesLocal || 0);
              }
              return total;
            }, 0),
            puntos: partidosGanados * 3 + partidosEmpatados,
          };
        })
        .sort((a, b) => {
          if (b.puntos === a.puntos) {
            if (b.golesFavor === a.golesContra) {
              return b.partidosJugados - a.partidosJugados;
            }
            return b.golesFavor - a.golesContra;
          }
          return b.puntos - a.puntos;
        });

      return {
        ...grupo,
        equipos: equiposDelGrupo,
      };
    });
  }, [grupos, equipos, partidos]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {gruposFinales.map((grupo, grupoIndex) => (
        <motion.div key={grupo.id} variants={rowVariants}>
          <Card>
            <CardHeader>
              <CardTitle
                className={
                  grupoIndex === 0 ? "text-emerald-400" : "text-cyan-400"
                }
              >
                {grupo.nombre}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="px-4 py-3 text-center text-zinc-400">
                        Pos
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        Equipo
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        PJ
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        PG
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        PE
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        PP
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        GF
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        GC
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        DG
                      </th>
                      <th className="px-4 py-3 text-center text-zinc-400">
                        PTS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.equipos && grupo.equipos.length > 0 ? (
                      grupo.equipos.map((equipo, index) => (
                        <motion.tr
                          key={equipo.id}
                          variants={rowVariants}
                          className="border-b transition-colors border-zinc-800 hover:bg-zinc-800/30"
                        >
                          <td className="px-4 py-4">
                            <div className="flex justify-center items-center">
                              {index === 0 && (
                                <Trophy size={18} className="text-yellow-500" />
                              )}
                              {index !== 0 && (
                                <span className="font-bold text-white">
                                  {index + 1}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-medium text-white">
                              {equipo.nombre}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.partidosJugados}
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.partidosGanados}
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.partidosEmpatados}
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.partidosPerdidos}
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.golesFavor}
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.golesContra}
                          </td>
                          <td className="px-4 py-4 text-center text-zinc-300">
                            {equipo.golesFavor - equipo.golesContra}
                          </td>
                          <td className="px-4 py-4 font-bold text-center text-white">
                            {equipo.partidosGanados * 3 +
                              equipo.partidosEmpatados}
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={10}
                          className="py-8 text-center text-zinc-400"
                        >
                          No hay equipos en este grupo
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
