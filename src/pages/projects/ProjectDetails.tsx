// src/pages/projects/ProjectDetails.tsx
import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Typography, Box, CardMedia, Button, Container } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { Project } from "../../app/models/project";
import { projectsData } from "../../data/projectsData";
import { resolvePublicPath } from "../../utils/resolvePublicPath";

export default function ProjectDetails() {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const stateProject = location.state?.project as Project | undefined;
  const project =
    stateProject ?? projectsData.find((p) => p.id === params.id) ?? null;

  if (!project) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4">Project not found</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/projects")}>
          Back to projects
        </Button>
      </Container>
    );
  }


  const contentMaxWidth = 760; 

  return (
    <Container sx={{ py: 6 }}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: contentMaxWidth,
          backgroundColor: "transparent",
        }}
      >
        {project.pictureUrl && (
          <CardMedia
            component="img"
            image={resolvePublicPath(project.pictureUrl)}
            alt={project.name}
            sx={{
              width: "100%",
              height: 380,
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
              display: "block",
            }}
          />
        )}

        <Box sx={{ p: 0 }}>
          <Typography
            variant="h4"
            sx={{ fontSize: "1.6rem", mb: 1, color: "rgba(235,245,255,0.95)" }}
          >
            {project.name}
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "0.95rem", color: "rgba(210,225,235,0.95)" }}
          >
            {project.detail ?? project.description}
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {project.gitHubUrl && (
              <Button
                component="a"
                href={project.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<GitHub />}
                sx={{
                  textTransform: "none",
                  fontSize: "0.9rem",
                  px: 2.5,
                  py: 0.8,
                }}
              >
                Code
              </Button>
            )}

            <Button
              onClick={() => navigate("/projects")}
              sx={{
                fontSize: "0.9rem",
                textTransform: "none",
                opacity: 0.9,
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
