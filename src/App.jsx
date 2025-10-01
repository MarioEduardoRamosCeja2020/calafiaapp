import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
  CssBaseline,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Carousel from "./components/carousel/Carousel";
import SearchSerieFolioForm from "./components/SearchSerieFolioForm/SearchSerieFolioForm";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import BranchesMap from "./components/BranchesMap/BranchesMap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TruckLoader from "./components/TruckLoader"; // 🚛 animación

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
        setResults(data);
        setHasSearched(true); // 👈 Marca que ya se hizo la primera búsqueda
      } catch (error) {
        console.error("Error en la petición:", error);
        setResults([]);
        setHasSearched(true); // 👈 Aún si falla, ya se intentó
      } finally {
        setLoading(false);
      }
    };


  return (
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <Header />
      <Box sx={{ height: 64 }} />

      {/* MENÚ DE TABS */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          bgcolor: "#001f3f",
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
              backgroundColor: "#2ecc71",
              borderRadius: 1,
              color: "#ffffff !important",
            },
          }}
        >
          <Tab icon={<HomeIcon />} iconPosition="start" label="Home" />
          <Tab icon={<StoreIcon />} iconPosition="start" label="Sucursales" />
          <Tab icon={<MoreHorizIcon />} iconPosition="start" label="Other" />
        </Tabs>
      </Paper>

      {/* CONTENIDO SEGÚN TAB SELECCIONADO */}
      {value === 0 && (
        <Box sx={{ p: 3 }}>
          {/* Carrusel */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                <Carousel />
              </Paper>
            </Grid>
          </Grid>

          {/* Formulario + Resultados lado a lado */}
          <Grid container spacing={2}>
            {/* FORMULARIO */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  height: "100%",
                  position: "sticky",
                  top: 140,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="h6" align="center" gutterBottom>
                  Buscar Carta Porte
                </Typography>
                <SearchSerieFolioForm onSearch={handleSearch} />
              </Paper>
            </Grid>

            {/* TABLA / LOADER */}
{(hasSearched || loading) && (
  // <Grid item xs={12} md={9}>
  //   <Paper
  //     elevation={3}
  //     sx={{
  //       p: 2,
  //       borderRadius: 2,
  //       minHeight: 300,
  //       maxHeight: "70vh",
  //       overflowY: "auto",
  //     }}
  //   >
  //     {loading ? (
  //       <>
  //         <Typography variant="h6" align="center" gutterBottom>
  //           Cargando resultados...
  //         </Typography>
  //         <TruckLoader />
  //       </>
  //     ) : results.length > 0 ? (
  //       <>
  //         <Typography variant="h6" align="center" gutterBottom>
  //           Resultados
  //         </Typography>
  //         <ResultsTable data={results} />
  //       </>
  //     ) : (
  //       <>
  //         <Typography variant="h6" align="center" gutterBottom>
  //           Resultados
  //         </Typography>
  //         <Typography variant="body2" align="center" sx={{ mt: 2 }}>
  //           No se encontraron resultados.
  //         </Typography>
  //       </>
  //     )}
  //   </Paper>
  // </Grid>
  <Grid item xs={12} md={9}>
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      height: "100%", // Hace que use todo el espacio disponible
      minHeight: 400, // Forzamos una altura que funcione bien
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", // Para alinear contenido arriba
    }}
  >
    <Typography variant="h6" align="center" gutterBottom>
      Resultados
    </Typography>

    <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {loading ? (
        <TruckLoader />
      ) : hasSearched ? (
        results.length > 0 ? (
          <ResultsTable data={results} />
        ) : (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            No se encontraron resultados.
          </Typography>
        )
      ) : (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Realiza una búsqueda para ver resultados.
        </Typography>
      )}
    </Box>
  </Paper>
</Grid>

)}



          </Grid>
        </Box>
      )}

      {value === 1 && (
        <Box sx={{ p: 3 }}>
          <BranchesMap />
        </Box>
      )}

      {value === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Other option content</Typography>
        </Box>
      )}

      <Footer />
    </Box>
  );
}

export default App;
