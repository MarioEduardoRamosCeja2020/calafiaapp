import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function StateBranchAccordionMenu({ data, selectedBranch, onSelectBranch }) {
  const [expandedState, setExpandedState] = useState(null);

  const handleChange = (state) => (event, isExpanded) => {
    setExpandedState(isExpanded ? state : null);
  };

  return (
    <Box sx={{ width: 350 }}>
      {Object.entries(data).map(([state, branches]) => (
        <Accordion
          key={state}
          expanded={expandedState === state}
          onChange={handleChange(state)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{state}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper variant="outlined" sx={{ maxHeight: 300, overflowY: "auto" }}>
              <List disablePadding>
                {branches.map((branch) => (
                  <ListItemButton
                    key={branch.name}
                    selected={selectedBranch?.name === branch.name}
                    onClick={() => onSelectBranch(branch)}
                  >
                    <ListItemText primary={branch.name} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
