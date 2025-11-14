import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  { url: "/img/truckUno.jpg", title: "Transporte de carga" },
  { url: "/img/truckDos.jpg", title: "Envíos nacionales" },
  { url: "/img/truckTres.jpg", title: "Logística empresarial" },
  { url: "/img/truckCuatro.jpg", title: "Logística empresarial" },
  { url: "/img/paqueteriaCajas.png", title: "Paquetería y mensajería" },
];

export default function FullScreenCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px", // Tamaño fijo para PC
        maxWidth: "100%", // Asegura que el carrusel no se haga más grande
        overflow: "hidden", // Oculta el contenido que se desborda
        margin: "0 auto", // Centra el carrusel
        display: "flex", // Flexbox para que las imágenes se centren
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            display: index === current ? "block" : "none", // Mostrar solo la imagen actual
            width: "100%",
            height: "100%",
            transition: "opacity 1s ease-in-out",
          }}
        >
          <Box
            component="img"
            src={img.url}
            alt={img.title}
            sx={{
              width: "100%", // Asegura que la imagen ocupe el 100% del ancho
              height: "100%", // Asegura que la imagen ocupe el 100% del alto
              objectFit: "contain", // Mantiene las proporciones de la imagen sin recortes
              objectPosition: "center", // Centra la imagen dentro del carrusel
              transition: "transform 1s ease",
              "&:hover": { transform: "scale(1.05)" }, // Efecto zoom en hover
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              py: 3,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              color="#fff"
              sx={{ fontWeight: 700, textShadow: "0 0 10px rgba(0,0,0,0.7)" }}
            >
              {img.title}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Flechas */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          zIndex: 10,
          display: { xs: "none", md: "block" }, // Oculta las flechas en dispositivos móviles
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          zIndex: 10,
          display: { xs: "none", md: "block" }, // Oculta las flechas en dispositivos móviles
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
