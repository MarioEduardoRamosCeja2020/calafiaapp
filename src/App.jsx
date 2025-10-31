// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainTabs from "./pages/MainTabs";
import ResetPassword from "./pages/ResetPassword";
import MenuPage from "./pages/MenuPage";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pantalla principal y recuperación */}
        <Route path="/" element={<MainTabs />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔹 Nueva sección de menú protegida */}
        <Route path="/menu" element={<MenuPage />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
