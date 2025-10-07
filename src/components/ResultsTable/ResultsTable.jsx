import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Fade,
  Divider,
  Stack,
  Grid,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Indicadores from "./Indicadores";

// Mapea estado a índice de paso
const mapEstadoToPasoIndex = (estado) => {
  const pasos = ["DOCUMENTO", "CARGA", "TRANSITO", "ARRIBÓ", "PENDIENTE", "ENTREGA"];
  return pasos.indexOf(estado?.toUpperCase() || "");
};

// Renderiza chip de estado con ícono
const renderPasoChip = (estado) => {
  const estadoNormalizado = estado?.toUpperCase() || "";
  const mapa = {
    DOCUMENTO: { label: "Documento", icon: <DescriptionIcon />, color: "default" },
    CARGA: { label: "Carga", icon: <LocalShippingIcon />, color: "warning" },
    TRANSITO: { label: "Tránsito", icon: <DirectionsBusIcon />, color: "success" },
    ARRIBÓ: { label: "Arribó", icon: <LocationOnIcon />, color: "info" },
    PENDIENTE: { label: "Pendiente", icon: <WarningIcon />, color: "error" },
    ENTREGA: { label: "Entrega", icon: <CheckCircleIcon />, color: "primary" },
  };

  const paso = mapa[estadoNormalizado];
  return paso ? (
    <Fade in timeout={500}>
      <Chip
        icon={paso.icon}
        label={paso.label}
        color={paso.color}
        size="medium"
        sx={{ fontWeight: "bold" }}
      />
    </Fade>
  ) : (
    estado
  );
};

// Función para descargar XML
const handleDownload = (xmlUrl) => {
  fetch(`http://www.grupocalafia.com.mx/${xmlUrl}`)
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo descargar el archivo");
      return response.blob();
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

function ResultsTable({ data }) {
  const pasoActual = useMemo(() => {
    return data?.length > 0 ? mapEstadoToPasoIndex(data[0].esta_avan) : null;
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="body1">Realiza una búsqueda para ver resultados.</Typography>
      </Box>
    );
  }

  const row = data[0];
  const { numeInfo, formPago, fechFac, recoEn, entrEn, esta_avan, rutaPDF, rutaXML } = row;

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      {/* Indicadores visuales */}
      <Indicadores pasoActual={pasoActual} />

      {/* Documento visual */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Carta Porte: {numeInfo}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Modalidad de pago</Typography>
            <Typography>{formPago || "-"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Fecha y hora de expedición</Typography>
            <Typography>{fechFac ? new Date(fechFac).toLocaleString() : "-"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Recolectado en</Typography>
            <Typography>{recoEn || "-"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Entregado en</Typography>
            <Typography>{entrEn || "-"}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">Estado de avance</Typography>
            {renderPasoChip(esta_avan)}
          </Grid>
        </Grid>

        {/* Botones */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            startIcon={<PictureAsPdfIcon />}
            href={`http://www.grupocalafia.com.mx/${rutaPDF}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ px: 3, py: 1 }}
          >
            Ver PDF
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<DescriptionIcon />}
            onClick={() => handleDownload(rutaXML)}
            sx={{ px: 3, py: 1 }}
          >
            Descargar XML
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ResultsTable;
