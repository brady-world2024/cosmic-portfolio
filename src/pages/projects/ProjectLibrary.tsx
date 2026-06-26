// src/pages/projects/ProjectLibrary.tsx
import { Container } from "@mui/material";
import { projectsData } from "../../data/projectsData";
import ProjectList from "./ProjectList";

export default function ProjectLibrary() {

  const projects = projectsData;

  return (
    <Container sx={{ pt: { xs: 14, sm: 15, md: 17 }, pb: 6 }}>


      <ProjectList projects={projects} />
    </Container>
  );
}
