// components/MissionVision.tsx

import React from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import FlagIcon from '@mui/icons-material/Flag';

const MissionVision = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
      >
        Nuestra Misión y Visión
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={4}>
        {/* Misión */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#e3f2fd',
              borderRadius: 3,
              boxShadow: 4,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <VerifiedIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Misión
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Ser la empresa de autotransporte que brinde servicios integrales de alta calidad,
                enfocada a satisfacer las necesidades del cliente, en el mínimo de tiempo y al mejor costo.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Visión */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#ede7f6',
              borderRadius: 3,
              boxShadow: 4,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <FlagIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Visión
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Ser la empresa con estándares internacionales de calidad y eficiencia que,
                innovando soluciones de servicio, garantice la permanencia de sus clientes
                y que contribuya, a través del desarrollo organizacional, al mejoramiento
                del entorno económico y social de sus zonas de influencia.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MissionVision;
