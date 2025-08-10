
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { IconAdjustmentsAlt } from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGeneros } from "@/hooks/Generos/useGeneros";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export const TableGeneros = () => {
  const { generos, loading, error, deleteGenero } = useGeneros();
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Table>
      <TableCaption>Lista de Géneros de Olimpo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre del Género</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {generos?.map((genero) => (
          <TableRow key={genero.id}>
            <>
              <TableCell className="font-medium p-4">{genero.id}</TableCell>
              <TableCell>{genero.nombre}</TableCell>
              <TableCell className="flex flex-col justify-start w-30">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconAdjustmentsAlt />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteGenero(genero.id)}>Eliminar Género</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
