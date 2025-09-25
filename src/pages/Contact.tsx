// src/pages/Contact.tsx
import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { GitHub, LinkedIn, Email, Phone, Home } from "@mui/icons-material";

export default function Contact() {
  const contactItems = [
    {
      icon: <GitHub />,
      label: "GitHub",
      value: "https://github.com/brady-world2024",
      link: "https://github.com/brady-world2024",
    },
    {
      icon: <LinkedIn />,
      label: "LinkedIn",
      value: "https://www.linkedin.com",
      link: "https://www.linkedin.com",
    },
    {
      icon: <Email />,
      label: "Email",
      value: "bradyli2024@gmail.com",
      link: "mailto:bradyli2024@gmail.com",
    },
    {
      icon: <Phone />,
      label: "Phone",
      value: "64123456789",
    },
    {
      icon: <Home />,
      label: "Address",
      value: "Street, Wellington, NewZealand",
    },
  ];

  return (
    <Container sx={{ pt: 6, pb: 4}}>



      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        {contactItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 720,
              padding: 2,
              borderRadius: 2,
              backgroundColor: "rgba(30,30,30,0.85)", 
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.55)",
            }}
          >
            <Box sx={{ marginRight: 2, color: "#90caf9" }}>{item.icon}</Box>

            {item.link ? (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ fontSize: "1.1rem", color: "#90caf9" }}
              >
                {item.value}
              </Link>
            ) : (
              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", color: "#e6eef9" }}
              >
                {item.value}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
}
