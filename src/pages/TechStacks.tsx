import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { resolvePublicPath } from "../utils/resolvePublicPath";

interface Technology {
  name: string;
  logoUrl: string;
}

interface TechCategory {
  title: string;
  technologies: Technology[];
}

const techCategories: TechCategory[] = [
  {
    title: "Programming Languages",
    technologies: [
      {
        name: "Java",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "Python",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "C#",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      },
      {
        name: "PHP",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
    ],
  },
  {
    title: "Frameworks",
    technologies: [
      {
        name: "Flask",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
      {
        name: "ASP.NET Core",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
      },
      {
        name: "Node.js",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "JavaFX",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      { name: "Windows Forms App", logoUrl: resolvePublicPath("/images/microsoftforms.png") },
    ],
  },
  {
    title: "Databases",
    technologies: [
      {
        name: "SQL",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "MySQL",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
      },
      {
        name: "SQLite",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
      },
    ],
  },
  {
    title: "Cloud Services",
    technologies: [
      { name: "AWS", logoUrl: resolvePublicPath("/images/aws.png") },
      {
        name: "Google Cloud",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
    ],
  },
  {
    title: "DevOps & Tools",
    technologies: [
      {
        name: "Docker",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Git",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "GitLab",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
      },
    ],
  },
  {
    title: "Web Development",
    technologies: [
      {
        name: "HTML",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Vue",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      },
      {
        name: "React",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
    ],
  },
];

export default function TechStack() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },

  
        "@keyframes fadeUp": {
          "0%": { opacity: 0, transform: "translateY(18px) scale(0.99)" },
          "60%": { opacity: 1, transform: "translateY(-2px) scale(1.005)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },

   
        "@media (prefers-reduced-motion: reduce)": {
          ".tech-card": {
            animation: "none !important",
            transition: "none !important",
            transform: "none !important",
          },
        },
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: "#311A0FFF", fontWeight: 700, mb: 4 }}
      >
        A full stack software engineer
      </Typography>


      <Box
        sx={{
          display: "grid",
          gap: { xs: 2.5, md: 3 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {techCategories.map((category, idx) => (
          <Box
            key={category.title}
            className="tech-card"
            sx={{
              animation: `fadeUp 560ms cubic-bezier(.2,.85,.25,1) ${
                idx * 90
              }ms both`,
            }}
          >
            <Card
              sx={{
                height: "100%",
                backgroundColor: "rgba(30,30,30,0.85)", 
                borderRadius: 2,
                p: 1.25,
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.55)",
                transition: "transform 220ms ease, box-shadow 220ms ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
                },
              }}
            >
              <CardContent sx={{ p: 1.25 }}>
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ color: "#90caf9", fontWeight: 700, mb: 1.2 }}
                >
                  {category.title}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                    display: "grid",
                    gap: 1,
                  }}
                >
                  {category.technologies.map((tech) => (
                    <Box
                      component="li"
                      key={tech.name}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 0.5,
                      }}
                    >
                      <Box
                        component="img"
                        src={tech.logoUrl}
                        alt={tech.name}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          objectFit: "contain",
                          backgroundColor: "#fff",
                          p: 0.5,
                          boxShadow: "0 4px 14px rgba(9,30,66,0.12)",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />

                      <Typography sx={{ color: "#e6eef9", fontWeight: 500 }}>
                        {tech.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
