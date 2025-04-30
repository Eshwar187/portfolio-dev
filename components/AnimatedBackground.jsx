'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const AnimatedBackground = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  // Different background animations for different pages
  const getBackgroundAnimation = () => {
    switch (pathname) {
      case '/':
        // Home page - Cosmic background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.15) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(76, 29, 149, 0.3), rgba(0, 0, 0, 1))',
                  'radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.15) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(76, 29, 149, 0.3), rgba(0, 0, 0, 1))',
                  'radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.15) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(76, 29, 149, 0.3), rgba(0, 0, 0, 1))',
                  'radial-gradient(circle at 20% 80%, rgba(138, 43, 226, 0.15) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(76, 29, 149, 0.3), rgba(0, 0, 0, 1))',
                  'radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.15) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(76, 29, 149, 0.3), rgba(0, 0, 0, 1))',
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating orbs */}
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={`orb-${index}`}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${(index + 1) * 10}vw`,
                  height: `${(index + 1) * 10}vw`,
                  border: `1px solid rgba(138, 43, 226, ${0.1 - index * 0.01})`,
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 40 + index * 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 8 + index * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
                }}
              />
            ))}
          </div>
        );
        
      case '/about':
        // About page - Grid background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-black">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '-1px -1px',
              }} />
              
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        );
        
      case '/projects':
        // Projects page - Holographic background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Base background */}
            <div className="absolute inset-0 bg-black" />
            
            {/* Holographic grid */}
            <motion.div
              className="absolute inset-0"
              style={{ 
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                perspective: '1000px',
              }}
              animate={{
                rotateX: [0, 5, 0, -5, 0],
                backgroundPosition: ['0px 0px', '30px 30px', '0px 0px'],
              }}
              transition={{
                rotateX: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                backgroundPosition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }
              }}
            />
            
            {/* Holographic glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
        
      case '/linkedin':
        // LinkedIn page - Professional background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Base background */}
            <div className="absolute inset-0 bg-black" />
            
            {/* Subtle gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 102, 194, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(10, 102, 194, 0.1) 100%)',
              }}
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(10, 102, 194, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(10, 102, 194, 0.1) 100%)',
                  'linear-gradient(225deg, rgba(10, 102, 194, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(10, 102, 194, 0.1) 100%)',
                  'linear-gradient(315deg, rgba(10, 102, 194, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(10, 102, 194, 0.1) 100%)',
                  'linear-gradient(45deg, rgba(10, 102, 194, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(10, 102, 194, 0.1) 100%)',
                  'linear-gradient(135deg, rgba(10, 102, 194, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(10, 102, 194, 0.1) 100%)',
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Subtle dots */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(rgba(10, 102, 194, 0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
        );
        
      case '/contact':
        // Contact page - Magnetic field background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Base background */}
            <div className="absolute inset-0 bg-black" />
            
            {/* Magnetic field lines */}
            {[...Array(10)].map((_, index) => (
              <motion.div
                key={`field-${index}`}
                className="absolute h-full"
                style={{
                  width: '1px',
                  left: `${index * 10}%`,
                  background: 'linear-gradient(to bottom, transparent, rgba(138, 43, 226, 0.2), transparent)',
                }}
                animate={{
                  scaleY: [1, 1.1, 1],
                  x: [0, 10, 0, -10, 0],
                }}
                transition={{
                  scaleY: {
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  x: {
                    duration: 10 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
              />
            ))}
            
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
        
      case '/blog':
        // Blog page - Ink background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Base background */}
            <div className="absolute inset-0 bg-black" />
            
            {/* Ink blots */}
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={`ink-${index}`}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 8 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 2,
                }}
              />
            ))}
            
            {/* Paper texture */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              opacity: 0.02,
            }} />
          </div>
        );
        
      default:
        // Default background
        return (
          <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-black" />
          </div>
        );
    }
  };
  
  return getBackgroundAnimation();
};

export default AnimatedBackground;
