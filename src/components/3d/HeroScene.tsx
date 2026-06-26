"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#C3B1FF"
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2, -1, -1]} scale={1.2}>
        <torusGeometry args={[1, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#C3B1FF"
          emissive="#C3B1FF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function SmallOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={groupRef}>
      {[
        { pos: [-2.5, 1.5, -2] as [number, number, number], scale: 0.15 },
        { pos: [3, 2, -3] as [number, number, number], scale: 0.1 },
        { pos: [-1, -2, -1] as [number, number, number], scale: 0.12 },
        { pos: [2.5, -1.5, -2.5] as [number, number, number], scale: 0.08 },
      ].map((orb, i) => (
        <Float key={i} speed={3 + i} floatIntensity={0.5}>
          <mesh position={orb.pos} scale={orb.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#C3B1FF"
              emissive="#C3B1FF"
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-3, -3, 2]} intensity={0.3} color="#C3B1FF" />
        <FloatingSphere />
        <FloatingRing />
        <SmallOrbs />
      </Canvas>
    </div>
  );
}
