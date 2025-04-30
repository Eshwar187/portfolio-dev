'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <motion.div
        className="text-2xl font-bold flex items-center"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center transform rotate-45 overflow-hidden">
            <motion.div
              className="text-white font-bold text-xl transform -rotate-45"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [-45, -45, -45]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              JE
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-500/50"
              animate={{ 
                opacity: [0, 0.5, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear" 
              }}
            />
          </div>
        </div>
        <motion.span 
          className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "linear" 
          }}
          style={{ backgroundSize: '200% 200%' }}
        >
          J.Eshwar
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default Logo;
