import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, Play } from "lucide-react";
import { useRealizarSorteo } from "../hooks/useSorteo";
import { useGrupos } from "../hooks/useGrupos";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingDots } from "../components/ui/Loading";
import { useEquipos } from "../hooks/useEquipos";
import { handleConfetti } from "../utils/confetti";

export default function Sorteo() {
  const { data: grupos = [] } = useGrupos();
  const { data: equipos = [] } = useEquipos();
  const realizarSorteo = useRealizarSorteo();
  const [isAnimating, setIsAnimating] = useState(false);

  const gruposFinales = useMemo(() => {
    return grupos.map((grupo) => {
      const equiposDelGrupo = equipos.filter(
        (equipo) => equipo.grupoId === grupo.id,
      );

      return {
        ...grupo,
        equipos: equiposDelGrupo,
      };
    });
  }, [grupos, equipos]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const equipoVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const handleSorteo = async () => {
    setIsAnimating(true);
    try {
      await realizarSorteo.mutateAsync();
      handleConfetti();

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error al realizar el sorteo:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  const grupoA = useMemo(() => {
    return gruposFinales[0]?.equipos || [];
  }, [gruposFinales]);
  const grupoB = useMemo(() => {
    return gruposFinales[1]?.equipos || [];
  }, [gruposFinales]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Botón principal de sorteo */}
      <motion.div whileHover={{ scale: 1.02 }} className="relative">
        <Card className="py-12 text-center bg-gradient-to-br border-2 from-emerald-600/20 to-cyan-600/20 border-emerald-600/50">
          <CardContent className="space-y-6">
            <motion.div
              animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 2,
                repeat: isAnimating ? Infinity : 0,
                ease: "linear",
              }}
              className="flex justify-center"
            >
              <Dices size={64} className="text-emerald-400" />
            </motion.div>

            <div>
              <h2 className="mb-2 text-white h3">Realizar Sorteo</h2>
              <p className="mb-6 text-zinc-400">
                Distribuye los 8 equipos en dos grupos de 4 equipos cada uno
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={<Play size={24} />}
                onClick={handleSorteo}
                isLoading={realizarSorteo.isPending || isAnimating}
              >
                {isAnimating ? "Sorteando..." : "Realizar Sorteo"}
              </Button>
            </div>

            {isAnimating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <LoadingDots />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Grupos */}
      {(grupoA.length > 0 || grupoB.length > 0) && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Grupo A */}
          <motion.div>
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-400">Grupo A</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {grupoA.length === 0 ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-4 text-center text-zinc-400"
                      >
                        Equipos no asignados
                      </motion.p>
                    ) : (
                      grupoA.map((equipo, index) => (
                        <motion.div
                          key={equipo.id}
                          variants={equipoVariants}
                          className="flex justify-between items-center p-4 rounded-lg border bg-emerald-600/20 border-emerald-600/30"
                        >
                          <div className="flex gap-3 items-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                              className="flex justify-center items-center w-8 h-8 text-sm font-bold text-white bg-emerald-500 rounded-full"
                            >
                              {index + 1}
                            </motion.div>
                            <span className="font-medium text-white">
                              {equipo.nombre}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Grupo B */}
          <motion.div>
            <Card>
              <CardHeader>
                <CardTitle className="text-cyan-400">Grupo B</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {grupoB.length === 0 ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-4 text-center text-zinc-400"
                      >
                        Equipos no asignados
                      </motion.p>
                    ) : (
                      grupoB.map((equipo, index) => (
                        <motion.div
                          key={equipo.id}
                          variants={equipoVariants}
                          className="flex justify-between items-center p-4 rounded-lg border bg-cyan-600/20 border-cyan-600/30"
                        >
                          <div className="flex gap-3 items-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                              className="flex justify-center items-center w-8 h-8 text-sm font-bold text-white bg-cyan-500 rounded-full"
                            >
                              {index + 1}
                            </motion.div>
                            <span className="font-medium text-white">
                              {equipo.nombre}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
