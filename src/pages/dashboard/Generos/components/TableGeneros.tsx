import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  IconAdjustmentsAlt,
  IconPencilCheck,
  IconTrash,
} from "@tabler/icons-react";
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
import { AddGeneros } from "./AddGeneros";

export const TableGeneros = () => {
  const { generos, loading, error, generoDelete } = useGeneros();
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
                    <DropdownMenuItem onClick={() => generoDelete(genero.id)}>
                      <span className="flex gap-2 items-center">
                        <IconTrash /> Eliminar
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <AddGeneros
                        icon={<IconPencilCheck />}
                        triggerMessage="Modificar Género"
                        genero={genero}
                        id={genero.id}
                        
                        mode="editing"
                      ></AddGeneros>
                    </DropdownMenuItem>
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
