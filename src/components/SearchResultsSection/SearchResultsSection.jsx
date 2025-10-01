import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
} from "@mui/material";
import SearchSerieFolioForm from "../SearchSerieFolioForm/SearchSerieFolioForm";
import ResultsTable from "../ResultsTable/ResultsTable";

function SearchResultsSection() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async ({ serie, folio }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/results/searchBySerieFolio?kindReport=carta%20porte&serie=${serie}&folio=${folio}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) throw new Error("No se pudieron obtener los resultados");

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      setError("Error al consultar los resultados.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid item xs={12} md={9}>
<Grid item xs={12} md={9}>
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      minHeight: 300,
      height: "100%",
      maxHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflowY: "auto",
      transition: "all 0.3s ease-in-out",
    }}
  >
    <Typography variant="h6" align="center" gutterBottom>
      Resultados
    </Typography>

    {loading ? (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <TruckLoader />
      </Box>
    ) : results.length > 0 ? (
      <Box sx={{ width: "100%" }}>
        <ResultsTable data={results} />
      </Box>
    ) : (
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Realiza una búsqueda para ver resultados.
      </Typography>
    )}
  </Paper>
</Grid>
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      minHeight: 300,
      maxHeight: "70vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography variant="h6" align="center" gutterBottom>
      Resultados
    </Typography>

{loading ? (
  <TruckLoader />
) : results.length > 0 ? (
  <ResultsTable data={results} />
) : (
  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
    Realiza una búsqueda para ver resultados.
  </Typography>
)}

  </Paper>
</Grid>

  );
}

export default SearchResultsSection;
