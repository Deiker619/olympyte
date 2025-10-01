import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { CalendarIcon, ArrowLeft, Save, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

import { useCursoDetalles } from "@/hooks/Cursos/rooster/useCursoDetalles";
import { CreateAsistencias } from "@/services/Asistencias/AsistenciaServices";
import type { Asistencia } from "@/interfaces/Asistencia";

export default function CreateAsistencia() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { detallesCurso } = useCursoDetalles(id);

  const [fechaClase, setFechaClase] = useState("");

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaClase(e.target.value);
  };
  const [attendance, setAttendance] = useState<
    { estudiante_id: number; presente: boolean }[]
  >([]);

  const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
    setAttendance((prev) => {
      if (isPresent) {
        // ✅ Agregar estudiante si está presente
        return [...prev, { estudiante_id: studentId, presente: true }];
      } else {
        // ❌ Quitar estudiante si se desmarca
        return prev.filter((item) => item.estudiante_id !== studentId);
      }
    });
  };

  const isPresent = (studentId: number) =>
    attendance.some((a) => a.estudiante_id === studentId);
  const handleSave = async () => {
    // Save attendance logic here
    const asistencia: Asistencia = {
      curso_id: +(id || "0"),
      fecha: fechaClase,
      items: attendance,
    };
    const data = await CreateAsistencias(asistencia);
    console.log(data);
  };

  const presentCount = attendance.filter((item) => item.presente).length;
  const totalStudents = detallesCurso?.roster.length ?? 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Cursos
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Asistencia</h1>
            <p className="text-muted-foreground mt-1">
              {detallesCurso?.curso.nombre} -{" "}
              {detallesCurso?.curso.instructores
                ?.map((inst) => inst.nombre)
                .join(", ")}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="text-black">
          <Save className="w-4 h-4 mr-2" />
          Guardar Asistencia
        </Button>
      </div>

      {/* Date and Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date Selector */}
        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
              Fecha de Clase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="date"
              value={fechaClase}
              onChange={handleFechaChange}
              className="w-full border rounded-md p-2 text-sm"
            />
          </CardContent>
        </Card>

        {/* Present Count */}
        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Presentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {presentCount}
            </div>
            <p className="text-sm text-muted-foreground">
              de {totalStudents} estudiantes
            </p>
          </CardContent>
        </Card>

        {/* Attendance Rate */}
        <Card className="card-dashboard">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Asistencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {totalStudents > 0
                ? Math.round((presentCount / totalStudents) * 100)
                : 0}
              %
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    totalStudents > 0 ? (presentCount / totalStudents) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-xl">Lista de Estudiantes</CardTitle>
          <p className="text-muted-foreground">
            Marca los estudiantes que asistieron a la clase
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detallesCurso?.roster.map((rooster, index) => (
              <div
                key={rooster.estudiante.id}
                className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Checkbox
                  id={`student-${rooster.estudiante.id}`}
                  checked={isPresent(rooster.estudiante.id)} // <- aquí
                  onChange={(e) =>
                    handleAttendanceChange(
                      rooster.estudiante.id,
                      (e.target as HTMLInputElement).checked
                    )
                  }
                  onCheckedChange={(checked) =>
                    handleAttendanceChange(
                      rooster.estudiante.id,
                      checked as boolean
                    )
                  }
                  className="scale-125"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`student-${rooster.estudiante.id}`}
                    className="block cursor-pointer"
                  >
                    <div className="font-medium text-foreground">
                      {rooster.estudiante.nombre}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {rooster.estudiante.id} • {rooster.estudiante.nombre}
                    </div>
                  </label>
                </div>
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    attendance[rooster.estudiante.id]
                      ? "bg-green-500/20 text-green-500"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {attendance[rooster.estudiante.id] ? "Presente" : "Ausente"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
