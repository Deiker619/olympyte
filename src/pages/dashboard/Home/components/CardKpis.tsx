import React from "react";

interface PropsCardKpis {
  titulo: string;
  monto: {
    isMoney: boolean;
    valor: string;
  };
  porcentaje: {
    up: boolean;
    valor: number;
  };
  icono: React.ReactNode;
}
export const CardKpis = ({titulo, monto, porcentaje, icono }:PropsCardKpis) => {
  return (
    <>
      <div className="border rounded-2xl p-4 grid grid-cols-3 place-items-center bg-white">
        <div className="flex flex-col w-full col-span-2 gap-3 font-thin">
          <p className="text-md text-gray-500 font-semibold">
            {titulo}
          </p>
          <div className="flex flex-col">
            <p className="text-2xl font-bold inline-flex gap-2 items-end  text-black">
              {monto.isMoney ?  '$'+monto.valor : monto.valor}
              <span
                className={`text-sm ${
                  porcentaje.up ? `text-green-600` : `text-red-600`
                } mb-1`}
              >
                {porcentaje.valor}%
              </span>
            </p>
          </div>
        </div>
        <div className="  ">
          <div className="p-2 mb-6 rounded-lg justify-center items-center flex h-10 w-10 bg-primary">
            {icono}
          </div>
        </div>
      </div>
    </>
  );
};
