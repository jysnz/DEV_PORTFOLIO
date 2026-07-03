"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  label: string;
  color: string;
  speed: number;
}

function TechOrb({ position, label, color, speed }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={position}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.15}
          color="#a0a0b0"
          anchorX="center"
          anchorY="top"
          font="/fonts/manrope.woff"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function OrbField() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const items = [
    { label: "React", pos: [-2, 1, 0] as [number, number, number], color: "#61dafb" },
    { label: "Next.js", pos: [1.5, 1.5, -1] as [number, number, number], color: "#ffffff" },
    { label: "TypeScript", pos: [-1, -1, 1] as [number, number, number], color: "#3178c6" },
    { label: "Flutter", pos: [2, -0.5, 0.5] as [number, number, number], color: "#02569B" },
    { label: "Python", pos: [-2.5, -0.5, -1] as [number, number, number], color: "#ffd43b" },
    { label: "Node.js", pos: [0, 2, -0.5] as [number, number, number], color: "#68a063" },
    { label: "Tailwind", pos: [-0.5, -1.8, 0] as [number, number, number], color: "#38bdf8" },
    { label: "Firebase", pos: [2.5, 0.5, -0.5] as [number, number, number], color: "#ffca28" },
  ];

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <TechOrb
          key={item.label}
          position={item.pos}
          label={item.label}
          color={item.color}
          speed={1 + i * 0.2}
        />
      ))}
    </group>
  );
}

export function TechOrbs() {
  return (
    <div className="w-full h-[300px] lg:h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#C3B1FF" />
        <pointLight position={[-5, -5, 3]} intensity={0.3} color="#61dafb" />
        <OrbField />
      </Canvas>
    </div>
  );
}
