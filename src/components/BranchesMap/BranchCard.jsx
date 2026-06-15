import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { Phone as PhoneIcon, Person as PersonIcon, LocationOn as LocationOnIcon } from "@mui/icons-material";

export default function BranchCard({ branch }) {
  if (!branch) return null;

  return (
    <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold">{branch.name}</Typography>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
        <PersonIcon fontSize="small" />
        <Typography>{branch.contact}</Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <LocationOnIcon fontSize="small" color="primary" />
        <Typography>{branch.address}</Typography>
      </Stack>

      {branch.phones && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
          {branch.phones.map((p, i) => (
            <Chip key={i} icon={<PhoneIcon />} label={p} size="small" />
          ))}
        </Stack>
      )}

      {branch.notes && (
        <Chip label={branch.notes} color="warning" sx={{ mt: 1 }} />
      )}

      {branch.image && (
        <Box sx={{ mt: 2, borderRadius: 2, overflow: "hidden" }}>
          <img
            src={branch.image}
            alt={branch.name}
            style={{ width: "100%", maxHeight: 250, objectFit: "cover", borderRadius: 8 }}
          />
        </Box>
      )}
    </Box>
  );
}