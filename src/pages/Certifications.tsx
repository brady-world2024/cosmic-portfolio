// src/pages/Certifications.tsx
import React from "react";
import { Box, Typography, Card, CardContent, Link } from "@mui/material";

type Cert = {
  id: string;
  title: string;
  imageUrl: string;
  credlyUrl: string; 
};

const certs: Cert[] = [
  {
    id: "aws-arch-assoc",
    title: "AWS Certified Solutions Architect - Associate",
    imageUrl: "/images/aws-certified-solutions-architect-associate.png",
    credlyUrl:
      "https://www.credly.com/badges/5da89a94-b8bf-415e-94eb-1f6e71f8e076/public_url",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    imageUrl: "/images/aws-certified-cloud-practitioner.png",
    credlyUrl:
      "https://www.credly.com/badges/02194a80-89d7-4222-9f08-15e1b0943a08/public_url",
  },
];

export default function Certifications() {
  return (
    <Box sx={{ pt: 8, pb: 6, px: 2 }}>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {certs.map((c) => (
          <Card
            key={c.id}
            sx={{
              width: 280,
              backgroundColor: "rgba(30,30,30,0.85)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 180ms ease",
              "&:hover": { transform: "translateY(-6px)" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Link
                href={c.credlyUrl}
                target="_blank"
                rel="noopener"
                underline="none"
              >
                <Box
                  component="img"
                  src={c.imageUrl}
                  alt={c.title}
                  sx={{
                    width: 160,
                    height: 160,
                    objectFit: "contain",
                    mx: "auto",
                    mb: 1,
                  }}
                />
                <Typography sx={{ color: "#e6eef9", fontWeight: 600 }}>
                  {c.title}
                </Typography>
            
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
