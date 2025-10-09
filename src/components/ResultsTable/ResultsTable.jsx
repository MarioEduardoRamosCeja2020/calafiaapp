import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Divider,
  Stack,
  Button,
  Chip,
  Fade,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Indicadores from "./Indicadores";

const mapEstadoToPasoIndex = (estado) => {
  const pasos = ["DOCUMENTO", "CARGA", "TRANSITO", "ARRIBÓ", "PENDIENTE", "ENTREGA"];
  return pasos.indexOf(estado?.toUpperCase() || "");
};

const renderPasoChip = (estado) => {
  const mapa = {
    DOCUMENTO: { label: "Documento", icon: <DescriptionIcon />, color: "default" },
    CARGA: { label: "Carga", icon: <LocalShippingIcon />, color: "warning" },
    TRANSITO: { label: "Tránsito", icon: <DirectionsBusIcon />, color: "success" },
    ARRIBÓ: { label: "Arribó", icon: <LocationOnIcon />, color: "info" },
    PENDIENTE: { label: "Pendiente", icon: <WarningIcon />, color: "error" },
    ENTREGA: { label: "Entrega", icon: <CheckCircleIcon />, color: "primary" },
  };

  const paso = mapa[estado?.toUpperCase()];
  return paso ? (
    <Fade in timeout={500}>
      <Chip icon={paso.icon} label={paso.label} color={paso.color} size="medium" sx={{ fontWeight: "bold" }} />
    </Fade>
  ) : (
    estado
  );
};

const handleDownload = (xmlUrl) => {
  fetch(`http://www.grupocalafia.com.mx/${xmlUrl}`)
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo descargar el archivo");
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = xmlUrl.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert("Error al descargar el archivo XML."));
};

function ResultsTable({ estatus, detalles }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!estatus || estatus.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="body1">Realiza una búsqueda para ver resultados.</Typography>
      </Box>
    );
  }

  const row = estatus[0];
  const pasoActual = mapEstadoToPasoIndex(row.esta_avan);

  const fechaExpedicion = row.fechFac
    ? new Date(row.fechFac).toLocaleString("es-MX", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
      })
    : "-";

  return (
    <Box sx={{ px: 2, mt: 3 }}>
      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <Indicadores pasoActual={pasoActual} />
      </Box>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
        {/* Título + botones */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            DATOS CARTA PORTE
          </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", width: "100%" }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<PictureAsPdfIcon />}
                href={`http://www.grupocalafia.com.mx/${row.rutaPDF}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ minWidth: 160, flex: 1 }}
              >
                Ver PDF
              </Button>

              <Button
                variant="contained"
                color="success"
                startIcon={<DescriptionIcon />}
                onClick={() => handleDownload(row.rutaXML)}
                sx={{ minWidth: 160, flex: 1 }}
              >
                Descargar XML
              </Button>
            </Stack>

        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Datos generales como grid responsivo */}
        <Grid container spacing={2}>
          {/* Columna 1 */}
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Registro documento: <strong>[{row.usua_emis || "-"}]</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Modalidad de pago: <strong>{row.formPago || "-"}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Serie y Folio:{" "}
                  <strong>{(row.serie?.toUpperCase() || "")} - {row.folio || ""}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Entregar en: <strong>{row.entrEn || "-"}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Columna 2 */}
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Fecha y hora de expedición: <strong>{fechaExpedicion}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Recoger en: <strong>{row.recoEn || "-"}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Estatus: <strong>{row.esta_docu === "C" ? "CANCELADA" : row.esta_docu}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Estado de avance */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Estado de avance
          </Typography>
          {renderPasoChip(row.esta_avan)}
        </Box>

        {/* Tabla de detalles */}
        {detalles && detalles.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Detalles de la mercancía
            </Typography>

            {isMobile ? (
              // Vista tipo tarjeta en móvil
              <Stack spacing={2}>
                {detalles.map((item, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2">
                      <strong>CANTIDAD:</strong> {item.CANTIDAD}
                    </Typography>
                    <Typography variant="body2">
                      <strong>CLASE:</strong> {item.CLASE}
                    </Typography>
                    <Typography variant="body2">
                      <strong>QUE SE DICE QUE CONTIENE:</strong> {item.QUE_SE_DICE_QUE_CONTIENE}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            ) : (
              // Tabla en escritorio
              <Box sx={{ overflowX: "auto", width: "100%" }}>
                <TableContainer component={Paper} sx={{ minWidth: 800 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>CANTIDAD</strong></TableCell>
                        <TableCell><strong>CLASE</strong></TableCell>
                        <TableCell><strong>QUE SE DICE QUE CONTIENE</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detalles.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.CANTIDAD}</TableCell>
                          <TableCell>{item.CLASE}</TableCell>
                          <TableCell>{item.QUE_SE_DICE_QUE_CONTIENE}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default ResultsTable;
