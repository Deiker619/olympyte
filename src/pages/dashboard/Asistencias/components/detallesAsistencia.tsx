import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { 
  ArrowLeft, 
  Search, 
  Users, 
  TrendingUp, 
  Clock,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - replace with real data
const mockCourse = {
  id: 1,
  name: "Salsa Cubana Básica",
  genre: "Salsa",
  instructor: "Pedro Martínez",
  venue: "Sede Principal",
  totalStudents: 6
};

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  console.log(id)

  const filteredData = mockAttendanceData.filter(record =>
    record.students.some(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cedula.includes(searchTerm)
    )
  );

  const overallStats = {
    totalClasses: mockAttendanceData.length,
    averageAttendance: Math.round(
      mockAttendanceData.reduce((acc, record) => acc + record.attendanceRate, 0) / mockAttendanceData.length
    ),
    totalPresente: mockAttendanceData.reduce((acc, record) => acc + record.presente, 0),
    totalAbsent: mockAttendanceData.reduce((acc, record) => acc + record.absent, 0)
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
              {mockCourse.name} - {mockCourse.instructor}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Total Clases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {overallStats.totalClasses}
            </div>
          </CardContent>
        </Card>

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
              Total Presentees
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
            {filteredData.map((record, index) => (
              <div 
                key={record.date}
                className="border border-border rounded-lg p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Algo de fecha
                    </h3>
                    <p className="text-muted-foreground">
                      {record.presente} presentees de {record.totalStudents} estudiantes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {record.attendanceRate}%
                    </div>
                    <div className="w-24 bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${record.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Cédula</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {record.students.map((student) => (
                      <TableRow key={student.cedula}>
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {student.cedula}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={student.status === "presente" ? "default" : "destructive"}
                            className={cn(
                              student.status === "presente" 
                                ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" 
                                : ""
                            )}
                          >
                            {student.status === "presente" ? "Presente" : "Ausente"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}