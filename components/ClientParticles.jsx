'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ClientParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate particles only on the client side
    const newParticles = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      width: Math.random() * 10 + 2,
      height: Math.random() * 10 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      xMove: (Math.random() - 0.5) * 200,
      yMove: (Math.random() - 0.5) * 200,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    
    setParticles(newParticles);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-purple-500"
          style={{
            width: particle.width,
            height: particle.height,
            top: particle.top,
            left: particle.left,
            opacity: 0.3,
          }}
          animate={{
            x: [0, particle.xMove],
            y: [0, particle.yMove],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

export default ClientParticles;
