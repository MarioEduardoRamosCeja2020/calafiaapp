import React, { useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";

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

const whatsappContacts = [
  {
    label: "Cotizaciones Jalisco",
    link: "https://wa.me/5213314000306?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20servicios%20de%20envíos.",
  },
  {
    label: "Cotizaciones México",
    link: "https://wa.me/5213322582558?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20servicios%20de%20envíos.",
  },
  {
    label: "Cotizaciones La Paz",
    link: "https://wa.me/5216671549082?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20servicios%20de%20envíos.",
  },
  {
    label: "Cotizaciones Los Cabos",
    link: "https://wa.me/5216241297977?text=Hola,%20me%20gustaría%20recibir%20información%20sobre%20sus%20servicios%20de%20envíos.",
  },
  {
    label: "Crédito y Cobranza",
    link: "https://wa.me/5213315711820",
  },
  {
    label: "Crédito y Cobranza 2",
    link: "https://wa.me/5213314003886",
  },
];

const Footer = () => {
  const [openWhats, setOpenWhats] = useState(false);

  return (
    <Box component="footer" className="footer-root">

      <Box className="footer-content">

        {/* REDES */}
        <Box className="social-icons">

          {/* FACEBOOK */}
          <Box className="social-item">

            <Tooltip title="Facebook Oficial">

              <IconButton
                aria-label="Facebook"
                href="https://www.facebook.com/grupocalafia/timeline"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn facebook"
              >
                <FacebookIcon />
              </IconButton>

            </Tooltip>

            <Typography className="social-label">
              Facebook
            </Typography>

          </Box>

          {/* YOUTUBE */}
          <Box className="social-item">

            <Tooltip title="Canal de YouTube">

              <IconButton
                aria-label="YouTube"
                href="https://www.youtube.com/watch?v=k9RgPHIV_IU"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn youtube"
              >
                <YouTubeIcon />
              </IconButton>

            </Tooltip>

            <Typography className="social-label">
              YouTube
            </Typography>

          </Box>

          {/* WHATSAPP */}
          <Box className="social-item">

            <Tooltip title="Cotizaciones y Atención">

              <IconButton
                aria-label="WhatsApp"
                onClick={() => setOpenWhats(!openWhats)}
                className={`social-btn whatsapp ${openWhats ? "active-whatsapp" : ""}`}
              >
                <WhatsAppIcon />
              </IconButton>

            </Tooltip>

            <Typography className="social-label">
              WhatsApp
            </Typography>

            <Collapse in={openWhats}>

              <Box className="whatsapp-menu">

                {whatsappContacts.map((item, index) => (

                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    {item.label}
                  </a>

                ))}

              </Box>

            </Collapse>

          </Box>

        </Box>

        {/* SERVICIOS */}
        <Box className="marquee-container">

          <Box className="marquee-track">

            {[...services, ...services].map((text, index) => (

              <Box key={index} className="service-item">

                <Box className="trailer-image">
                  <img src="/trailer.png" alt="Trailer" />
                </Box>

                <Typography className="marquee-text">
                  {text}
                </Typography>

              </Box>

            ))}

          </Box>

        </Box>

      </Box>

    </Box>
  );
};

export default Footer;