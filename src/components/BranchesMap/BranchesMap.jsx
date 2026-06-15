import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Box, Grid } from "@mui/material";
import "leaflet/dist/leaflet.css";

import { branchesData } from "./branchesData";
import BranchCard from "./BranchCard";
import StateBranchMenu from "./StateBranchMenu";

// Icono de camión
const truckIcon = new L.DivIcon({
  html: "🚛",
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function BranchesMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const allBranches = Object.values(branchesData).flat();

  return (
    <Grid container spacing={2} sx={{ height: "100vh", p: 2 }}>
      {/* Menu lateral */}
      <Grid item>
        <StateBranchMenu
          data={branchesData}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
        />
      </Grid>

      {/* Mapa + info */}
      <Grid item xs sx={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <MapContainer center={[23.6345, -102.5528]} zoom={5} style={{ flex: 1 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {allBranches.map((branch, idx) => (
            <Marker
              key={idx}
              position={branch.coords}
              icon={truckIcon}
              eventHandlers={{
                click: () => setSelectedBranch(branch),
              }}
            >
              <Popup>{branch.name}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Info panel */}
        {selectedBranch && (
          <Box sx={{ position: "absolute", bottom: 20, left: 20, width: { xs: "90%", md: 400 } }}>
            <BranchCard branch={selectedBranch} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}