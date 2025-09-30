// src/components/Footer/Footer.jsx
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./Footer.css";

const services = [
  "Paquetería y mensajería",
  "Transporte de carga",
  "Envíos nacionales",
  "Logística empresarial",
  "Rastreo de paquetes",
  "Almacenamiento",
  "Distribución local",
];

const Footer = () => {
  return (
    <Box component="footer" className="footer-root">
      {/* Redes sociales ARRIBA */}
      <Box className="social-icons">
        <IconButton
          aria-label="Facebook"
          href="https://www.facebook.com/grupocalafia/timeline"
          target="_blank"
          className="social-btn facebook"
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="YouTube"
          href="https://www.youtube.com/watch?v=k9RgPHIV_IU"
          target="_blank"
          className="social-btn youtube"
        >
          <YouTubeIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="WhatsApp"
          href="https://wa.me/5213314001270?text=Hola%2C%20quiero%20más%20información%20de%20calafia%20envios"
          target="_blank"
          className="social-btn whatsapp"
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Imagen + texto animado */}
      <Box className="marquee-container">
        <Box className="marquee-track">
          <Box className="trailer-image">
            <img src="/trailer.png" alt="Trailer" />
          </Box>
          {[...services, ...services].map((text, index) => (
            <Typography key={index} className="marquee-text">
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
