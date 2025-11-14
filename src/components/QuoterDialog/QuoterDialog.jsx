// src/components/QuoterNeoGlassPro.jsx
import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Autocomplete,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { CleaningServices, Calculate, Send } from "@mui/icons-material";
import { useState, useEffect } from "react";

// --- Animación de totales ---
const AnimatedTotal = ({ label, value }) => (
  <TextField
    label={label.toUpperCase()}
    fullWidth
    value={Number(value || 0).toFixed(2)}
    InputProps={{ readOnly: true }}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        height: 55,
        backgroundColor: "rgba(255,255,255,0.85)",
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
      },
      input: { textAlign: "right", fontWeight: "bold" },
    }}
  />
);

const QuoterNeoGlassPro = () => {
  const [form, setForm] = useState({
    origen: null,
    destino: null,
    domicilio: false,
    tipo: "",
    cantidad: "",
    contiene: "",
    recoleccion: "",
    seguro: "",
    cobroEspecial: "",
    retencion: false,
    manual: false,
    largo: "",
    alto: "",
    ancho: "",
    volumen: "",
    subtotal: "",
    iva: "",
    retIva: "",
    total: "",
    observaciones: "",
    nombreCliente: "",
    correoCliente: "",
  });

  const [rutas, setRutas] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // 🔹 Fetch dinámico de rutas
  const fetchRutas = async () => {
    try {
      const res = await fetch("http://localhost:3000/routes");
      if (!res.ok) throw new Error("Error cargando rutas");
      const data = await res.json();
      const mapped = data.map((r) => ({
        id: r.Id_rut,
        nombre: r.Nombre_rut,
      }));
      setRutas(mapped);
    } catch (err) {
      setNotification({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchRutas();
  }, []);

  // 🔹 Manejo de cambios
  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Calcular totales
  const calcularTotales = () => {
    const subtotal =
      parseFloat(form.recoleccion || 0) +
      parseFloat(form.seguro || 0) +
      parseFloat(form.cobroEspecial || 0);
    const iva = subtotal * 0.16;
    const retIva = form.retencion ? iva * 0.1 : 0;
    const total = subtotal + iva - retIva;

    setForm((prev) => ({
      ...prev,
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      retIva: retIva.toFixed(2),
      total: total.toFixed(2),
    }));
  };

  const handleLimpiar = () => {
    setForm({
      origen: null,
      destino: null,
      domicilio: false,
      tipo: "",
      cantidad: "",
      contiene: "",
      recoleccion: "",
      seguro: "",
      cobroEspecial: "",
      retencion: false,
      manual: false,
      largo: "",
      alto: "",
      ancho: "",
      volumen: "",
      subtotal: "",
      iva: "",
      retIva: "",
      total: "",
      observaciones: "",
      nombreCliente: "",
      correoCliente: "",
    });
  };

const renderAutocomplete = (label, value, options, field) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) => option.nombre || ""}
    value={value || null}
    onChange={(_, val) => setForm({ ...form, [field]: val })}
    isOptionEqualToValue={(option, val) => option.id === val.id}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        sx={{
          // 🔹 Aumentamos el ancho de los inputs de origen/destino
          width: field === "origen" || field === "destino" ? "100%" : "auto",
          minWidth: field === "origen" || field === "destino" ? 180 : 0, // aumenta o reduce este valor
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.85)",
            height: 55,
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.1)",
          },
          "& .MuiAutocomplete-input": {
            fontSize: "0.95rem",
          },
        }}
      />
    )}
  />
);


  return (
    <Box
      sx={{
        backdropFilter: "blur(12px)",
        background: "linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
        borderRadius: 4,
        boxShadow:
          "inset 1px 1px 3px rgba(255,255,255,0.5), 3px 3px 15px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.3)",
        p: { xs: 2, sm: 3, md: 4 },
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#00004e",
          textShadow: "0 1px 3px rgba(0,0,0,0.2)",
          letterSpacing: "0.5px",
        }}
      >
        🚚 Cotizador de Envíos NeoGlass Pro
      </Typography>

      {/* Información de ruta */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          mt: "-30px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Información de ruta
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {renderAutocomplete("Ruta origen", form.origen, rutas, "origen")}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderAutocomplete("Ruta destino", form.destino, rutas, "destino")}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.domicilio}
                  onChange={handleChange("domicilio")}
                />
              }
              label="¿A domicilio?"
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Detalles del envío */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          mt: "-20px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Detalles del envío
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Tipo" fullWidth value={form.tipo} onChange={handleChange("tipo")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Cantidad" fullWidth value={form.cantidad} onChange={handleChange("cantidad")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Contiene" fullWidth value={form.contiene} onChange={handleChange("contiene")} />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={form.retencion} onChange={handleChange("retencion")} />}
            label="Retención IVA"
          />
          <FormControlLabel
            control={<Checkbox checked={form.manual} onChange={handleChange("manual")} />}
            label="Entrada manual"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Recolección ($)" fullWidth value={form.recoleccion} onChange={handleChange("recoleccion")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Seguro ($)" fullWidth value={form.seguro} onChange={handleChange("seguro")} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Cobro especial ($)" fullWidth value={form.cobroEspecial} onChange={handleChange("cobroEspecial")} />
          </Grid>
        </Grid>
      </Paper>

      {/* Datos del cliente */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          mt: "-20px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Datos del cliente
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre del cliente" fullWidth value={form.nombreCliente} onChange={handleChange("nombreCliente")} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Correo electrónico" fullWidth type="email" value={form.correoCliente} onChange={handleChange("correoCliente")} />
          </Grid>
        </Grid>
      </Paper>

      {/* Totales */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          mt: "-20px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Totales
        </Typography>
        <Grid container spacing={2}>
          {["subtotal", "iva", "retIva", "total"].map((campo, i) => (
            <Grid item xs={12} sm={3} key={i}>
              <AnimatedTotal label={campo} value={form[campo]} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Botones */}
      {/* <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Calculate />}
          onClick={calcularTotales}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: "linear-gradient(90deg, #001A72, #0052D4)",
            "&:hover": { background: "linear-gradient(90deg, #00218F, #0066FF)" },
          }}
        >
          Calcular
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CleaningServices />}
          onClick={handleLimpiar}
          sx={{ borderRadius: 3, px: 4, py: 1.5 }}
        >
          Limpiar
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<Send />}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: "linear-gradient(90deg, #00B712, #5AFF15)",
            color: "#003300",
          }}
        >
          Enviar
        </Button>
      </Box> */}
   <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Cambiar a columna en pantallas pequeñas
        justifyContent: "center",
        gap: 3,
        width: "100%", // Asegurar que los botones ocupen todo el ancho
        mt: 2,
      }}
    >
      {/* Botón Calcular */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Calculate />}
        onClick={calcularTotales}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          background: "linear-gradient(90deg, #4B9C5F, #4B9C5F)",
          "&:hover": { background: "linear-gradient(90deg, #4B9C5F, #4B9C5F)" },
          width: { xs: "100%", sm: "auto" }, // Ocupa todo el ancho en móviles
        }}
      >
        Calcular
      </Button>

      {/* Botón Limpiar */}
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<CleaningServices />}
        onClick={handleLimpiar}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          width: { xs: "100%", sm: "auto" }, // Ocupa todo el ancho en móviles
        }}
      >
        Limpiar
      </Button>

      {/* Botón Enviar */}
      <Button
        variant="contained"
        color="success"
        startIcon={<Send />}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          background: "linear-gradient(90deg, #00004e, #00004e)",
          color: "#ffffff",
          width: { xs: "100%", sm: "auto" }, // Ocupa todo el ancho en móviles
        }}
      >
        Enviar
      </Button>
    </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default QuoterNeoGlassPro;
