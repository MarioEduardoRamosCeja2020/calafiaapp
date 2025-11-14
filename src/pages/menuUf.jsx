import { Box, Typography, Button } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

const PaginaEnConstruccion = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.15)",
        borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "inset 1px 1px 3px rgba(255,255,255,0.5), 3px 3px 15px rgba(0,0,0,0.2)",
        textAlign: "center",
        p: 4,
        mx: "auto",
      }}
    >
      {/* Icono de construcción */}
      <ConstructionIcon
        sx={{ fontSize: 100, color: "#00004e", mb: 3 }}
      />

      {/* Título */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#00004e",
          mb: 2,
          textShadow: "0 1px 5px rgba(0,0,0,0.3)",
        }}
      >
        🚧 Página en Construcción 🚧
      </Typography>

      {/* Texto adicional */}
      <Typography
        variant="h6"
        sx={{
          color: "#00008a",
          mb: 3,
          maxWidth: 500,
        }}
      >
        Estamos trabajando para traerte la mejor experiencia. ¡Vuelve pronto!
      </Typography>

      {/* Imagen opcional */}
      <Box
        component="img"
        src="https://cdn-icons-png.flaticon.com/512/1484/1484686.png" // Puedes cambiar la URL a cualquier imagen de construcción
        alt="En construcción"
        sx={{
          width: { xs: 150, sm: 200 },
          mb: 3,
        }}
      />

      {/* Botón de regreso */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          backgroundColor: "#00004e",
          "&:hover": { backgroundColor: "#00008a" },
        }}
        onClick={() => window.history.back()}
      >
        Volver
      </Button>
    </Box>
  );
};

export default PaginaEnConstruccion;
