
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  useMediaQuery,
  Paper,
  CssBaseline,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import EmojiObjects from "@mui/icons-material/EmojiObjects";

import Carousel from "./components/carousel/Carousel";
import SearchSerieFolioForm from "./components/SearchSerieFolioForm/SearchSerieFolioForm";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import BranchesMap from "./components/BranchesMap/BranchesMap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TruckLoader from "./components/TruckLoader";
import MissionVision from "./components/MissionVision";

import "leaflet/dist/leaflet.css";

function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState([]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async ({ serie, folio }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/results/searchBySerieFolio?kindReport=carta%20porte&serie=${serie}&folio=${folio}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch results");

      const data = await response.json();
      console.log("✅ Datos recibidos:", data);

      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error en la petición:", error);
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <Header />
      <Box sx={{ height: 64 }} />

      {/* Menú de Tabs */}
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
            ".MuiTabs-indicator": {
              backgroundColor: "green",
            },
            ".MuiTab-root": {
              fontSize: isSmall ? "0.75rem" : "1rem",
              minHeight: isSmall ? 48 : 60,
              px: isSmall ? 1 : 3,
              py: 1,
              color: "#ffffff",
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
        </Tabs>
      </Paper>

      {/* Contenido por tab */}
      {value === 0 && (
        <Box sx={{ p: 3 }}>
          {/* Carrusel */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                <Carousel />
              </Paper>
            </Grid>
          </Grid>

          {/* Formulario + Resultados */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  height: "100%",
                }}
              >
                <Typography variant="h6" align="center" gutterBottom>
                  Buscar Carta Porte
                </Typography>
                <SearchSerieFolioForm onSearch={handleSearch} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              {(hasSearched || loading) && (
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    minHeight: 400,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Resultados
                  </Typography>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loading ? (
                      <TruckLoader />
                    ) : hasSearched ? (
                      results.estatus && results.estatus.length > 0 ? (
                        <ResultsTable estatus={results.estatus} detalles={results.detalles} />
                      ) : (
                        <Typography>No se encontraron resultados</Typography>
                      )
                    ) : (
                      <Typography>Realiza una búsqueda</Typography>
                    )}
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Sucursales */}
      {value === 1 && (
        <Box sx={{ p: 3 }}>
          <BranchesMap />
        </Box>
      )}

      {/* Misión y Visión */}
      {value === 2 && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <MissionVision />
        </Box>
      )}

      <Footer />
    </Box>
  );
}

export default App;
