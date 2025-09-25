
import React from "react";
import { AppBar, Toolbar, Box, Button, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NavBar() {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 40,
        pointerEvents: "auto", // enable pointer events for the navbar
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1, sm: 2.5, md: 3 }, // responsive gap
          alignItems: "center",
          background: "rgba(0,0,0,0.28)",
          borderRadius: 999,
          px: { xs: 1.5, sm: 3 },
          py: { xs: 0.5, sm: 1 },
          mx: "auto",
          width: { xs: "95%", sm: "auto" },
          minHeight: { xs: 44, sm: 56 },
          // allow wrapping on small screens so items won't overlap
          flexWrap: "wrap",
        }}
      >
        {/* Brand / Home */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            mr: { xs: 0, sm: 1 }, // small separation on larger screens
          }}
        >
          <Button
            sx={{
              color: "#6bf3d1",
              fontWeight: 800,
              textTransform: "none",
              fontSize: { xs: "0.78rem", sm: "0.95rem", md: "1.05rem" },
              lineHeight: 1,
              px: { xs: 1, sm: 1.25 },
              py: 0.5,
              minWidth: 56,
              whiteSpace: "nowrap",
            }}
          >
            HOME
          </Button>
        </Box>

        {/* Links */}
        <Button
          component={RouterLink}
          to="/projects"
          sx={{
            color: "#6bf3d1",
            textTransform: "none",
            fontSize: { xs: "0.78rem", sm: "0.95rem" },
            px: { xs: 0.8, sm: 1.25 },
            py: 0.5,
            minWidth: 56,
            whiteSpace: "nowrap",
          }}
        >
          PROJECTS
        </Button>

        <Button
          component={RouterLink}
          to="/techstacks"
          sx={{
            color: "#6bf3d1",
            textTransform: "none",
            fontSize: { xs: "0.78rem", sm: "0.95rem" },
            px: { xs: 0.8, sm: 1.25 },
            py: 0.5,
            minWidth: 56,
            whiteSpace: "nowrap",
          }}
        >
          TECHSTACKS
        </Button>

        <Button
          component={RouterLink}
          to="/certifications"
          sx={{
            color: "#6bf3d1",
            textTransform: "none",
            fontSize: { xs: "0.78rem", sm: "0.95rem" },
            px: { xs: 0.8, sm: 1.25 },
            py: 0.5,
            minWidth: 56,
            whiteSpace: "nowrap",
          }}
        >
          CERTIFICATIONS
        </Button>

        <Button
          component={RouterLink}
          to="/contact"
          sx={{
            color: "#6bf3d1",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "0.78rem", sm: "0.95rem" },
            px: { xs: 0.8, sm: 1.25 },
            py: 0.5,
            minWidth: 56,
            whiteSpace: "nowrap",
          }}
        >
          CONTACT
        </Button>
      </Toolbar>
    </AppBar>
  );
}
