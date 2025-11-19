import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  { url: "/img/truckv1.mp4", title: "Transporte de carga" },
  { url: "/img/trucv2.mp4", title: "Envíos nacionales" },
  // { url: "/img/truckTres.jpg", title: "Logística empresarial" },
  { url: "/img/truckCuatro.jpg", title: "Logística empresarial" },
  // { url: "/img/paqueteriaCajas.png", title: "Paquetería y mensajería" },
];

export default function FullScreenCarousel() {
  const [current, setCurrent] = useState(0);
  
  // Referencias para cada video
  const videoRefs = useRef([]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const currentItem = images[current];

    if (currentItem.url.endsWith(".mp4")) {
      const video = videoRefs.current[current];

      if (video) {
        // Reiniciar el video cada vez que se cambia de slide
        video.currentTime = 0;
        video.play().catch(() => {});

        const handleEnded = () => nextSlide();
        video.addEventListener("ended", handleEnded);

        return () => {
          video.removeEventListener("ended", handleEnded);
        };
      }
    }
  }, [current]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            display: index === current ? "block" : "none",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Reproducir video si es .mp4 */}
          {img.url.endsWith(".mp4") ? (
            <video
              ref={(el) => (videoRefs.current[index] = el)} // Asignar ref único a cada video
              src={img.url}
              muted
              playsInline
              autoPlay={index === current}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src={img.url}
              alt={img.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Texto sobre la imagen o video */}
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
              sx={{
                fontWeight: 700,
                textShadow: "0 0 10px rgba(0,0,0,0.7)",
              }}
            >
              {img.title}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Flechas de navegación */}
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
          display: { xs: "none", md: "block" },
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
          display: { xs: "none", md: "block" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
