import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuPage = () => {
  const navigate = useNavigate();
  const userType = Number(localStorage.getItem("userType"));

  useEffect(() => {
    if (!userType) navigate("/"); // Redirige al login si no hay usuario
  }, [userType, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Regresa al login
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={userType} />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
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

        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
      </main>
    </div>
  );
};

export default MenuPage;
