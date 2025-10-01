import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchSerieFolioForm({ onSearch }) {
  const [serie, setSerie] = useState("");
  const [folio, setFolio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    const serieRegex = /^[a-zA-Z]{1,8}$/;
    const folioRegex = /^[0-9]{1,8}$/;

    if (!serieRegex.test(serie)) {
      alert("La serie debe contener solo letras y máximo 8 caracteres.");
      return;
    }

    if (!folioRegex.test(folio)) {
      alert("El folio debe contener solo números y máximo 8 dígitos.");
      return;
    }

    if (onSearch) {
      onSearch({ serie: serie.toLowerCase(), folio });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Serie"
        value={serie}
        onChange={(e) => setSerie(e.target.value.toUpperCase())}
        inputProps={{ maxLength: 8 }}
        required
        fullWidth
      />

      <TextField
        label="Folio"
        value={folio}
        onChange={(e) => {
          const onlyNums = e.target.value.replace(/\D/g, ""); // solo números
          setFolio(onlyNums.slice(0, 8)); // máximo 8 dígitos
        }}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" size="large" color="primary">
        Buscar
      </Button>
    </Box>
  );
}

export default SearchSerieFolioForm;
