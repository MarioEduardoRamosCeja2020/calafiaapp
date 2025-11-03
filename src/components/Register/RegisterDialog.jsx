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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff, CheckCircle, Error } from "@mui/icons-material";
import { keyframes } from "@mui/system";
import NotificationSnackbar from "../NotificationSnackbar";

// Animación pulse para botón Cancelar
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(198,40,40, 0.7); }
  50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(198,40,40, 0.7); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(198,40,40, 0.7); }
`;

// Animación ligera al abrir el diálogo
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const initialFormState = {
  Id_rol_usu: "",
  NombreCompleto_usu: "",
  FechaNacimiento_usu: "",
  Login_usu: "",
  Password_usu: "",
  correo_elec_usu: "",
  PassWord_correo_usu: "",
  Id_suc_usu: "",
};

const RegisterDialog = ({ open, onClose, onSwitchToLogin, fromLogin = false }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, correo_elec_usu: value });
    if (!validateEmail(value)) setEmailError("Ingresa un correo válido.");
    else setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, Password_usu: value });
    if (!validatePassword(value))
      setPasswordError(
        "La contraseña debe tener al menos 6 caracteres, mayúsculas, minúsculas, números y un carácter especial."
      );
    else setPasswordError("");
  };

  const handleRegister = async () => {
    setErrorMessage("");
    if (emailError || passwordError) {
      setErrorSnackbar(true);
      setErrorMessage("Corrige los errores del formulario antes de continuar.");
      return;
    }

    const body = { ...form };
    if (fromLogin) {
      body.Id_rol_usu = 2;
      body.Id_suc_usu = 1;
      body.PassWord_correo_usu = null;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Error al registrar usuario");
        setErrorSnackbar(true);
        return;
      }

      setSuccess(true);
      setForm(initialFormState);
      document.activeElement?.blur();
      setTimeout(() => onClose(), 100);
    } catch {
      setErrorMessage("Error en la conexión con el servidor");
      setErrorSnackbar(true);
    }
  };

  const linkStyle = {
    color: "#00004e",
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": { color: "#4B9C5F", transform: "translateY(-2px)" },
  };

  const renderAdornment = (error, value) => {
    if (!value) return null;
    return error ? <Error color="error" /> : <CheckCircle color="success" />;
  };

  const inputStyle = (error, value) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: value ? (error ? '#d32f2f' : '#4caf50') : undefined,
      },
      '&:hover fieldset': {
        borderColor: value ? (error ? '#d32f2f' : '#4caf50') : undefined,
      },
      '&.Mui-focused fieldset': {
        borderColor: value ? (error ? '#d32f2f' : '#4caf50') : '#00004e',
        borderWidth: 2,
      },
    },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        PaperProps={{
          sx: { p: fullScreen ? 2 : 3, borderRadius: fullScreen ? 0 : 3, animation: `${fadeIn} 0.4s ease-out` },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#00004e", textAlign: "center", fontSize: { xs: "1.4rem", sm: "1.6rem" } }}>
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
              sx={inputStyle(false, form.NombreCompleto_usu)}
            />

            <TextField
              label="Fecha de nacimiento"
              type="date"
              value={form.FechaNacimiento_usu}
              onChange={handleChange("FechaNacimiento_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={inputStyle(false, form.FechaNacimiento_usu)}
            />

            <TextField
              label="Login de usuario"
              value={form.Login_usu}
              onChange={handleChange("Login_usu")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={inputStyle(false, form.Login_usu)}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={form.Password_usu}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError || " "}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={inputStyle(passwordError, form.Password_usu)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {renderAdornment(passwordError, form.Password_usu)}
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
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError || " "}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={inputStyle(emailError, form.correo_elec_usu)}
              InputProps={{
                endAdornment: <InputAdornment position="end">{renderAdornment(emailError, form.correo_elec_usu)}</InputAdornment>,
              }}
            />

            {!fromLogin && (
              <>
                <TextField
                  label="Contraseña del correo"
                  type={showEmailPassword ? "text" : "password"}
                  value={form.PassWord_correo_usu}
                  onChange={handleChange("PassWord_correo_usu")}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle(false, form.PassWord_correo_usu)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowEmailPassword(!showEmailPassword)}>
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
                  sx={inputStyle(false, form.Id_rol_usu)}
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
                  sx={inputStyle(false, form.Id_suc_usu)}
                >
                  <MenuItem value="1">Sucursal A</MenuItem>
                  <MenuItem value="2">Sucursal B</MenuItem>
                  <MenuItem value="3">Sucursal C</MenuItem>
                </TextField>
              </>
            )}
          </Box>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            ¿Ya tienes cuenta?{" "}
            <Typography component="span" sx={linkStyle} onClick={onSwitchToLogin}>
              Inicia sesión
            </Typography>
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3, pt: 2, flexDirection: { xs: "column-reverse", sm: "row" }, gap: { xs: 2, sm: 0 } }}>
          <Button
            onClick={onClose}
            fullWidth={fullScreen}
            variant="outlined"
            sx={{
              color: "#c62828",
              borderColor: "#c62828",
              fontWeight: "bold",
              "&:hover": { animation: `${pulse} 1s infinite`, backgroundColor: "rgba(198, 40, 40, 0.1)", borderColor: "#b71c1c" },
            }}
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
              fontWeight: "bold",
              "&:hover": { background: "#4B9C5F" },
            }}
          >
            Registrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* === NOTIFICACIONES === */}
      <NotificationSnackbar
        open={success}
        onClose={() => setSuccess(false)}
        message="¡Usuario registrado correctamente! 🎉"
        severity="success"
      />

      <NotificationSnackbar
        open={errorSnackbar}
        onClose={() => setErrorSnackbar(false)}
        message={errorMessage}
        severity="error"
      />
    </>
  );
};

export default RegisterDialog;
