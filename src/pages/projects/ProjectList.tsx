// src/pages/projects/ProjectList.tsx
import React from "react";
import { Box } from "@mui/material";
import { Project } from "../../app/models/project";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
      }}
    >
      {projects.map((project) => (
        <Box key={project.id}>
          <ProjectCard project={project} />
        </Box>
      ))}
    </Box>
  );
}
