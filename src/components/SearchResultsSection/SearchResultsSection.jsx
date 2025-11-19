import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Grid,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import TruckLoader from "../TruckLoader/TruckLoader";
import ResultsTable from "../ResultsTable/ResultsTable";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";

function SearchResultsSection() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serie, setSerie] = useState("");
  const [folio, setFolio] = useState("");

  const handleSearch = async () => {
    if (!serie || !folio) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/results/searchBySerieFolio?kindReport=carta%20porte&serie=${serie}&folio=${folio}`,
        { method: "GET", cache: "no-store" }
      );

      if (!response.ok) throw new Error("No se pudieron obtener los resultados");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("❌ Error en la petición:", err);
      setError("Error al consultar los resultados.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (rutaXML) => {
    if (!rutaXML) return;
    const link = document.createElement("a");
    link.href = `http://www.grupocalafia.com.mx/${rutaXML}`;
    link.download = "archivo.xml";
    link.click();
  };

  return (
    <Grid container justifyContent="center" sx={{ width: "100%", px: 2, mt: 2 }}>
      <Grid item xs={12} lg={10} xl={8}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            width: "100%",
            maxWidth: "1400px",
            minHeight: { xs: "auto", sm: "85vh", md: "90vh" },
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            transition: "all 0.3s ease-in-out",
            margin: "0 auto",
            pt: 4, // espacio arriba del título
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Resultados
          </Typography>

          {/* Formulario de búsqueda */}
          <Box sx={{ width: "100%", mb: 2, mt: 3, overflow: "visible" }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                [theme => ({
                  [theme.breakpoints.down('sm')]: {
                    gap: 1, // Reducir gap en pantallas pequeñas
                  },
                })],
              }}
            >
              <TextField
                label="Serie"
                value={serie}
                onChange={(e) => {
                  const input = e.target.value.toUpperCase();
                  setSerie(input.replace(/[^A-ZÁÉÍÓÚÑ]/gi, ""));
                }}
                inputProps={{ maxLength: 8 }}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Folio"
                value={folio}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setFolio(onlyNums.slice(0, 8));
                }}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <Button type="submit" variant="contained" size="large" color="primary">
                Buscar
              </Button>
            </Box>
          </Box>

          {/* Loader */}
          {loading && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <TruckLoader />
            </Box>
          )}

          {/* Tabla */}
          {!loading && results.length > 0 && (
            <Box
              sx={{
                flex: 1,
                width: "100%",
                overflowY: "auto",
                overflowX: "auto",
                mt: 1,
              }}
            >
              <ResultsTable data={results} />
            </Box>
          )}

          {/* Mensaje sin resultados */}
          {!loading && results.length === 0 && !error && (
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Realiza una búsqueda para ver resultados.
            </Typography>
          )}

          {/* Mensaje de error */}
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Botones */}
          {!loading && results.length > 0 && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                width: "100%",
                mt: 2,
                justifyContent: "center", // Asegura que los botones estén centrados
              }}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<PictureAsPdfIcon />}
                href={`http://www.grupocalafia.com.mx/${results[0]?.rutaPDF}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  flex: 1,
                  width: { xs: "100%", sm: "auto" },
                  minWidth: 160,
                  maxWidth: 250,
                }}
              >
                Ver PDF
              </Button>

              <Button
                variant="contained"
                color="success"
                startIcon={<DescriptionIcon />}
                onClick={() => handleDownload(results[0]?.rutaXML)}
                sx={{
                  flex: 1,
                  width: { xs: "100%", sm: "auto" },
                  minWidth: 160,
                  maxWidth: 250,
                }}
              >
                Descargar XML
              </Button>
            </Stack>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SearchResultsSection;
