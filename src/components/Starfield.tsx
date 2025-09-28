// src/components/Starfield.tsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";


function StarCloud({
  count = 1400,
  radius = 900,
}: {
  count?: number;
  radius?: number;
}) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const { positions, phases, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * (0.2 + Math.random() * 0.8);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.6 + Math.random() * 2.2;
    }
    return { positions, phases, sizes };
  }, [count, radius]);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: {
          value: Math.min(
            typeof window !== "undefined" ? window.devicePixelRatio : 1,
            2
          ),
        },
        uColor: { value: new THREE.Color("#eaf8ff") },
        uSize: { value: 1.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uSize;
        attribute float aPhase;
        attribute float aSize;
        varying float vTwinkle;
        void main() {
          float t = uTime * 2.0;
          vTwinkle = 0.5 + 0.5 * sin(t + aPhase * 4.0);
          vec3 pos = position;
          pos.x += 0.6 * sin(uTime * 0.12 + aPhase);
          pos.y += 0.6 * cos(uTime * 0.08 + aPhase * 1.3);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float size = (aSize * uSize) * (300.0 / -mvPosition.z);
          gl_PointSize = size * uPixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vTwinkle;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float dist = length(c);
          float alpha = smoothstep(0.5, 0.0, dist);
          float intensity = alpha * (0.4 + 0.6 * vTwinkle);
          float corona = smoothstep(0.9, 0.0, dist) * 0.25;
          gl_FragColor = vec4(uColor * (intensity + corona), intensity + corona);
        }
      `,
    });
    return mat as THREE.ShaderMaterial;
  }, []);

  useFrame(({ clock }) => {
    if (material && (material as any).uniforms) {
      (material as any).uniforms.uTime.value = clock.getElapsedTime();
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y =
        (clock.getElapsedTime() * 0.02) % (Math.PI * 2);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          array={phases}
          count={phases.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSize"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive attach="material" object={material} />
    </points>
  );
}

/* ---------- Mouse-following light ---------- */
function MouseLight({ intensity = 1.4 }: { intensity?: number }) {
  const lightRef = useRef<THREE.PointLight | null>(null);
  const { viewport } = useThree();
  useFrame(({ mouse, camera }) => {
    if (lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      const vec = new THREE.Vector3(x, y, 180);
      vec.unproject(camera);
      lightRef.current.position.lerp(vec, 0.14);
    }
  });
  return (
    <pointLight
      ref={lightRef}
      intensity={intensity}
      distance={650}
      decay={2.0}
    />
  );
}

/* ---------- Shooting stars system ( onCreated -> ref) ---------- */

type ShootingStarDef = {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  length: number;
  life: number;
  ttl: number;
  mesh?: THREE.Mesh | null;
};

function ShootingStars({ count = 8 }: { count?: number }) {
  const groupRef = useRef<THREE.Group | null>(null);


  const stars = useMemo(() => {
    const arr: ShootingStarDef[] = [];
    for (let i = 0; i < count; i++) arr.push(randomStar());
    return arr;
  }, [count]);


  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(0.8, 1), []);


  const baseMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffffff"),
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );


  function randomStar(): ShootingStarDef {
    const x = (Math.random() - 0.5) * 1600;
    const y = 300 + Math.random() * 400;
    const z = -200 - Math.random() * 400;
    const dx = (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.6);
    const dy = -0.4 - Math.random() * 0.6;
    const dz = -0.1 - Math.random() * 0.2;
    const dir = new THREE.Vector3(dx, dy, dz).normalize();
    return {
      position: new THREE.Vector3(x, y, z),
      direction: dir,
      speed: 400 + Math.random() * 420,
      length: 90 + Math.random() * 140,
      life: 0,
      ttl: 0.6 + Math.random() * 0.9,
      mesh: null,
    };
  }


  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.life += delta;
      if (s.life >= s.ttl) {
        // reset
        const next = randomStar();
        stars[i] = next;
        if (s.mesh) {
          s.mesh.position.copy(next.position);
          s.mesh.lookAt(next.position.clone().add(next.direction));
          s.mesh.scale.set(1, next.length / 10, 1);
        }
        continue;
      }
      // move
      const move = s.direction.clone().multiplyScalar(s.speed * delta);
      s.position.add(move);
      const t = s.life / s.ttl;
      if (s.mesh) {
        s.mesh.position.copy(s.position);
        s.mesh.lookAt(s.position.clone().add(s.direction));
        const len = s.length * (0.2 + 0.8 * (1 - Math.pow(t - 1, 2)));
        s.mesh.scale.set(1, len / 10, 1);
        const mat = s.mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = Math.max(0, 1 - t); // fade out
          // subtle head color shift (HSL) for nicer look
          mat.color.setHSL(0.6 - 0.25 * t, 1.0, 0.8 - 0.4 * t);
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {stars.map((s, idx) => {

        const mat = baseMaterial.clone();

        return (
          <mesh
            key={idx}
            geometry={planeGeometry}
            material={mat}
            position={s.position.clone()}
            ref={(mesh: THREE.Mesh | null) => {

              s.mesh = mesh;
              if (mesh) {
                mesh.lookAt(s.position.clone().add(s.direction));
                mesh.scale.set(1, s.length / 10, 1);
              }
            }}
          />
        );
      })}
    </group>
  );
}



export default function Starfield() {
  return (
    <div className="canvas-wrap" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 250], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={Math.min(
          typeof window !== "undefined" ? window.devicePixelRatio : 1,
          2
        )}
      >
        <ambientLight intensity={0.18} />
        <MouseLight intensity={1.6} />
        <StarCloud count={1400} radius={900} />
        <ShootingStars count={8} />
        <fog attach="fog" args={[0x030512, 10, 900]} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
