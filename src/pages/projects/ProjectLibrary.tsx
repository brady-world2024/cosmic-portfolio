// src/pages/projects/ProjectLibrary.tsx
import React from "react";
import { Container, Typography } from "@mui/material";
import { projectsData } from "../../data/projectsData";
import ProjectList from "./ProjectList";

export default function ProjectLibrary() {

  const projects = projectsData;

  return (
    <Container sx={{ py: 6 }}>


      <ProjectList projects={projects} />
    </Container>
  );
}
