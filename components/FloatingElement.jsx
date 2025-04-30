'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FloatingElement = ({ children, delay = 0, duration = 4, distance = 15, className = '', style = {} }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className={className} style={style}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [0, -distance, 0, distance, 0],
        x: [0, distance/2, 0, -distance/2, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
