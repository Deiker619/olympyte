import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <motion.p
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120, 
                    damping: 15, 
                    duration: 0.8, 
                  }}
                  className="text-7xl font-bold text-primary mb-2"
                >
                  Olimpo
                </motion.p>
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground text-balance">
                  Ingresa con tu cuenta en Olimpo
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Perdiste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Link to='/'>
                <Button type="submit" className="w-full text-black">
                  Ir al dashboard
                </Button>
              </Link>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  ✨𝚃ú 𝚍𝚎𝚜𝚝𝚒𝚗𝚘 𝚙𝚊𝚛𝚊 𝚋𝚊𝚒𝚕𝚊𝚛✨
                </span>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="preview.jpg"
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src="background.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, acepta nuestros Términos de servicio y Política de privacidad.{" "}
        
      </div>
    </div>
  );
}
