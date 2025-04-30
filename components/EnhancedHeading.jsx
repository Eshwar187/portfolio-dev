'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const EnhancedHeading = ({ 
  children, 
  level = 2, 
  className = '', 
  gradient = true,
  animate = true,
  delay = 0,
  id = ''
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Base styles for all headings
  const baseStyles = "font-bold relative z-10 mb-16 text-center";
  
  // Size classes based on heading level
  const sizeClasses = {
    1: "text-5xl md:text-7xl",
    2: "text-4xl md:text-6xl",
    3: "text-3xl md:text-5xl",
    4: "text-2xl md:text-4xl",
    5: "text-xl md:text-3xl",
    6: "text-lg md:text-2xl",
  };
  
  // Combine all classes
  const headingClasses = `${baseStyles} ${sizeClasses[level]} ${className}`;
  
  // Create the heading element based on level
  const HeadingTag = `h${level}`;
  
  // Gradient text effect
  const gradientText = gradient ? (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 relative z-10">
      {children}
    </span>
  ) : children;
  
  // Animation variants
  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Don't animate on server
  if (!isMounted) {
    return (
      <HeadingTag className={headingClasses} id={id}>
        {gradientText}
      </HeadingTag>
    );
  }
  
  return (
    <div className="relative">
      {/* Enhanced glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl mx-auto">
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Main heading with animation */}
      <motion.div
        className="relative"
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        <HeadingTag className={headingClasses} id={id}>
          {gradientText}
        </HeadingTag>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute left-1/2 -bottom-6 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 -translate-x-1/2"
          animate={{
            width: ['6rem', '12rem', '6rem'],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default EnhancedHeading;
