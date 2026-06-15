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
import {
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
  Directions as DirectionsIcon,
  MyLocation as MyLocationIcon,
} from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import StateBranchAccordionMenu from "./StateBranchAccordionMenu";
import { branchesData } from "./branchesData";

// 🎯 Iconos personalizados
const createCustomIcon = (color, label) =>
  new L.DivIcon({
    html: `<div style="
      background-color:${color};
      width:30px;
      height:30px;
      border-radius:50%;
      display:flex;
      justify-content:center;
      align-items:center;
      border:2px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
      font-weight:bold;
      color:white;
      font-size:14px;
    ">${label}</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

// 🚛 Icono camión
const trailerIcon = new L.DivIcon({
  html: "🚛",
  className: "",
  iconSize: [80, 80],
  iconAnchor: [40, 40],
});

// ✨ Animación del camión
function MovingTruck({ route, duration = 30000 }) {
  const [position, setPosition] = useState(route[0]);
  const map = useMap();
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!route || route.length < 2) return;
    const bounds = L.latLngBounds(route);
    map.fitBounds(bounds, { padding: [50, 50] });

    function animate(timestamp) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const lat = route[0][0] + (route[1][0] - route[0][0]) * t;
      const lng = route[0][1] + (route[1][1] - route[0][1]) * t;
      setPosition([lat, lng]);
      if (t < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    return () => {
      startTimeRef.current = null;
    };
  }, [route, duration, map]);

  if (!position) return null;
  return <Marker position={position} icon={trailerIcon} />;
}

// ✨ FlyTo automático
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
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef();

  // 🧭 Obtener ubicación del usuario
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        if (selectedBranch) {
          setRoute([coords, selectedBranch.coords]);
          obtenerRutaOSRM(coords, selectedBranch.coords);
        }
      },
      () => console.log("No se pudo obtener tu ubicación.")
    );
  }, [selectedBranch]);

  // 🚗 Obtener ruta OSRM (solo distancia)
  const obtenerRutaOSRM = async (start, end) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const { distance } = data.routes[0];
        setDistance((distance / 1000).toFixed(2)); // km
      } else {
        setDistance(null);
      }
    } catch (error) {
      console.error("Error al obtener ruta OSRM:", error);
      setDistance(null);
    }
  };

  // 📍 Botón “Mi ubicación”
  const handleMyLocation = () => {
    if (!navigator.geolocation) return alert("Tu navegador no soporta GPS.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        if (selectedBranch) {
          setRoute([coords, selectedBranch.coords]);
          obtenerRutaOSRM(coords, selectedBranch.coords);
        }
      },
      () => alert("No se pudo obtener tu ubicación.")
    );
  };

  // 🧭 Botón “Cómo llegar” (Google Maps)
  const handleDirections = () => {
    if (!selectedBranch || !userCoords) return;
    const [lat, lng] = selectedBranch.coords;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userCoords[0]},${userCoords[1]}&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const mapCenter = selectedBranch ? selectedBranch.coords : [20.6736, -103.3477];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        minHeight: {
          md: 650,
        },
        gap: 3,
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #e1f5fe, #ede7f6)",
        boxShadow: 3,
      }}
    >
      {/* Menú lateral */}
      <Box
        sx={{
          width: {
            xs: "100%",
            md: 350,
          },
          height: {
            xs: 320,
            md: "100%",
          },
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
              obtenerRutaOSRM(userCoords, branch.coords);
            }
          }}
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
              : "Selecciona una sucursal"}
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

        {/* Mapa */}
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
            // key={selectedBranch?.name}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

            {selectedBranch && (
              <Marker
                position={selectedBranch.coords}
                icon={createCustomIcon("#00004e", "S")}
              >
                <Popup>{selectedBranch.name}</Popup>
              </Marker>
            )}
            {userCoords && (
              <Marker
                position={userCoords}
                icon={createCustomIcon("#4B9C5F", "U")}
              >
                <Popup>Tu ubicación</Popup>
              </Marker>
            )}

            {route.length > 0 && (
              <>
                <Polyline positions={route} color="#4B9C5F" weight={5} />
                <MovingTruck route={route} duration={30000} />
              </>
            )}

            {selectedBranch && <FlyToLocation coords={selectedBranch.coords} />}
          </MapContainer>

          {/* Botón mi ubicación */}
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

        {/* Panel inferior con info y foto */}
        <Paper
          sx={{
            minHeight: 250,
            overflow: "hidden",
            p: 3,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {selectedBranch ? (
            <>
              {/* 🧾 Columna izquierda: datos */}
              <Box
                sx={{
                  flex: 1,
                  minHeight: {
                    xs: 350,
                    md: 400,
                  },
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {selectedBranch.name}
                </Typography>

                {distance && (
                  <Typography sx={{ color: "#4B9C5F", fontWeight: "bold" }}>
                    🚛 Distancia: {distance} km
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

              {/* 🖼️ Columna derecha: imagen ajustada */}
              {selectedBranch.image && (
                <Box
                  sx={{
                    flex: 1.2,
                    borderRadius: 2,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    backgroundColor: "#f4f4f4",
                    p: 0,
                    m: 0,
                  }}
                >
                  <img
                    src={selectedBranch.image}
                    alt={selectedBranch.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="h6" color="text.secondary">
              Selecciona una sucursal para ver los detalles
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
