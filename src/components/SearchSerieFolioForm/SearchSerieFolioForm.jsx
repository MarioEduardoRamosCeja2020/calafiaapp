import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchSerieFolioForm({ onSearch }) {
  const [serie, setSerie] = useState("");
  const [folio, setFolio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    const serieRegex = /^[A-ZÁÉÍÓÚÑ]{1,8}$/;
    const folioRegex = /^[0-9]{1,8}$/;

    if (!serieRegex.test(serie)) {
      alert(
        "La serie debe contener solo letras (A-Z, Ñ, acentos) y máximo 8 caracteres."
      );
      return;
    }

    if (!folioRegex.test(folio)) {
      alert("El folio debe contener solo números y máximo 8 dígitos.");
      return;
    }

    if (onSearch) {
      onSearch({ serie: serie.toUpperCase(), folio });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3, // más espacio entre campos y botón
        mt: 2, // margen superior para separar del título
        overflow: "visible",
      }}
    >
      <TextField
        label="Serie"
        value={serie}
        onChange={(e) => {
          const input = e.target.value.toUpperCase();
          const onlyLetters = input.replace(/[^A-ZÁÉÍÓÚÑ]/gi, "");
          setSerie(onlyLetters);
        }}
        inputProps={{ maxLength: 8 }}
        required
        fullWidth
        InputLabelProps={{ shrink: true }} // fuerza el label flotante
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

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#00004e",
          "&:hover": { backgroundColor: "#4B9C5F" },
          mt: 1,
        }}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default SearchSerieFolioForm;
