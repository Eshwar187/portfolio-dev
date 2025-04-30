'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const SimpleCursor = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Only run on client side
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

  // Get cursor style based on current page
  const getCursorStyle = () => {
    const baseStyle = {
      left: position.x,
      top: position.y,
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9999,
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s, opacity 0.3s',
      mixBlendMode: 'difference',
      opacity: hidden ? 0 : 1,
    };

    // Different cursor styles for each page
    switch (pathname) {
      case '/':
        // Home page - Glowing dot with ring
        return {
          ...baseStyle,
          width: linkHovered ? '50px' : '20px',
          height: linkHovered ? '50px' : '20px',
          backgroundColor: clicked ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)',
          border: `2px solid ${clicked ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.5)'}`,
          borderRadius: '50%',
          boxShadow: clicked 
            ? '0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(138, 43, 226, 0.4)' 
            : '0 0 10px rgba(138, 43, 226, 0.5)',
        };
      
      case '/about':
        // About page - Square cursor
        return {
          ...baseStyle,
          width: linkHovered ? '40px' : '15px',
          height: linkHovered ? '40px' : '15px',
          backgroundColor: 'transparent',
          border: `2px solid ${clicked ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.5)'}`,
          borderRadius: '5px',
          boxShadow: clicked 
            ? '0 0 15px rgba(138, 43, 226, 0.8)' 
            : '0 0 5px rgba(138, 43, 226, 0.5)',
        };
      
      case '/projects':
        // Projects page - Diamond cursor
        return {
          ...baseStyle,
          width: linkHovered ? '40px' : '20px',
          height: linkHovered ? '40px' : '20px',
          backgroundColor: 'transparent',
          border: `2px solid ${clicked ? 'rgba(255, 0, 128, 0.8)' : 'rgba(255, 0, 128, 0.5)'}`,
          borderRadius: '0',
          transform: `translate(-50%, -50%) rotate(45deg) scale(${clicked ? 1.2 : 1})`,
          boxShadow: clicked 
            ? '0 0 15px rgba(255, 0, 128, 0.8)' 
            : '0 0 5px rgba(255, 0, 128, 0.5)',
        };
      
      case '/linkedin':
        // LinkedIn page - Professional cursor
        return {
          ...baseStyle,
          width: linkHovered ? '40px' : '20px',
          height: linkHovered ? '40px' : '20px',
          backgroundColor: clicked ? 'rgba(10, 102, 194, 0.3)' : 'transparent',
          border: `2px solid ${clicked ? 'rgba(10, 102, 194, 0.8)' : 'rgba(10, 102, 194, 0.5)'}`,
          borderRadius: '50%',
          boxShadow: clicked 
            ? '0 0 15px rgba(10, 102, 194, 0.8)' 
            : '0 0 5px rgba(10, 102, 194, 0.5)',
        };
      
      case '/contact':
        // Contact page - Pulse cursor
        return {
          ...baseStyle,
          width: linkHovered ? '50px' : '20px',
          height: linkHovered ? '50px' : '20px',
          backgroundColor: 'transparent',
          border: `2px solid ${clicked ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.5)'}`,
          borderRadius: '50%',
          boxShadow: clicked 
            ? '0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(138, 43, 226, 0.4)' 
            : '0 0 10px rgba(138, 43, 226, 0.5)',
        };
      
      case '/blog':
        // Blog page - Text cursor
        return {
          ...baseStyle,
          width: linkHovered ? '40px' : '3px',
          height: linkHovered ? '40px' : '25px',
          backgroundColor: clicked ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
          borderRadius: linkHovered ? '50%' : '1px',
          boxShadow: clicked 
            ? '0 0 10px rgba(255, 255, 255, 0.8)' 
            : '0 0 5px rgba(255, 255, 255, 0.5)',
          border: linkHovered ? '2px solid rgba(138, 43, 226, 0.5)' : 'none',
        };
      
      default:
        // Default cursor
        return {
          ...baseStyle,
          width: linkHovered ? '40px' : '20px',
          height: linkHovered ? '40px' : '20px',
          backgroundColor: clicked ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
          border: `2px solid ${clicked ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.5)'}`,
          borderRadius: '50%',
        };
    }
  };

  // Get outer ring style based on current page
  const getOuterRingStyle = () => {
    const baseStyle = {
      left: position.x,
      top: position.y,
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9998,
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.5s, height 0.5s, border-color 0.3s, opacity 0.3s',
      backgroundColor: 'transparent',
      opacity: hidden ? 0 : 0.5,
    };

    // Different outer ring styles for each page
    switch (pathname) {
      case '/':
        // Home page - Pulsing ring
        return {
          ...baseStyle,
          width: linkHovered ? '80px' : '40px',
          height: linkHovered ? '80px' : '40px',
          border: `1px solid ${clicked ? 'rgba(255, 0, 255, 0.5)' : 'rgba(138, 43, 226, 0.3)'}`,
          borderRadius: '50%',
        };
      
      case '/about':
        // About page - Square ring
        return {
          ...baseStyle,
          width: linkHovered ? '70px' : '35px',
          height: linkHovered ? '70px' : '35px',
          border: `1px solid ${clicked ? 'rgba(255, 0, 255, 0.5)' : 'rgba(138, 43, 226, 0.3)'}`,
          borderRadius: '10px',
        };
      
      case '/projects':
        // Projects page - Diamond ring
        return {
          ...baseStyle,
          width: linkHovered ? '70px' : '40px',
          height: linkHovered ? '70px' : '40px',
          border: `1px solid ${clicked ? 'rgba(255, 0, 128, 0.5)' : 'rgba(255, 0, 128, 0.3)'}`,
          borderRadius: '0',
          transform: 'translate(-50%, -50%) rotate(45deg)',
        };
      
      case '/linkedin':
        // LinkedIn page - Professional ring
        return {
          ...baseStyle,
          width: linkHovered ? '70px' : '40px',
          height: linkHovered ? '70px' : '40px',
          border: `1px solid ${clicked ? 'rgba(10, 102, 194, 0.5)' : 'rgba(10, 102, 194, 0.3)'}`,
          borderRadius: '50%',
        };
      
      case '/contact':
        // Contact page - Pulse ring
        return {
          ...baseStyle,
          width: linkHovered ? '80px' : '50px',
          height: linkHovered ? '80px' : '50px',
          border: `1px solid ${clicked ? 'rgba(255, 0, 255, 0.5)' : 'rgba(138, 43, 226, 0.3)'}`,
          borderRadius: '50%',
        };
      
      case '/blog':
        // Blog page - Text cursor ring
        return linkHovered ? {
          ...baseStyle,
          width: '70px',
          height: '70px',
          border: '1px solid rgba(138, 43, 226, 0.3)',
          borderRadius: '50%',
        } : { display: 'none' };
      
      default:
        // Default ring
        return {
          ...baseStyle,
          width: linkHovered ? '70px' : '40px',
          height: linkHovered ? '70px' : '40px',
          border: `1px solid ${clicked ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: '50%',
        };
    }
  };

  // Get page-specific animation
  const getPageAnimation = () => {
    if (hidden) return null;
    
    // Different animations for each page
    switch (pathname) {
      case '/':
        // Home page - Trailing dots
        return (
          <div className="trail-container" style={{ position: 'fixed', zIndex: 9997, pointerEvents: 'none' }}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'fixed',
                  left: position.x,
                  top: position.y,
                  width: 10 - i * 2,
                  height: 10 - i * 2,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(138, 43, 226, 0.5)',
                  zIndex: 9997 - i,
                  pointerEvents: 'none',
                  opacity: 0.5 - i * 0.1,
                }}
                animate={{
                  x: -i * 5,
                  y: -i * 5,
                }}
                transition={{
                  duration: 0.1,
                  ease: 'linear',
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        );
      
      case '/about':
        // About page - 3D shadow
        return clicked ? (
          <motion.div
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              width: 30,
              height: 30,
              borderRadius: '10px',
              backgroundColor: 'rgba(138, 43, 226, 0.2)',
              zIndex: 9997,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: [0.5, 0],
              scale: [1, 2],
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div style={getCursorStyle()} />
      
      {/* Outer ring */}
      <div style={getOuterRingStyle()} />
      
      {/* Page-specific animation */}
      {getPageAnimation()}
    </>
  );
};

export default SimpleCursor;
