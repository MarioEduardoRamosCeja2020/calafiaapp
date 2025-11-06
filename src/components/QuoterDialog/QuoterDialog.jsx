import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  Autocomplete,
  Paper,
  Divider,
} from "@mui/material";
import {
  CleaningServices,
  Calculate,
  Send,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";

const QuoterNeoGlassPro = () => {
  const [form, setForm] = useState({
    origen: "",
    destino: "",
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
    telefonoCliente: "",
    metodo: "dimensiones",
  });

  const rutas = [
    "Sucursal Guadalajara",
    "Sucursal Monterrey",
    "Sucursal Puebla",
    "Sucursal Querétaro",
    "Sucursal León",
    "Sucursal CDMX",
    "Sucursal Cancún",
    "Sucursal Mérida",
  ];

  const tipos = ["Caja", "Bote", "Barril", "Tambor", "Pallet", "Otro"];

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm({ ...form, [field]: value });
  };

  const handleCalcular = () => {
    const volumen =
      form.metodo === "dimensiones"
        ? (
            (parseFloat(form.largo || 0) *
              parseFloat(form.alto || 0) *
              parseFloat(form.ancho || 0)) /
            1000000
          ).toFixed(2)
        : parseFloat(form.volumen || 0);

    const subtotal =
      parseFloat(form.recoleccion || 0) +
      parseFloat(form.seguro || 0) +
      parseFloat(form.cobroEspecial || 0);
    const iva = subtotal * 0.16;
    const retIva = form.retencion ? iva * 0.1 : 0;
    const total = subtotal + iva - retIva;

    setForm({
      ...form,
      volumen,
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      retIva: retIva.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const handleLimpiar = () => {
    setForm({
      origen: "",
      destino: "",
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
      telefonoCliente: "",
      metodo: "dimensiones",
    });
  };

  // Hook para calcular ancho dinámico de Autocomplete
  const useDynamicWidth = (text, min = 250, max = 500) => {
    const ref = useRef(null);
    const [width, setWidth] = useState(min);

    useEffect(() => {
      if (!ref.current) return;
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.whiteSpace = "pre";
      span.style.font = getComputedStyle(ref.current).font;
      span.textContent = text || "";
      document.body.appendChild(span);
      let newWidth = Math.min(Math.max(span.offsetWidth + 40, min), max);
      setWidth(newWidth);
      document.body.removeChild(span);
    }, [text, min, max]);

    return [ref, width];
  };

  const renderAutocomplete = (label, value, options, field) => {
    const [ref, width] = useDynamicWidth(value, 250, 500);
    return (
      <Autocomplete
        freeSolo
        options={options}
        value={value}
        onChange={(_, val) => setForm({ ...form, [field]: val })}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={ref}
            label={label}
            variant="outlined"
            value={value}
            onChange={handleChange(field)}
            sx={{
              width: width,
              transition: "width 0.3s",
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.85)",
                height: 55,
              },
            }}
          />
        )}
      />
    );
  };

  return (
    <Box
      sx={{
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.15)",
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
        🚚 Cotizador de Envíos
      </Typography>

      {/* Información de ruta */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          mt:"-40px", // Añadido para poner el margen superior en 0
        }}

      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e" }}>
          Información de ruta
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {renderAutocomplete("Ruta origen", form.origen, rutas, "origen")}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderAutocomplete("Ruta destino", form.destino, rutas, "destino")}
          </Grid>
        

          <Grid item xs={12} sm={6}>
                      <FormControlLabel
            control={
              <Checkbox
                checked={form.domicilio}
                onChange={handleChange("domicilio")}
              />
            }
            label="¿A domicilio?"
            sx={{ mt: 2 }}
          />             
          </Grid>
        </Grid>
      </Paper>

      {/* Detalles del envío */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          mt: 0,
          mb:0,
        }}
      >
        <Typography variant="h6" sx={{color: "#00004e",mt:"-50px",
          mb:0, }}>
          Detalles del envío
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {renderAutocomplete("Tipo", form.tipo, tipos, "tipo")}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Cantidad"
              fullWidth
              value={form.cantidad}
              onChange={handleChange("cantidad")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  height: 55,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Contiene"
              fullWidth
              value={form.contiene}
              onChange={handleChange("contiene")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  height: 55,
                },
              }}
            />
          </Grid>
                    <Grid item xs={12} sm={4}>
            <TextField
              label="Recolección ($)"
              fullWidth
              value={form.recoleccion}
              onChange={handleChange("recoleccion")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  height: 55,
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Seguro ($)"
              fullWidth
              value={form.seguro}
              onChange={handleChange("seguro")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  height: 55,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Cobro especial ($)"
              fullWidth
              value={form.cobroEspecial}
              onChange={handleChange("cobroEspecial")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  height: 55,
                },
              }}
            />
          </Grid>
          
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.retencion}
                onChange={handleChange("retencion")}
              />
            }
            label="Retención IVA"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.manual}
                onChange={handleChange("manual")}
              />
            }
            label="Entrada manual"
          />
        </Box>
        </Grid>


        <Divider sx={{ my: 2 }} />

        <RadioGroup
          row
          value={form.metodo}
          onChange={handleChange("metodo")}
        >
          <FormControlLabel
            value="dimensiones"
            control={<Radio />}
            label="Calcular por dimensiones"
          />
          <FormControlLabel
            value="volumen"
            control={<Radio />}
            label="Calcular por volumen"
          />
        </RadioGroup>

        {form.metodo === "dimensiones" ? (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Largo (cm)"
                fullWidth
                value={form.largo}
                onChange={handleChange("largo")}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Alto (cm)"
                fullWidth
                value={form.alto}
                onChange={handleChange("alto")}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Ancho (cm)"
                fullWidth
                value={form.ancho}
                onChange={handleChange("ancho")}
              />
            </Grid>
          </Grid>
        ) : (
          <TextField
            label="Volumen (m³)"
            fullWidth
            value={form.volumen}
            onChange={handleChange("volumen")}
            sx={{ mt: 1 }}
          />
        )}

        <TextField
          label="Observaciones"
          multiline
          rows={3}
          fullWidth
          value={form.observaciones}
          onChange={handleChange("observaciones")}
          sx={{ mt: 2 }}
        />
      </Paper>

      {/* Datos del cliente */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
        }}
      >
        <Typography variant="h6" sx={{color: "#00004e",mt:"-40px"}}>
          Datos del cliente
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nombre"
              fullWidth
              value={form.nombreCliente}
              onChange={handleChange("nombreCliente")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 55 } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Correo"
              fullWidth
              value={form.correoCliente}
              onChange={handleChange("correoCliente")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 55 } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Teléfono"
              fullWidth
              value={form.telefonoCliente}
              onChange={handleChange("telefonoCliente")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 55 } }}
            />
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
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#00004e",mt:"-40px" }}>
          Totales
        </Typography>
        <Grid container spacing={2}>
          {["subtotal", "iva", "retIva", "total"].map((campo, i) => (
            <Grid item xs={12} sm={3} key={i}>
              <TextField
                label={campo.toUpperCase()}
                fullWidth
                value={form[campo]}
                InputProps={{ readOnly: true }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 55 } }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Botones */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Calculate />}
          onClick={handleCalcular}
          sx={{ borderRadius: 3, px: 4, py: 1.5 }}
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
          sx={{ borderRadius: 3, px: 4, py: 1.5 }}
        >
          Enviar
        </Button>

      </Box>
    </Box>
  );
};

export default QuoterNeoGlassPro;
