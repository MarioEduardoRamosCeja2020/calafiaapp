// src/components/Login/ForgotPasswordDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

const handleSend = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // <-- email debe venir del estado del input
    });

    if (!response.ok) {
      throw new Error('Error al enviar el correo');
    }

    const data = await response.json();
    console.log('✅ Correo enviado:', data);
    // Mostrar éxito al usuario
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    // Mostrar error al usuario
  }
};


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
      sx: {
        borderRadius: 3,
        overflow: "hidden"
      }
    }}>
      {/* Imagen arriba */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          backgroundImage: `url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <DialogTitle
        sx={{
          color: "#00004e",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.8rem",
          mt: 2,
        }}
      >
        Recuperar contraseña
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ color: "#4B9C5F", fontWeight: "600", textAlign: "center" }}>
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </Typography>

        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          autoFocus
          sx={{
            "& .MuiInputLabel-root": { color: "#00004e" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00004e" },
              "&:hover fieldset": { borderColor: "#4B9C5F" },
              "&.Mui-focused fieldset": { borderColor: "#4B9C5F" },
            },
          }}
        />

        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="success.main" variant="body2" textAlign="center">
            {message}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "center" }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          disabled={sending}
          size="large"
          sx={{
            backgroundColor: "#00004e",
            "&:hover": { backgroundColor: "#4B9C5F" },
            px: 5,
          }}
        >
          {sending ? <CircularProgress size={24} color="inherit" /> : "Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
