import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
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

// 🎯 Íconos personalizados
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

// 🚛 Ícono del tráiler
const trailerIcon = new L.DivIcon({
  html: `<div style="font-size: 26px; color: #00004e;">🚛</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  className: "",
});

// ✨ Animación de movimiento del tráiler
function MovingTruck({ route, duration = 20000 }) {
  const [index, setIndex] = useState(0);
  const map = useMap();

  useEffect(() => {
    if (!route || route.length === 0) return;
    const bounds = L.latLngBounds(route);
    map.fitBounds(bounds, { padding: [50, 50] });

    const interval = setInterval(() => {
      setIndex((prev) => (prev < route.length - 1 ? prev + 1 : prev));
    }, duration / route.length);

    return () => clearInterval(interval);
  }, [route, duration, map]);

  if (!route || route.length === 0) return null;
  return <Marker position={route[index]} icon={trailerIcon} />;
}

// 🚀 Función principal
export default function BranchesMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const mapRef = useRef();

  // Obtener ubicación actual
  const handleMyLocation = () => {
    if (!navigator.geolocation)
      return alert("Tu navegador no soporta GPS.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        if (selectedBranch) {
          const branchCoords = selectedBranch.coords;
          setRoute([coords, branchCoords]);
          calcularDistancia(coords, branchCoords);
        }
      },
      () => alert("No se pudo obtener tu ubicación.")
    );
  };

  // Calcular distancia y tiempo
  const calcularDistancia = (p1, p2) => {
    const R = 6371;
    const dLat = ((p2[0] - p1[0]) * Math.PI) / 180;
    const dLng = ((p2[1] - p1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(p1[0] * (Math.PI / 180)) *
        Math.cos(p2[0] * (Math.PI / 180)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    setDistance(dist.toFixed(2));
    setDuration((dist / 50) * 60); // 50 km/h
  };

  const handleDirections = () => {
    if (!selectedBranch) return;
    const [lat, lng] = selectedBranch.coords;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const mapCenter = selectedBranch ? selectedBranch.coords : [20.6736, -103.3477];

  return (
    <Box
      sx={{
        display: "flex",
        height: 650,
        gap: 3,
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #e1f5fe, #ede7f6)",
        boxShadow: 3,
      }}
    >
      {/* 📁 Panel lateral */}
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
          onSelectBranch={(branch) => {
            setSelectedBranch(branch);
            if (userCoords) {
              setRoute([userCoords, branch.coords]);
              calcularDistancia(userCoords, branch.coords);
            }
          }}
        />
      </Box>

      {/* 🌍 Mapa y detalles */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* 🔵 Encabezado */}
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
                "&:hover": { bgcolor: "#00004e" },
                textTransform: "none",
                fontSize: "0.8rem",
              }}
            >
              Cómo llegar
            </Button>
          )}
        </Box>

        {/* 🗺️ Mapa con ruta y animación */}
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
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

            {selectedBranch && (
              <Marker
                position={selectedBranch.coords}
                icon={createCustomIcon("#4B9C5F")}
              >
                <Popup>{selectedBranch.name}</Popup>
              </Marker>
            )}

            {userCoords && (
              <Marker position={userCoords} icon={createCustomIcon("#00004e")}>
                <Popup>Tu ubicación actual</Popup>
              </Marker>
            )}

            {route.length > 0 && (
              <>
                <Polyline positions={route} color="#4B9C5F" weight={5} />
                <MovingTruck route={route} duration={30000} />
              </>
            )}
          </MapContainer>

          {/* 📍 Botón ubicación */}
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

        {/* 🧾 Panel de información */}
        <Paper
          sx={{
            height: 250,
            overflowY: "auto",
            p: 3,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          {selectedBranch ? (
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {selectedBranch.name}
              </Typography>

              {distance && duration && (
                <Typography sx={{ color: "#4B9C5F", fontWeight: "bold" }}>
                  🚛 Distancia: {distance} km | Tiempo estimado:{" "}
                  {duration.toFixed(0)} min
                </Typography>
              )}

              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="action" />
                <Typography>{selectedBranch.contact}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon sx={{ color: "#4B9C5F" }} />
                <Typography>{selectedBranch.address}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon color="action" />
                <Box>
                  {selectedBranch.phones.map((p, i) => (
                    <Typography key={i}>{p}</Typography>
                  ))}
                </Box>
              </Box>

              {selectedBranch.notes && (
                <Box display="flex" alignItems="center" gap={1}>
                  <InfoIcon color="info" />
                  <Typography color="text.secondary">
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
