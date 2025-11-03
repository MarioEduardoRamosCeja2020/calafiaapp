import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../services/authService";
import ForgotPasswordDialog from "./ForgotPasswordDialog"; // ✅ asegúrate de tener este archivo
import { useNavigate } from "react-router-dom";


const LoginDialog = ({ open, onClose, onSwitchToRegister }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [Login_usu, setLogin_usu] = useState("");
  const [Password_usu, setPassword_usu] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false); // ✅ modal

  const handleLogin = async () => {
    setError("");
    if (!Login_usu || !Password_usu) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const user = await login({ Login_usu, Password_usu });
      console.log("Login exitoso:", user);
      onClose(); // cerrar modal si login exitoso
      
      if(user.user.Id_rol_usu == 1){
        navigate("/menu");
      }
      if(user.user.Id_rol_usu ==  2){
        // navigate("/menu");
      }
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            p: fullScreen ? 2 : 3,
            borderRadius: fullScreen ? 0 : 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#00004e",
            textAlign: "center",
            fontSize: { xs: "1.4rem", sm: "1.6rem" },
          }}
        >
          Iniciar sesión
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 1,
            }}
          >
            <TextField
              label="Nombre de usuario"
              value={Login_usu}
              onChange={(e) => setLogin_usu(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={Password_usu}
              onChange={(e) => setPassword_usu(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Box>

          {/* Registro */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            ¿No tienes cuenta?{" "}
            <Button onClick={onSwitchToRegister} size="small">
              Regístrate
            </Button>
          </Typography>

          {/* Recuperar contraseña */}
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              cursor: "pointer",
              color: "#00004e",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
                color: "#4B9C5F",
              },
            }}
            onClick={() => setForgotPasswordOpen(true)}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 3,
            pt: 2,
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Button
            onClick={onClose}
            color="inherit"
            fullWidth={fullScreen}
            variant={fullScreen ? "outlined" : "text"}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth={fullScreen}
            size="large"
            sx={{
              backgroundColor: "#00004e",
              "&:hover": {
                backgroundColor: "#4B9C5F",
              },
            }}
          >
            Iniciar sesión
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo recuperación contraseña */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  );
};

export default LoginDialog;
