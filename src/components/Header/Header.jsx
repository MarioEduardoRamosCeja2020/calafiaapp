import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import LoginDialog from "../Login/LoginDialog";
import RegisterDialog from "../Register/RegisterDialog";

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // Abrir login desde registro
  const switchToLogin = () => {
    setOpenRegister(false);
    setTimeout(() => setOpenLogin(true), 200);
  };

  // Abrir registro desde login
  const switchToRegister = () => {
    setOpenLogin(false);
    setTimeout(() => setOpenRegister(true), 200);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ffffff",
          color: "#00004e",
          boxShadow: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 40, sm: 46 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
            {/* LOGO */}
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/img/logo.png"
                alt="Logo"
                style={{ height: 40 }}
              />
            </Typography>

            {/* BOTONES (comentados) */}
            {/*
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenLogin(true)}
                sx={{
                  borderColor: "#00004e",
                  color: "#00004e",
                  "&:hover": {
                    backgroundColor: "#4B9C5F",
                    borderColor: "#4B9C5F",
                    color: "#fff",
                  },
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                onClick={() => setOpenRegister(true)}
                sx={{
                  backgroundColor: "#00004e",
                  "&:hover": { backgroundColor: "#4B9C5F" },
                }}
              >
                Registro
              </Button>
            </Box>
            */}
      </Toolbar>
      </AppBar>

      {/* Diálogos */}
      <LoginDialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterDialog
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        onSwitchToLogin={switchToLogin}
        fromLogin={true} // 👈 Oculta correo, rol y sucursal
      />

    </>
  );
};

export default Header;
