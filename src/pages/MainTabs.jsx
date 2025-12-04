// src/pages/MainTabs.jsx
import React, { useState, useEffect } from "react";
import {
  Tabs, Tab, Box, Typography, Grid, Paper, CssBaseline, useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import EmojiObjects from "@mui/icons-material/EmojiObjects";
import LocalShipping from "@mui/icons-material/LocalShipping";

import Carousel from "../components/carousel/Carousel";
import QuoterDialog from "../components/QuoterDialog/QuoterDialog";
import SearchSerieFolioForm from "../components/SearchSerieFolioForm/SearchSerieFolioForm";
import ResultsTable from "../components/ResultsTable/ResultsTable";
import BranchesMap from "../components/BranchesMap/BranchesMap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TruckLoader from "../components/TruckLoader";
import MissionVision from "../components/MissionVision";

import "leaflet/dist/leaflet.css";

function MainTabs() {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState({ estatus: [], detalles: [] });
  const [loadingPage, setLoadingPage] = useState(true);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timer = setTimeout(() => setLoadingPage(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (_, newValue) => setValue(newValue);

  const handleSearch = async ({ serie, folio }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/results/searchBySerieFolio?kindReport=carta%20porte&serie=${serie}&folio=${folio}`,
        { method: "GET", cache: "no-store" }
      );
      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();
      setResults({ estatus: Array.isArray(data) ? data : [], detalles: [] });
      setHasSearched(true);
    } catch (error) {
      console.error("Error:", error);
      setResults({ estatus: [], detalles: [] });
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        overflowX: "hidden",
      }}
    >
      <CssBaseline />
      <Header />
      <Box sx={{ height: 64 }} /> {/* espacio para header */}

      {/* Menú de pestañas */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          bgcolor: "#00004e",
          p: 1,
          borderRadius: 0,
          mb: 2,
          position: "sticky",
          top: "64px",
          zIndex: 1000,
          overflowX: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isSmall ? "scrollable" : "fullWidth"}
          scrollButtons={isSmall ? "auto" : false}
          centered={!isSmall}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            ".MuiTabs-indicator": { backgroundColor: "green" },
            ".MuiTab-root": {
              fontSize: isSmall ? "0.75rem" : "1rem",
              minHeight: isSmall ? 48 : 60,
              px: isSmall ? 1 : 3,
              py: 1,
              color: "#ffffff",
              whiteSpace: "nowrap",
            },
            ".Mui-selected": {
              fontWeight: "bold",
              backgroundColor: "#4B9C5F",
              borderRadius: 1,
              color: "#ffffff !important",
            },
          }}
        >
          <Tab icon={<HomeIcon />} iconPosition="start" label="Home" />
          <Tab icon={<StoreIcon />} iconPosition="start" label="Sucursales" />
          <Tab icon={<EmojiObjects />} iconPosition="start" label="Misión y Visión" />
          <Tab icon={<LocalShipping />} iconPosition="start" label="Cotizador" />
        </Tabs>
      </Paper>

      {/* Contenido de cada tab */}
      <Box sx={{ flex: 1 }}>
        {value === 0 && (
          <Box sx={{ p: 2, flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid
              container
              spacing={2}
              sx={{ maxWidth: 1200, width: "100%", alignItems: "flex-start", justifyContent: "center" }}
            >
              {/* Formulario de búsqueda */}
              <Grid item xs={12} md={3}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 400,
                  }}
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Buscar Carta Porte
                  </Typography>
                  <Box sx={{ flex: 1, overflow: "auto" }}>
                    <SearchSerieFolioForm onSearch={handleSearch} />
                  </Box>
                </Paper>
              </Grid>

              {/* Carrusel o resultados */}
              <Grid item xs={12} md={9} sx={{ display: "flex", justifyContent: "center" }}>
                {!hasSearched ? (
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      width: "100%",
                      maxWidth: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      minHeight: 400,
                    }}
                  >
                    <Carousel />
                  </Paper>
                ) : (
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      width: "100%",
                      maxWidth: 900,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 400,
                    }}
                  >
                    <Typography variant="h6" align="center" gutterBottom>
                      Resultados
                    </Typography>
                    <Box sx={{ flex: 1, width: "100%", overflowY: "auto" }}>
                      {loading ? (
                        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <TruckLoader />
                        </Box>
                      ) : results.estatus.length > 0 ? (
                        <ResultsTable estatus={results.estatus} detalles={results.detalles} />
                      ) : (
                        <Typography align="center" sx={{ mt: 2 }}>
                          No se encontraron resultados
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Box>
        )}

        {value === 1 && <Box sx={{ p: 3, flex: 1 }}><BranchesMap /></Box>}
        {value === 2 && (
          <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", flex: 1 }}>
            <MissionVision />
          </Box>
        )}
        {value === 3 && (
          <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", flex: 1 }}>
            <QuoterDialog />
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default MainTabs;
