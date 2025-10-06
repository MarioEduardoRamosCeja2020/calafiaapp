import React from "react";
import { Box, Typography } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Definición de pasos con color propio del icono
const pasos = [
  {
    label: "DOCUMENTO",
    icon: <DescriptionIcon />,
    iconColor: "#7E57C2", // Morado
  },
  {
    label: "CARGA",
    icon: <LocalShippingIcon />,
    iconColor: "#FFA726", // Naranja
  },
  {
    label: "TRANSITO",
    icon: <DirectionsBusIcon />,
    iconColor: "#4CAF50", // Verde
  },
  {
    label: "ARRIBÓ",
    icon: <LocationOnIcon />,
    iconColor: "#29B6F6", // Azul cielo
  },
  {
    label: "ENTREGA",
    icon: <CheckCircleIcon />,
    iconColor: "#1E88E5", // Azul marino
  },
];

// Colores de estados
const COLOR_PASADO = "#4B9C5F";   // Verde ya pasado
const COLOR_ACTUAL = "#00004E";   // Azul oscuro para actual
const COLOR_FUTURO = "#B0BEC5";   // Gris para los que faltan

const Indicadores = ({ pasoActual }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 2,
        pb: 6,
        overflowX: "auto",
        flexWrap: "nowrap",
        position: "relative",
        gap: 4,
      }}
    >
      {pasos.map((paso, index) => {
        const esActual = pasoActual === index;
        const esPasado = pasoActual > index;
        const esFuturo = pasoActual < index;

        const nextStepExists = index < pasos.length - 1;

        const colorTextoYBorde = esActual
          ? COLOR_ACTUAL
          : esPasado
          ? COLOR_PASADO
          : COLOR_FUTURO;

        return (
          <Box
            key={paso.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              position: "relative",
            }}
          >
            {/* Contenedor del paso */}
            <Box
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1.5,
                minWidth: 100,
                textAlign: "center",
                color: colorTextoYBorde,
                border: `2px solid ${colorTextoYBorde}`,
                fontWeight: esActual ? "bold" : "normal",
                position: "relative",
                animation: esActual ? "pulse-border 2s infinite" : "none",
              }}
            >
              {/* Flecha superior para paso actual */}
              {esActual && (
                <ArrowDropDownCircleIcon
                  sx={{
                    position: "absolute",
                    top: -30,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: colorTextoYBorde,
                    fontSize: 30,
                    animation: "bounce 1.5s infinite",
                  }}
                />
              )}

              {/* Icono con su color específico */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 0.5,
                  color: paso.iconColor,
                }}
              >
                {React.cloneElement(paso.icon, { fontSize: "small" })}
              </Box>

              {/* Etiqueta */}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: esActual ? "bold" : "normal",
                }}
              >
                {paso.label}
              </Typography>
            </Box>

            {/* Flecha entre pasos */}
            {nextStepExists && (
              <ArrowForwardIcon
                sx={{
                  fontSize: 30,
                  color: colorTextoYBorde,
                  mt: 1,
                }}
              />
            )}
          </Box>
        );
      })}

      {/* Animaciones */}
<style>
  {`
    @keyframes bounce {
      0%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(-12px);
      }
    }

    @keyframes pulse-border {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 0, 78, 0.6);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(0, 0, 78, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 0, 78, 0);
      }
    }
  `}
</style>

    </Box>
  );
};

export default Indicadores;
