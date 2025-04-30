'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return children;
  }
  
  // Different animations for different pages
  const getPageAnimation = () => {
    switch (pathname) {
      case '/':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        };
      case '/about':
        return {
          initial: { opacity: 0, rotateX: 10, scale: 0.95 },
          animate: { opacity: 1, rotateX: 0, scale: 1 },
          exit: { opacity: 0, rotateX: -10, scale: 0.95 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        };
      case '/projects':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        };
      case '/linkedin':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        };
      case '/contact':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        };
      case '/blog':
        return {
          initial: { opacity: 0, filter: 'blur(10px)' },
          animate: { opacity: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, filter: 'blur(10px)' },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 }
        };
    }
  };
  
  return (
    <motion.div
      key={pathname}
      {...getPageAnimation()}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
