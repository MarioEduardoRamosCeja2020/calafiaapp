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

// Estilos neumórficos
const neumorphicStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
};

// Estilo para los nuevos Paneles/Tarjetas
const panelStyle = {
    ...neumorphicStyle,
    padding: 3, // Añadimos padding interno para el contenido
    marginBottom: 3, // Espacio entre paneles
};


// (Debes incluir aquí tus componentes ModernRouteAutocomplete y ModernBulkAutocomplete 
// y las funciones handleAddArticle, handleDeleteArticle, handleCalculate, handleClear, etc.)
// Los copiaré del código anterior que ya funcionaba para que el ejemplo sea completo y compilable:

// ------------------------------------------------------------------
// COMPONENTES Y FUNCIONES AUXILIARES (Copiados de la versión anterior)
// ------------------------------------------------------------------
const ModernRouteAutocomplete = ({ label, value, options, onChange }) => {
    const theme = useTheme(); const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (<Autocomplete options={options} getOptionLabel={(option) => option.descripcion || ""} value={value || null} onChange={(_, val) => onChange(val)} isOptionEqualToValue={(option, val) => option.id === val?.id} renderInput={(params) => (<TextField {...params} label={label} variant="outlined" sx={{ ...neumorphicStyle, width: isMobile ? '100%' : 'auto', "& .MuiOutlinedInput-root": { borderRadius: 8, backgroundColor: "rgba(255,255,255,0.9)", height: 60, minWidth: isMobile ? 'auto' : 450, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.18)" }, }, "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 }, }}/>)} renderOption={(props, option) => (<li {...props} style={{ backgroundColor: "#e3f2fd", whiteSpace: "normal", padding: "8px 12px", borderRadius: 8, marginBottom: 6, display: "flex", flexDirection: "column", gap: 4, transition: "all 0.2s ease", }}> <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><LocationOn sx={{ color: "#1976d2" }} /> <strong style={{ fontSize: "0.95rem", color: "#00004e" }}>{option.origenDesc}</strong></Box> <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Flag sx={{ color: "#ff6f00", fontSize: "0.8rem" }} /> <span style={{ fontSize: "0.85rem", color: "#555" }}>{option.destinoDesc}</span></Box> <span style={{ fontSize: "0.85rem", color: "#333" }}>{option.descripcion}</span></li>)} ListboxProps={{ sx: { maxHeight: 400, minWidth: isMobile ? 'auto' : 450, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.95)", padding: 1, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", "& li:hover": { backgroundColor: "rgba(75,156,95,0.25)", transform: "translateY(-2px) scale(1.01)", boxShadow: "0 4px 15px rgba(0,0,0,0.15)", cursor: "pointer", }, }, }}/>)};

