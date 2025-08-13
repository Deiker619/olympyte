import { Separator } from "@/components/ui/separator";
import { IconCashBanknote } from "@tabler/icons-react";

import { useParams, Navigate } from "react-router-dom";

import { useSedeDetalles } from "@/hooks/Sedes/sedesDetalles/useSedesDetalles";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DetallesSedes = () => {
  const { id } = useParams<{ id: string }>();
  const { detallesSede } = useSedeDetalles(id);
  console.log(detallesSede);
  if (!id) return <Navigate to="/sedes" replace />;
  if (!detallesSede) return <p>Cargando sede...</p>;

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="w-full flex flex-col h-20">
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <p className="text-3xl">Inscripciones de {detallesSede[0].sede.nombre}</p>
          
        </div>
      </div>

      <div className="grid  grid-cols-2 h-auto md:h-max-150  gap-4">
        <div className="border col-span-2 rounded-2xl flex flex-col p-2">
          <div className="p-4 text-lg flex items-center gap-4">
            <IconCashBanknote />
            <p>Rooster</p>
          </div>
          <Separator />
          <Table>
            <TableCaption>Lista de Sedes de Olimpo.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cédula</TableHead>
                <TableHead>Fecha de inscripción</TableHead>
                <TableHead>Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detallesSede?.map((detalle) => (
                <TableRow key={detalle.id}>
                  <>
                    <TableCell className="font-medium p-4">{detalle.id}</TableCell>
                    <TableCell>{detalle.estudiante_id}</TableCell>
                    <TableCell>
                      {detalle.fecha_inscripcion}
                    </TableCell>
                    <TableCell>
                      {detalle.monto_pagado}
                    </TableCell>
                    <TableCell className="flex flex-col justify-start w-30">
                     
                    </TableCell>
                  </>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
