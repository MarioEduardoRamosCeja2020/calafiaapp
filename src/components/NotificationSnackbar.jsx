import React from "react";
import { Snackbar, Box, Typography, IconButton, Slide, keyframes } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Animación de rebote
const bounceIn = keyframes`
  0% { transform: translateY(-100%) scale(0.5); opacity: 0; }
  60% { transform: translateY(10%) scale(1.05); opacity: 1; }
  80% { transform: translateY(-5%) scale(0.95); }
  100% { transform: translateY(0) scale(1); }
`;

const FloatingNotification = ({ open, message, severity = "success", onClose }) => {
  const SlideTransition = (props) => <Slide {...props} direction="down" />;

  // Colores más vibrantes para destacar sobre cualquier fondo
  const config = {
    success: { emoji: "🎉", color: "#ffffff", bg: "linear-gradient(90deg, #38a169, #48bb78)" },
    error: { emoji: "❌", color: "#ffffff", bg: "linear-gradient(90deg, #dc2626, #ef4444)" },
    warning: { emoji: "⚠️", color: "#ffffff", bg: "linear-gradient(90deg, #b45309, #f59e0b)" },
    info: { emoji: "ℹ️", color: "#ffffff", bg: "linear-gradient(90deg, #1e40af, #3b82f6)" },
  };

  const { emoji, color, bg } = config[severity] || config.info;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: bg,
          color: color,
          borderRadius: 3,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
          padding: "12px 20px",
          minWidth: 360,
          maxWidth: 480,
          fontWeight: 500,
          animation: `${bounceIn} 0.6s ease`,
        }}
      >
        <Typography sx={{ fontSize: 26 }}>{emoji}</Typography>
        <Typography sx={{ flex: 1, fontSize: 15 }}>{message}</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: color }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default FloatingNotification;
