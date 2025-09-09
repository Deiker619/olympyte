import { AddPagos } from "./components/AddPagos"


export const Pagos = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">

      <div className="w-full flex flex-col items-center justify-center ">
        <div className="w-full grid grid-cols-3 ">
          <div className="col-span-2">

          <AddPagos></AddPagos>
          </div>
        </div>
      </div>
    </div>
  )
}
