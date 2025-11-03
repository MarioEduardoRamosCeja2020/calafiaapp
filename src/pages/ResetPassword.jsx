import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

function ResetPassword() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    containerRef.current?.focus();
    // Limpia cualquier aria-hidden que haya quedado del modal anterior
    document.querySelectorAll("[aria-hidden='true']").forEach((el) => {
      el.removeAttribute("aria-hidden");
    });
  }, []);

  const handleSubmit = async () => {
    if (!newPassword) {
      setMessage("⚠️ Por favor ingresa una nueva contraseña");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al actualizar contraseña");

      setMessage("✅ Contraseña actualizada correctamente");
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      ref={containerRef}
      tabIndex={-1}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
          Restablecer Contraseña
        </Typography>

        <TextField
          label="Nueva contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Guardar"}
        </Button>

        {message && (
          <Typography
            sx={{ mt: 2 }}
            color={
              message.includes("✅")
                ? "green"
                : message.includes("⚠️")
                ? "orange"
                : "error"
            }
          >
            {message}
          </Typography>
        )}

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Volver al inicio de sesión
        </Button>
      </Paper>
    </Box>
  );
}

export default ResetPassword;
