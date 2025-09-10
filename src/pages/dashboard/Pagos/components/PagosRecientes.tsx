import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type {  PagoReciente } from "@/interfaces/Estudiante";
import { DollarSign, Search } from "lucide-react";


export const PagosRecientes = ({pagos}: {pagos: PagoReciente[]}) => {
  return (
    <div className="space-y-6">
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span>Pagos Recientes</span>
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Filtrar pagos..."
              className="pl-10"
             
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {pagos?.map((payment, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-accent-light/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{payment.estudiante.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.curso.nombre}
                    </p>
                  </div>
                  <Badge
                    variant={
                      payment.metodo_pago === "Normal" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {payment.metodo_pago}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {payment.mes} {payment.anio}
                  </span>
                  <span className="font-medium text-primary">
                    ${payment.monto}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">
                    {payment.metodo_pago}
                  </span>
                  <span className="text-muted-foreground">{payment.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
