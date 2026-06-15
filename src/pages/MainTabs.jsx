import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Paper,
  CssBaseline,
  useMediaQuery,
  Toolbar,
  Container,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import EmojiObjects from "@mui/icons-material/EmojiObjects";

import Carousel from "../components/carousel/Carousel";
import SearchSerieFolioForm from "../components/SearchSerieFolioForm/SearchSerieFolioForm";
import ResultsTable from "../components/ResultsTable/ResultsTable";
import BranchesMap from "../components/BranchesMap/BranchesMap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TruckLoader from "../components/TruckLoader";
import MissionVision from "../components/MissionVision";

import API_URL from "../config/api";

import "leaflet/dist/leaflet.css";

function MainTabs() {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState({
    estatus: [],
    detalles: [],
  });

  const [loadingPage, setLoadingPage] = useState(true);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timer = setTimeout(() => setLoadingPage(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async ({ serie, folio }) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/results/searchBySerieFolio?kindReport=carta%20porte&serie=${serie}&folio=${folio}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener resultados");
      }

      const data = await response.json();

      setResults({
        estatus: Array.isArray(data) ? data : [],
        detalles: [],
      });

      setHasSearched(true);
    } catch (error) {
      console.error(error);

      setResults({
        estatus: [],
        detalles: [],
      });

      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <TruckLoader />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        overflowX: "hidden",
      }}
    >
      <CssBaseline />

      <Header />

      {/* Espacio dinámico header */}
      <Toolbar  sx={{
    minHeight: { xs: 40, sm: 50 },
  }}/>

      {/* MENU */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          bgcolor: "#00004e",
          borderRadius: 0,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          {/* <Tabs
            value={value}
            onChange={handleChange}
            variant={isSmall ? "scrollable" : "fullWidth"}
            scrollButtons={isSmall ? "auto" : false}
            centered={!isSmall}
            indicatorColor="secondary"
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-around",
              },

              "& .MuiTab-root": {
                color: "#fff",
                fontWeight: 600,
                fontSize: {
                  xs: "12px",
                  sm: "14px",
                },
                textTransform: "none",
                borderRadius: 2,
                minHeight: 48,
              },

              "& .Mui-selected": {
                backgroundColor: "#4B9C5F",
                color: "#fff !important",
              },

              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
            }}
          >
            <Tab
              icon={<HomeIcon />}
              iconPosition="start"
              label="Inicio"
            />

            <Tab
              icon={<StoreIcon />}
              iconPosition="start"
              label="Sucursales"
            />

            <Tab
              icon={<EmojiObjects />}
              iconPosition="start"
              label="Misión y Visión"
            />
          </Tabs> */}
          <Tabs
  value={value}
  onChange={handleChange}
  variant={isSmall ? "scrollable" : "fullWidth"}
  scrollButtons={isSmall ? "auto" : false}
  centered={!isSmall}
  sx={{
    width: "100%",

    "& .MuiTabs-flexContainer": {
      justifyContent: "space-around",
      gap: {
        xs: 1,
        sm: 2,
      },
    },

    /* 🔥 LINEA BLANCA */
    "& .MuiTabs-indicator": {
      backgroundColor: "#ffffff",
      height: "4px",
      borderRadius: "20px",
      boxShadow: "0 0 10px rgba(255,255,255,.7)",
    },

    /* 🔥 TABS */
    "& .MuiTab-root": {
      color: "rgba(255,255,255,.85)",
      fontWeight: 600,

      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "15px",
      },

      textTransform: "none",

      borderRadius: "14px",

      minHeight: 48,

      minWidth: {
        xs: 110,
        sm: 140,
      },

      transition: "all .3s ease",

      px: {
        xs: 1,
        sm: 2,
      },

      py: 1,

      "&:hover": {
        backgroundColor: "rgba(255,255,255,.08)",
        color: "#fff",
      },
    },

    /* 🔥 TAB ACTIVO */
    "& .Mui-selected": {
      backgroundColor: "#4B9C5F",
      color: "#ffffff !important",

      boxShadow: "0 4px 14px rgba(75,156,95,.35)",

      transform: "translateY(-1px)",
    },

    /* 🔥 ICONOS */
    "& .MuiSvgIcon-root": {
      color: "#ffffff",
      fontSize: {
        xs: "18px",
        sm: "20px",
      },
    },

    /* 🔥 SCROLL BUTTONS MOBILE */
    "& .MuiTabs-scrollButtons": {
      color: "#fff",
    },
  }}
>
  <Tab
    icon={<HomeIcon />}
    iconPosition="start"
    label="Inicio"
  />

  <Tab
    icon={<StoreIcon />}
    iconPosition="start"
    label="Sucursales"
  />

  <Tab
    icon={<EmojiObjects />}
    iconPosition="start"
    label="Misión y Visión"
  />
</Tabs>
        </Container>
      </Paper>

      {/* CONTENIDO */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          pb: { xs: 10, md: 8 },
        }}
      >
        {/* HOME */}
{value === 0 && (
  <Container
    maxWidth="xl"
    sx={{
      py: 2,
    }}
  >
    <Grid container spacing={2} alignItems="stretch">
      {/* FORMULARIO */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            backgroundColor: "#fff",
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Buscar Carta Porte
          </Typography>

          <SearchSerieFolioForm onSearch={handleSearch} />
        </Paper>
      </Grid>

      {/* CARRUSEL O RESULTADOS */}
      <Grid item xs={12} md={8} lg={9}>
        {!hasSearched ? (
          <Paper
            elevation={3}
            sx={{
              overflow: "hidden",
              borderRadius: 4,
              p: { xs: 1, md: 2 },
              height: "100%",
            }}
          >
            <Carousel />
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              minHeight: 300,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Resultados
            </Typography>

            {loading ? (
              <TruckLoader />
            ) : results.estatus.length > 0 ? (
              <ResultsTable
                estatus={results.estatus}
                detalles={results.detalles}
              />
            ) : (
              <Typography align="center">
                No se encontraron resultados
              </Typography>
            )}
          </Paper>
        )}
      </Grid>
    </Grid>
  </Container>
)}
        {/* SUCURSALES */}
        {value === 1 && (
          <Container
            maxWidth="xl"
            sx={{
              py: 3,
            }}
          >
            <BranchesMap />
          </Container>
        )}

        {/* MISION */}
        {value === 2 && (
          <Container
            maxWidth="lg"
            sx={{
              py: 3,
            }}
          >
            <MissionVision />
          </Container>
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default MainTabs;