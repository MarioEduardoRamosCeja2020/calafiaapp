import React, { useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  TableContainer,
  Paper,
  Chip,
  Fade,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";

import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Indicadores from "./Indicadores";

// Columnas visibles
const visibleFields = [
  "tipoDocu",
  "fechFac",
  "recoEn",
  "entrEn",
  "formPago",
  "numeInfo",
  "esta_avan",
];

// Formato de encabezados
const formatHeader = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Mapeo de estado a índice para mostrar progreso
const mapEstadoToPasoIndex = (estado) => {
  const estadoNormalizado = estado?.toUpperCase() || "";
  const pasos = [
    "DOCUMENTO",
    "CARGA",
    "TRANSITO",
    "ARRIBÓ",
    "PENDIENTE",
    "ENTREGA",
  ];
  return pasos.indexOf(estadoNormalizado);
};

// Renderizar chips con íconos y color
const renderPasoChip = (estado) => {
  const estadoNormalizado = estado?.toUpperCase() || "";

  const mapa = {
    DOCUMENTO: {
      label: "Documento",
      icon: <DescriptionIcon />,
      color: "default",
    },
    CARGA: {
      label: "Carga",
      icon: <LocalShippingIcon />,
      color: "warning",
    },
    TRANSITO: {
      label: "Tránsito",
      icon: <DirectionsBusIcon />,
      color: "success",
    },
    ARRIBÓ: {
      label: "Arribó",
      icon: <LocationOnIcon />,
      color: "info",
    },
    PENDIENTE: {
      label: "Pendiente",
      icon: <WarningIcon />,
      color: "error",
    },
    ENTREGA: {
      label: "Entrega",
      icon: <CheckCircleIcon />,
      color: "primary",
    },
  };

  const paso = mapa[estadoNormalizado];

  return paso ? (
    <Fade in timeout={500}>
      <Chip
        icon={paso.icon}
        label={paso.label}
        color={paso.color}
        size="small"
        sx={{
          fontWeight: "bold",
          minWidth: 110,
        }}
      />
    </Fade>
  ) : (
    estado
  );
};

function ResultsTable({ data }) {
  const pdfUrl =
    "http://45.190.243.90/stctca/CFDI/CartasPorte/TQPA/2014/06/TCA-TQPA25000.pdf";
  const excelUrl = "https://example.com/report.xlsx"; // Actualiza si es necesario

  // Paso actual basado en la primera fila
  const pasoActual = useMemo(() => {
    return data?.length > 0 ? mapEstadoToPasoIndex(data[0].esta_avan) : null;
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: 2,
      }}
    >
      {/* Indicadores de progreso */}
      <Indicadores pasoActual={pasoActual} />

      {/* Tabla de resultados */}
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          overflowX: "auto",
          maxHeight: "50vh",
          borderRadius: 2,
          minHeight: 250,
        }}
      >
        {data?.length > 0 ? (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {visibleFields.map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatHeader(key)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {visibleFields.map((key) => (
                    <TableCell key={key}>
                      {row[key] !== null && row[key] !== "" ? (
                        key === "esta_avan" ? (
                          renderPasoChip(row[key])
                        ) : key.startsWith("fech") ? (
                          new Date(row[key]).toLocaleString()
                        ) : (
                          row[key]
                        )
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
            }}
          >
            <Typography variant="body2" align="center">
              Realiza una búsqueda para ver resultados.
            </Typography>
          </Box>
        )}
      </TableContainer>

      {/* Botones PDF / Excel */}
      {data?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<PictureAsPdfIcon />}
            href={pdfUrl}
            target="_blank"
            sx={{ textTransform: "none", px: 3, py: 1, fontWeight: "bold" }}
          >
            Ver PDF
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<GridOnIcon />}
            href={excelUrl}
            target="_blank"
            sx={{ textTransform: "none", px: 3, py: 1, fontWeight: "bold" }}
          >
            Ver Excel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ResultsTable;
