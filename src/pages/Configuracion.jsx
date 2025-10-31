import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Grid,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";

const Configuracion = () => {
  const [user, setUser] = useState({
    nombre: "Carlos Ramírez",
    correo: "carlos@example.com",
    sucursal: "Sucursal A",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [photo, setPhoto] = useState("/img/default-avatar.png");

  // 🔧 Manejar cambio de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleSave = () => {
    alert("✅ Configuración guardada correctamente");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#00004e" }}
      >
        ⚙️ Configuración del Usuario
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Imagen de perfil */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Avatar
              src={photo}
              alt="Foto de perfil"
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: "3px solid #00004e",
              }}
            />
            <IconButton
              color="primary"
              component="label"
              sx={{ color: "#4B9C5F" }}
            >
              <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
              <PhotoCamera />
            </IconButton>
          </Grid>

          {/* Datos del usuario */}
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 600, color: "#00004e" }}
            >
              Datos personales
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Nombre completo"
                value={user.nombre}
                onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                fullWidth
              />

              <TextField
                label="Correo electrónico"
                type="email"
                value={user.correo}
                onChange={(e) => setUser({ ...user, correo: e.target.value })}
                fullWidth
              />

              <TextField
                label="Sucursal"
                value={user.sucursal}
                onChange={(e) => setUser({ ...user, sucursal: e.target.value })}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Cambiar contraseña */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#00004e" }}
        >
          Cambiar contraseña
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 400 }}>
          <TextField
            label="Nueva contraseña"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Preferencias */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#00004e" }}
        >
          Preferencias
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="success"
            />
          }
          label="Modo oscuro"
        />

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#00004e",
              "&:hover": { backgroundColor: "#4B9C5F" },
            }}
            onClick={handleSave}
          >
            Guardar cambios
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Configuracion;
