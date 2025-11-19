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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  RadioGroup,
  Radio,
} from "@mui/material";

import {
  CleaningServices,
  Calculate,
  Send,
  Add,
  Delete,
  Business,
  Person,
  SquareFoot,
} from "@mui/icons-material";

import { useState, useEffect } from "react";

// ---------------------- Componente de Totales ----------------------
const AnimatedTotal = ({ label, value }) => (
  <TextField
    label={label.toUpperCase()}
    fullWidth
    value={Number(value || 0).toFixed(2)}
    InputProps={{ readOnly: true }}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        height: 60,
        backgroundColor: "rgba(255,255,255,0.85)",
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
      },
      input: {
        textAlign: "right",
        fontWeight: "bold",
        fontSize: "1rem",
      },
    }}
  />
);

import { LocationOn, Flag } from "@mui/icons-material";

const countryColors = {
  MÉXICO: "#e3f2fd",
  USA: "#fff3e0",
  CANADA: "#f3e5f5",
  default: "#f5f5f5",
};

const MyAutocomplete = ({ label, value, options, onChange }) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) => option.descripcion || ""}
    value={value || null}
    onChange={(_, val) => onChange(val)}
    isOptionEqualToValue={(option, val) => option.id === val?.id}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        sx={{
          width: "100%",
          minWidth: 400,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.85)",
            height: 60,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
          },
          "& .MuiAutocomplete-input": {
            fontSize: "1rem",
          },
        }}
      />
    )}
    renderOption={(props, option) => {
      const bgColor = countryColors[option.CiudadO] || countryColors[option.PaisO] || countryColors.default;
      return (
        <li
          {...props}
          style={{
            backgroundColor: bgColor,
            whiteSpace: "normal",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            borderRadius: 6,
            marginBottom: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <LocationOn sx={{ color: "#1976d2", mr: 1 }} />
            <strong style={{ fontSize: "0.95rem", color: "#00004e" }}>
              {option.nombre}
            </strong>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Flag sx={{ color: "#ff6f00", mr: 1, fontSize: "0.8rem" }} />
            <span style={{ fontSize: "0.85rem", color: "#555", wordBreak: "break-word" }}>
              {option.descripcion}
            </span>
          </Box>
        </li>
      );
    }}
    ListboxProps={{
      style: {
        maxHeight: 400,
        width: "auto",
        minWidth: 550,
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        borderRadius: 8,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.85)",
        padding: 8,
      },
    }}
  />
);

// ===================================================================
// =================== COMPONENTE PRINCIPAL ==========================
// ===================================================================

