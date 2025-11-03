import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff, Edit, Delete } from "@mui/icons-material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(198,40,40, 0.7); }
  50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(198,40,40, 0.7); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(198,40,40, 0.7); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const UsuariosCRUD = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [usuarios, setUsuarios] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  // 🚀 Cargar lista de usuarios
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios");
    }
  };

  // 🧾 Guardar o actualizar
  const handleSave = async () => {
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser
      ? `http://localhost:3000/usuarios/${editingUser.Id_usu}`
      : "http://localhost:3000/usuarios";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar usuario");

      setSuccess(true);
      setOpenDialog(false);
      setEditingUser(null);
      fetchUsuarios();
    } catch (err) {
      console.error(err);
      setError("Error al guardar usuario");
    }
  };

  // 🗑️ Eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este usuario?")) return;
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, { method: "DELETE" });
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const openEditDialog = (usuario) => {
    setEditingUser(usuario);
    setForm(usuario);
    setOpenDialog(true);
  };

  const openNewDialog = () => {
    setEditingUser(null);
    setForm({
      Id_rol_usu: "",
      NombreCompleto_usu: "",
      FechaNacimiento_usu: "",
      Login_usu: "",
      Password_usu: "",
      correo_elec_usu: "",
      PassWord_correo_usu: "",
      Id_suc_usu: "",
    });
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" color="#00004e" mb={2}>
        Gestión de Usuarios
      </Typography>

      <Button
        variant="contained"
        onClick={openNewDialog}
        sx={{ backgroundColor: "#00004e", "&:hover": { backgroundColor: "#4B9C5F" }, mb: 2 }}
      >
        Nuevo Usuario
      </Button>

      {/* Tabla de usuarios */}
      <Paper sx={{ overflow: "auto", borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#00004e" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white" }}>Login</TableCell>
              <TableCell sx={{ color: "white" }}>Correo</TableCell>
              <TableCell sx={{ color: "white" }}>Rol</TableCell>
              <TableCell sx={{ color: "white" }}>Sucursal</TableCell>
              <TableCell sx={{ color: "white" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((u) => (
              <TableRow key={u.Id_usu}>
                <TableCell>{u.NombreCompleto_usu}</TableCell>
                <TableCell>{u.Login_usu}</TableCell>
                <TableCell>{u.correo_elec_usu}</TableCell>
                <TableCell>{u.Id_rol_usu}</TableCell>
                <TableCell>{u.Id_suc_usu}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDialog(u)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(u.Id_usu)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal (crear/editar) */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        PaperProps={{
          sx: { p: 3, borderRadius: 3, animation: `${fadeIn} 0.4s ease-out` },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#00004e", textAlign: "center" }}>
          {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField label="Nombre completo" value={form.NombreCompleto_usu} onChange={handleChange("NombreCompleto_usu")} />
            <TextField label="Login" value={form.Login_usu} onChange={handleChange("Login_usu")} />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={form.Password_usu}
              onChange={handleChange("Password_usu")}
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
            <TextField label="Correo" value={form.correo_elec_usu} onChange={handleChange("correo_elec_usu")} />
            <TextField label="Fecha nacimiento" type="date" value={form.FechaNacimiento_usu || ""} onChange={handleChange("FechaNacimiento_usu")} />
            <TextField select label="Rol" value={form.Id_rol_usu} onChange={handleChange("Id_rol_usu")}>
              <MenuItem value="1">Administrador</MenuItem>
              <MenuItem value="2">Usuario</MenuItem>
              <MenuItem value="3">Supervisor</MenuItem>
            </TextField>
            <TextField select label="Sucursal" value={form.Id_suc_usu} onChange={handleChange("Id_suc_usu")}>
              <MenuItem value="1">Sucursal A</MenuItem>
              <MenuItem value="2">Sucursal B</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              color: "#c62828",
              borderColor: "#c62828",
              "&:hover": { animation: `${pulse} 1s infinite`, backgroundColor: "rgba(198, 40, 40, 0.1)" },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: "#00004e", "&:hover": { backgroundColor: "#4B9C5F" } }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Operación realizada correctamente</Alert>
      </Snackbar>
    </Box>
  );
};

export default UsuariosCRUD;
