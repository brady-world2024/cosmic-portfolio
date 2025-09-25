// src/pages/projects/ProjectCard.tsx
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Project } from "../../app/models/project";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out this project: ${project.name}\n\nGitHub: ${
      project.gitHubUrl ?? ""
    }\nDescription: ${project.description ?? ""}`
  )}`;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255,255,255,0.03)", 
        border: "1px solid rgba(255,255,255,0.06)", 
        boxShadow: "none",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >

      {project.pictureUrl && (
        <Box
          sx={{
            width: "100%",
            position: "relative",
            pt: "100%", 
            bgcolor: "#061022",
          }}
        >
      
          <Box
            component="img"
            src={project.pictureUrl}
            alt={project.name}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain", 
              objectPosition: "center center",
              display: "block",
          
      
            }}
          />
        </Box>
      )}


      <CardContent
        sx={{
          flexGrow: 1,
          px: 0,
          py: 1.5,
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "0.95rem",
              fontWeight: 700,
              lineHeight: 1.1,
              mb: 0.6,
              color: "rgba(235,245,255,0.95)",
            }}
          >
            {project.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "0.78rem",
              color: "rgba(200,220,235,0.85)",
            }}
          >
            {project.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          component="a"
          href={whatsAppShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<WhatsAppIcon />}
          sx={{
            textTransform: "none",
            fontSize: "0.78rem",
            padding: "6px 10px",
          }}
        >
          Share
        </Button>

        <Button
          component={RouterLink}
          to={`/projects/${project.id}`}
          state={{ project }}
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "0.78rem",
            padding: "6px 10px",
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
