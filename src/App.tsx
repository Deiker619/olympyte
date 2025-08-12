import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/dashboard/Home/home";
import { Catalogos } from "./pages/dashboard/Catalogos/Catalogos";
import { Cursos } from "./pages/dashboard/Cursos/Cursos";
import { Estudiantes } from "./pages/dashboard/Estudiantes/Estudiantes";
import { Sedes } from "./pages/dashboard/Sedes/Sedes";
import { Generos } from "./pages/dashboard/Generos/Generos";
import { Instructores } from "./pages/dashboard/Instructores/Instructores";
import { GenerosProvider } from "./contexts/Generos/generosContext";
import { SedesProvider } from "./contexts/Sedes/sedesContext";
import { EstudiantesProvider } from "./contexts/Estudiantes/EstudiantesContext";
import { DetallesEstudiantes } from "./pages/dashboard/Estudiantes/DetallesEstudiantes";
import { InstructoresProvider } from "./contexts/Instructores/InstructoresContext";
import { CursosProvider } from "./contexts/Cursos/CursosContext";

function App() {
  return (
    <>
      {/* Rutas privadas  */}
      <GenerosProvider>
        <SedesProvider>
          <EstudiantesProvider>
            <InstructoresProvider>
              <CursosProvider>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home></Home>} />
                    <Route
                      path="/catalogos"
                      element={<Catalogos></Catalogos>}
                    />
                    <Route path="/cursos" element={<Cursos></Cursos>} />
                    <Route path="/generos" element={<Generos></Generos>} />
                    <Route
                      path="/estudiantes"
                      element={<Estudiantes />}
                    ></Route>
                    <Route
                      path="/estudiantes/:id"
                      element={<DetallesEstudiantes />}
                    />
                    <Route
                      path="/instructores"
                      element={<Instructores></Instructores>}
                    />
                    <Route path="/sedes" element={<Sedes></Sedes>} />
                  </Route>
                </Routes>
              </CursosProvider>
            </InstructoresProvider>
          </EstudiantesProvider>
        </SedesProvider>
      </GenerosProvider>
    </>
  );
}

export default App;
