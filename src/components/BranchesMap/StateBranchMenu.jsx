import React, { useState } from "react";
import { Box, Typography, TextField, List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function StateBranchMenu({ data, onSelectBranch, selectedBranch }) {
  const [search, setSearch] = useState("");

  const filteredData = Object.fromEntries(
    Object.entries(data).map(([state, branches]) => [
      state,
      branches.filter(branch => branch.name.toLowerCase().includes(search.toLowerCase()))
    ]).filter(([_, branches]) => branches.length > 0)
  );

  return (
    <Box sx={{ width: 300, p: 2, bgcolor: "#f9f9f9", borderRadius: 3, boxShadow: 3, height: "100%", overflowY: "auto" }}>
      <TextField
        fullWidth
        placeholder="Buscar sucursal..."
        size="small"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {Object.entries(filteredData).map(([state, branches]) => (
        <Box key={state} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">{state}</Typography>
          <List disablePadding>
            {branches.map(branch => (
              <ListItemButton
                key={branch.name}
                selected={selectedBranch?.name === branch.name}
                onClick={() => onSelectBranch(branch)}
              >
                <ListItemText primary={branch.name} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
}