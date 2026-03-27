// src/pages/Contact.tsx
import React from "react";
import { Container, Box, Link, Typography } from "@mui/material";
import { GitHub, Email } from "@mui/icons-material";

export default function Contact() {
  const contactItems = [
    {
      icon: <GitHub />,
      label: "GitHub",
      value: "https://github.com/brady-world2024",
      link: "https://github.com/brady-world2024",
      helper: "Browse repositories, experiments, and full project history.",
      action: "Open profile",
    },
    {
      icon: <Email />,
      label: "Email",
      value: "bradyli2024@gmail.com",
      link: "mailto:bradyli2024@gmail.com",
      helper: "Best for collaboration, freelance work, and direct inquiries.",
      action: "Send email",
    },
  ];

  return (
    <Container sx={{ pt: { xs: 12, md: 16 }, pb: 6 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(135deg, rgba(5,12,28,0.92) 0%, rgba(9,20,40,0.78) 55%, rgba(7,15,30,0.9) 100%)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
          px: { xs: 2.5, md: 4.5 },
          py: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(102,255,224,0.16) 0%, rgba(102,255,224,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -140,
            left: -100,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(144,202,249,0.15) 0%, rgba(144,202,249,0) 72%)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 3,
            alignItems: "stretch",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.95fr) minmax(0, 1.05fr)" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              pr: { md: 2 },
            }}
          >
            <Typography
              sx={{
                color: "#66ffe0",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontSize: "0.78rem",
                fontWeight: 700,
              }}
            >
              Get in touch
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.6rem" },
                lineHeight: 1.05,
                fontWeight: 800,
                color: "#f4fbff",
                maxWidth: 420,
              }}
            >
              Let&apos;s keep the conversation simple.
            </Typography>

            <Typography
              sx={{
                color: "rgba(214,231,242,0.88)",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: 520,
              }}
            >
              If you want to talk about a project, collaboration, or an
              opportunity, email is the best way to reach me. GitHub is the
              fastest place to explore how I build.
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignSelf: "flex-start",
                px: 1.5,
                py: 0.8,
                borderRadius: 999,
                border: "1px solid rgba(102,255,224,0.2)",
                backgroundColor: "rgba(102,255,224,0.08)",
                color: "rgba(232,249,255,0.92)",
                fontSize: "0.9rem",
              }}
            >
              Preferred contact: Email
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
            }}
          >
            {contactItems.map((item) => {
              const isMailLink = item.link.startsWith("mailto:");

              return (
                <Link
                  key={item.label}
                  href={item.link}
                  target={isMailLink ? undefined : "_blank"}
                  rel={isMailLink ? undefined : "noopener noreferrer"}
                  underline="none"
                  sx={{
                    display: "block",
                    borderRadius: 3,
                    color: "inherit",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "grid",
                      gridTemplateColumns: { xs: "auto 1fr", sm: "auto 1fr auto" },
                      gap: 2,
                      alignItems: "center",
                      px: { xs: 2, sm: 2.5 },
                      py: { xs: 2, sm: 2.5 },
                      borderRadius: 3,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                      backdropFilter: "blur(10px)",
                      transition:
                        "transform 180ms ease, border-color 180ms ease, background 180ms ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "rgba(102,255,224,0.35)",
                        background:
                          "linear-gradient(180deg, rgba(102,255,224,0.12), rgba(255,255,255,0.05))",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        color: "#66ffe0",
                        backgroundColor: "rgba(102,255,224,0.1)",
                        border: "1px solid rgba(102,255,224,0.22)",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: "rgba(177,214,232,0.82)",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontSize: "0.72rem",
                          mb: 0.6,
                        }}
                      >
                        {item.label}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#f4fbff",
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          fontWeight: 700,
                          wordBreak: "break-word",
                          mb: 0.7,
                        }}
                      >
                        {item.value}
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(214,231,242,0.76)",
                          fontSize: "0.92rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.helper}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: "#66ffe0",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        justifySelf: { xs: "start", sm: "end" },
                        gridColumn: { xs: "1 / -1", sm: "auto" },
                        pl: { xs: 0, sm: 0 },
                      }}
                    >
                      {item.action}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
