import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RouteIcon from "@mui/icons-material/AltRoute";
import NotificationSnackbar from "../components/NotificationSnackbar";


const RoutesPage = () => {
  const [rutas, setRutas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fields = [
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "origen", label: "Origen", type: "text" },
    { name: "destino", label: "Destino", type: "text" },
    { name: "distanciaKm", label: "Distancia (KM)", type: "number" },
    { name: "duracionHoras", label: "Duración (Hrs)", type: "number" },
    { name: "cuotaTonelada", label: "Cuota Tonelada", type: "number" },
    { name: "cuotaAutopista", label: "Cuota Autopista", type: "number" },
    { name: "cuotaBarco", label: "Cuota Barco", type: "number" },
    { name: "cobrarManiobra", label: "Cobrar Maniobra", type: "number" },
    { name: "observaciones", label: "Observaciones", type: "text", multiline: true, rows: 3 },
    { name: "estatus", label: "Estatus", type: "text" },
    { name: "documento", label: "Documento", type: "text" },
    { name: "idSucursal", label: "ID Sucursal", type: "number" },
  ];

  // Inicializar formulario vacío
  const emptyForm = () => {
    const f = {};
    fields.forEach((field) => (f[field.name] = ""));
    return f;
  };

  useEffect(() => {
    setForm(emptyForm());
    fetchRutas();
  }, []);

  // ======= FETCH DE RUTAS =======
  const fetchRutas = async () => {
    try {
      const res = await fetch("http://localhost:3000/routes");
      if (!res.ok) throw new Error("Error cargando rutas");
      const data = await res.json();
      const mapped = data.map((r) => ({
        id: r.Id_rut,
        nombre: r.Nombre_rut,
        origen: r.Origen_rut,
        destino: r.Destino_rut,
        distanciaKm: r.DistanciaKM_rut,
        duracionHoras: r.DuracionHoras_rut,
        cuotaTonelada: r.CuotaTonelada_rut,
        cuotaAutopista: r.CuotaAutopts_rut,
        cuotaBarco: r.CuotaBarco_rut,
        cobrarManiobra: r.CobrarManiobra_rut,
        observaciones: r.Observaciones_rut,
        estatus: r.Estatus_rut,
        documento: r.Documento_rut,
        fechaActualizacion: r.FechaActualizacion_rut,
        idSucursal: r.Id_suc_rut,
      }));
      setRutas(mapped);
    } catch (err) {
      setNotification({ open: true, message: err.message, severity: "error" });
    }
  };

  // ======= HANDLERS =======
  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleOpenDialog = (ruta = null) => {
    if (ruta) {
      setForm(ruta);
      setEditingId(ruta.id);
    } else {
      setForm(emptyForm());
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm(emptyForm());
    setEditingId(null);
  };

  const handleSave = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `http://localhost:3000/routes/${editingId}` : "http://localhost:3000/routes";

    const body = {
      Id_rut: editingId ?? 0,
      Nombre_rut: form.nombre,
      Origen_rut: form.origen,
      Destino_rut: form.destino,
      DistanciaKM_rut: form.distanciaKm,
      DuracionHoras_rut: form.duracionHoras,
      CuotaTonelada_rut: form.cuotaTonelada,
      CuotaAutopts_rut: form.cuotaAutopista,
      CuotaBarco_rut: form.cuotaBarco,
      CobrarManiobra_rut: form.cobrarManiobra,
      Observaciones_rut: form.observaciones,
      Estatus_rut: form.estatus,
      Documento_rut: form.documento,
      Id_suc_rut: form.idSucursal,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error guardando ruta");
      setNotification({ open: true, message: "Ruta guardada correctamente", severity: "success" });
      handleCloseDialog();
      fetchRutas();
    } catch (err) {
      setNotification({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta ruta?")) return;
    try {
      const res = await fetch(`http://localhost:3000/routes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando ruta");
      setNotification({ open: true, message: "Ruta eliminada correctamente", severity: "success" });
      fetchRutas();
    } catch (err) {
      setNotification({ open: true, message: err.message, severity: "error" });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "origen", headerName: "Origen", width: 120 },
    { field: "destino", headerName: "Destino", width: 120 },
    { field: "distanciaKm", headerName: "Distancia (KM)", width: 130 },
    { field: "duracionHoras", headerName: "Duración (Hrs)", width: 130 },
    { field: "cuotaTonelada", headerName: "Cuota Tonelada", width: 150 },
    { field: "documento", headerName: "Documento", width: 150 },
    {
      field: "fechaActualizacion",
      headerName: "Actualización",
      width: 180,
      renderCell: (params) =>
        params.row.fechaActualizacion ? new Date(params.row.fechaActualizacion).toLocaleString("es-MX") : "",
    },
    { field: "idSucursal", headerName: "ID Sucursal", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem key="edit" icon={<EditIcon />} label="Editar" onClick={() => handleOpenDialog(params.row)} />,
        <GridActionsCellItem key="delete" icon={<DeleteIcon />} label="Eliminar" onClick={() => handleDelete(params.id)} />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <RouteIcon sx={{ mr: 1 }} />
        <Typography variant="h4">Gestión de Rutas</Typography>
      </Box>

      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Nueva Ruta
      </Button>

      <Box sx={{ height: 500 }}>
        <DataGrid rows={rutas} columns={columns} getRowId={(row) => row.id} pageSize={5} />
      </Box>

      {/* Dialogo de registro/edición */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" fullScreen={fullScreen}>
        <DialogTitle>{editingId ? "Editar Ruta" : "Registrar Ruta"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {fields.map((f) => (
              <TextField
                key={f.name}
                label={f.label}
                type={f.type}
                value={form[f.name] || ""}
                onChange={handleChange(f.name)}
                fullWidth
                multiline={f.multiline || false}
                rows={f.rows || 1}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleCloseDialog} color="error">Cancelar</Button>
          <Button onClick={handleSave} variant="contained">{editingId ? "Guardar" : "Registrar"}</Button>
        </DialogActions>
      </Dialog>

      {/* Notificación centralizada */}
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
};

export default RoutesPage;
