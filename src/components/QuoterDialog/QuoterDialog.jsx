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
  LocationOn,
  Flag,
} from "@mui/icons-material";

import { useState, useEffect } from "react";

// Colores por país/ciudad
const countryColors = {
  MÉXICO: "#e3f2fd",
  USA: "#fff3e0",
  CANADA: "#f3e5f5",
  default: "#f5f5f5",
};

// Estilos neumórficos
const neumorphicStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
};

const ModernRouteAutocomplete = ({ label, value, options, onChange }) => (
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
          ...neumorphicStyle,
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            height: 60,
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.18)" },
          },
          "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 },
        }}
      />
    )}
    renderOption={(props, option) => (
      <li
        {...props}
        style={{
          backgroundColor: "#e3f2fd",
          whiteSpace: "normal",
          padding: "8px 12px",
          borderRadius: 8,
          marginBottom: 6,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          transition: "all 0.2s ease",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOn sx={{ color: "#1976d2" }} />
          <strong style={{ fontSize: "0.95rem", color: "#00004e" }}>
            {option.origenDesc}
          </strong>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Flag sx={{ color: "#ff6f00", fontSize: "0.8rem" }} />
          <span style={{ fontSize: "0.85rem", color: "#555" }}>
            {option.destinoDesc}
          </span>
        </Box>
        <span style={{ fontSize: "0.85rem", color: "#333" }}>
          {option.descripcion}
        </span>
      </li>
    )}
    ListboxProps={{
      sx: {
        maxHeight: 400,
        minWidth: 550,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: 1,
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        "& li:hover": {
          backgroundColor: "rgba(75,156,95,0.25)",
          transform: "translateY(-2px) scale(1.03)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          cursor: "pointer",
        },
      },
    }}
  />
);


// Componente para totales
const AnimatedTotal = ({ label, value }) => (
  <TextField
    label={label.toUpperCase()}
    fullWidth
    value={Number(value || 0).toFixed(2)}
    InputProps={{ readOnly: true }}
    sx={{
      ...neumorphicStyle,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        height: 60,
        backgroundColor: "rgba(255,255,255,0.85)",
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
      },
      input: { textAlign: "right", fontWeight: "bold", fontSize: "1rem" },
    }}
  />
);

const QuoterNeoGlassPro = () => {
  const [form, setForm] = useState({
    origen: null,
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
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
  const [classBulk, setClassBulk] = useState([]);

  useEffect(() => {
    const fetchClassBulk = async () => {
      try {
        const res = await fetch("http://localhost:3000/classbulk");
        const data = await res.json();

        setClassBulk(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            observations: item.observations,
          }))
        );
      } catch (error) {
        console.error("Error cargando classbulk", error);
      }
    };

    fetchClassBulk();
  }, []);

