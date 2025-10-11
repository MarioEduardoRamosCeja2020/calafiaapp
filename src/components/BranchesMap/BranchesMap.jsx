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

// 🎯 Iconos personalizados para sucursal y usuario
const createCustomIcon = (color, label) =>
  new L.DivIcon({
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-weight: bold;
      color: white;
      font-size: 14px;
    ">${label}</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

// 🚛 Icono tráiler gris sin fondo
// const trailerIcon = new L.DivIcon({
//   html: `<div style="font-size: 26px; color: gray;">🚛</div>`,
//   iconSize: [28, 28],
//   iconAnchor: [14, 14],
// });

const trailerIcon = new L.DivIcon({
  html: `🚛`,
  className: "",      // importante, quita estilos por defecto de leaflet
  iconSize: [50, 50], 
  iconAnchor: [20, 20],
  bgPos: [0, 0]
});

// ✨ Animación del tráiler
// function MovingTruck({ route, duration = 20000 }) {
//   const [index, setIndex] = useState(0);
//   const map = useMap();

//   useEffect(() => {
//     if (!route || route.length === 0) return;
//     const bounds = L.latLngBounds(route);
//     map.fitBounds(bounds, { padding: [50, 50] });

//     const interval = setInterval(() => {
//       setIndex((prev) => (prev < route.length - 1 ? prev + 1 : prev));
//     }, duration / route.length);

//     return () => clearInterval(interval);
//   }, [route, duration, map]);

//   if (!route || route.length === 0) return null;
//   return <Marker position={route[index]} icon={trailerIcon} />;
// }
// ✨ Animación suave del camión
function MovingTruck({ route, duration = 30000 }) {
  const [position, setPosition] = useState(route[0]);
  const map = useMap();
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!route || route.length < 2) return;

    // Ajustar mapa para que se vean ambos puntos
    const bounds = L.latLngBounds(route);
    map.fitBounds(bounds, { padding: [50, 50] });

    function animate(timestamp) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1); // 0 a 1

      // Interpolación lineal entre los dos puntos
      const lat = route[0][0] + (route[1][0] - route[0][0]) * t;
      const lng = route[0][1] + (route[1][1] - route[0][1]) * t;
      setPosition([lat, lng]);

      if (t < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Resetear cuando cambie la ruta
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
  const [duration, setDuration] = useState(null);
  const mapRef = useRef();

  // Obtener ubicación del usuario al cargar el mapa
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        if (selectedBranch) {
          setRoute([coords, selectedBranch.coords]);
          calcularDistancia(coords, selectedBranch.coords);
        }
      },
      () => console.log("No se pudo obtener tu ubicación.")
    );
  }, [selectedBranch]);

  // Calcular distancia y tiempo estimado
  const calcularDistancia = (p1, p2) => {
    const R = 6371;
    const dLat = ((p2[0] - p1[0]) * Math.PI) / 180;
    const dLng = ((p2[1] - p1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((p1[0] * Math.PI) / 180) *
        Math.cos((p2[0] * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    setDistance(dist.toFixed(2));
    setDuration((dist / 50) * 60); // asumiendo 50 km/h
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) return alert("Tu navegador no soporta GPS.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        if (selectedBranch) {
          setRoute([coords, selectedBranch.coords]);
          calcularDistancia(coords, selectedBranch.coords);
        }
      },
      () => alert("No se pudo obtener tu ubicación.")
    );
  };

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
    <Box sx={{ display: "flex", height: 650, gap: 3, p: 3, borderRadius: 3, background: "linear-gradient(135deg, #e1f5fe, #ede7f6)", boxShadow: 3 }}>
      {/* Menú lateral */}
      <Box sx={{ width: 350, height: "100%", overflowY: "auto", bgcolor: "white", borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}>
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

      {/* Contenido derecho */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Header */}
        <Box sx={{ p: 1.5, bgcolor: "#00004e", color: "white", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {selectedBranch ? selectedBranch.name : "Selecciona una sucursal para ver el mapa"}
          </Typography>
          {selectedBranch && (
            <Button variant="contained" startIcon={<DirectionsIcon />} onClick={handleDirections} sx={{ bgcolor: "#4B9C5F", "&:hover": { bgcolor: "#00004e" }, textTransform: "none", fontSize: "0.8rem" }}>
              Cómo llegar
            </Button>
          )}
        </Box>

        {/* Mapa */}
        <Box sx={{ flex: 1, borderRadius: 3, overflow: "hidden", position: "relative", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
          <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true} ref={mapRef} key={selectedBranch?.name}>
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

            {/* Marcadores */}
            {selectedBranch && <Marker position={selectedBranch.coords} icon={createCustomIcon("#00004e", "S")}><Popup>{selectedBranch.name}</Popup></Marker>}
            {userCoords && <Marker position={userCoords} icon={createCustomIcon("#4B9C5F", "U")}><Popup>Tu ubicación</Popup></Marker>}

            {/* Ruta y tráiler */}
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
            <IconButton onClick={handleMyLocation} sx={{ position: "absolute", bottom: 16, right: 16, bgcolor: "#00004e", color: "white", "&:hover": { bgcolor: "#4B9C5F" }, boxShadow: "0 3px 8px rgba(0,0,0,0.3)" }}>
              <MyLocationIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Panel info */}
        <Paper sx={{ height: 250, overflowY: "auto", p: 3, bgcolor: "#fff", borderRadius: 3, boxShadow: 3 }}>
          {selectedBranch ? (
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="h5" fontWeight="bold" color="primary">{selectedBranch.name}</Typography>

              {distance && duration && (
                <Typography sx={{ color: "#4B9C5F", fontWeight: "bold" }}>
                  🚛 Distancia: {distance} km | Tiempo estimado: {duration.toFixed(0)} min
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
                <Box>{selectedBranch.phones.map((p, i) => (<Typography key={i}>{p}</Typography>))}</Box>
              </Box>

              {selectedBranch.notes && (
                <Box display="flex" alignItems="center" gap={1}>
                  <InfoIcon color="info" />
                  <Typography color="text.secondary">{selectedBranch.notes}</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 8 }}>
              Selecciona una sucursal para ver los detalles aquí.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
