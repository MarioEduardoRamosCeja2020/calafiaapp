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
    }, 4000); // cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <Box
      sx={{
        position: "relative",
        width: "95vw",
        height: "40vh",
        overflow: "hidden",
        backgroundColor: "#fdf8f8ff",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            display: index === current ? "block" : "none",
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
              width: "100%",
              height: "100%",
              objectFit: "contain", // 👈 muestra la imagen completa
              transition: "transform 1s ease",
              "&:hover": { transform: "scale(2.05)" },
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
              variant="h3"
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
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
