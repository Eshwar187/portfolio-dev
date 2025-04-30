'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const BasicCursor = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHidden(false);
    
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  if (!mounted || hidden) return null;

  // Different cursor styles for each page
  let cursorStyle = {};
  let ringStyle = {};

  // Home page - Neon cursor
  if (pathname === '/') {
    cursorStyle = {
      backgroundColor: clicked ? 'rgba(255, 0, 255, 0.5)' : 'rgba(138, 43, 226, 0.5)',
      boxShadow: clicked 
        ? '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.4)' 
        : '0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(138, 43, 226, 0.4)',
      width: linkHovered ? '50px' : '20px',
      height: linkHovered ? '50px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid ${clicked ? 'rgba(255, 0, 255, 0.5)' : 'rgba(138, 43, 226, 0.3)'}`,
      width: linkHovered ? '80px' : '40px',
      height: linkHovered ? '80px' : '40px',
    };
  } 
  // About page - Cubic cursor
  else if (pathname === '/about') {
    cursorStyle = {
      backgroundColor: 'rgba(138, 43, 226, 0.5)',
      borderRadius: '10px',
      width: linkHovered ? '40px' : '20px',
      height: linkHovered ? '40px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid rgba(138, 43, 226, 0.3)`,
      borderRadius: '10px',
      width: linkHovered ? '70px' : '40px',
      height: linkHovered ? '70px' : '40px',
    };
  }
  // Projects page - Holographic cursor
  else if (pathname === '/projects') {
    cursorStyle = {
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(138,43,226,0.5) 70%)',
      width: linkHovered ? '40px' : '20px',
      height: linkHovered ? '40px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid rgba(255, 255, 255, 0.3)`,
      width: linkHovered ? '70px' : '40px',
      height: linkHovered ? '70px' : '40px',
    };
  }
  // LinkedIn page - Professional cursor
  else if (pathname === '/linkedin') {
    cursorStyle = {
      backgroundColor: 'rgba(10, 102, 194, 0.7)',
      width: linkHovered ? '40px' : '20px',
      height: linkHovered ? '40px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid rgba(10, 102, 194, 0.3)`,
      width: linkHovered ? '70px' : '40px',
      height: linkHovered ? '70px' : '40px',
    };
  }
  // Contact page - Magnetic cursor
  else if (pathname === '/contact') {
    cursorStyle = {
      backgroundColor: 'rgba(138, 43, 226, 0.5)',
      width: linkHovered ? '50px' : '20px',
      height: linkHovered ? '50px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid rgba(138, 43, 226, 0.3)`,
      width: linkHovered ? '80px' : '50px',
      height: linkHovered ? '80px' : '50px',
    };
  }
  // Blog page - Ink cursor
  else if (pathname === '/blog') {
    cursorStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: `2px solid rgba(138, 43, 226, 0.8)`,
      width: linkHovered ? '40px' : '20px',
      height: linkHovered ? '40px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid rgba(138, 43, 226, 0.3)`,
      width: linkHovered ? '70px' : '40px',
      height: linkHovered ? '70px' : '40px',
    };
  }
  // Default cursor
  else {
    cursorStyle = {
      backgroundColor: 'rgba(138, 43, 226, 0.5)',
      width: linkHovered ? '40px' : '20px',
      height: linkHovered ? '40px' : '20px',
    };
    
    ringStyle = {
      border: `1px solid rgba(138, 43, 226, 0.3)`,
      width: linkHovered ? '70px' : '40px',
      height: linkHovered ? '70px' : '40px',
    };
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - (parseInt(cursorStyle.width) / 2),
          y: position.y - (parseInt(cursorStyle.height) / 2),
          scale: clicked ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
        style={cursorStyle}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40"
        animate={{
          x: position.x - (parseInt(ringStyle.width) / 2),
          y: position.y - (parseInt(ringStyle.height) / 2),
          scale: clicked ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
          mass: 0.8,
        }}
        style={ringStyle}
      />
      
      {/* Home page trail effect */}
      {pathname === '/' && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 rounded-full pointer-events-none z-30"
              style={{
                width: 10 - i * 2,
                height: 10 - i * 2,
                backgroundColor: 'rgba(138, 43, 226, 0.5)',
                opacity: 0.5 - i * 0.1,
              }}
              animate={{
                x: position.x - (10 - i * 2) / 2,
                y: position.y - (10 - i * 2) / 2,
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.5,
                delay: i * 0.05,
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default BasicCursor;
