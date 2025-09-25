// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Starfield from "./components/Starfield";
import ProjectLibrary from "./pages/projects/ProjectLibrary";
import ProjectDetails from "./pages/projects/ProjectDetails";
import TechStacks from "./pages/TechStacks";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="app-root">

      <Starfield />

      <NavBar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectLibrary />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/techstacks" element={<TechStacks />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
