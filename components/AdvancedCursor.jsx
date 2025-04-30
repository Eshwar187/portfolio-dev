'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

const AdvancedCursor = () => {
  const pathname = usePathname();
  const cursorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [lastClick, setLastClick] = useState({ x: 0, y: 0, time: 0 });
  
  // Use spring physics for smoother cursor movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Configure spring for different pages
  const getSpringConfig = () => {
    switch (pathname) {
      case '/about':
        return { damping: 15, stiffness: 150, mass: 1.2 }; // Cubic cursor - heavier feel
      case '/projects':
        return { damping: 10, stiffness: 200, mass: 0.8 }; // Holographic cursor - responsive
      case '/contact':
        return { damping: 8, stiffness: 300, mass: 0.5 }; // Magnetic cursor - very responsive
      case '/blog':
        return { damping: 25, stiffness: 120, mass: 1.5 }; // Ink cursor - slow, fluid movement
      case '/linkedin':
        return { damping: 20, stiffness: 180, mass: 1 }; // Professional cursor - balanced
      default:
        return { damping: 15, stiffness: 200, mass: 1 }; // Default - balanced
    }
  };
  
  const springConfig = getSpringConfig();
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Rotation based on cursor movement
  const rotateX = useTransform(mouseY, [0, window?.innerHeight || 1000], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window?.innerWidth || 1000], [-10, 10]);

  // Track mouse position
  useEffect(() => {
    setIsMounted(true);
    
    const mouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const mouseDown = (e) => {
      setIsClicking(true);
      setLastClick({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      });
    };

    const mouseUp = () => {
      setIsClicking(false);
    };
    
    const handleElementInteraction = () => {
      // Text elements
      document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorType('text'));
        el.addEventListener('mouseleave', () => setCursorType('default'));
      });
      
      // Button elements
      document.querySelectorAll('button, a, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorType('button'));
        el.addEventListener('mouseleave', () => setCursorType('default'));
      });
      
      // Image elements
      document.querySelectorAll('img, video, canvas, svg').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorType('media'));
        el.addEventListener('mouseleave', () => setCursorType('default'));
      });
      
      // Input elements
      document.querySelectorAll('input, textarea, [contenteditable="true"]').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorType('input'));
        el.addEventListener('mouseleave', () => setCursorType('default'));
      });
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    if (isMounted) {
      handleElementInteraction();
    }

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [isMounted, mouseX, mouseY]);

  // Get cursor style based on page and interaction
  const getCursorStyle = () => {
    // Base styles for all cursors
    const baseStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'difference',
      willChange: 'transform',
    };
    
    // Home page - Neon Glow Cursor
    if (pathname === '/') {
      return {
        main: {
          ...baseStyle,
          width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          borderRadius: '50%',
          backgroundColor: cursorType === 'text' ? 'rgba(255, 255, 255, 0.2)' : 
                          cursorType === 'button' ? 'rgba(255, 0, 255, 0.3)' : 
                          cursorType === 'media' ? 'rgba(0, 255, 255, 0.3)' : 
                          'rgba(138, 43, 226, 0.2)',
          border: `2px solid ${isClicking ? 'rgba(255, 255, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)'}`,
          boxShadow: `0 0 20px ${isClicking ? 'rgba(255, 255, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)'}, 
                      0 0 40px ${isClicking ? 'rgba(255, 255, 255, 0.4)' : 'rgba(138, 43, 226, 0.4)'}`,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
        },
        trail: true,
        particles: isClicking,
        glow: true,
      };
    }
    
    // About page - Cubic Cursor
    if (pathname === '/about') {
      return {
        main: {
          ...baseStyle,
          width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: `2px solid ${isClicking ? 'rgba(255, 0, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)'}`,
          boxShadow: `0 0 15px ${isClicking ? 'rgba(255, 0, 255, 0.6)' : 'rgba(138, 43, 226, 0.6)'}`,
          transform: `translate(-50%, -50%) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg) scale(${isClicking ? 0.8 : 1})`,
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
        },
        trail: false,
        particles: false,
        glow: false,
        cube: true,
      };
    }
    
    // Projects page - Holographic Cursor
    if (pathname === '/projects') {
      return {
        main: {
          ...baseStyle,
          width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(138,43,226,0.5) 70%)',
          border: `2px solid ${isClicking ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'}`,
          boxShadow: `0 0 20px ${isClicking ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'}, 
                      inset 0 0 10px ${isClicking ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'}`,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
        },
        trail: false,
        particles: isClicking,
        glow: true,
        holographic: true,
      };
    }
    
    // LinkedIn page - Professional Cursor
    if (pathname === '/linkedin') {
      return {
        main: {
          ...baseStyle,
          width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          borderRadius: '50%',
          backgroundColor: cursorType === 'button' ? 'rgba(10, 102, 194, 0.3)' : 'rgba(10, 102, 194, 0.1)',
          border: `2px solid ${isClicking ? 'rgba(10, 102, 194, 0.9)' : 'rgba(10, 102, 194, 0.6)'}`,
          boxShadow: `0 0 15px ${isClicking ? 'rgba(10, 102, 194, 0.8)' : 'rgba(10, 102, 194, 0.5)'}`,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
        },
        trail: false,
        particles: false,
        glow: false,
        professional: true,
      };
    }
    
    // Contact page - Magnetic Cursor
    if (pathname === '/contact') {
      return {
        main: {
          ...baseStyle,
          width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
          borderRadius: '50%',
          backgroundColor: 'rgba(138, 43, 226, 0.2)',
          border: `2px solid ${isClicking ? 'rgba(255, 0, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)'}`,
          boxShadow: `0 0 20px ${isClicking ? 'rgba(255, 0, 255, 0.6)' : 'rgba(138, 43, 226, 0.6)'}`,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
        },
        trail: false,
        particles: false,
        glow: true,
        magnetic: true,
      };
    }
    
    // Blog page - Ink Cursor
    if (pathname === '/blog') {
      return {
        main: {
          ...baseStyle,
          width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : cursorType === 'input' ? '3px' : '30px',
          height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : cursorType === 'input' ? '24px' : '30px',
          borderRadius: cursorType === 'input' ? '1px' : '50%',
          backgroundColor: cursorType === 'input' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)',
          border: cursorType === 'input' ? 'none' : `2px solid ${isClicking ? 'rgba(255, 0, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)'}`,
          boxShadow: cursorType === 'input' ? 'none' : `0 0 15px ${isClicking ? 'rgba(255, 0, 255, 0.6)' : 'rgba(138, 43, 226, 0.6)'}`,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
        },
        trail: false,
        particles: false,
        glow: false,
        ink: isClicking,
      };
    }
    
    // Default cursor
    return {
      main: {
        ...baseStyle,
        width: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
        height: cursorType === 'text' ? '80px' : cursorType === 'button' ? '60px' : cursorType === 'media' ? '70px' : '30px',
        borderRadius: '50%',
        backgroundColor: 'rgba(138, 43, 226, 0.2)',
        border: `2px solid ${isClicking ? 'rgba(255, 255, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)'}`,
        boxShadow: `0 0 15px ${isClicking ? 'rgba(255, 255, 255, 0.6)' : 'rgba(138, 43, 226, 0.6)'}`,
        transform: 'translate(-50%, -50%) scale(1)',
        transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
      },
      trail: false,
      particles: false,
      glow: false,
    };
  };

  // Render trail effect
  const renderTrail = () => {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={`trail-${index}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 30 - index * 5,
              height: 30 - index * 5,
              borderRadius: '50%',
              backgroundColor: 'rgba(138, 43, 226, 0.1)',
              border: '1px solid rgba(138, 43, 226, 0.3)',
              boxShadow: '0 0 10px rgba(138, 43, 226, 0.2)',
              zIndex: 9998 - index,
              pointerEvents: 'none',
              opacity: 0.5 - index * 0.1,
            }}
            animate={{ x: springX, y: springY }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 150,
              delay: index * 0.02,
            }}
          />
        ))}
      </>
    );
  };

  // Render particles effect
  const renderParticles = () => {
    if (!isClicking || Date.now() - lastClick.time > 300) return null;
    
    return (
      <>
        {[...Array(8)].map((_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          const distance = Math.random() * 50 + 20;
          
          return (
            <motion.div
              key={`particle-${index}`}
              style={{
                position: 'fixed',
                top: lastClick.y,
                left: lastClick.x,
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                borderRadius: '50%',
                backgroundColor: pathname === '/projects' 
                  ? 'rgba(255, 255, 255, 0.8)' 
                  : 'rgba(138, 43, 226, 0.8)',
                zIndex: 9990,
                pointerEvents: 'none',
              }}
              initial={{ scale: 0 }}
              animate={{ 
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{ 
                duration: 0.8,
                ease: 'easeOut'
              }}
            />
          );
        })}
      </>
    );
  };

  // Render glow effect
  const renderGlow = () => {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: pathname === '/projects'
            ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)'
            : pathname === '/contact'
              ? 'radial-gradient(circle, rgba(138,43,226,0.3) 0%, rgba(138,43,226,0) 70%)'
              : 'radial-gradient(circle, rgba(138,43,226,0.3) 0%, rgba(138,43,226,0) 70%)',
          zIndex: 9997,
          pointerEvents: 'none',
        }}
        animate={{ 
          x: springX, 
          y: springY,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: 'spring', ...springConfig },
          y: { type: 'spring', ...springConfig },
          scale: { 
            duration: 2, 
            repeat: Infinity,
            repeatType: 'reverse',
          }
        }}
      />
    );
  };

  // Render cube effect (for About page)
  const renderCube = () => {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
          borderRadius: '10px',
          border: '1px solid rgba(138, 43, 226, 0.3)',
          backgroundColor: 'transparent',
          zIndex: 9996,
          pointerEvents: 'none',
          perspective: '1000px',
        }}
        animate={{ 
          x: springX, 
          y: springY,
          rotateX: [0, 45, 0, -45, 0],
          rotateY: [0, -45, 0, 45, 0],
          rotateZ: [0, 10, 0, -10, 0],
        }}
        transition={{
          x: { type: 'spring', ...springConfig },
          y: { type: 'spring', ...springConfig },
          rotateX: { duration: 8, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
          rotateZ: { duration: 12, repeat: Infinity, ease: 'linear' },
        }}
      />
    );
  };

  // Render holographic effect (for Projects page)
  const renderHolographic = () => {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(138,43,226,0.1) 70%, transparent 100%)',
          zIndex: 9996,
          pointerEvents: 'none',
          opacity: 0.7,
        }}
        animate={{ 
          x: springX, 
          y: springY,
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          x: { type: 'spring', ...springConfig },
          y: { type: 'spring', ...springConfig },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    );
  };

  // Render professional effect (for LinkedIn page)
  const renderProfessional = () => {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
          borderRadius: '50%',
          border: '1px solid rgba(10, 102, 194, 0.4)',
          backgroundColor: 'transparent',
          zIndex: 9996,
          pointerEvents: 'none',
        }}
        animate={{ 
          x: springX, 
          y: springY,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: 'spring', ...springConfig },
          y: { type: 'spring', ...springConfig },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    );
  };

  // Render magnetic effect (for Contact page)
  const renderMagnetic = () => {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 70,
          height: 70,
          borderRadius: '50%',
          border: '1px dashed rgba(138, 43, 226, 0.4)',
          backgroundColor: 'transparent',
          zIndex: 9996,
          pointerEvents: 'none',
        }}
        animate={{ 
          x: springX, 
          y: springY,
          rotate: [0, 180, 360],
        }}
        transition={{
          x: { type: 'spring', ...springConfig },
          y: { type: 'spring', ...springConfig },
          rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
        }}
      />
    );
  };

  // Render ink effect (for Blog page)
  const renderInk = () => {
    if (!isClicking || Date.now() - lastClick.time > 300) return null;
    
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: lastClick.y,
          left: lastClick.x,
          zIndex: 9996,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.path
            d="M50,50 C60,40 70,45 75,35 C80,25 70,15 60,20 C50,25 40,15 30,20 C20,25 10,35 15,45 C20,55 30,50 40,60 C50,70 40,80 50,85 C60,90 70,80 75,70 C80,60 70,55 60,50 C50,45 40,60 50,50 Z"
            fill="rgba(138, 43, 226, 0.5)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      </motion.div>
    );
  };

  // Don't render on server or before mounting
  if (!isMounted) return null;

  const cursorStyle = getCursorStyle();

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        style={cursorStyle.main}
        animate={{ x: springX, y: springY }}
        transition={{
          type: 'spring',
          ...springConfig,
        }}
      />
      
      {/* Trail effect */}
      {cursorStyle.trail && renderTrail()}
      
      {/* Particles effect */}
      {cursorStyle.particles && renderParticles()}
      
      {/* Glow effect */}
      {cursorStyle.glow && renderGlow()}
      
      {/* Cube effect */}
      {cursorStyle.cube && renderCube()}
      
      {/* Holographic effect */}
      {cursorStyle.holographic && renderHolographic()}
      
      {/* Professional effect */}
      {cursorStyle.professional && renderProfessional()}
      
      {/* Magnetic effect */}
      {cursorStyle.magnetic && renderMagnetic()}
      
      {/* Ink effect */}
      {cursorStyle.ink && renderInk()}
    </>
  );
};

export default AdvancedCursor;
