'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { motion } from 'framer-motion-3d';
import { MotionConfig } from 'framer-motion';

// Skills to display around the sphere
const skills = [
  { name: 'React', position: [1, 0, 0], color: '#61DAFB' },
  { name: 'Node.js', position: [-1, 0, 0], color: '#68A063' },
  { name: 'MongoDB', position: [0, 1, 0], color: '#4DB33D' },
  { name: 'Express', position: [0, -1, 0], color: '#000000' },
  { name: 'PostgreSQL', position: [0, 0, 1], color: '#336791' },
  { name: 'Next.js', position: [0, 0, -1], color: '#000000' },
  { name: 'TypeScript', position: [0.7, 0.7, 0], color: '#3178C6' },
  { name: 'Tailwind', position: [-0.7, 0.7, 0], color: '#38B2AC' },
  { name: 'Three.js', position: [0.7, -0.7, 0], color: '#000000' },
  { name: 'GSAP', position: [-0.7, -0.7, 0], color: '#88CE02' },
];

const SkillNode = ({ name, position, color, onClick }: { name: string; position: number[]; color: string; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={new Vector3(...position).multiplyScalar(2)}>
      <Sphere 
        args={[0.2, 16, 16]} 
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 2 : 0.5} 
          toneMapped={false} 
        />
      </Sphere>
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const RotatingSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <motion.mesh
        ref={sphereRef}
        animate={{ scale: [0, 1], rotateZ: [0, 10] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#8a2be2" 
          wireframe 
          emissive="#ff00ff"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </motion.mesh>
      
      {skills.map((skill) => (
        <SkillNode 
          key={skill.name} 
          name={skill.name} 
          position={skill.position} 
          color={skill.color} 
          onClick={() => setSelectedSkill(skill.name)}
        />
      ))}
      
      {selectedSkill && (
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          {`${selectedSkill}: Expert level with professional experience`}
        </Text>
      )}
    </group>
  );
};

const TechSphere = () => {
  return (
    <div className="h-[600px] w-full">
      <MotionConfig transition={{ duration: 0.5 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <RotatingSphere />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default TechSphere;
