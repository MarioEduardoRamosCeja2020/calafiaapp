import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import DirectionsIcon from "@mui/icons-material/Directions";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import StateBranchAccordionMenu from "./StateBranchAccordionMenu";
import { branchesData } from "./branchesData";

// --------------------------- ICONOS ------------------------------------

const createCustomIcon = (color, label) =>
  new L.DivIcon({
    html: `<div style="
      background-color:${color};
      width:30px;height:30px;
      border-radius:50%;display:flex;justify-content:center;align-items:center;
      color:white;font-weight:bold;border:2px solid white">
      ${label}
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

const trailerIcon = new L.DivIcon({
  html: "🚛",
  iconSize: [60, 60],
  iconAnchor: [30, 30],
});

// ---------------------- FLY TO ------------------------------------------

function FlyToLocation({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 14);
    }
  }, [coords, map]);

  return null;
}

// ---------------------- COMPONENTE PRINCIPAL ------------------------------

export default function BranchesMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Obtener ubicación del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {}
    );
  }, []);

  // Al seleccionar sucursal
  const selectBranch = (branch) => {
    setSelectedBranch(branch);
    if (userCoords) setRoute([userCoords, branch.coords]);
    setDrawerOpen(false);
  };

  // Función para abrir Google Maps con la ruta
  const handleDirections = () => {
    if (!selectedBranch || !userCoords) return;
    const [lat, lng] = selectedBranch.coords;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userCoords[0]},${userCoords[1]}&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const mapCenter = selectedBranch?.coords || [20.67, -103.34];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f1f1f1" }}>
      {/* ------------------ APPBAR MÓVIL ------------------ */}
      <AppBar
        position="sticky"
        sx={{
          display: { xs: "flex", md: "none" },
          bgcolor: "#00004e",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography sx={{ ml: 2, fontWeight: "bold" }}>
            {selectedBranch?.name || "Sucursales"}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ------------------ DRAWER MÓVIL ------------------ */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" }, width: "70%" }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <StateBranchAccordionMenu
            data={branchesData}
            selectedBranch={selectedBranch}
            onSelectBranch={selectBranch}
          />
        </Box>
      </Drawer>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          p: 2,
        }}
      >
        {/* ------------------ SIDEBAR DESKTOP ------------------ */}
        <Box
          sx={{
            width: 350,
            bgcolor: "white",
            p: 1,
            display: { xs: "none", md: "block" },
            borderRadius: 2,
            boxShadow: 2,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <StateBranchAccordionMenu
            data={branchesData}
            selectedBranch={selectedBranch}
            onSelectBranch={selectBranch}
          />
        </Box>

        {/* ------------------ COLUMNA DERECHA ------------------ */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* ------------------ MAPA ------------------ */}
          <Box
            sx={{
              height: { xs: 250, sm: 300, md: 450 },
              borderRadius: 2,
              overflow: "hidden",
              position: "relative", // Necesario para que el botón se posicione sobre el mapa
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              key={selectedBranch?.name}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* Sucursal */}
              {selectedBranch && (
                <Marker
                  position={selectedBranch.coords}
                  icon={createCustomIcon("#00004e", "S")}
                >
                  <Popup>{selectedBranch.name}</Popup>
                </Marker>
              )}

              {/* Usuario */}
              {userCoords && (
                <Marker
                  position={userCoords}
                  icon={createCustomIcon("#4B9C5F", "U")}
                >
                  <Popup>Tu ubicación</Popup>
                </Marker>
              )}

              {/* Ruta */}
              {route.length > 0 && (
                <>
                  <Polyline positions={route} color="#4B9C5F" weight={5} />
                </>
              )}

              {selectedBranch && <FlyToLocation coords={selectedBranch.coords} />}
            </MapContainer>

            {/* Botón GPS */}
            <IconButton
              onClick={() => navigator.geolocation.getCurrentPosition((pos) =>
                setUserCoords([pos.coords.latitude, pos.coords.longitude])
              )}
              sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
                bgcolor: "#00004e",
                color: "white",
              }}
            >
              <MyLocationIcon />
            </IconButton>
          </Box>

          {/* ------------------ PANEL INFERIOR ------------------ */}
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            {!selectedBranch ? (
              <Typography>Selecciona una sucursal.</Typography>
            ) : (
              <>
                {/* Datos */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="bold">
                      {selectedBranch.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ minWidth: 150 }}
                      onClick={handleDirections}
                      endIcon={<DirectionsIcon />}
                    >
                      Cómo llegar
                    </Button>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <LocationOnIcon />
                    <Typography>{selectedBranch.address}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <PhoneIcon />
                    <Typography>{selectedBranch.contact}</Typography>
                  </Box>
                </Box>

                {/* Imagen */}
                {selectedBranch.image && (
                  <Box sx={{ flex: 1, minWidth: 160, overflow: "hidden" }}>
                    <img
                      src={selectedBranch.image}
                      alt="Sucursal"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
