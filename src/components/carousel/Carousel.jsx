import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  {
    url: "/img/truckUno.jpg",
    title: "Transporte de carga",
  },
  {
    url: "/img/truckDos.jpg",
    title: "Envíos nacionales",
  },
  {
    url: "/img/truckTres.jpg",
    title: "Logística empresarial",
  },
  {
    url: "/img/truckCuatro.jpg",
    title: "Cobertura nacional",
  },
  {
    url: "/img/paqueteriaCajas.png",
    title: "Paquetería y mensajería",
  },
];

export default function FullScreenCarousel() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        (prev + 1) % images.length
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  const prevSlide = () => {

    setCurrent((prev) =>
      (prev - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {

    setCurrent((prev) =>
      (prev + 1) % images.length
    );
  };

  return (

    <Box
      sx={{

        position: "relative",

        width: "100%",

        maxWidth: "1600px",

        margin: "0 auto",

        height: {
          xs: "220px",
          sm: "280px",
          md: "340px",
          lg: "420px",
          xl: "460px",
        },

        overflow: "hidden",

        borderRadius: {
          xs: "0px",
          sm: "18px",
        },

        background:
          "linear-gradient(135deg,#04145c,#020b2d)",

        boxShadow:
          "0 10px 30px rgba(0,0,0,.25)",

        border:
          "1px solid rgba(255,255,255,.06)",
      }}
    >

      {/* IMAGENES */}
      {images.map((img, index) => (

        <Box
          key={index}
          sx={{

            position: "absolute",

            inset: 0,

            opacity: index === current ? 1 : 0,

            transition:
              "opacity 1s ease-in-out",

            width: "100%",

            height: "100%",
          }}
        >

          {/* IMAGEN */}
          <Box
            component="img"
            src={img.url}
            alt={img.title}
            sx={{

              width: "100%",

              height: "100%",

              objectFit: "cover",

              transition:
                "transform 6s ease",

              transform:
                index === current
                  ? "scale(1.05)"
                  : "scale(1)",

            }}
          />

          {/* OVERLAY */}
          <Box
            sx={{

              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.15), transparent)",
            }}
          />

          {/* TEXTO */}
          <Box
            sx={{

              position: "absolute",

              bottom: {
                xs: 18,
                md: 22,
              },

              left: {
                xs: 18,
                md: 28,
              },

              zIndex: 2,
            }}
          >

            <Typography
              sx={{

                color: "#fff",

                fontWeight: 800,

                lineHeight: 1.05,

                textShadow:
                  "0 4px 18px rgba(0,0,0,.5)",

                fontSize: {
                  xs: "1.3rem",
                  sm: "1.8rem",
                  md: "2.6rem",
                  lg: "3.2rem",
                },

                maxWidth: {
                  xs: "90%",
                  md: "60%",
                },
              }}
            >
              {img.title}
            </Typography>

          </Box>

        </Box>

      ))}

      {/* BOTON IZQUIERDO */}
      <IconButton
        onClick={prevSlide}
        sx={{

          position: "absolute",

          top: "50%",

          left: {
            xs: 8,
            md: 18,
          },

          transform: "translateY(-50%)",

          color: "#fff",

          width: {
            xs: 38,
            md: 52,
          },

          height: {
            xs: 38,
            md: 52,
          },

          backdropFilter: "blur(10px)",

          background:
            "rgba(0,0,0,.28)",

          border:
            "1px solid rgba(255,255,255,.12)",

          transition: ".3s",

          zIndex: 5,

          "&:hover": {

            background:
              "rgba(0,0,0,.55)",

            transform:
              "translateY(-50%) scale(1.08)",
          },
        }}
      >

        <ArrowBackIosNewIcon
          sx={{
            fontSize: {
              xs: 18,
              md: 24,
            },
          }}
        />

      </IconButton>

      {/* BOTON DERECHO */}
      <IconButton
        onClick={nextSlide}
        sx={{

          position: "absolute",

          top: "50%",

          right: {
            xs: 8,
            md: 18,
          },

          transform: "translateY(-50%)",

          color: "#fff",

          width: {
            xs: 38,
            md: 52,
          },

          height: {
            xs: 38,
            md: 52,
          },

          backdropFilter: "blur(10px)",

          background:
            "rgba(0,0,0,.28)",

          border:
            "1px solid rgba(255,255,255,.12)",

          transition: ".3s",

          zIndex: 5,

          "&:hover": {

            background:
              "rgba(0,0,0,.55)",

            transform:
              "translateY(-50%) scale(1.08)",
          },
        }}
      >

        <ArrowForwardIosIcon
          sx={{
            fontSize: {
              xs: 18,
              md: 24,
            },
          }}
        />

      </IconButton>

      {/* INDICADORES */}
      <Box
        sx={{

          position: "absolute",

          bottom: {
            xs: 10,
            md: 14,
          },

          left: "50%",

          transform: "translateX(-50%)",

          display: "flex",

          gap: 1,

          zIndex: 10,
        }}
      >

        {images.map((_, index) => (

          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{

              width:
                index === current
                  ? 24
                  : 10,

              height: 10,

              borderRadius: 20,

              cursor: "pointer",

              transition: ".35s",

              background:
                index === current
                  ? "#00c853"
                  : "rgba(255,255,255,.45)",
            }}
          />

        ))}

      </Box>

    </Box>
  );
}