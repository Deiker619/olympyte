import { AddPagos } from "./components/AddPagos";
import { PagosRecientes } from "./components/PagosRecientes";

export const Pagos = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="w-full flex flex-col items-center justify-center ">
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 ">
          <div className="col-span-2">
            <AddPagos></AddPagos>
          </div>
          <div className="col-span-1">
            <PagosRecientes/>
          </div>
        </div>
      </div>
    </div>
  );
};
