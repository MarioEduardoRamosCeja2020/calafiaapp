import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Box,
} from "@mui/material";

export default function BranchList({
  branches,
  selectedIndex,
  onSelect,
  selectedState,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: 400,
          md: 350,
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: "1rem",
            sm: "1.15rem",
          },
        }}
      >
        Branches in {selectedState}
      </Typography>

      <Paper
        elevation={2}
        variant="outlined"
        sx={{
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        <List
          sx={{
            maxHeight: {
              xs: "50vh",
              sm: 440,
            },
            overflowY: "auto",
            p: 0,

            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bdbdbd",
              borderRadius: 10,
            },
          }}
        >
          {branches.map((branch, i) => (
            <ListItemButton
              key={branch.name}
              selected={i === selectedIndex}
              onClick={() => onSelect(i)}
              sx={{
                py: {
                  xs: 1.5,
                  sm: 1.25,
                },

                transition: "all .2s ease",

                "&:hover": {
                  bgcolor: "action.hover",
                },

                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",

                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },

                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemText
                primary={branch.name}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: {
                    xs: "0.95rem",
                    sm: "1rem",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}