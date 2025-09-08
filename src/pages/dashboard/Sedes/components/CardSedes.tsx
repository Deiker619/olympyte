import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Edit, Eye, MapPin, MoreVertical, Phone, Trash2, UserPlus } from "lucide-react"
import type { Sede } from "@/interfaces/Sede"
import { useSedes } from "@/hooks/Sedes/useSedes"
import { AnimatePresence, motion } from "motion/react"


export const CardSedes = ({ sedes }: { sedes: Sede[] }) => {
    const { loading, error } = useSedes();
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
            <AnimatePresence>
                {sedes.map((sede) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}>

                        <Card

                            className="card-dashboard hover-lift animate-fade-in"

                        >
                            <CardContent className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground mb-1">{sede.nombre}</h3>
                                        <Badge className="bg-primary text-black">
                                            Activo
                                        </Badge>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Ver inscritos
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <UserPlus className="w-4 h-4 mr-2" />
                                                Agregar estudiante
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <Edit className="w-4 h-4 mr-2" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Address and Contact */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-2">{sede.direccion ?? 'Sin dirección'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4" />
                                        <span>{sede.telefono??'Sin Teléfono'}</span>
                                    </div>
                                    <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-2">{sede.direccion??'Sin dirección'}</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <p className="text-lg font-bold text-primary">10</p>
                                        <p className="text-xs text-muted-foreground">Cursos</p>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <p className="text-lg font-bold text-green-600">10</p>
                                        <p className="text-xs text-muted-foreground">Inscritos</p>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <p className="text-lg font-bold text-foreground">30</p>
                                        <p className="text-xs text-muted-foreground">Capacidad</p>
                                    </div>
                                </div>

                                {/* Capacity Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Ocupación</span>
                                        <span className="font-medium">

                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"

                                        />
                                    </div>
                                </div>

                                {/* Manager */}
                                <div className="pt-4 border-t border-border mt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Encargado:</span>
                                        <span className="font-medium">encargado</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </motion.div>
                ))}

            </AnimatePresence>
        </>
    )
}
