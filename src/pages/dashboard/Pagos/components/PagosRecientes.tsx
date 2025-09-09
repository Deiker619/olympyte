import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DollarSign, Search } from "lucide-react";

const mockRecentPayments = [
  {
    id: 1,
    student: "María González",
    course: "Salsa Cubana Básica",
    amount: 80,
    month: "Febrero",
    year: "2024",
    method: "Transferencia",
    date: "2024-02-15",
    type: "Normal"
  },
  {
    id: 2,
    student: "Carlos Rodríguez",
    course: "Bachata Sensual",
    amount: 55,
    month: "Febrero",
    year: "2024",
    method: "Efectivo",
    date: "2024-02-10",
    type: "Apoyo"
  },
  {
    id: 3,
    student: "Ana López",
    course: "Merengue Tradicional",
    amount: 75,
    month: "Febrero",
    year: "2024",
    method: "Tarjeta",
    date: "2024-02-08",
    type: "Normal"
  },
];
export const PagosRecientes = () => {
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
            {mockRecentPayments.map((payment, index) => (
              <div
                key={payment.id}
                className="p-4 border rounded-lg hover:bg-accent-light/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{payment.student}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.course}
                    </p>
                  </div>
                  <Badge
                    variant={
                      payment.type === "Normal" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {payment.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {payment.month} {payment.year}
                  </span>
                  <span className="font-medium text-primary">
                    ${payment.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">
                    {payment.method}
                  </span>
                  <span className="text-muted-foreground">{payment.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
