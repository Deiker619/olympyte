import { getPagosRecientes } from "@/services/Pagos/PagosServices";
import { AddPagos } from "./components/AddPagos";
import type { PagoReciente } from "@/interfaces/Estudiante";
import { PagosRecientes } from "./components/PagosRecientes";
import { useEffect, useState } from "react";
export const Pagos = () => {
  const [pagosReciente, setPagosRecientes] = useState<PagoReciente[]>([]);
  const pagosRecientes = async () => {
    const data = await getPagosRecientes();
    if (Array.isArray(data)) {
      console.log(data);
      setPagosRecientes(data);
    } else {
      setPagosRecientes([]);
    }
  };
  useEffect(() => {
    pagosRecientes();
  }, []);
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="w-full flex flex-col items-center justify-center ">
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 ">
          <div className="col-span-2">
            <AddPagos></AddPagos>
          </div>
          <div className="col-span-1">
            <PagosRecientes pagos={pagosReciente} />
          </div>
        </div>
      </div>
    </div>
  );
};