// const BulkTypeAutocomplete = ({ label, value, options, onChange }) => (
//   <Autocomplete
//     options={options}
//     getOptionLabel={(option) => option.name || ""}
//     value={value || null}
//     onChange={(_, val) => onChange(val)}
//     isOptionEqualToValue={(option, val) => option.id === val?.id}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         label={label}
//         variant="outlined"
//         sx={{
//           ...neumorphicStyle,
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 8,
//             minWidth: 260,
//             backgroundColor: "rgba(255,255,255,0.9)",
//             height: 60,
//             boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//           },
//           "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 },
//         }}
//       />
//     )}
//     renderOption={(props, option) => (
//       <li
//         {...props}
//         style={{
//           backgroundColor: "#e3f2fd", // azul claro suave
//           whiteSpace: "normal",
//           padding: "6px 10px",
//           borderRadius: 6,
//           marginBottom: 4,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           transition: "all 0.2s ease",
//         }}
//       >
//         <strong style={{ fontSize: "1rem", color: "#00004e" }}>
//           {option.name}
//         </strong>
//         {option.observations && (
//           <span style={{ fontSize: "0.85rem", color: "#555" }}>
//             {option.observations}
//           </span>
//         )}
//       </li>
//     )}
//     ListboxProps={{
//       sx: {
//         maxHeight: 300,
//         minWidth: 160,
//         borderRadius: 6,
//         backgroundColor: "rgba(255,255,255,0.95)",
//         padding: 1,
//         boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
//         "& li:hover": {
//           backgroundColor: "rgba(75,156,95,0.18)", // hover verde Calafia
//           transform: "scale(1.03)",
//           cursor: "pointer",
//         },
//       },
//     }}
//   />
// );
const ModernBulkAutocomplete = ({ label, value, options, onChange }) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) => option.name || ""}
    value={value || null}
    onChange={(_, val) => onChange(val)}
    isOptionEqualToValue={(option, val) => option.id === val?.id}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        sx={{
          ...neumorphicStyle,
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            minWidth: 250,
            backgroundColor: "rgba(255,255,255,0.9)",
            height: 60,
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.18)" },
          },
          "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 },
        }}
      />
    )}
    renderOption={(props, option) => (
      <li
        {...props}
        style={{
          backgroundColor: "#e3f2fd",
          whiteSpace: "normal",
          padding: "8px 12px",
          borderRadius: 6,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          transition: "all 0.2s ease",
        }}
      >
        <strong style={{ fontSize: "1rem", color: "#00004e" }}>
          {option.name}
        </strong>
        {option.observations && (
          <span style={{ fontSize: "0.85rem", color: "#555" }}>
            {option.observations}
          </span>
        )}
      </li>
    )}
    ListboxProps={{
      sx: {
        maxHeight: 300,
        minWidth: 260,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: 1,
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        "& li:hover": {
          backgroundColor: "rgba(75,156,95,0.25)",
          transform: "translateY(-2px) scale(1.03)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          cursor: "pointer",
        },
      },
    }}
  />
);


  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const res = await fetch("http://localhost:3000/full-routes");
        if (!res.ok) throw new Error("Error cargando rutas");
        const data = await res.json();
        setRutas(data.map((r) => ({
          id: r.Destino_rut,
          Nombre: r.Nombre_rut,
          descripcion: `${r.Nombre_rut}`,
          origenDesc: `${r.Nombre_rut}`,
          destinoDesc: `${r.CiudadO}, ${r.EstadoO}, ${r.PaisO} → ${r.CiudadD}, ${r.EstadoD}, ${r.PaisD}`,
        })));
      } catch (err) {
        setNotification({ open: true, message: err.message, severity: "error" });
      }
    };
    fetchRutas();
  }, []);

  const handleFormChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetalleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDetalleEnvio((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
    if (!detalleEnvio.tipo || !detalleEnvio.cantidad) {
      setNotification({ open: true, message: "Completa Tipo y Cantidad", severity: "warning" });
      return;
    }

    const nuevoArticulo = { ...detalleEnvio };

    // Cálculo del volumen
    if (detalleEnvio.usarMedidas) {
      const { largo, alto, ancho, cantidad } = detalleEnvio;
      if (largo && alto && ancho && cantidad)
        nuevoArticulo.volumenCalculado = (largo * alto * ancho * cantidad) / 1000000;
    } else if (detalleEnvio.volumenManual) {
      nuevoArticulo.volumenCalculado = parseFloat(detalleEnvio.volumenManual);
    }

    // Agregar el artículo
    setArticulos((prevArticulos) => [...prevArticulos, nuevoArticulo]);

    // Limpiar los campos
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

  const handleDeleteItem = (index) => setArticulos((prev) => prev.filter((_, i) => i !== index));

  const calcularTotales = () => {
    const subtotal = parseFloat(form.recoleccion || 0) + parseFloat(form.seguro || 0) + parseFloat(form.cobroEspecial || 0);
    const iva = subtotal * 0.16;
    const retIva = form.tipoCliente === "moral" ? iva * 0.1 : 0;
    const total = subtotal + iva - retIva;
    setForm((prev) => ({ ...prev, subtotal: subtotal.toFixed(2), iva: iva.toFixed(2), retIva: retIva.toFixed(2), total: total.toFixed(2) }));
  };

  const handleLimpiar = () => {
    setForm({
      origen: null,
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
    setDetalleEnvio({ tipo: "", cantidad: "", contiene: "", largo: "", alto: "", ancho: "", volumenManual: "", usarMedidas: true });
  };

  return (
    <Box sx={{ ...neumorphicStyle, backdropFilter: "blur(12px)", p: 4, maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" sx={{ mb: 4, fontWeight: "bold", color: "#00004e" }}>🚚 Cotizador de Envíos NeoGlass Pro</Typography>

   <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Nombre del Cliente"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Correo del Cliente"
            fullWidth
            type="email"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Tipo de Cliente</Typography>
          <RadioGroup row value={form.tipoCliente} onChange={handleFormChange("tipoCliente")}>
            <FormControlLabel
              value="fisica"
              control={<Radio />}
              label={<><Person sx={{ mr: 1 }} /> Persona Física</>}
            />
            <FormControlLabel
              value="moral"
              control={<Radio />}
              label={<><Business sx={{ mr: 1 }} /> Persona Moral</>}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Paper>

      {/* Observaciones */}
      <Paper elevation={0} sx={{ ...neumorphicStyle, p: 2, mb: 3 }}>
        <TextField label="Observaciones" multiline rows={4} fullWidth value={form.observaciones} onChange={handleFormChange("observaciones")} />
      </Paper>

      

      {/* Autocomplete para Ruta Origen */}
      {/* <Grid item xs={12}>
        <MyAutocomplete
          label="Ruta Origen"
          value={form.origen}
          options={rutas}
          onChange={(val) => setForm({ ...form, origen: val })}
          sx={{
            width: "100%",
            minWidth: "900px",
            '& .MuiOutlinedInput-root': {
              height: '60px',
            },
          }}
        />
      </Grid> */}
      <ModernRouteAutocomplete
        label="Ruta Origen"
        value={form.origen}
        options={rutas}
        onChange={(val) => setForm({ ...form, origen: val })}
      />

      {/* Detalles del Envío */}
      <Paper elevation={0} sx={{ ...neumorphicStyle, p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Detalles del Envío</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ModernBulkAutocomplete
              label="Tipo de bulto"
              value={detalleEnvio.tipo}
              options={classBulk}
              onChange={(val) => setDetalleEnvio({ ...detalleEnvio, tipo: val })}
            />

          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField label="Cantidad" type="number" fullWidth value={detalleEnvio.cantidad} onChange={handleDetalleChange("cantidad")} sx={{ ...neumorphicStyle }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Contiene" fullWidth value={detalleEnvio.contiene} onChange={handleDetalleChange("contiene")} sx={{ ...neumorphicStyle }} />
          </Grid>
                    <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <FormControlLabel
                control={<Checkbox checked={form.domicilio} onChange={handleFormChange("domicilio")} />}
                label="¿Entrega a domicilio?"
              />
            </Box>
          </Grid>
        </Grid>

        <FormControlLabel
          sx={{ mt: 3 }}
          control={<Checkbox checked={detalleEnvio.usarMedidas} onChange={() => setDetalleEnvio((prev) => ({ ...prev, usarMedidas: !prev.usarMedidas }))} />}
          label={detalleEnvio.usarMedidas ? "Usar Medidas (cm)" : "Usar Volumen Total (m³)"}
        />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {detalleEnvio.usarMedidas ? (
            <>
              <Grid item xs={12} sm={3}>
                <TextField label="Largo (cm)" type="number" fullWidth value={detalleEnvio.largo} onChange={handleDetalleChange("largo")} sx={{ ...neumorphicStyle }} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Ancho (cm)" type="number" fullWidth value={detalleEnvio.ancho} onChange={handleDetalleChange("ancho")} sx={{ ...neumorphicStyle }} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Alto (cm)" type="number" fullWidth value={detalleEnvio.alto} onChange={handleDetalleChange("alto")} sx={{ ...neumorphicStyle }} />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={9}>
              <TextField label="Volumen Total (m³)" type="number" fullWidth value={detalleEnvio.volumenManual} onChange={handleDetalleChange("volumenManual")} sx={{ ...neumorphicStyle }} />
            </Grid>
          )}

          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Add />}
              onClick={handleAddItem}
              sx={{ height: 55, borderRadius: 3, background: "#00004e", "&:hover": { background: "#00006e" } }}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de artículos */}
      {articulos.length > 0 && (
        <Paper elevation={0} sx={{ ...neumorphicStyle, p: 3, mb: 3 }}>
          <TableContainer sx={{ minWidth: 600 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0, 0, 78, 0.1)" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Cant.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Contenido</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Volumen (m³)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos.map((item, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.contiene}</TableCell>
                    <TableCell align="right">{item.volumenCalculado ? item.volumenCalculado.toFixed(4) : "N/A"}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteItem(i)} size="small" color="error">
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
            Volumen Total: {articulos.reduce((sum, item) => sum + (item.volumenCalculado || 0), 0).toFixed(4)} m³
          </Typography>
        </Paper>
      )}

      {/* Costos y totales */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField label="Recolección" type="number" fullWidth value={form.recoleccion} onChange={handleFormChange("recoleccion")} sx={{ ...neumorphicStyle }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Seguro" type="number" fullWidth value={form.seguro} onChange={handleFormChange("seguro")} sx={{ ...neumorphicStyle }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Cobro Especial" type="number" fullWidth value={form.cobroEspecial} onChange={handleFormChange("cobroEspecial")} sx={{ ...neumorphicStyle }} />
        </Grid>
      </Grid>

      {/* Totales */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sm={3}><AnimatedTotal label="Subtotal" value={form.subtotal} /></Grid>
        <Grid item xs={6} sm={3}><AnimatedTotal label="IVA" value={form.iva} /></Grid>
        <Grid item xs={6} sm={3}><AnimatedTotal label="Ret IVA" value={form.retIva} /></Grid>
        <Grid item xs={6} sm={3}><AnimatedTotal label="Total" value={form.total} /></Grid>
      </Grid>

      {/* Botones */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
        <Button variant="outlined" color="secondary" onClick={handleLimpiar} startIcon={<CleaningServices />} sx={{ borderRadius: 3, width: "auto" }}>
          Limpiar Todo
        </Button>
        <Button variant="contained" color="primary" startIcon={<Calculate />} onClick={calcularTotales} sx={{ borderRadius: 3, width: "auto" }}>
          Calcular
        </Button>
        <Button variant="contained" color="success" startIcon={<Send />} sx={{ borderRadius: 3, width: "auto" }}>
          Enviar
        </Button>
      </Box>

      {/* Notificaciones */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={notification.severity} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuoterNeoGlassPro;
