import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const pasos = [
  { label: "DOCUMENTO", icon: <DescriptionIcon />, iconColor: "#7E57C2" },
  { label: "CARGA", icon: <LocalShippingIcon />, iconColor: "#FFA726" },
  { label: "TRANSITO", icon: <DirectionsBusIcon />, iconColor: "#4CAF50" },
  { label: "ARRIBÓ", icon: <LocationOnIcon />, iconColor: "#29B6F6" },
  { label: "ENTREGA", icon: <CheckCircleIcon />, iconColor: "#1E88E5" },
];

const COLOR_PASADO = "#4B9C5F"; // verde
const COLOR_ACTUAL = "#00004E"; // azul
const COLOR_FUTURO = "#B0BEC5"; // gris

const Indicadores = ({ pasoActual }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        gap: isMobile ? 3 : 4,
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

        return (
          <Box
            key={paso.label}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                textAlign: "center",
                color: colorTextoYBorde,
                border: `2px solid ${colorTextoYBorde}`,
                fontWeight: esActual ? "bold" : "normal",
                animation: esActual ? "pulse-border 2s infinite" : "none",
                boxShadow: esActual
                  ? "0 0 10px rgba(0,0,78,0.5)"
                  : "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Flecha arriba */}
                {esActual && !isMobile && (
                  <ArrowDropDownCircleIcon
                    sx={{
                      position: "absolute",
                      top: "-29.4%", // verticalmente al medio
                      left: "35%", // horizontalmente al medio
                      transform: "translate(-50%, -50%)", // centra exactamente
                      color: colorTextoYBorde,
                      fontSize: 25,
                      animation: "bounce 1.8s infinite",
                    }}
                  />
                )}


              {/* Icono */}
              <Box sx={{ color: paso.iconColor, mb: 0.5 }}>
                {React.cloneElement(paso.icon, { fontSize: "small" })}
              </Box>

              {/* Texto */}
              <Typography variant="caption">{paso.label}</Typography>
            </Box>

            {/* Flecha entre pasos */}
            {!isMobile && index < pasos.length - 1 && (
              <ArrowForwardIcon
                sx={{
                  position: "absolute",
                  right: -30,
                  top: "35%",
                  color: colorTextoYBorde,
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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(0,0,78,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(0,0,78,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,78,0); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-12deg); }
        }
        `}
      </style>
    </Box>
  );
};

export default Indicadores;
