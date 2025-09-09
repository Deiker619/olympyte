import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { PageDescription } from "@/components/ui/page-description";
import type { DashboardData } from "@/interfaces/Kpis";
import { getkpis } from "@/services/dashboard/dashboardServices";
import { useEffect, useState } from "react";
import { CreateCurso } from "../Cursos/components/CreateCurso";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Calendar,Settings } from "lucide-react";
import { PopularCourses } from "@/components/popularCursos";

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
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 ">
        {[4, 1, 7, 4].map((value) => (
          <div className="border rounded-2xl p-4 grid grid-cols-3 place-items-center bg-white">
            <div className="flex flex-col w-full col-span-2 gap-3 font-thin">
              <p className="text-md text-gray-500 font-semibold">
                Ingresos totales
              </p>
              <div className="flex flex-col">
                <p className="text-2xl font-bold inline-flex gap-2 items-end  text-black">
                  $24.5425
                  <span
                    className={`text-sm ${
                      value % 2 == 0 ? `text-green-600` : `text-red-600`
                    } mb-1`}
                  >
                    24.2%
                  </span>
                </p>
              </div>
            </div>
            <div className="  ">
              <div className="p-2 mb-6 rounded-lg justify-center items-center flex h-10 w-10 bg-primary">
                <Settings />
              </div>
            </div>
          </div>
        ))}
      </div>
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
