
import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { Home } from "./pages/dashboard/home"



function App() {
  return (
    <>

      <Routes>
        {/* Rutas con MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home></Home>} />
        </Route>

       
      </Routes>

    </>
  )
}

export default App
