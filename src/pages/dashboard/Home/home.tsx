import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import type { DashboardData } from "@/interfaces/Kpis";
import { getkpis } from "@/services/dashboard/dashboardServices";
import { useEffect, useState } from "react";

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
    <div className=" space-y-6">
      <SectionCards
        activos={kpis?.kpis.estudiantes_activos ?? 0}
        ingresos={kpis?.kpis.ingresos_mes_usd ?? 0}
        tasa_asitencia={kpis?.kpis.tasa_asistencia ?? 0}
      />
      <div className="px-4 lg:px-6 grid grid-cols-3 h-auto gap-4">
        <div className="md:col-span-1 col-span-3 flex flex-col border rounded-2xl bg-card shadow-sm">
          <div className="flex justify-center items-center h-20">
              <p className="text-xl font-semibold">Top curso #1 🏆</p>
          </div>
          <div className="h-full  p-2 flex justify-center items-center text-2xl text-center">{kpis?.top_cursos[0].nombre}</div>
        </div>
        <div className="md:col-span-2 col-span-3 bg-red-200 rounded-2xl">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
};
