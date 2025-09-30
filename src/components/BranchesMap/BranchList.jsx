import React from "react";
import { List, ListItemButton, ListItemText, Typography, Paper, Box } from "@mui/material";

export default function BranchList({ branches, selectedIndex, onSelect, selectedState }) {
  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="h6" gutterBottom>
        Branches in {selectedState}
      </Typography>
      <Paper variant="outlined" sx={{ maxHeight: 440, overflowY: "auto", borderRadius: 2 }}>
        <List>
          {branches.map((branch, i) => (
            <ListItemButton
              key={branch.name}
              selected={i === selectedIndex}
              onClick={() => onSelect(i)}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemText primary={branch.name} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
