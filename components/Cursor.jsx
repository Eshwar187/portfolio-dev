'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Cursor = () => {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMounted, setIsMounted] = useState(false);

  // Track mouse position
  useEffect(() => {
    setIsMounted(true);
    
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Handle element interactions
  useEffect(() => {
    if (!isMounted) return;
    
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
    const buttonElements = document.querySelectorAll('button, a');
    const imageElements = document.querySelectorAll('img');

    const mouseEnterText = () => setCursorVariant('text');
    const mouseEnterButton = () => setCursorVariant('button');
    const mouseEnterImage = () => setCursorVariant('image');
    const mouseLeave = () => setCursorVariant('default');

    textElements.forEach((element) => {
      element.addEventListener('mouseenter', mouseEnterText);
      element.addEventListener('mouseleave', mouseLeave);
    });

    buttonElements.forEach((element) => {
      element.addEventListener('mouseenter', mouseEnterButton);
      element.addEventListener('mouseleave', mouseLeave);
    });

    imageElements.forEach((element) => {
      element.addEventListener('mouseenter', mouseEnterImage);
      element.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      textElements.forEach((element) => {
        element.removeEventListener('mouseenter', mouseEnterText);
        element.removeEventListener('mouseleave', mouseLeave);
      });

      buttonElements.forEach((element) => {
        element.removeEventListener('mouseenter', mouseEnterButton);
        element.removeEventListener('mouseleave', mouseLeave);
      });

      imageElements.forEach((element) => {
        element.removeEventListener('mouseenter', mouseEnterImage);
        element.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, [isMounted]);

  // Get cursor variants based on current page
  const getCursorVariants = () => {
    // Home page - Neon glow cursor
    if (pathname === '/') {
      return {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          backgroundColor: 'rgba(138, 43, 226, 0.5)',
          boxShadow: '0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(138, 43, 226, 0.4)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        text: {
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          height: 150,
          width: 150,
          backgroundColor: 'rgba(138, 43, 226, 0.1)',
          mixBlendMode: 'difference',
        },
        button: {
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          height: 64,
          width: 64,
          backgroundColor: 'rgba(255, 0, 128, 0.6)',
          mixBlendMode: 'screen',
        },
        image: {
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          height: 80,
          width: 80,
          backgroundColor: 'rgba(0, 255, 255, 0.3)',
          mixBlendMode: 'screen',
        }
      };
    }
    
    // About page - Cubic cursor
    if (pathname === '/about') {
      return {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          backgroundColor: 'rgba(138, 43, 226, 0.5)',
          borderRadius: '10px',
          mixBlendMode: 'screen',
        },
        text: {
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          height: 150,
          width: 150,
          backgroundColor: 'rgba(138, 43, 226, 0.1)',
          borderRadius: '20px',
          mixBlendMode: 'difference',
        },
        button: {
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          height: 64,
          width: 64,
          backgroundColor: 'rgba(255, 0, 128, 0.6)',
          borderRadius: '15px',
          mixBlendMode: 'screen',
        },
        image: {
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          height: 80,
          width: 80,
          backgroundColor: 'rgba(0, 255, 255, 0.3)',
          borderRadius: '15px',
          mixBlendMode: 'screen',
        }
      };
    }
    
    // Projects page - Holographic cursor
    if (pathname === '/projects') {
      return {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(138,43,226,0.5) 70%)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        text: {
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          height: 150,
          width: 150,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(138,43,226,0.2) 70%)',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        },
        button: {
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          height: 64,
          width: 64,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,0,128,0.4) 70%)',
          boxShadow: '0 0 25px rgba(255, 0, 128, 0.6), inset 0 0 12px rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        image: {
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          height: 80,
          width: 80,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(0,255,255,0.3) 70%)',
          boxShadow: '0 0 25px rgba(0, 255, 255, 0.6), inset 0 0 12px rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        }
      };
    }
    
    // LinkedIn page - Professional cursor
    if (pathname === '/linkedin') {
      return {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          backgroundColor: 'rgba(10, 102, 194, 0.7)',
          boxShadow: '0 0 20px rgba(10, 102, 194, 0.8)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        text: {
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          height: 150,
          width: 150,
          backgroundColor: 'rgba(10, 102, 194, 0.1)',
          boxShadow: '0 0 30px rgba(10, 102, 194, 0.3)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        },
        button: {
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          height: 64,
          width: 64,
          backgroundColor: 'rgba(10, 102, 194, 0.7)',
          boxShadow: '0 0 20px rgba(10, 102, 194, 0.8)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        image: {
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          height: 80,
          width: 80,
          backgroundColor: 'rgba(10, 102, 194, 0.3)',
          boxShadow: '0 0 20px rgba(10, 102, 194, 0.5)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        }
      };
    }
    
    // Contact page - Magnetic cursor
    if (pathname === '/contact') {
      return {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          backgroundColor: 'rgba(138, 43, 226, 0.5)',
          boxShadow: '0 0 20px rgba(138, 43, 226, 0.8)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        text: {
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          height: 150,
          width: 150,
          backgroundColor: 'rgba(255, 0, 255, 0.1)',
          boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        },
        button: {
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          height: 64,
          width: 64,
          backgroundColor: 'rgba(255, 0, 128, 0.6)',
          boxShadow: '0 0 20px rgba(255, 0, 128, 0.8)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        },
        image: {
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          height: 80,
          width: 80,
          backgroundColor: 'rgba(0, 255, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        }
      };
    }
    
    // Blog page - Portal cursor
    if (pathname === '/blog') {
      return {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          height: 32,
          width: 32,
          borderRadius: '50%',
          border: '3px solid rgba(138, 43, 226, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: 'inset 0 0 15px rgba(138, 43, 226, 0.8), 0 0 15px rgba(138, 43, 226, 0.5)',
          mixBlendMode: 'screen',
        },
        text: {
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          height: 150,
          width: 150,
          borderRadius: '50%',
          border: '3px solid rgba(255, 0, 255, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          boxShadow: 'inset 0 0 30px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)',
          mixBlendMode: 'difference',
        },
        button: {
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          height: 64,
          width: 64,
          borderRadius: '50%',
          border: '3px solid rgba(255, 0, 128, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: 'inset 0 0 20px rgba(255, 0, 128, 0.6), 0 0 15px rgba(255, 0, 128, 0.4)',
          mixBlendMode: 'screen',
        },
        image: {
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          height: 80,
          width: 80,
          borderRadius: '50%',
          border: '3px solid rgba(0, 255, 255, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.6), 0 0 15px rgba(0, 255, 255, 0.4)',
          mixBlendMode: 'screen',
        }
      };
    }
    
    // Default cursor for any other page
    return {
      default: {
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        height: 32,
        width: 32,
        backgroundColor: 'rgba(138, 43, 226, 0.5)',
        boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)',
        borderRadius: '50%',
      },
      text: {
        x: mousePosition.x - 75,
        y: mousePosition.y - 75,
        height: 150,
        width: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        mixBlendMode: 'difference',
      },
      button: {
        x: mousePosition.x - 32,
        y: mousePosition.y - 32,
        height: 64,
        width: 64,
        backgroundColor: 'rgba(255, 0, 128, 0.6)',
      },
      image: {
        x: mousePosition.x - 40,
        y: mousePosition.y - 40,
        height: 80,
        width: 80,
        backgroundColor: 'rgba(0, 255, 255, 0.3)',
      }
    };
  };

  // Get page-specific animations
  const getPageAnimations = () => {
    // Home page - Trailing effect
    if (pathname === '/') {
      return (
        <>
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={`trail-${index}`}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 998 - index,
                pointerEvents: 'none',
                height: 32 - index * 5,
                width: 32 - index * 5,
                borderRadius: '50%',
                opacity: 0.5 - index * 0.1,
                backgroundImage: 'linear-gradient(45deg, #8a2be2, #ff00ff)',
              }}
              animate={{
                x: mousePosition.x - (32 - index * 5) / 2,
                y: mousePosition.y - (32 - index * 5) / 2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
            />
          ))}
        </>
      );
    }
    
    // About page - 3D shadow
    if (pathname === '/about') {
      return (
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 997,
            pointerEvents: 'none',
            height: 40,
            width: 40,
            borderRadius: '10px',
            opacity: 0.3,
            backgroundColor: 'transparent',
            border: '2px solid rgba(138, 43, 226, 0.5)',
            boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)',
          }}
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            rotateX: [0, -45, 0, 45, 0],
            rotateY: [0, 45, 0, -45, 0],
          }}
          transition={{
            x: { type: 'spring', damping: 30, stiffness: 200 },
            y: { type: 'spring', damping: 30, stiffness: 200 },
            rotateX: { duration: 10, repeat: Infinity, ease: 'linear' },
            rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
          }}
        />
      );
    }
    
    // No special effects for other pages
    return null;
  };

  // Don't render on server or before mounting
  if (!isMounted) return null;

  return (
    <>
      {/* Page-specific animations */}
      {getPageAnimations()}
      
      {/* Main cursor */}
      <motion.div
        className="cursor"
        variants={getCursorVariants()}
        animate={cursorVariant}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 999,
          pointerEvents: 'none',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
      />
    </>
  );
};

export default Cursor;
