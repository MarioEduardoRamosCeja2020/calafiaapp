import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Definición de pasos con color propio del icono
const pasos = [
  { label: "DOCUMENTO", icon: <DescriptionIcon />, iconColor: "#7E57C2" },
  { label: "CARGA", icon: <LocalShippingIcon />, iconColor: "#FFA726" },
  { label: "TRANSITO", icon: <DirectionsBusIcon />, iconColor: "#4CAF50" },
  { label: "ARRIBÓ", icon: <LocationOnIcon />, iconColor: "#29B6F6" },
  { label: "ENTREGA", icon: <CheckCircleIcon />, iconColor: "#1E88E5" },
];

const COLOR_PASADO = "#4B9C5F";
const COLOR_ACTUAL = "#00004E";
const COLOR_FUTURO = "#B0BEC5";

const Indicadores = ({ pasoActual }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // detecta móvil

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: isMobile ? "flex-start" : "center",
        overflowX: isMobile ? "visible" : "auto",
        px: 2,
        pb: 6,
        gap: isMobile ? 2 : 4,
        width: "100%",
      }}
    >
      {pasos.map((paso, index) => {
        const esActual = pasoActual === index;
        const esPasado = pasoActual > index;
        const colorTextoYBorde = esActual
          ? COLOR_ACTUAL
          : esPasado
          ? COLOR_PASADO
          : COLOR_FUTURO;

        const nextStepExists = index < pasos.length - 1;

        return (
          <Box
            key={paso.label}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
              width: isMobile ? "100%" : "auto",
              minHeight: isMobile ? "auto" : 130,
              position: "relative",
            }}
          >
            {/* Paso */}
            <Box
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1.5,
                minWidth: 100,
                minHeight: 80,
                textAlign: "center",
                color: colorTextoYBorde,
                border: `2px solid ${colorTextoYBorde}`,
                fontWeight: esActual ? "bold" : "normal",
                position: "relative",
                animation: esActual ? "pulse-border 2s infinite" : "none",
                boxShadow: esActual
                  ? "0 0 10px rgba(0, 0, 78, 0.5)"
                  : "0 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: esActual ? "default" : "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Flecha arriba para el actual */}
              {esActual && !isMobile && (
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

              {/* Icono */}
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

              {/* Texto */}
              <Typography variant="caption" sx={{ fontWeight: esActual ? "bold" : "normal" }}>
                {paso.label}
              </Typography>
            </Box>

            {/* Flecha entre pasos (solo desktop) */}
            {!isMobile && nextStepExists && (
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
