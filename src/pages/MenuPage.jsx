// src/pages/MenuPage.jsx
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuPage = () => {
  const navigate = useNavigate();
  const userType = Number(localStorage.getItem("userType"));

  useEffect(() => {
    if (!userType) navigate("/"); // Si no hay usuario, regresa al inicio
  }, [userType, navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Borra todo el localStorage
    navigate("/"); // Regresa al login o inicio
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={userType} />
      <main style={{ flex: 1, padding: "2rem" }}>
        {/* Header con botón profesional de cerrar sesión */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderColor: "#d32f2f",
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.1)",
                borderColor: "#b71c1c",
              },
            }}
          >
            Cerrar sesión
          </Button>
        </Box>

        <Outlet />
      </main>
    </div>
  );
};

export default MenuPage;