const QuoterNeoGlassPro = () => {
  // ---------------------- Estado General ----------------------
  const [form, setForm] = useState({
    origen: null,
    destino: null,
    domicilio: false,
    recoleccion: "",
    seguro: "",
    cobroEspecial: "",
    tipoCliente: "fisica",
    subtotal: "",
    iva: "",
    retIva: "",
    total: "",
    observaciones: "",
    nombreCliente: "",
    correoCliente: "",
  });

  const [detalleEnvio, setDetalleEnvio] = useState({
    tipo: "",
    cantidad: "",
    contiene: "",
    largo: "",
    alto: "",
    ancho: "",
    volumenManual: "",
    usarMedidas: true,
  });

  const [articulos, setArticulos] = useState([]);
  const [rutas, setRutas] = useState([]);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // ---------------------- Fetch Rutas ----------------------
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const res = await fetch("http://localhost:3000/full-routes");
        if (!res.ok) throw new Error("Error cargando rutas");
        const data = await res.json();

        setRutas(
          data.map((r) => ({
            id: r.Destino_rut, // o Id_rut según tu API
            nombre: r.Nombre_rut,
            descripcion: `${r.CiudadO}, ${r.EstadoO}, ${r.PaisO} → ${r.CiudadD}, ${r.EstadoD}, ${r.PaisD}`,
            origenDesc: `${r.CiudadO}, ${r.EstadoO}, ${r.PaisO}`,
            destinoDesc: `${r.CiudadD}, ${r.EstadoD}, ${r.PaisD}`,
          }))
        );
      } catch (err) {
        setNotification({
          open: true,
          message: err.message,
          severity: "error",
        });
      }
    };
    fetchRutas();
  }, []);

  // ---------------------- Manejo de cambios ----------------------
  const handleFormChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetalleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDetalleEnvio((prev) => ({ ...prev, [field]: value }));
  };

  // ---------------------- Funciones de Artículos ----------------------
  const handleAddItem = () => {
    if (!detalleEnvio.tipo || !detalleEnvio.cantidad) {
      setNotification({
        open: true,
        message: "Completa Tipo y Cantidad",
        severity: "warning",
      });
      return;
    }
    const nuevo = { ...detalleEnvio };
    if (detalleEnvio.usarMedidas) {
      const { largo, alto, ancho, cantidad } = detalleEnvio;
      if (largo && alto && ancho && cantidad)
        nuevo.volumenCalculado =
          (largo * alto * ancho * cantidad) / 1000000;
    } else if (detalleEnvio.volumenManual) {
      nuevo.volumenCalculado = parseFloat(detalleEnvio.volumenManual);
    }
    setArticulos((prev) => [...prev, nuevo]);
    setDetalleEnvio({
      tipo: "",
      cantidad: "",
      contiene: "",
      largo: "",
      alto: "",
      ancho: "",
      volumenManual: "",
      usarMedidas: true,
    });
  };

  const handleDeleteItem = (index) =>
    setArticulos((prev) => prev.filter((_, i) => i !== index));

  // ---------------------- Cálculo Totales ----------------------
  const calcularTotales = () => {
    const subtotal =
      parseFloat(form.recoleccion || 0) +
      parseFloat(form.seguro || 0) +
      parseFloat(form.cobroEspecial || 0);

    const iva = subtotal * 0.16;
    const retIva = form.tipoCliente === "moral" ? iva * 0.1 : 0;
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
      recoleccion: "",
      seguro: "",
      cobroEspecial: "",
      tipoCliente: "fisica",
      subtotal: "",
      iva: "",
      retIva: "",
      total: "",
      observaciones: "",
      nombreCliente: "",
      correoCliente: "",
    });
    setArticulos([]);
    setDetalleEnvio({
      tipo: "",
      cantidad: "",
      contiene: "",
      largo: "",
      alto: "",
      ancho: "",
      volumenManual: "",
      usarMedidas: true,
    });
  };

  // =====================================================================
  // ==========================   RENDER UI  =============================
  // =====================================================================

  return (
    <Box
      sx={{
        backdropFilter: "blur(12px)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
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
        }}
      >
        🚚 Cotizador de Envíos NeoGlass Pro
      </Typography>

      {/* ============================================================= */}
      {/* RUTAS Y TIPO CLIENTE                                          */}
      {/* ============================================================= */}

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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <MyAutocomplete
              label="Ruta Origen"
              value={form.origen}
              options={rutas}
              onChange={(val) => setForm({ ...form, origen: val })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.domicilio}
                    onChange={handleFormChange("domicilio")}
                  />
                }
                label="¿Entrega a domicilio?"
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          Tipo de Cliente para Facturación
        </Typography>

        <RadioGroup
          row
          value={form.tipoCliente}
          onChange={handleFormChange("tipoCliente")}
        >
          <FormControlLabel
            value="fisica"
            control={<Radio />}
            label={
              <>
                <Person sx={{ verticalAlign: "middle", mr: 1 }} /> Persona Física
              </>
            }
          />
          <FormControlLabel
            value="moral"
            control={<Radio />}
            label={
              <>
                <Business sx={{ verticalAlign: "middle", mr: 1 }} /> Persona Moral
              </>
            }
          />
        </RadioGroup>
      </Paper>

      {/* ============================================================= */}
      {/* DETALLES DEL ENVÍO                                           */}
      {/* ============================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Detalles del envío
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Tipo"
              fullWidth
              value={detalleEnvio.tipo}
              onChange={handleDetalleChange("tipo")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Cantidad"
              fullWidth
              type="number"
              value={detalleEnvio.cantidad}
              onChange={handleDetalleChange("cantidad")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Contiene"
              fullWidth
              value={detalleEnvio.contiene}
              onChange={handleDetalleChange("contiene")}
            />
          </Grid>
        </Grid>

        <FormControlLabel
          sx={{ mt: 3 }}
          control={
            <Checkbox
              checked={detalleEnvio.usarMedidas}
              onChange={() =>
                setDetalleEnvio((prev) => ({
                  ...prev,
                  usarMedidas: !prev.usarMedidas,
                }))
              }
              icon={<SquareFoot />}
              checkedIcon={<SquareFoot color="primary" />}
            />
          }
          label={
            detalleEnvio.usarMedidas
              ? "Usar Medidas (cm)"
              : "Usar Volumen Total (m³)"
          }
        />

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {detalleEnvio.usarMedidas ? (
            <>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Largo (cm)"
                  type="number"
                  fullWidth
                  value={detalleEnvio.largo}
                  onChange={handleDetalleChange("largo")}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Ancho (cm)"
                  type="number"
                  fullWidth
                  value={detalleEnvio.ancho}
                  onChange={handleDetalleChange("ancho")}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Alto (cm)"
                  type="number"
                  fullWidth
                  value={detalleEnvio.alto}
                  onChange={handleDetalleChange("alto")}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={9}>
              <TextField
                label="Volumen Total (m³)"
                type="number"
                fullWidth
                value={detalleEnvio.volumenManual}
                onChange={handleDetalleChange("volumenManual")}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Add />}
              onClick={handleAddItem}
              sx={{
                height: 55,
                borderRadius: 3,
                background: "#00004e",
                "&:hover": { background: "#00006e" },
              }}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ============================================================= */}
      {/* TABLA DE ARTÍCULOS                                           */}
      {/* ============================================================= */}

      {articulos.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            background: "rgba(255,255,255,0.25)",
          }}
        >
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0, 0, 78, 0.1)" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Cant.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Contenido</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Volumen (m³)
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Acción
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {articulos.map((item, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.contiene}</TableCell>
                    <TableCell align="right">
                      {item.volumenCalculado
                        ? item.volumenCalculado.toFixed(4)
                        : "N/A"}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDeleteItem(i)}
                        size="small"
                        color="error"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 1 }} />

          <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
            Volumen Total:{" "}
            {articulos
              .reduce(
                (sum, item) => sum + (item.volumenCalculado || 0),
                0
              )
              .toFixed(4)}{" "}
            m³
          </Typography>
        </Paper>
      )}

      {/* ============================================================= */}
      {/* COSTOS + TOTALES                                             */}
      {/* ============================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Costos Adicionales
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Recolección ($)"
              fullWidth
              type="number"
              value={form.recoleccion}
              onChange={handleFormChange("recoleccion")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Seguro ($)"
              fullWidth
              type="number"
              value={form.seguro}
              onChange={handleFormChange("seguro")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Cobro especial ($)"
              fullWidth
              type="number"
              value={form.cobroEspecial}
              onChange={handleFormChange("cobroEspecial")}
            />
          </Grid>
        </Grid>

        {/* Totales */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <AnimatedTotal label="Subtotal" value={form.subtotal} />
              <AnimatedTotal label="IVA (16%)" value={form.iva} />
              <AnimatedTotal
                label={`Retención IVA (${
                  form.tipoCliente === "moral" ? "10%" : "0%"
                })`}
                value={form.retIva}
              />
              <AnimatedTotal label="Total General" value={form.total} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Observaciones"
              fullWidth
              multiline
              rows={4}
              value={form.observaciones}
              onChange={handleFormChange("observaciones")}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Nombre del Cliente"
              fullWidth
              value={form.nombreCliente}
              onChange={handleFormChange("nombreCliente")}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Correo del Cliente"
              type="email"
              fullWidth
              value={form.correoCliente}
              onChange={handleFormChange("correoCliente")}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* ============================================================= */}
      {/* BOTONES FINALES                                               */}
      {/* ============================================================= */}

      <Box
        sx={{
          textAlign: "center",
          mt: 3,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLimpiar}
          startIcon={<CleaningServices />}
          sx={{ borderRadius: 3 }}
        >
          Limpiar Todo
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Calculate />}
          onClick={calcularTotales}
          sx={{ borderRadius: 3 }}
        >
          Calcular
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<Send />}
          sx={{ borderRadius: 3 }}
        >
          Enviar
        </Button>
      </Box>

      {/* Notificaciones */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={() =>
          setNotification((prev) => ({ ...prev, open: false }))
        }
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuoterNeoGlassPro;
