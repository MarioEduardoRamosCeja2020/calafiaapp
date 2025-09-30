import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import StateBranchAccordionMenu from "./StateBranchAccordionMenu";
import { branchesData } from "./branchesData";
import {
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
} from "@mui/icons-material";


const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function BranchesMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const mapCenter = selectedBranch
    ? selectedBranch.coords
    : [20.6736, -103.3477]; // default center

  return (
    <Box
      sx={{
        display: "flex",
        height: 600, // altura total del layout
        gap: 3,
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Accordion menu lado izquierdo con altura 100% */}
      <Box sx={{ width: 350, height: "100%", overflowY: "auto" }}>
        <StateBranchAccordionMenu
          data={branchesData}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
        />
      </Box>

      {/* Contenedor derecho: Mapa arriba + info abajo */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Mapa */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
            minHeight: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{ p: 1, bgcolor: "primary.main", color: "white" }}
          >
            {selectedBranch
              ? `Map of ${selectedBranch.name}`
              : "Select a branch to see the map"}
          </Typography>

          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            key={selectedBranch?.name}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {selectedBranch && (
              <Marker position={selectedBranch.coords} icon={markerIcon}>
                <Popup>{selectedBranch.name}</Popup>
              </Marker>
            )}
          </MapContainer>
        </Box>

        {/* Info detalle */}
<Paper
  sx={{
    height: 250,
    overflowY: "auto",
    p: 3,
    bgcolor: "#fff",
    boxShadow: 3,
    borderRadius: 2,
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
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {selectedBranch.address}
        </Typography>
      </Box>

      <Box display="flex" alignItems="flex-start" gap={1}>
        <PhoneIcon color="action" sx={{ mt: 0.5 }} />
        <Box>
          {selectedBranch.phones.map((phone, i) => (
            <Typography variant="body1" key={i}>
              {phone}
            </Typography>
          ))}
        </Box>
      </Box>

      {selectedBranch.notes && (
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <InfoIcon color="info" />
          <Typography variant="body2" color="text.secondary">
            {selectedBranch.notes}
          </Typography>
        </Box>
      )}
    </Box>
  ) : (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="body1" color="text.secondary">
        Select a branch to see its information here.
      </Typography>
    </Box>
  )}
</Paper>

      </Box>
    </Box>
  );
}
