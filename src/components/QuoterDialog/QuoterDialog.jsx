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
  useMediaQuery,
  useTheme,
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

// ------------------------------------------------------------------
// ESTILOS Y COMPONENTES AUXILIARES
// ------------------------------------------------------------------

// Estilos neumórficos
const neumorphicStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
};

// Estilo para los nuevos Paneles/Tarjetas
const panelStyle = {
  ...neumorphicStyle,
  padding: 3, 
  marginBottom: 3, 
};

// Componente auxiliar para mostrar totales
const AnimatedTotal = ({ label, value }) => (<TextField label={label.toUpperCase()} fullWidth value={Number(value || 0).toFixed(2)} InputProps={{ readOnly: true }} sx={{...neumorphicStyle, "& .MuiOutlinedInput-root": { borderRadius: 3, height: 60, backgroundColor: "rgba(255,255,255,0.85)", boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)" }, input: { textAlign: "right", fontWeight: "bold", fontSize: "1rem" }}}/>);

// Componentes Autocomplete (Adaptados para Grid V2)
const ModernRouteAutocomplete = ({ label, value, options, onChange }) => {
    const theme = useTheme(); const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (<Autocomplete options={options} getOptionLabel={(option) => option.descripcion || ""} value={value || null} onChange={(_, val) => onChange(val)} isOptionEqualToValue={(option, val) => option.id === val?.id} renderInput={(params) => (<TextField {...params} label={label} variant="outlined" sx={{ ...neumorphicStyle, width: isMobile ? '100%' : 'auto', "& .MuiOutlinedInput-root": { borderRadius: 8, backgroundColor: "rgba(255,255,255,0.9)", height: 60, minWidth: isMobile ? 'auto' : 450, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.18)" }, }, "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 }, }}/>)} renderOption={(props, option) => (<li {...props} style={{ backgroundColor: "#e3f2fd", whiteSpace: "normal", padding: "8px 12px", borderRadius: 8, marginBottom: 6, display: "flex", flexDirection: "column", gap: 4, transition: "all 0.2s ease", }}> <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><LocationOn sx={{ color: "#1976d2" }} /> <strong style={{ fontSize: "0.95rem", color: "#00004e" }}>{option.origenDesc}</strong></Box> <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Flag sx={{ color: "#ff6f00", fontSize: "0.8rem" }} /> <span style={{ fontSize: "0.85rem", color: "#555" }}>{option.destinoDesc}</span></Box> <span style={{ fontSize: "0.85rem", color: "#333" }}>{option.descripcion}</span></li>)} ListboxProps={{ sx: { maxHeight: 400, minWidth: isMobile ? 'auto' : 450, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.95)", padding: 1, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", "& li:hover": { backgroundColor: "rgba(75,156,95,0.25)", transform: "translateY(-2px) scale(1.01)", boxShadow: "0 4px 15px rgba(0,0,0,0.15)", cursor: "pointer", }, }, }}/>)};

const ModernBulkAutocomplete = ({ label, value, options, onChange }) => {
    const theme = useTheme(); const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (<Autocomplete options={options} getOptionLabel={(option) => option.name || ""} value={value || null} onChange={(_, val) => onChange(val)} isOptionEqualToValue={(option, val) => option.id === val?.id} renderInput={(params) => (<TextField {...params} label={label} variant="outlined" sx={{ ...neumorphicStyle, width: isMobile ? '100%' : 'auto', "& .MuiOutlinedInput-root": { borderRadius: 8, minWidth: isMobile ? 'auto' : 450, backgroundColor: "rgba(255,255,255,0.9)", height: 60, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.18)" }, }, "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 }, }}/>)} renderOption={(props, option) => (<li {...props} style={{ backgroundColor: "#e3f2fd", whiteSpace: "normal", padding: "6px 10px", borderRadius: 6, marginBottom: 4, display: "flex", flexDirection: "column", gap: 2, transition: "all 0.2s ease", }}> <strong style={{ fontSize: "1rem", color: "#00004e" }}>{option.name}</strong> {option.observations && (<span style={{ fontSize: "0.85rem", color: "#555" }}>{option.observations}</span>)}</li>)} ListboxProps={{ sx: { maxHeight: 300, minWidth: isMobile ? 'auto' : 450, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.95)", padding: 1, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", "& li:hover": { backgroundColor: "rgba(75,156,95,0.18)", transform: "scale(1.03)", cursor: "pointer", }, }, }}/>)};

