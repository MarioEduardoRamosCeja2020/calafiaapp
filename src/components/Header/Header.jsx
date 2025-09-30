// src/components/Header/Header.jsx
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff",
        color: "#000000",
        boxShadow: 2,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
        </Typography>
        <Button variant="outlined" color="red">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
