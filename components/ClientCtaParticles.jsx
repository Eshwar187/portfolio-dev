'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ClientCtaParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate particles only on the client side
    const newParticles = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      xMove: (Math.random() - 0.5) * 100,
      yMove: (Math.random() - 0.5) * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    
    setParticles(newParticles);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={`cta-particle-${particle.id}`}
          className="absolute w-2 h-2 rounded-full bg-purple-500"
          style={{
            top: particle.top,
            left: particle.left,
            opacity: 0.6,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            x: [0, particle.xMove],
            y: [0, particle.yMove],
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

export default ClientCtaParticles;