const ModernBulkAutocomplete = ({ label, value, options, onChange }) => {
    const theme = useTheme(); const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (<Autocomplete options={options} getOptionLabel={(option) => option.name || ""} value={value || null} onChange={(_, val) => onChange(val)} isOptionEqualToValue={(option, val) => option.id === val?.id} renderInput={(params) => (<TextField {...params} label={label} variant="outlined" sx={{ ...neumorphicStyle, width: isMobile ? '100%' : 'auto', "& .MuiOutlinedInput-root": { borderRadius: 8, minWidth: isMobile ? 'auto' : 450, backgroundColor: "rgba(255,255,255,0.9)", height: 60, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.18)" }, }, "& .MuiAutocomplete-input": { fontSize: "1rem", paddingLeft: 2 }, }}/>)} renderOption={(props, option) => (<li {...props} style={{ backgroundColor: "#e3f2fd", whiteSpace: "normal", padding: "6px 10px", borderRadius: 6, marginBottom: 4, display: "flex", flexDirection: "column", gap: 2, transition: "all 0.2s ease", }}> <strong style={{ fontSize: "1rem", color: "#00004e" }}>{option.name}</strong> {option.observations && (<span style={{ fontSize: "0.85rem", color: "#555" }}>{option.observations}</span>)}</li>)} ListboxProps={{ sx: { maxHeight: 300, minWidth: isMobile ? 'auto' : 450, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.95)", padding: 1, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", "& li:hover": { backgroundColor: "rgba(75,156,95,0.18)", transform: "scale(1.03)", cursor: "pointer", }, }, }}/>)};
const AnimatedTotal = ({ label, value }) => (<TextField label={label.toUpperCase()} fullWidth value={Number(value || 0).toFixed(2)} InputProps={{ readOnly: true }} sx={{...neumorphicStyle, "& .MuiOutlinedInput-root": { borderRadius: 3, height: 60, backgroundColor: "rgba(255,255,255,0.85)", boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)" }, input: { textAlign: "right", fontWeight: "bold", fontSize: "1rem" }}}/>);
// ------------------------------------------------------------------


const QuoterNeoGlassProPanels = () => {
  const [form, setForm] = useState({
    origen: null, domicilio: false, recoleccion: "", seguro: "", cobroEspecial: "", tipoCliente: "fisica",
    subtotal: "", iva: "", retIva: "", total: "", observaciones: "", nombreCliente: "", correoCliente: "",
  });
  const [detalleEnvio, setDetalleEnvio] = useState({ tipo: null, cantidad: "", contiene: "", largo: "", alto: "", ancho: "", volumenManual: "", usarMedidas: true, });
  const [articulos, setArticulos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
  const [classBulk, setClassBulk] = useState([]);


  useEffect(() => {
    // Lógica de fetch restaurada del código anterior
    const fetchData = async () => {
      try {
        const resBulk = await fetch("http://localhost:3000/classbulk");
        const dataBulk = await resBulk.json();
        setClassBulk(dataBulk.map((item) => ({ id: item.id, name: item.name, observations: item.observations, })));
        
        const resRutas = await fetch("http://localhost:3000/full-routes");
        if (!resRutas.ok) throw new Error("Error cargando rutas");
        const data = await resRutas.json();
        setRutas(data.map((r) => ({ id: r.Id_rut, Nombre: r.Nombre_rut, descripcion: `${r.Nombre_rut}`, origenDesc: `${r.CiudadO}, ${r.EstadoO}, ${r.PaisO}`, destinoDesc: `${r.CiudadD}, ${r.EstadoD}, ${r.PaisD}`, }))); 

      } catch (error) {
        console.error("Error cargando datos", error);
        setNotification({ open: true, message: "Error al cargar datos de API local.", severity: "error" });
      }
    };
    fetchData();
  }, []);
  

  // Funciones dummy (para que compile)
  const handleAddArticle = () => { if (detalleEnvio.cantidad && detalleEnvio.tipo) { setArticulos([...articulos, { ...detalleEnvio, id: Date.now() }]); setDetalleEnvio({ tipo: null, cantidad: "", contiene: "", largo: "", alto: "", ancho: "", volumenManual: "", usarMedidas: true }); } };
  const handleDeleteArticle = (id) => setArticulos(articulos.filter(item => item.id !== id));
  const handleCalculate = () => setNotification({ open: true, message: "Cálculo realizado!", severity: "success" });
  const handleClear = () => setNotification({ open: true, message: "Formulario limpiado.", severity: "info" });
  const handleCloseSnackbar = () => setNotification({ ...notification, open: false });

  // Retorno principal del componente
  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
            Cotizador NeoGlass Pro (Paneles Visibles)
        </Typography>

        {/* Panel 1: Datos Principales y Cliente */}
        <Paper sx={panelStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'medium' }}>1. Ruta y Cliente</Typography>
            <Divider sx={{ mb: 2 }}/>
            <Grid container spacing={3}>
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
                 <Grid item xs={12} md={4}><TextField label="Recolección" fullWidth value={form.recoleccion} onChange={e => setForm({...form, recoleccion: e.target.value})} /></Grid>
                <Grid item xs={12} md={4}><TextField label="Seguro" fullWidth value={form.seguro} onChange={e => setForm({...form, seguro: e.target.value})} /></Grid>
                <Grid item xs={12} md={4}><TextField label="Cobro Especial" fullWidth value={form.cobroEspecial} onChange={e => setForm({...form, cobroEspecial: e.target.value})} /></Grid>
                 <Grid item xs={12} md={4}><FormControlLabel control={<Checkbox checked={form.domicilio} onChange={e => setForm({...form, domicilio: e.target.checked})} />} label="A domicilio"/></Grid>
            </Grid>
        </Paper>

        {/* Panel 2: Detalles de Envío */}
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
                <Grid item xs={6} md={2}><TextField label="Cant." fullWidth value={detalleEnvio.cantidad} onChange={e => setDetalleEnvio({...detalleEnvio, cantidad: e.target.value})} /></Grid>
                <Grid item xs={6} md={4}><TextField label="Contenido" fullWidth value={detalleEnvio.contiene} onChange={e => setDetalleEnvio({...detalleEnvio, contiene: e.target.value})} /></Grid>
                <Grid item xs={12} md={1}>
                    <Button onClick={handleAddArticle} fullWidth variant="contained" color="primary" sx={{ height: '100%' }}><Add /></Button>
                </Grid>
                
                <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox checked={detalleEnvio.usarMedidas} onChange={e => setDetalleEnvio({...detalleEnvio, usarMedidas: e.target.checked})} />} label="Usar medidas volumétricas"/>
                </Grid>
                {detalleEnvio.usarMedidas ? (
                    <>
                        <Grid item xs={4} md={2}><TextField label="Largo" fullWidth value={detalleEnvio.largo} onChange={e => setDetalleEnvio({...detalleEnvio, largo: e.target.value})} /></Grid>
                        <Grid item xs={4} md={2}><TextField label="Alto" fullWidth value={detalleEnvio.alto} onChange={e => setDetalleEnvio({...detalleEnvio, alto: e.target.value})} /></Grid>
                        <Grid item xs={4} md={2}><TextField label="Ancho" fullWidth value={detalleEnvio.ancho} onChange={e => setDetalleEnvio({...detalleEnvio, ancho: e.target.value})} /></Grid>
                    </>
                ) : (
                    <Grid item xs={12} md={6}><TextField label="Volumen Manual" fullWidth value={detalleEnvio.volumenManual} onChange={e => setDetalleEnvio({...detalleEnvio, volumenManual: e.target.value})} /></Grid>
                )}

                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{...neumorphicStyle, mt: 2}}>
                        <Table size="small">
                            <TableHead><TableRow><TableCell>Cant</TableCell><TableCell>Tipo</TableCell><TableCell>Contenido</TableCell><TableCell>Medidas</TableCell><TableCell align="right">Acción</TableCell></TableRow></TableHead>
                            <TableBody>
                                {articulos.map((art) => (
                                    <TableRow key={art.id}>
                                        <TableCell>{art.cantidad}</TableCell>
                                        <TableCell>{art.tipo?.name}</TableCell>
                                        <TableCell>{art.contiene}</TableCell>
                                        <TableCell>{art.usarMedidas ? `${art.largo}x${art.alto}x${art.ancho}` : `Vol: ${art.volumenManual}`}</TableCell>
                                        <TableCell align="right"><IconButton color="error" onClick={() => handleDeleteArticle(art.id)}><Delete /></IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>

        {/* Panel 3: Totales y Confirmación */}
        <Paper sx={panelStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'medium' }}>3. Cálculo y Totales</Typography>
            <Divider sx={{ mb: 2 }}/>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField label="Observaciones" fullWidth multiline rows={4} value={form.observaciones} onChange={e => setForm({...form, observaciones: e.target.value})} sx={{ ...neumorphicStyle }}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
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
