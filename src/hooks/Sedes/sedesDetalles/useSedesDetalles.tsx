import { useEffect, useState } from "react";
import type { InscripcionSede } from "@/interfaces/Sede";
import { GetDetallesSedes } from "@/services/Sedes/SedesServices";

export function useSedeDetalles(id?: string) {
  const [detallesSede, setDetallesSede] = useState<InscripcionSede[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetallesSedes = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const detalles = await GetDetallesSedes(id);
      setDetallesSede(detalles.data.data);
    } catch (error) {
      console.error("Error cargando detalles de sede:", error);
      setDetallesSede(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetallesSedes();
  }, [id]);

  return { detallesSede, loading, refetch: fetchDetallesSedes };
}
