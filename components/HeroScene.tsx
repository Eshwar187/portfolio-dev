'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text3D, Float, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MotionConfig } from 'framer-motion';
import * as THREE from 'three';

const FloatingName = () => {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <Text3D
        ref={textRef}
        font="/fonts/inter_bold.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2.5, 0, 0]}
      >
        J.ESHWAR
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#ff00ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Float>
  );
};

const FloatingTitle = () => {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5 + 1) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.3}
    >
      <Text3D
        ref={textRef}
        font="/fonts/inter_regular.json"
        size={0.3}
        height={0.05}
        curveSegments={12}
        position={[-2, -1, 0]}
      >
        FULL-STACK DEVELOPER
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ff00ff"
          emissiveIntensity={0.2}
        />
      </Text3D>
    </Float>
  );
};

const AnimatedSphere = () => {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <motion.mesh
      ref={sphereRef}
      position={[2, 0, 0]}
      animate={{
        scale: [1, 1.2, 1],
        rotateZ: [0, Math.PI * 2],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#8a2be2"
        wireframe
        emissive="#ff00ff"
        emissiveIntensity={0.5}
      />
    </motion.mesh>
  );
};

const OrbitingParticles = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(100)].map((_, i) => {
        const radius = 3 + Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 4;

        return (
          <motion.mesh
            key={i}
            position={[
              radius * Math.cos(angle),
              y,
              radius * Math.sin(angle)
            ]}
            animate={{
              scale: [0.1, 0.15, 0.1],
              transition: {
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }
            }}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color={new THREE.Color(
                0.5 + Math.random() * 0.5,
                0.2,
                0.8 + Math.random() * 0.2
              )}
              emissive={new THREE.Color(
                0.5 + Math.random() * 0.5,
                0.2,
                0.8 + Math.random() * 0.2
              )}
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </motion.mesh>
        );
      })}
    </group>
  );
};

const HeroScene = () => {
  return (
    <div className="h-[80vh] w-full">
      <MotionConfig transition={{ duration: 0.5 }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} intensity={0.5} />

          <FloatingName />
          <FloatingTitle />
          <AnimatedSphere />
          <OrbitingParticles />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default HeroScene;
