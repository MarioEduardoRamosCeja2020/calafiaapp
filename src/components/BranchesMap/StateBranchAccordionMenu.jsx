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
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function StateBranchAccordionMenu({
  data,
  selectedBranch,
  onSelectBranch,
}) {
  const [expandedState, setExpandedState] = useState(null);

  const handleChange = (state) => (_, isExpanded) => {
    setExpandedState(isExpanded ? state : null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* CONTENEDOR SCROLL (esto evita que el menú “brinque”) */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 1,

          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#bdbdbd",
            borderRadius: 20,
          },
        }}
      >
        {Object.entries(data).map(([state, branches]) => (
          <Accordion
            key={state}
            expanded={expandedState === state}
            onChange={handleChange(state)}
            disableGutters
            elevation={2}
            sx={{
              mb: 1,
              borderRadius: 2,
              overflow: "hidden",

              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: 52,
                px: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pr: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                  }}
                >
                  {state}
                </Typography>

                <Chip
                  label={branches.length}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <List disablePadding>
                {branches.map((branch) => (
                  <ListItemButton
                    key={branch.name}
                    selected={selectedBranch?.name === branch.name}
                    onClick={() => onSelectBranch(branch)}
                    sx={{
                      py: 1.2,

                      transition: "all 0.2s ease",

                      "&.Mui-selected": {
                        bgcolor: "#00004e",
                        color: "#fff",

                        "&:hover": {
                          bgcolor: "#00004e",
                        },
                      },

                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={branch.name}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontSize: "0.95rem",
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}