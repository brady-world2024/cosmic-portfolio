// src/components/NavBar.tsx
import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: 16 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          background: "rgba(0,0,0,0.28)",
          borderRadius: 999,
          px: 3,
          py: 1,
          mx: "auto",
          width: { xs: "95%", sm: "auto" },
        }}
      >
        <Box component={RouterLink} to="/" sx={{ textDecoration: "none" }}>
          <Button
            sx={{ color: "#6bf3d1", fontWeight: 700, textTransform: "none" }}
          >
            HOME
          </Button>
        </Box>

        <Button
          component={RouterLink}
          to="/projects"
          sx={{ color: "#6bf3d1", textTransform: "none" }}
        >
          PROJECTS
        </Button>

        <Button
          component={RouterLink}
          to="/techstacks"
          sx={{ color: "#6bf3d1", textTransform: "none" }}
        >
          TECHSTACKS
        </Button>

        <Button
          component={RouterLink}
          to="/certifications"
          sx={{ color: "#6bf3d1", textTransform: "none" }}
        >
          CERTIFICATIONS
        </Button>

        <Button
          component={RouterLink}
          to="/contact"
          sx={{ color: "#6bf3d1", textTransform: "none", fontWeight: 600 }}
        >
          CONTACT
        </Button>
      </Toolbar>
    </AppBar>
  );
}
