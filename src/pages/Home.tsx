// src/pages/Home.tsx
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { resolvePublicPath } from "../utils/resolvePublicPath";

export default function Home() {
  const videoSrc1 = resolvePublicPath("/videos/bg-loop.mp4");
  const videoSrc2 = resolvePublicPath("/videos/bg-loop2.mp4");

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >

      <Box className="home-video" aria-hidden="true">
        <Box className="video-window video-left" role="presentation">
          <video
            src={videoSrc1}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </Box>
        <Box className="video-window video-right" role="presentation">
          <video
            src={videoSrc2}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </Box>
      </Box>


      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 4,
          background:
            "linear-gradient(180deg, rgba(0,8,18,0.12) 0%, rgba(0,8,18,0.35) 100%)",
          pointerEvents: "none",
        }}
      />


      <Container
        sx={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          minHeight: "70vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{ color: "#ffffff", fontWeight: 800, mb: 2 }}
          >
            Welcome to my Portfolio Cosmic
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(230,240,255,0.9)", mb: 4 }}
          >
            I build cloud-ready, modern web applications and immersive
            frontends.
          </Typography>
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            sx={{ mr: 2 }}
          >
            View Projects
          </Button>
          <Button
            component={RouterLink}
            to="/techstacks"
            variant="outlined"
            sx={{ color: "#fff" }}
          >
            Tech Stacks
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
