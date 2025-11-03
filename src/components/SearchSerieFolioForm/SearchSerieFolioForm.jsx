import { useState } from "react";
import { TextField, Button, Box, keyframes } from "@mui/material";

// 🔴 Animación pulse para botones al presionar
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0.1); }
  50% { transform: scale(1.03); box-shadow: 0 0 10px rgba(0,0,0,0.2); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0.1); }
`;

function SearchSerieFolioForm({ onSearch }) {
  const [serie, setSerie] = useState("");
  const [folio, setFolio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

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

  const textFieldStyles = {
    "& .MuiInputLabel-root": { color: "#00004e" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#00004e" },
      "&:hover fieldset": { borderColor: "#4B9C5F" },
      "&.Mui-focused fieldset": {
        borderColor: "#4B9C5F",
        boxShadow: "0 0 8px rgba(75,156,95,0.6)",
      },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mt: 2,
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
        InputLabelProps={{ shrink: true }}
        sx={textFieldStyles}
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
        sx={textFieldStyles}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#00004e",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          mt: 1,
          "&:hover": {
            backgroundColor: "#4B9C5F",
            transform: "scale(1.05)",
          },
          "&:active": {
            animation: `${pulse} 0.5s`,
          },
        }}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default SearchSerieFolioForm;
