import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import { getAllAsistenciasPorFecha } from "@/services/Asistencias/AsistenciaServices";

import {
  ArrowLeft,
  Search,
  Users,
  TrendingUp,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AsistenciaPorFecha } from "@/interfaces/detallesCursos";
import { toast } from "sonner";


const mockAttendanceData = [
  {
    date: "2024-01-15",
    totalStudents: 6,
    presente: 5,
    absent: 1,
    attendanceRate: 83,
    students: [
      { name: "Ana García", cedula: "V-12345678", status: "presente" },
      { name: "Carlos Rodríguez", cedula: "V-87654321", status: "presente" },
      { name: "María López", cedula: "V-11223344", status: "absent" },
      { name: "José Pérez", cedula: "V-55667788", status: "presente" },
      { name: "Carmen Silva", cedula: "V-99887766", status: "presente" },
      { name: "Luis Morales", cedula: "V-44332211", status: "presente" }
    ]
  },
  {
    date: "2024-01-12",
    totalStudents: 6,
    presente: 6,
    absent: 0,
    attendanceRate: 100,
    students: [
      { name: "Ana García", cedula: "V-12345678", status: "presente" },
      { name: "Carlos Rodríguez", cedula: "V-87654321", status: "presente" },
      { name: "María López", cedula: "V-11223344", status: "presente" },
      { name: "José Pérez", cedula: "V-55667788", status: "presente" },
      { name: "Carmen Silva", cedula: "V-99887766", status: "presente" },
      { name: "Luis Morales", cedula: "V-44332211", status: "presente" }
    ]
  },
  {
    date: "2024-01-10",
    totalStudents: 6,
    presente: 4,
    absent: 2,
    attendanceRate: 67,
    students: [
      { name: "Ana García", cedula: "V-12345678", status: "presente" },
      { name: "Carlos Rodríguez", cedula: "V-87654321", status: "absent" },
      { name: "María López", cedula: "V-11223344", status: "presente" },
      { name: "José Pérez", cedula: "V-55667788", status: "absent" },
      { name: "Carmen Silva", cedula: "V-99887766", status: "presente" },
      { name: "Luis Morales", cedula: "V-44332211", status: "presente" }
    ]
  }
];

/* FIXME: SE PUEDE FRAGMENTAR EN VARIOS COMPONENTES  */
export default function DetallesAsistencia() {
  const location = useLocation();
  const fecha = location.state?.fecha;
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const [asistencia, setAsistencia] = useState<AsistenciaPorFecha>();
  useEffect(() => {
    const fetchData = async () => {
      if (id && fecha) {
        const response = await getAllAsistenciasPorFecha(fecha, +id);
        if (!response) {
          navigate(-1);
          toast.info('No hay asistencias registradas en esa fecha')
        } else {
          setAsistencia(response); // ← guardo la data real
        }
      }
    };
    fetchData();
  }, [id, fecha, navigate]);

  console.log(id, fecha)

  

  const overallStats = {
    averageAttendance: Math.round(
      mockAttendanceData.reduce((acc, record) => acc + record.attendanceRate, 0) / mockAttendanceData.length
    ),
    totalPresente: asistencia?.presentes ?? 0,
    totalAbsent: (asistencia?.total ?? 0) - (asistencia?.presentes ?? 0),
  };
  

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/cursos")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Cursos
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Detalles de Asistencia</h1>
            <p className="text-muted-foreground mt-1">
              
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green" />
              Promedio Asistencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green">
              {overallStats.averageAttendance}%
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-green" />
              Total Presentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green">
              {overallStats.totalPresente}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-destructive" />
              Total Ausentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {overallStats.totalAbsent}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar estudiante..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-xl">Registro de Asistencias</CardTitle>
          <p className="text-muted-foreground">
            Historial detallado de asistencia por clase
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
          
              <div
                className="border border-border rounded-lg p-6 animate-fade-in"
                
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {asistencia?.fecha}
                    </h3>
                    <p className="text-muted-foreground">
                      {asistencia?.presentes ?? 0} presentes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {asistencia?.presentes ? Math.round((asistencia?.presentes / 30) * 100) : 0}%
                    </div>
                    <div className="w-24 bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${asistencia?.presentes ? (asistencia?.presentes / 30) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asistencia?.estudiantes.map((estud) => (
                      
                        <TableRow key={estud.estudiante_id}>
                          <TableCell className="font-medium">{estud.nombre}</TableCell>
                          <TableCell className="text-muted-foreground">{estud.telefono}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {estud.email ?? "No registrado"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={estud.presente ? "default" : "destructive"}
                              className={cn(
                                estud.presente
                                  ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                                  : ""
                              )}
                            >
                              {estud.presente == true ? 'Presente' : 'Ausente'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      
                    ))}

                  </TableBody>
                </Table>
              </div>
          

          </div>
        </CardContent>
      </Card>
    </div>
  );
}