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
  MenuItem,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterDialog = ({ open, onClose, onSwitchToLogin }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    Id_rol_usu: "",
    NombreCompleto_usu: "",
    FechaNacimiento_usu: "",
    Login_usu: "",
    Password_usu: "",
    correo_elec_usu: "",
    PassWord_correo_usu: "",
    Id_suc_usu: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  const [error, setError] = useState(""); // Para mensaje de error
  const [success, setSuccess] = useState(false); // Para Snackbar de éxito
  const [errorSnackbar, setErrorSnackbar] = useState(false); // Para Snackbar de error

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  async function handleRegister() {
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrar usuario");
        setErrorSnackbar(true);
        return;
      }

      setSuccess(true);
      onClose(); // Puedes comentar esto si quieres que el dialog no se cierre automáticamente

    } catch (err) {
      setError("Error en la conexión con el servidor");
      setErrorSnackbar(true);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
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
          Registro de Usuario
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            <TextField
              label="Nombre completo"
              value={form.NombreCompleto_usu}
              onChange={handleChange("NombreCompleto_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Fecha de nacimiento"
              type="date"
              value={form.FechaNacimiento_usu}
              onChange={handleChange("FechaNacimiento_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Login de usuario"
              value={form.Login_usu}
              onChange={handleChange("Login_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={form.Password_usu}
              onChange={handleChange("Password_usu")}
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

            <TextField
              label="Correo electrónico"
              type="email"
              value={form.correo_elec_usu}
              onChange={handleChange("correo_elec_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Contraseña del correo"
              type={showEmailPassword ? "text" : "password"}
              value={form.PassWord_correo_usu}
              onChange={handleChange("PassWord_correo_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowEmailPassword(!showEmailPassword)}
                    >
                      {showEmailPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              label="Rol"
              value={form.Id_rol_usu}
              onChange={handleChange("Id_rol_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="1">Administrador</MenuItem>
              <MenuItem value="2">Usuario</MenuItem>
              <MenuItem value="3">Supervisor</MenuItem>
            </TextField>

            <TextField
              select
              label="Sucursal"
              value={form.Id_suc_usu}
              onChange={handleChange("Id_suc_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="1">Sucursal A</MenuItem>
              <MenuItem value="2">Sucursal B</MenuItem>
              <MenuItem value="3">Sucursal C</MenuItem>
            </TextField>
          </Box>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            ¿Ya tienes cuenta?{" "}
            <Button onClick={onSwitchToLogin} size="small">
              Inicia sesión
            </Button>
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
            onClick={handleRegister}
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
            Registrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar de Éxito */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            px: 3,
            py: 2,
            borderRadius: 2,
            boxShadow: 4,
          }}
        >
          ¡Usuario registrado correctamente! 🎉
        </Alert>
      </Snackbar>

      {/* ❌ Snackbar de Error */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={4000}
        onClose={() => setErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            px: 3,
            py: 2,
            borderRadius: 2,
            boxShadow: 4,
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterDialog;
