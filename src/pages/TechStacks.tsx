import React, { useEffect, useRef } from "react";
import Matter, {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  Events,
  Query,
  Composite,
} from "matter-js";
import { Box, Typography } from "@mui/material";
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
      {
        name: "Windows Forms App",
        logoUrl: resolvePublicPath("/images/microsoftforms.png"),
      },
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

export default function TechStacks(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);

  useEffect(() => {
    let mounted = true;
    const container = containerRef.current;
    if (!container) return;

    (async () => {

      const computeSize = () => {
        const rect = container.getBoundingClientRect();
        const cssWidth = Math.max(320, rect.width || window.innerWidth);
        const cssHeight = Math.max(
          260,
          rect.height || window.innerHeight * 0.5
        );
        return { cssWidth, cssHeight };
      };

      const { cssWidth, cssHeight } = computeSize();
      container.style.overflow = "hidden";

      const techs = techCategories.flatMap((c) => c.technologies);


      const loadedImages: HTMLImageElement[] = await Promise.all(
        techs.map((t) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img);
            img.src = t.logoUrl;
          });
        })
      );

      if (!mounted) return;

      const engine = Engine.create();
      engine.world.gravity.y = 1.0;
      engineRef.current = engine;

      const render = Render.create({
        element: container,
        engine,
        options: {
          width: cssWidth,
          height: cssHeight,
          wireframes: false,
          background: "transparent",
        },
      });
      renderRef.current = render;

      render.canvas.style.width = `${cssWidth}px`;
      render.canvas.style.height = `${cssHeight}px`;
      render.canvas.width = cssWidth;
      render.canvas.height = cssHeight;

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      let ground = Bodies.rectangle(
        cssWidth / 2,
        cssHeight - 12,
        cssWidth,
        28,
        {
          isStatic: true,
          render: { visible: false },
        }
      );
      let leftWall = Bodies.rectangle(-12, cssHeight / 2, 24, cssHeight, {
        isStatic: true,
        render: { visible: false },
      });
      let rightWall = Bodies.rectangle(
        cssWidth + 12,
        cssHeight / 2,
        24,
        cssHeight,
        { isStatic: true, render: { visible: false } }
      );
      World.add(engine.world, [ground, leftWall, rightWall]);

      const tileSize = Math.min(80, Math.max(60, Math.floor(cssWidth / 10)));

      const bodies = techs.map((t, i) => {
        const img = loadedImages[i];
        const naturalW = img && img.naturalWidth ? img.naturalWidth : 128;
        const naturalH = img && img.naturalHeight ? img.naturalHeight : 128;
        const maxDim = Math.max(1, naturalW, naturalH);
        const scale = tileSize / maxDim;

        const x = 24 + Math.random() * Math.max(1, cssWidth - 48);
        const y = -40 - i * (tileSize * 0.18 + Math.random() * 8);

        const b = Bodies.rectangle(x, y, tileSize, tileSize, {
          restitution: 0.18 + Math.random() * 0.3,
          friction: 0.6,
          frictionStatic: 0.6,
          frictionAir: 0.02,
          density: 0.0016 + Math.random() * 0.0018,
          angle: (Math.random() - 0.5) * 0.6,
          render: {
            sprite: {
              texture: t.logoUrl,
              xScale: scale,
              yScale: scale,
            },
          },
        });
        (b as any).__meta = { name: t.name, tileSize };
        return b;
      });

      World.add(engine.world, bodies);

      const mouse = Mouse.create(render.canvas);
      render.canvas.setAttribute("draggable", "false");
      render.canvas.addEventListener("dragstart", (e) => e.preventDefault());
      render.canvas.style.touchAction = "none";

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.22,
          damping: 0.04,
          length: 0,
          render: { visible: false },
        },
      });
      World.add(engine.world, mouseConstraint);

     
      const updateCursorByHover = () => {
        const found = Query.point(
          Composite.allBodies(engine.world),
          mouse.position
        );
        const hasTarget = found.some((b) => !b.isStatic && !!(b as any).__meta);
        render.canvas.style.cursor = hasTarget ? "grab" : "default";
      };
      render.canvas.addEventListener("mousemove", updateCursorByHover);
      render.canvas.addEventListener("touchmove", updateCursorByHover, {
        passive: true,
      });

      Events.on(mouseConstraint, "startdrag", () => {
        render.canvas.style.cursor = "grabbing";
      });

      Events.on(mouseConstraint, "enddrag", () => {
        render.canvas.style.cursor = "default";
      });

      Events.on(engine, "collisionStart", (ev) => {
        for (const pair of ev.pairs) {
          const a = pair.bodyA,
            b = pair.bodyB;
          const applyTo = (bb: Body | null) => {
            if (!bb || bb.isStatic) return;
            Body.setAngularVelocity(
              bb,
              bb.angularVelocity + (Math.random() - 0.5) * 0.06
            );
            bb.friction = Math.min(0.95, bb.friction + 0.04);
          };
          if (a === ground) applyTo(b);
          if (b === ground) applyTo(a);
        }
      });

      const handleResize = () => {
        const { cssWidth: newW, cssHeight: newH } = computeSize();
        render.canvas.style.width = `${newW}px`;
        render.canvas.style.height = `${newH}px`;
        render.canvas.width = newW;
        render.canvas.height = newH;
        render.options.width = newW;
        render.options.height = newH;

        World.remove(engine.world, [ground, leftWall, rightWall]);
        ground = Bodies.rectangle(newW / 2, newH - 12, newW, 28, {
          isStatic: true,
          render: { visible: false },
        });
        leftWall = Bodies.rectangle(-12, newH / 2, 24, newH, {
          isStatic: true,
          render: { visible: false },
        });
        rightWall = Bodies.rectangle(newW + 12, newH / 2, 24, newH, {
          isStatic: true,
          render: { visible: false },
        });
        World.add(engine.world, [ground, leftWall, rightWall]);
      };
      window.addEventListener("resize", handleResize);

      if (!mounted) return;
      return;
    })();

    return () => {
      mounted = false;
      try {
        const engine = engineRef.current;
        const render = renderRef.current;
        window.removeEventListener("resize", () => {});
        if (engine) {
          World.clear(engine.world, false);
          Engine.clear(engine);
        }
        if (render) {
          try {
            Render.stop(render);
            if (render.canvas && render.canvas.parentNode)
              render.canvas.parentNode.removeChild(render.canvas);
          } catch (e) {}
        }
      } catch (err) {
        /* ignore cleanup errors */
      }
    };
  }, []);

  return (
    <Box
      className="tech-stack"
      sx={{
        width: "100%",
        height: "100vh", 
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pt: "96px", 
        pb: 2,
        px: { xs: 2, md: 4 },
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4" 
        sx={{
          color: "#90caf9",
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "1.6rem", md: "2.1rem" },
        }}
      >
        A full stack software engineer
      </Typography>

      <Box
        ref={containerRef}
        className="tech-canvas"
        sx={{
          width: "100%",
          maxWidth: "960px",
          flex: 1, 
          mx: "auto",
          borderRadius: 1,
          background: "transparent",
          touchAction: "none",
        }}
      />
    </Box>
  );
}
