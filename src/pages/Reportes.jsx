// src/pages/Reportes.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Reportes = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="#00004e" gutterBottom>
        📊 Reportes
      </Typography>
      <Paper sx={{ p: 3, boxShadow: 2 }}>
        <Typography variant="body1">
          Aquí podrás visualizar y generar reportes de usuarios, ventas o actividad del sistema.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Reportes;
