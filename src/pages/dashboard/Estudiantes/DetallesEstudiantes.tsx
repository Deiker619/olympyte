
import { useNavigate } from "react-router-dom";
import type {  CursoEstududianteDetalles, EstudianteDetalles, PagoReciente } from "@/interfaces/Estudiante";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  getEstudiante,
  getEstudiantesCursos,
  getEstudiantesPagos,
} from "@/services/Estudiantes/EstudiantesServices";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, CreditCard, Mail, MapPin, Phone, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DetallesEstudiantes = () => {
  const { id } = useParams<{ id: string }>();
  const [estudiante, setEstudiante] = useState<EstudianteDetalles | null>(null);
  const [cursosEstudiante, setCursosEstudiante] = useState<CursoEstududianteDetalles[]>();
  const [pagosEstudiante, setPagosEstudiante] = useState<PagoReciente[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchEstudiante = async () => {
      try {
        const [resEstudiante, resCursos, resPagos] = await Promise.all([
          getEstudiante(id),
          getEstudiantesCursos(id),
          getEstudiantesPagos(id),
        ]);

        setEstudiante(resEstudiante.data);
        setCursosEstudiante(resCursos.data.data);
        setPagosEstudiante(resPagos.data);
      } catch (error) {
        console.error("Error cargando detalles estudiante:", error);
        setEstudiante(null);
      }
    };

    fetchEstudiante();
  }, [id, navigate]);

  if (!id) return <Navigate to="/estudiantes" replace />;
  if (!estudiante) return <p>Cargando estudiante...</p>;

  return (
   
  
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
         
          
          <Button 
            variant="outline"
            onClick={()=>navigate(-1)} 
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </Button>
         
          <div>
            <h1 className="text-3xl font-bold text-foreground">{estudiante.nombre}</h1>
            <p className="text-muted-foreground mt-1">Cédula: {estudiante.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Información Personal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{estudiante.id}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">example@email.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Registrado: 10/09/2025</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Estado:</span>
                  <Badge variant="default">
                    Activo
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Sedes Asociadas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {estudiante.sedes_inscritas.map((venue, index) => (
                    <Badge key={index} variant="secondary" className="block w-fit">
                      {venue.nombre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses and Payments */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Cursos Inscritos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cursosEstudiante?.map((course, index) => (
                    <div 
                      key={index}
                      className="p-4 border rounded-lg hover:bg-accent-light/20 transition-colors"
                    >
                      <h4 className="font-medium">{course.curso.nombre}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Estado: Activo</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Pagos Recientes</span>
                  </div>
                  <Badge variant="secondary">
                    {pagosEstudiante?.length} pagos total
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pagosEstudiante?.map((payment, index) => (
                    <div 
                      key={payment.pago_id}
                      className="flex items-center justify-between p-4 border rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div>
                        <p className="font-medium">{payment.nota}</p>
                        <p className="text-sm text-muted-foreground">{payment.fecha}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">${payment.monto}</p>
                        <p className="text-sm text-muted-foreground">{payment.metodo_pago}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  
  );
};
