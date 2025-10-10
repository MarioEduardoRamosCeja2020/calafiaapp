import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import StateBranchAccordionMenu from "./StateBranchAccordionMenu";
import { branchesData } from "./branchesData";
import {
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
  Directions as DirectionsIcon,
  MyLocation as MyLocationIcon,
} from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import "./mapStyles.css";

// 🎯 Íconos personalizados confiables
const createCustomIcon = (color) =>
  new L.DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 0 6px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 
            9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
            2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
        </svg>
      </div>`,
    className: "leaflet-div-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -25],
  });

// ✨ Efecto de vuelo al marcador
function FlyToLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 14, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

export default function BranchesMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const mapRef = useRef();

  const mapCenter = selectedBranch
    ? selectedBranch.coords
    : [20.6736, -103.3477];

  const handleMyLocation = () => {
    if (!navigator.geolocation) return alert("Tu navegador no soporta GPS.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        if (mapRef.current) mapRef.current.flyTo(coords, 14, { duration: 1.2 });
      },
      () => alert("No se pudo obtener tu ubicación.")
    );
  };

  const handleDirections = () => {
    if (!selectedBranch) return;
    const [lat, lng] = selectedBranch.coords;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: 600,
        gap: 3,
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #e1f5fe, #ede7f6)",
        boxShadow: 3,
      }}
    >
      {/* Panel lateral */}
      <Box
        sx={{
          width: 350,
          height: "100%",
          overflowY: "auto",
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <StateBranchAccordionMenu
          data={branchesData}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
        />
      </Box>

      {/* Contenido derecho */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Header */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: "#00004e",
            color: "white",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {selectedBranch
              ? selectedBranch.name
              : "Selecciona una sucursal para ver el mapa"}
          </Typography>

          {selectedBranch && (
            <Button
              variant="contained"
              startIcon={<DirectionsIcon />}
              onClick={handleDirections}
              sx={{
                bgcolor: "#4B9C5F",
                "&:hover": { bgcolor: "#3c824c" },
                textTransform: "none",
                fontSize: "0.8rem",
              }}
            >
              Cómo llegar
            </Button>
          )}
        </Box>

        {/* 🌈 Mapa colorido */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            ref={mapRef}
            key={selectedBranch?.name}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {selectedBranch && (
              <>
                <Marker
                  position={selectedBranch.coords}
                  icon={createCustomIcon("#4B9C5F")}
                >
                  <Popup>
                    <strong>{selectedBranch.name}</strong>
                  </Popup>
                </Marker>
                <FlyToLocation coords={selectedBranch.coords} />
              </>
            )}

            {userCoords && (
              <Marker
                position={userCoords}
                icon={createCustomIcon("#00004e")}
              >
                <Popup>
                  <strong>Tu ubicación actual</strong>
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {/* Botón flotante */}
          <Tooltip title="Mi ubicación">
            <IconButton
              onClick={handleMyLocation}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                bgcolor: "#00004e",
                color: "white",
                "&:hover": { bgcolor: "#4B9C5F" },
                boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
              }}
            >
              <MyLocationIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Info Panel */}
        <Paper
          sx={{
            height: 250,
            overflowY: "auto",
            p: 3,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            transition: "all 0.3s ease-in-out",
            animation: selectedBranch ? "fadeInUp 0.4s ease-in-out" : "none",
          }}
        >
          {selectedBranch ? (
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                {selectedBranch.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="action" />
                <Typography variant="body1">{selectedBranch.contact}</Typography>
              </Box>

              <Box display="flex" alignItems="flex-start" gap={1}>
                <LocationOnIcon color="action" sx={{ mt: 0.5 }} />
                <Typography variant="body1">{selectedBranch.address}</Typography>
              </Box>

              <Box display="flex" alignItems="flex-start" gap={1}>
                <PhoneIcon color="action" sx={{ mt: 0.5 }} />
                <Box>
                  {selectedBranch.phones.map((p, i) => (
                    <Typography key={i}>{p}</Typography>
                  ))}
                </Box>
              </Box>

              {selectedBranch.notes && (
                <Box display="flex" alignItems="center" gap={1}>
                  <InfoIcon color="info" />
                  <Typography variant="body2" color="text.secondary">
                    {selectedBranch.notes}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mt: 8 }}
            >
              Selecciona una sucursal para ver los detalles aquí.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