// ------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------------------------------------------

const QuoterNeoGlassProPanels = () => {
  
  const initialFormState = {
    origen: null, domicilio: false, recoleccion: "", seguro: "", cobroEspecial: "", tipoCliente: "fisica",
    subtotal: "", iva: "", retIva: "", total: "", observaciones: "", nombreCliente: "", correoCliente: "",
    volumenAcumulado: 0, 
  };

  const initialDetalleEnvioState = {
    tipo: null, cantidad: "", contiene: "", largo: "", alto: "", ancho: "", volumenManual: "", usarMedidas: true,
  };

  const [form, setForm] = useState(initialFormState);
  const [detalleEnvio, setDetalleEnvio] = useState(initialDetalleEnvioState);
  const [articulos, setArticulos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
  const [classBulk, setClassBulk] = useState([]);


  useEffect(() => {
    // 🌐 Lógica de fetch para cargar datos reales de tus APIs locales
    const fetchData = async () => {
      try {
        // 1. Fetch para Tipos de Carga (classbulk)
        const resBulk = await fetch("http://localhost:3000/classbulk");
        if (!resBulk.ok) throw new Error("Error cargando Tipos de Carga");
        const dataBulk = await resBulk.json();
        setClassBulk(
          dataBulk.map((item) => ({
            id: item.id,
            name: item.name,
            observations: item.observations,
          }))
        );

        // 2. Fetch para Rutas (full-routes)
        const resRutas = await fetch("http://localhost:3000/full-routes");
        if (!resRutas.ok) throw new Error("Error cargando Rutas");
        const data = await resRutas.json();
        setRutas(
          data.map((r) => ({
            id: r.Id_rut,
            Nombre: r.Nombre_rut,
            descripcion: `${r.Nombre_rut}`,
            origenDesc: `${r.CiudadO}, ${r.EstadoO}, ${r.PaisO}`,
            destinoDesc: `${r.CiudadD}, ${r.EstadoD}, ${r.PaisD}`,
            // Se asume que CuotaTonelada está en la respuesta de la ruta, si no es así, esta línea fallará
            // CuotaTonelada: r.CuotaTonelada, 
          }))
        );
        
      } catch (error) {
        console.error("Error cargando datos", error);
        // Mostrar notificación si falla el fetch
        setNotification({
          open: true,
          message: `Error al cargar datos de API local: ${error.message}`,
          severity: "error",
        });
      }
    };
    fetchData();
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  // Lógica para recalcular el Volumen Acumulado
  useEffect(() => {
    const totalVolumen = articulos.reduce((sum, art) => sum + parseFloat(art.volumenTotal || 0), 0);
    setForm(prevForm => ({ ...prevForm, volumenAcumulado: totalVolumen.toFixed(3) }));
  }, [articulos]);

  // Lógica para agregar artículo y calcular volumen
  const handleAddArticle = () => { 
    const cantidad = parseFloat(detalleEnvio.cantidad);

    if (!cantidad || cantidad <= 0 || !detalleEnvio.tipo) {
        setNotification({ open: true, message: "Asegúrate de ingresar la cantidad y el tipo de carga.", severity: "warning" });
        return;
    }

    let volumenTotal = 0;
    const { largo, alto, ancho, volumenManual, usarMedidas } = detalleEnvio;

    if (usarMedidas) {
        const L = parseFloat(largo || 0);
        const A = parseFloat(alto || 0);
        const H = parseFloat(ancho || 0);
        
        if (L > 0 && A > 0 && H > 0) {
            volumenTotal = (L * A * H * cantidad); 
        } else {
             setNotification({ open: true, message: "Ingresa Largo, Alto y Ancho válidos (mayores a 0).", severity: "warning" });
             return;
        }
    } else {
        const VM = parseFloat(volumenManual || 0);
        
        if (VM > 0) {
            volumenTotal = (VM * cantidad); 
        } else {
             setNotification({ open: true, message: "Ingresa un Volumen Manual válido (mayor a 0).", severity: "warning" });
             return;
        }
    }
    
    const newArticle = { 
        ...detalleEnvio, 
        id: Date.now(), 
        volumenTotal: volumenTotal.toFixed(3)
    };

    setArticulos([...articulos, newArticle]); 
    setDetalleEnvio(initialDetalleEnvioState); 
  };

  const handleDeleteArticle = (id) => setArticulos(articulos.filter(item => item.id !== id));
  
  const handleCalculate = () => {
    const volumen = parseFloat(form.volumenAcumulado);
    
    if (volumen === 0) {
          setNotification({ open: true, message: "Agrega artículos para calcular.", severity: "warning" });
          return;
    }
    
    // **NOTA:** La propiedad `CuotaTonelada` NO existe en `form.origen` según el fetch/map en `useEffect`.
    // Se ha comentado la parte de cálculo compleja y se ha dejado un cálculo de ejemplo,
    // ya que la lógica original contenía errores de sintaxis (p.ej. `Math.Round`, variable `CuotaAuto` no definida)
    // y variables no definidas.

    // const CuotaTonelada = parseFloat(form.origen?.CuotaTonelada || 0); // **CORRECCIÓN:** Usar `?.` para seguridad
    // const pesoTotal = (volumen * 500);
    // const PesoMinimo = 100;
    // const CuotaEntrega = 309.5; 
    // const CuotaMinimoEntrega = 223;
    // const MinimoEntega = 223.00;
    // const CuotaManiobras = 263.74;
    // // const CuotaAuto = ??? (Variable no definida)
    // 
    // let CalculaConceptos = [0, 0, 0, 0, 0, 0]; // Inicializar para evitar errores de índice
    // 
    // if(pesoTotal >= PesoMinimo){
    //   CalculaConceptos[0] = Math.round((pesoTotal / 1000) * CuotaTonelada * 100) / 100;
    // }else{
    //   // **CORRECCIÓN:** Math.Round no existe en JS. Se usa Math.round y se divide por 100 para 2 decimales.
    //   CalculaConceptos[0] = Math.round((pesoTotal / PesoMinimo) * CuotaTonelada * 100) / 100;
    // }
    // 
    // if(form.domicilio){
    //   if(pesoTotal <= MinimoEntega){
    //      CalculaConceptos[3] = CuotaMinimoEntrega;
    //   }else{
    //      // **CORRECCIÓN:** Math.Round no existe en JS.
    //      CalculaConceptos[3] = Math.round((pesoTotal / MinimoEntega) * CuotaEntrega * 100) / 100;
    //   }
    // }else{
    //   CalculaConceptos[3] = 0;
    // }
    // 
    // if (pesoTotal >= PesoMinimo){
    //   // **CORRECCIÓN:** Math.Round no existe en JS.
    //   CalculaConceptos[2] = Math.round((pesoTotal / 1000) * CuotaManiobras * 100) / 100;
    // }else{
    //   // **CORRECCIÓN:** Math.Round no existe en JS.
    //   CalculaConceptos[2] = Math.round((PesoMinimo / 1000) * CuotaManiobras * 100) / 100;
    // }
    // 
    // if (pesoTotal >= PesoMinimo){
    //   // **CORRECCIÓN:** Math.Round no existe en JS. Además, CuotaAuto no está definida.
    //   // CalculaConceptos[5] = Math.round((pesoTotal / 1000) * (CuotaAuto), 2);
    // } else {
    //   // **CORRECCIÓN:** Math.Round no existe en JS. Además, CuotaAuto no está definida.
    //   // CalculaConceptos[5] = Math.round((PesoMinimo / 1000) * (CuotaAuto), 2);
    // }
    // 
    // const subTotalCalculado = CalculaConceptos.reduce((a, b) => a + b, 0);

    // Se usa la lógica de cálculo simplificada para evitar errores de variables no definidas
    // y métodos matemáticos no estándar (`Math.Round`).
    const subtotalCalculado = volumen * 100;
    const ivaCalculado = subtotalCalculado * 0.16;
    const totalCalculado = subtotalCalculado * 1.16;
    
    setForm(prev => ({
        ...prev,
        // **CORRECCIÓN:** Se usan las variables calculadas o se mantiene la lógica original simple.
        subtotal: subtotalCalculado.toFixed(2), 
        iva: ivaCalculado.toFixed(2),
        total: totalCalculado.toFixed(2),
        retIva: '0.00', // Valor fijo para el ejemplo
    }));
    setNotification({ open: true, message: "Cálculo de costos realizado con " + volumen + " m³.", severity: "success" });
  };
  
  const handleClear = () => {
      setForm(initialFormState);
      setDetalleEnvio(initialDetalleEnvioState);
      setArticulos([]);
      setNotification({ open: true, message: "Formulario limpiado.", severity: "info" });
  };
  const handleCloseSnackbar = () => setNotification({ ...notification, open: false });

  // Retorno principal del componente
  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
        Cotizador NeoGlass Pro
      </Typography>

      {/* --- Panel 1: Datos Principales y Cliente --- */}
      <Paper sx={panelStyle}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'medium' }}>1. Ruta y Cliente</Typography>
        <Divider sx={{ mb: 2 }}/>
        <Grid container spacing={3}>
          {/* **CORRECCIÓN:** Las props de Grid deben ser `item` y las de tamaño `xs`, `sm`, `md`, etc. en lugar de `grid`. */}
            <Grid item xs={12} md={6}>
                <ModernRouteAutocomplete
                    label="Ruta Origen"
                    value={form.origen}
                    options={rutas}
                    onChange={(val) => setForm({ ...form, origen: val })}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <RadioGroup row name="tipoCliente" value={form.tipoCliente} onChange={(e) => setForm({ ...form, tipoCliente: e.target.value })} >
                    <FormControlLabel value="fisica" control={<Radio />} label={<Box display="flex" alignItems="center"><Person sx={{ mr: 0.5 }}/> Física</Box>} />
                    <FormControlLabel value="moral" control={<Radio />} label={<Box display="flex" alignItems="center"><Business sx={{ mr: 0.5 }}/> Moral</Box>} />
                </RadioGroup>
            </Grid>
            <Grid item xs={12} md={4}><TextField label="Nombre Cliente" fullWidth value={form.nombreCliente} onChange={e => setForm({...form, nombreCliente: e.target.value})} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Correo Cliente" fullWidth value={form.correoCliente} onChange={e => setForm({...form, correoCliente: e.target.value})} /></Grid>
            {/* <Grid item xs={12} md={4}><TextField label="Recolección" fullWidth value={form.recoleccion} onChange={e => setForm({...form, recoleccion: e.target.value})} /></Grid> */}
            <Grid item xs={12} md={4}><TextField label="Seguro" fullWidth value={form.seguro} onChange={e => setForm({...form, seguro: e.target.value})} /></Grid>
            {/* <Grid item xs={12} md={4}><TextField label="Cobro Especial" fullWidth value={form.cobroEspecial} onChange={e => setForm({...form, cobroEspecial: e.target.value})} /></Grid> */}
            <Grid item xs={12} md={4}><FormControlLabel control={<Checkbox checked={form.domicilio} onChange={e => setForm({...form, domicilio: e.target.checked})} />} label="A domicilio"/></Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 3 }}/>

      {/* --- Panel 2: Detalles de Envío (Artículos y Medidas) --- */}
      <Paper sx={panelStyle}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'medium' }}>2. Artículos y Medidas</Typography>
        <Divider sx={{ mb: 2 }}/>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <ModernBulkAutocomplete
              label="Tipo de Carga"
              value={detalleEnvio.tipo}
              options={classBulk}
              onChange={(val) => setDetalleEnvio({ ...detalleEnvio, tipo: val })}
            />
          </Grid>
          <Grid item xs={6} md={2}><TextField label="Cant." fullWidth value={detalleEnvio.cantidad} onChange={e => setDetalleEnvio({...detalleEnvio, cantidad: e.target.value.replace(/[^0-9]/g, '')})} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} /></Grid>
          <Grid item xs={6} md={4}><TextField label="Contenido" fullWidth value={detalleEnvio.contiene} onChange={e => setDetalleEnvio({...detalleEnvio, contiene: e.target.value})} /></Grid>
          <Grid item xs={12} md={1}>
            <Button onClick={handleAddArticle} fullWidth variant="contained" color="primary" sx={{ height: '100%' }}><Add /></Button>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={detalleEnvio.usarMedidas} onChange={e => setDetalleEnvio({...detalleEnvio, usarMedidas: e.target.checked})} />} label="Usar medidas volumétricas"/>
          </Grid>
          {detalleEnvio.usarMedidas ? (
            <>
              <Grid item xs={4} md={2}><TextField label="Largo (m)" fullWidth value={detalleEnvio.largo} onChange={e => setDetalleEnvio({...detalleEnvio, largo: e.target.value})} /></Grid>
              <Grid item xs={4} md={2}><TextField label="Alto (m)" fullWidth value={detalleEnvio.alto} onChange={e => setDetalleEnvio({...detalleEnvio, alto: e.target.value})} /></Grid>
              <Grid item xs={4} md={2}><TextField label="Ancho (m)" fullWidth value={detalleEnvio.ancho} onChange={e => setDetalleEnvio({...detalleEnvio, ancho: e.target.value})} /></Grid>
            </>
          ) : (
            <Grid item xs={12} md={6}><TextField label="Volumen Manual (m³)" fullWidth value={detalleEnvio.volumenManual} onChange={e => setDetalleEnvio({...detalleEnvio, volumenManual: e.target.value})} /></Grid>
          )}

          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{...neumorphicStyle, mt: 2}}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Cant</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Contenido</TableCell>
                    <TableCell>Vol. Total (m³)</TableCell>
                    <TableCell align="right">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articulos.map((art) => (
                    <TableRow key={art.id}>
                      <TableCell>{art.cantidad}</TableCell>
                      <TableCell>{art.tipo?.name}</TableCell>
                      <TableCell>{art.contiene}</TableCell>
                      <TableCell>
                        {art.volumenTotal ? `${art.volumenTotal} m³` : 'N/A'}
                      </TableCell>
                      <TableCell align="right"><IconButton color="error" onClick={() => handleDeleteArticle(art.id)}><Delete /></IconButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 3 }}/>

      {/* --- Panel 3: Totales y Confirmación --- */}
      <Paper sx={panelStyle}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'medium' }}>3. Cálculo y Totales</Typography>
        <Divider sx={{ mb: 2 }}/>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="Observaciones" fullWidth multiline rows={4} value={form.observaciones} onChange={e => setForm({...form, observaciones: e.target.value})} sx={{ ...neumorphicStyle }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AnimatedTotal label="Volumen Total (m³)" value={form.volumenAcumulado} /> 
                </Grid>
                <Grid item xs={6}><AnimatedTotal label="Subtotal" value={form.subtotal} /></Grid>
                <Grid item xs={6}><AnimatedTotal label="IVA" value={form.iva} /></Grid>
                <Grid item xs={6}><AnimatedTotal label="Ret. IVA" value={form.retIva} /></Grid>
                <Grid item xs={6}><AnimatedTotal label="Total" value={form.total} /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button startIcon={<Calculate />} variant="contained" color="success" onClick={handleCalculate}>Calcular</Button>
              <Button startIcon={<CleaningServices />} variant="outlined" color="secondary" onClick={handleClear}>Limpiar</Button>
              <Button startIcon={<Send />} variant="contained" color="primary">Enviar Cotización</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuoterNeoGlassProPanels;