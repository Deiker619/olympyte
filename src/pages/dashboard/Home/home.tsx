import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { PageDescription } from "@/components/ui/page-description";
import type { DashboardData } from "@/interfaces/Kpis";
import { getkpis } from "@/services/dashboard/dashboardServices";
import { useEffect, useState } from "react";
import { CreateCurso } from "../Cursos/components/CreateCurso";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { PopularCourses } from "@/components/popularCursos";
import { CardKpis } from "./components/CardKpis";
import { AnimatePresence, motion } from "motion/react";

export const Home = () => {
  const fechData = async () => {
    const data = await getkpis();
    if (data.status == 200) {
      setKpis(data.data);
    }
  };

  useEffect(() => {
    fechData();
  }, []);
  const [kpis, setKpis] = useState<DashboardData>();
  console.log(kpis);
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
        <div className=" col-span-3">
          <PageDescription
            title="Dashboard"
            description="Bienvenido al sistema de gestión de Olimpo Venezuela"
          />
        </div>

        <div className="col-span-1 gap-2 flex justify-center items-center">
          <Button variant={"outline"}>
            <Calendar></Calendar> Este mes
          </Button>
          <CreateCurso
            mode="create"
            triggerMessage="Crear Nuevo Curso"
            icon={<IconPlus></IconPlus>}
          />
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 120, // qué tan fuerte es el resorte
            damping: 15, // qué tanto rebota (menor valor = más rebote)
            duration: 0.8, // opcional, puedes dejar que lo calcule el spring
          }}
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 "
        >
          <CardKpis
            titulo="Ingresos Totales"
            icono={<DollarSign />}
            monto={{ valor: "24.480", isMoney: true }}
            porcentaje={{ valor: 12.5, up: true }}
          />

          <CardKpis
            titulo="Estudiantes Activos"
            icono={<Users />}
            monto={{ valor: "142", isMoney: false }}
            porcentaje={{ valor: 12.5, up: true }}
          />

          <CardKpis
            titulo="Tasa de Asistencia"
            icono={<TrendingUp />}
            monto={{ valor: "89%", isMoney: false }}
            porcentaje={{ valor: 3.1, up: true }}
          />

          <CardKpis
            titulo="Cursos Activos"
            icono={<BookOpen />}
            monto={{ valor: "18", isMoney: false }}
            porcentaje={{ valor: 2, up: false }}
          />
        </motion.div>
      </AnimatePresence>
      <div className=" grid md:grid-cols-2 grid-cols-1 h-auto md:max-h-100 overflow-hidden gap-4">
        <div className="md:col-span-1 h-100 col-span-3  rounded-2xl">
          <ChartAreaInteractive />
        </div>
        <div className="md:col-span-1 col-span-2 h-100 overflow-auto flex p-4 flex-col  rounded-2xl bg-card border">
          <div className="flex flex-col w-full ">
            <div className="w-full">
              <PopularCourses />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
