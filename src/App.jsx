// src/App.jsx

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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Carousel from "./components/carousel/Carousel";
import SearchSerieFolioForm from "./components/SearchSerieFolioForm/SearchSerieFolioForm";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import BranchesMap from "./components/BranchesMap/BranchesMap";
import Header from "./components/Header/Header";
import { CssBaseline } from "@mui/material";
import Footer from "./components/Footer/Footer";

import "leaflet/dist/leaflet.css";


function App() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(0);
  const [results, setResults] = useState([]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async ({ serie, folio }) => {
    try {
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
    } catch (error) {
      console.error("Error en la petición:", error);
      setResults([]);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <Header />
      <Box sx={{ height: 64 }} /> {/* Este box compensa la altura del Header */}
      {/* MENU DE TABS */}
<Paper
  elevation={3}
  sx={{
    width: "100%",
    bgcolor: "#001f3f", // azul marino
    p: 1,
    borderRadius: 0,
    mb: 2,
    position: "sticky",
    top: "64px", // debajo del header
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
        backgroundColor: "green", // indicador verde
      },
      ".MuiTab-root": {
        fontSize: isSmall ? "0.75rem" : "1rem",
        minHeight: isSmall ? 48 : 60,
        px: isSmall ? 1 : 3,
        py: 1,
        color: "#ffffff", // color de texto
      },
      ".Mui-selected": {
        fontWeight: "bold",
        backgroundColor: "#2ecc71", // verde para pestaña activa
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


      {/* CONTENIDO SEGUN TAB SELECCIONADO */}
      {value === 0 && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* Carrusel */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                <Carousel />
              </Paper>
            </Grid>

            {/* Formulario + Resultados */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  borderRadius: 2,
                }}
              >
                <SearchSerieFolioForm onSearch={handleSearch} />

                <Typography variant="h6" align="center">
                  Results
                </Typography>

                <Box sx={{ maxHeight: 250, overflowY: "auto" }}>
                  <ResultsTable data={results} />
                </Box>
              </Paper>
            </Grid>
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
