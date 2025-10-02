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
/* ----------------------------- */

export default function TechStacks(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);


  function removeOverlay() {
    if (overlayRef.current) {
      try {
        overlayRef.current.remove();
      } catch (e) {

      }
      overlayRef.current = null;
    }
  }

  useEffect(() => {
    let mounted = true;
    const container = containerRef.current;
    if (!container) return;

    (async () => {

      const navReserve = 120;
      const cssWidth = Math.max(
        360,
        container.clientWidth || window.innerWidth
      );
      const cssHeight = Math.max(
        360,
        Math.floor(window.innerHeight - navReserve)
      );
      container.style.height = `${cssHeight}px`;
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

      const tileSize = Math.min(56, Math.max(40, Math.floor(cssWidth / 12)));

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

      // ---------- mouse + constraint ----------
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


      const createOverlay = (body: Body) => {
        removeOverlay();
        const img = document.createElement("img");
        img.draggable = false;
        img.ondragstart = (e) => e.preventDefault();
        img.style.position = "fixed";
        img.style.pointerEvents = "none";
        img.style.zIndex = "9999";
        img.style.willChange = "left,top,transform,width,height";
        img.style.filter = "drop-shadow(0 8px 24px rgba(0,0,0,0.45))";
        img.style.width = `${tileSize}px`;
        img.style.height = `${tileSize}px`;
        img.style.transform = "translate(-50%,-50%)";
        img.style.borderRadius = "6px";
        const tex =
          (body.render.sprite && (body.render.sprite as any).texture) || "";
        img.src = tex;
        document.body.appendChild(img);
        overlayRef.current = img;
      };


      Events.on(engine, "beforeUpdate", () => {
        const img = overlayRef.current;
        if (!img) return;
        const m = mouse.position;
        const rect = render.canvas.getBoundingClientRect();
        const cssX = rect.left + m.x;
        const cssY = rect.top + m.y;
        img.style.left = `${cssX}px`;
        img.style.top = `${cssY}px`;
        const dragging = (mouseConstraint as any).body as Body | null;
        if (dragging)
          img.style.transform = `translate(-50%,-50%) rotate(${dragging.angle}rad)`;
        else img.style.transform = `translate(-50%,-50%)`;
      });

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


      Events.on(mouseConstraint, "startdrag", (ev: any) => {
        const b: Body = ev.body;
        if (!b) return;
        b.render.visible = false;
        (b as any).__oldFrictionAir = b.frictionAir;
        b.frictionAir = 0.12;
        createOverlay(b);
        render.canvas.style.cursor = "grabbing";
      });


      Events.on(mouseConstraint, "enddrag", (ev: any) => {
        const b: Body | null = ev.body ?? (mouseConstraint as any).body;
        if (b) {
          b.render.visible = true;
          if ((b as any).__oldFrictionAir !== undefined) {
            b.frictionAir = (b as any).__oldFrictionAir;
            delete (b as any).__oldFrictionAir;
          }
        }
        removeOverlay();
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
        const newW = Math.max(360, container.clientWidth || window.innerWidth);
        const navReserve2 = 120;
        const newH = Math.max(
          320,
          Math.floor(window.innerHeight - navReserve2)
        );
        container.style.height = `${newH}px`;
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
        removeOverlay();
        const engine = engineRef.current;
        const render = renderRef.current;
        if (render && render.canvas) {
          // remove event listeners
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 }, textAlign: "center" }}
    >
      <Typography
        variant="h3"
        sx={{ color: "#90caf9", fontWeight: 700, mb: 3 }}
      >
        A full stack software engineer
      </Typography>

      <Box
        ref={containerRef}
        className="tech-canvas"
        sx={{
          width: "100%",
          mx: "auto",
          borderRadius: 1,
          background: "transparent",
          touchAction: "none",
        }}
      />
    </Box>
  );
}
