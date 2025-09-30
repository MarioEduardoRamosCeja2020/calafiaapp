import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchSerieFolioForm({ onSearch }) {
  const [serie, setSerie] = useState("");
  const [folio, setFolio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch({ serie, folio });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Serie"
        value={serie}
        onChange={(e) => setSerie(e.target.value)}
      />
      <TextField
        label="Folio"
        value={folio}
        onChange={(e) => setFolio(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  );
}

export default SearchSerieFolioForm;
