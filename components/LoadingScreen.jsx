'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const LoadingScreen = ({ children }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [animationVariant, setAnimationVariant] = useState(0);

  useEffect(() => {
    // Reset loading state when pathname changes
    setLoading(true);

    // Randomly select a new animation variant (0, 1, or 2)
    setAnimationVariant(Math.floor(Math.random() * 3));

    // Set a timeout to hide the loading screen after 4 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Default loading animation - Variant 1: Spinner
  const DefaultLoadingAnimation1 = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="mt-8 text-white text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
          >
            Loading...
          </motion.span>
        </motion.div>
      </div>
    );
  };

  // Default loading animation - Variant 2: Dots
  const DefaultLoadingAnimation2 = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="mt-8 text-white text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
          >
            Loading...
          </motion.span>
        </motion.div>
      </div>
    );
  };

  // Default loading animation - Variant 3: Pulse
  const DefaultLoadingAnimation3 = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border-2 border-purple-500"
              style={{
                width: `${(i + 1) * 40}px`,
                height: `${(i + 1) * 40}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.3,
              }}
            />
          ))}

          <motion.div
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-bold"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 0px rgba(138, 43, 226, 0)',
                '0 0 30px rgba(138, 43, 226, 0.7)',
                '0 0 0px rgba(138, 43, 226, 0)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <span>J</span>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-white text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
          >
            Loading...
          </motion.span>
        </motion.div>
      </div>
    );
  };

  // Get loading animation based on current page and variant
  const getLoadingAnimation = () => {
    switch (pathname) {
      case '/':
        return animationVariant === 0 ? <HomeLoadingAnimation1 /> :
               animationVariant === 1 ? <HomeLoadingAnimation2 /> :
               <HomeLoadingAnimation3 />;
      case '/about':
        return animationVariant === 0 ? <AboutLoadingAnimation1 /> :
               animationVariant === 1 ? <AboutLoadingAnimation2 /> :
               <AboutLoadingAnimation3 />;
      case '/projects':
        return animationVariant === 0 ? <ProjectsLoadingAnimation1 /> :
               animationVariant === 1 ? <ProjectsLoadingAnimation2 /> :
               <ProjectsLoadingAnimation3 />;
      case '/contact':
        return animationVariant === 0 ? <ContactLoadingAnimation1 /> :
               animationVariant === 1 ? <ContactLoadingAnimation2 /> :
               <ContactLoadingAnimation3 />;
      case '/linkedin':
        return animationVariant === 0 ? <LinkedInLoadingAnimation1 /> :
               animationVariant === 1 ? <LinkedInLoadingAnimation2 /> :
               <LinkedInLoadingAnimation3 />;
      case '/blog':
        return animationVariant === 0 ? <BlogLoadingAnimation1 /> :
               animationVariant === 1 ? <BlogLoadingAnimation2 /> :
               <BlogLoadingAnimation3 />;
      default:
        return animationVariant === 0 ? <DefaultLoadingAnimation1 /> :
               animationVariant === 1 ? <DefaultLoadingAnimation2 /> :
               <DefaultLoadingAnimation3 />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            {getLoadingAnimation()}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

// Home page loading animation - Variant 1: Cosmic Portal
const HomeLoadingAnimation1 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border-2 border-purple-500"
          style={{
            width: `${(i + 1) * 50}px`,
            height: `${(i + 1) * 50}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 1.2],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5
          }}
        />
      ))}

      {/* Center portal */}
      <motion.div
        className="relative w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl z-10"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1, 1.2, 1],
          boxShadow: [
            '0 0 0 0 rgba(138, 43, 226, 0)',
            '0 0 20px 10px rgba(138, 43, 226, 0.7)',
            '0 0 40px 20px rgba(138, 43, 226, 0.5)',
            '0 0 20px 10px rgba(138, 43, 226, 0.7)',
          ]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          J
        </motion.span>
      </motion.div>

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-purple-500"
          initial={{
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{
            x: Math.random() > 0.5 ? [0, Math.random() * 200] : [0, Math.random() * -200],
            y: Math.random() > 0.5 ? [0, Math.random() * 200] : [0, Math.random() * -200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Home page loading animation - Variant 2: Particle Explosion
const HomeLoadingAnimation2 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Exploding particles */}
      {[...Array(40)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 50;
        const delay = Math.random() * 1;
        const duration = Math.random() * 2 + 2;

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: i % 3 === 0 ? '#8a2be2' : i % 3 === 1 ? '#ff00ff' : '#ffffff',
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: [0, Math.cos(angle) * distance],
              y: [0, Math.sin(angle) * distance],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.5,
            }}
          />
        );
      })}

      {/* Center element */}
      <motion.div
        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360],
          boxShadow: [
            '0 0 20px 0px rgba(138, 43, 226, 0.7)',
            '0 0 60px 20px rgba(138, 43, 226, 0.7)',
            '0 0 20px 0px rgba(138, 43, 226, 0.7)',
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <motion.span
          className="text-white text-4xl font-bold"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          J
        </motion.span>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Home page loading animation - Variant 3: Neon Grid
const HomeLoadingAnimation3 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Grid background */}
      <motion.div
        className="absolute w-screen h-screen"
        style={{
          background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2) 1px, transparent 1px), linear-gradient(rgba(138, 43, 226, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Neon lines */}
      {[...Array(4)].map((_, i) => {
        const rotation = i * 90;
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-purple-500 to-pink-500"
            style={{
              width: '100vw',
              height: '2px',
              transformOrigin: 'center',
              transform: `rotate(${rotation}deg)`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              boxShadow: [
                '0 0 10px 0px rgba(138, 43, 226, 0.7)',
                '0 0 30px 5px rgba(138, 43, 226, 0.7)',
                '0 0 10px 0px rgba(138, 43, 226, 0.7)',
              ]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        );
      })}

      {/* Center logo */}
      <motion.div
        className="relative w-32 h-32 rounded-lg bg-black border-2 border-purple-500 flex items-center justify-center overflow-hidden"
        animate={{
          rotate: [0, 360],
          boxShadow: [
            '0 0 20px 0px rgba(138, 43, 226, 0.7)',
            '0 0 60px 20px rgba(138, 43, 226, 0.7)',
            '0 0 20px 0px rgba(138, 43, 226, 0.7)',
          ]
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
        }}
      >
        {/* Neon scan line */}
        <motion.div
          className="absolute w-full h-4 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{
            y: [-64, 64],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.span
          className="text-white text-5xl font-bold z-10"
          animate={{
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
            textShadow: [
              '0 0 5px rgba(138, 43, 226, 0.7)',
              '0 0 20px rgba(255, 0, 255, 0.7)',
              '0 0 5px rgba(138, 43, 226, 0.7)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          J
        </motion.span>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
          }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
};

// About page loading animation - Variant 1: DNA Helix
const AboutLoadingAnimation1 = () => {
  // Predefined DNA strand positions
  const dnaPositions = [
    { leftX: 50, rightX: -50, yPos: 0 },
    { leftX: 43.3, rightX: -43.3, yPos: 10 },
    { leftX: 25, rightX: -25, yPos: 20 },
    { leftX: 0, rightX: 0, yPos: 30 },
    { leftX: -25, rightX: 25, yPos: 40 },
    { leftX: -43.3, rightX: 43.3, yPos: 50 },
    { leftX: -50, rightX: 50, yPos: 60 },
    { leftX: -43.3, rightX: 43.3, yPos: 70 },
    { leftX: -25, rightX: 25, yPos: 80 },
    { leftX: 0, rightX: 0, yPos: 90 },
    { leftX: 25, rightX: -25, yPos: 100 },
    { leftX: 43.3, rightX: -43.3, yPos: 110 },
    { leftX: 50, rightX: -50, yPos: 120 },
    { leftX: 43.3, rightX: -43.3, yPos: 130 },
    { leftX: 25, rightX: -25, yPos: 140 },
    { leftX: 0, rightX: 0, yPos: 150 },
    { leftX: -25, rightX: 25, yPos: 160 },
    { leftX: -43.3, rightX: 43.3, yPos: 170 },
    { leftX: -50, rightX: 50, yPos: 180 },
    { leftX: -43.3, rightX: 43.3, yPos: 190 },
  ];

  // Skills with fixed positions
  const skills = [
    { name: 'Creativity', yPos: 40, side: -120 },
    { name: 'Problem Solving', yPos: 100, side: 120 },
    { name: 'Leadership', yPos: 160, side: -120 },
    { name: 'Communication', yPos: 220, side: 120 },
    { name: 'Teamwork', yPos: 280, side: -120 },
  ];

  // Predefined particle positions
  const particles = [
    { size: 3, x: -150, y: -120, color: '#8a2be2', duration: 8, delay: 0.2 },
    { size: 2, x: 180, y: 90, color: '#ff00ff', duration: 7, delay: 0.5 },
    { size: 4, x: -80, y: 150, color: '#8a2be2', duration: 9, delay: 0.8 },
    { size: 2.5, x: 120, y: -180, color: '#ff00ff', duration: 6, delay: 1.2 },
    { size: 3.5, x: -200, y: 50, color: '#8a2be2', duration: 8.5, delay: 1.5 },
    { size: 2, x: 90, y: 200, color: '#ff00ff', duration: 7.5, delay: 1.8 },
    { size: 3, x: -130, y: -90, color: '#8a2be2', duration: 9, delay: 2.1 },
    { size: 2.5, x: 160, y: -50, color: '#ff00ff', duration: 8, delay: 2.4 },
    { size: 1.5, x: -70, y: 180, color: '#8a2be2', duration: 7, delay: 2.7 },
    { size: 3, x: 140, y: -150, color: '#ff00ff', duration: 9.5, delay: 3 },
    { size: 2, x: -180, y: -60, color: '#8a2be2', duration: 8, delay: 0.3 },
    { size: 3.5, x: 60, y: 170, color: '#ff00ff', duration: 7, delay: 0.6 },
    { size: 2.5, x: -100, y: -170, color: '#8a2be2', duration: 8.5, delay: 0.9 },
    { size: 3, x: 190, y: 30, color: '#ff00ff', duration: 9, delay: 1.2 },
    { size: 2, x: -160, y: 120, color: '#8a2be2', duration: 7.5, delay: 1.5 },
  ];

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* DNA Helix */}
      <div className="relative h-96 w-40">
        {/* DNA strands */}
        {dnaPositions.map((pos, i) => {
          return (
            <motion.div key={`strand-${i}`} className="absolute w-full">
              {/* Left DNA segment */}
              <motion.div
                className="absolute h-3 w-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
                style={{
                  left: `calc(50% + ${pos.leftX}px)`,
                  top: pos.yPos,
                  transform: 'translateX(-100%)',
                  opacity: 0.8,
                }}
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(138, 43, 226, 0.3)',
                    '0 0 15px rgba(138, 43, 226, 0.7)',
                    '0 0 5px rgba(138, 43, 226, 0.3)',
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.1 },
                }}
              />

              {/* Right DNA segment */}
              <motion.div
                className="absolute h-3 w-20 rounded-full bg-gradient-to-r from-pink-400 to-pink-600"
                style={{
                  left: `calc(50% + ${pos.rightX}px)`,
                  top: pos.yPos,
                  opacity: 0.8,
                }}
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(255, 0, 255, 0.3)',
                    '0 0 15px rgba(255, 0, 255, 0.7)',
                    '0 0 5px rgba(255, 0, 255, 0.3)',
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.1 },
                }}
              />

              {/* Connecting segment */}
              {i % 3 === 0 && (
                <motion.div
                  className="absolute h-1 bg-white/50"
                  style={{
                    left: `calc(50% + ${pos.leftX}px)`,
                    top: pos.yPos + 1,
                    width: `${Math.abs(pos.rightX - pos.leftX) + 20}px`,
                    transform: pos.leftX > pos.rightX ? 'translateX(-100%)' : 'none',
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    opacity: { duration: 1.5, repeat: Infinity, repeatType: "loop", delay: i * 0.1 },
                  }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Rotating DNA */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* DNA labels - skills */}
        {skills.map((skill, i) => {
          return (
            <motion.div
              key={`skill-${i}`}
              className="absolute bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/50"
              style={{
                left: `calc(50% + ${skill.side}px)`,
                top: skill.yPos,
                transform: skill.side < 0 ? 'translateX(-100%)' : 'none',
              }}
              animate={{
                x: [0, skill.side < 0 ? -10 : 10, 0],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 5px rgba(138, 43, 226, 0.3)',
                  '0 0 15px rgba(138, 43, 226, 0.7)',
                  '0 0 5px rgba(138, 43, 226, 0.3)',
                ]
              }}
              transition={{
                x: { duration: 3, repeat: Infinity, repeatType: "loop", delay: i * 0.5 },
                opacity: { duration: 3, repeat: Infinity, repeatType: "loop", delay: i * 0.5 },
                boxShadow: { duration: 3, repeat: Infinity, repeatType: "loop", delay: i * 0.5 },
              }}
            >
              <span className="text-white font-medium">{skill.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Floating particles with predefined positions */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: '50%',
            top: '50%',
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: [particle.x, particle.x + 30, particle.x],
            y: [particle.y, particle.y - 20, particle.y],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Analyzing Profile DNA...
        </motion.span>
      </motion.div>
    </div>
  );
};

// About page loading animation - Variant 2: Floating Skills
const AboutLoadingAnimation2 = () => {
  const skills = ['React', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'TypeScript'];

  return (
    <div className="relative flex items-center justify-center">
      {/* Floating skill bubbles */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={`skill-${i}`}
            className="absolute rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-500/50 flex items-center justify-center px-4 py-2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.1, 1],
              opacity: [0, 1],
              boxShadow: [
                '0 0 0px rgba(138, 43, 226, 0)',
                '0 0 20px rgba(138, 43, 226, 0.7)',
                '0 0 0px rgba(138, 43, 226, 0)',
              ]
            }}
            transition={{
              scale: { duration: 0.5, delay: i * 0.1 },
              opacity: { duration: 0.5, delay: i * 0.1 },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.1 }
            }}
          >
            <span className="text-white font-medium">{skill}</span>
          </motion.div>
        );
      })}

      {/* Rotating ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 border-dashed border-purple-500/50"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Center element */}
      <motion.div
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 0.9, 1],
          boxShadow: [
            '0 0 20px rgba(138, 43, 226, 0.5)',
            '0 0 40px rgba(138, 43, 226, 0.7)',
            '0 0 20px rgba(138, 43, 226, 0.5)',
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <motion.span
          className="text-white text-2xl font-bold"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          About
        </motion.span>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Skills...
        </motion.span>
      </motion.div>
    </div>
  );
};

// About page loading animation - Variant 3: Timeline
const AboutLoadingAnimation3 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Timeline */}
      <div className="relative h-80 w-4">
        {/* Timeline line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-purple-500 -translate-x-1/2"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Timeline nodes */}
        {[...Array(4)].map((_, i) => {
          const top = `${(i + 1) * 20}%`;

          return (
            <motion.div
              key={`node-${i}`}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500"
              style={{ top }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 1.5, 1],
                opacity: [0, 1],
                boxShadow: [
                  '0 0 0px rgba(255, 0, 255, 0)',
                  '0 0 20px rgba(255, 0, 255, 0.7)',
                  '0 0 0px rgba(255, 0, 255, 0)',
                ]
              }}
              transition={{
                scale: { duration: 0.5, delay: 0.5 + i * 0.3 },
                opacity: { duration: 0.5, delay: 0.5 + i * 0.3 },
                boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.3 }
              }}
            />
          );
        })}

        {/* Timeline content */}
        {[...Array(4)].map((_, i) => {
          const top = `${(i + 1) * 20}%`;
          const side = i % 2 === 0 ? 'left' : 'right';
          const translateX = side === 'left' ? '-120%' : '20%';

          return (
            <motion.div
              key={`content-${i}`}
              className={`absolute w-32 h-12 bg-black/30 backdrop-blur-sm border border-purple-500/50 rounded-lg flex items-center justify-center`}
              style={{
                top,
                left: '50%',
                transform: `translate(${translateX}, -50%)`,
              }}
              initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
              animate={{
                opacity: [0, 1],
                x: 0,
                boxShadow: [
                  '0 0 0px rgba(138, 43, 226, 0)',
                  '0 0 10px rgba(138, 43, 226, 0.5)',
                  '0 0 0px rgba(138, 43, 226, 0)',
                ]
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.7 + i * 0.3 },
                x: { duration: 0.5, delay: 0.7 + i * 0.3 },
                boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.3 }
              }}
            >
              <motion.div
                className="w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1, delay: 0.9 + i * 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Title */}
      <motion.div
        className="absolute top-10 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        My Journey
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Timeline...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Projects page loading animation - Variant 1: Holographic Cards
const ProjectsLoadingAnimation1 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Holographic cards */}
      <div className="flex space-x-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`card-${i}`}
            className="w-24 h-32 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              rotateY: [0, 10, 0, -10, 0],
              rotateX: [0, 5, 0, -5, 0],
            }}
            transition={{
              y: { duration: 0.5, delay: i * 0.2 },
              opacity: { duration: 0.5, delay: i * 0.2 },
              rotateY: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2
              },
              rotateX: {
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2
              }
            }}
          >
            {/* Holographic overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
              animate={{
                backgroundPosition: ['200% 200%', '-100% -100%', '200% 200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2
              }}
              style={{ backgroundSize: '200% 200%' }}
            />

            {/* Card content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <motion.div
                className="w-8 h-8 rounded-full bg-white/30 mb-2 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", delay: i * 0.2 }}
              >
                <span className="text-lg">
                  {i === 0 ? '🚀' : i === 1 ? '💻' : '🎨'}
                </span>
              </motion.div>
              <div className="w-full h-2 bg-white/20 rounded-full mb-1" />
              <div className="w-3/4 h-2 bg-white/20 rounded-full mb-1" />
              <div className="w-1/2 h-2 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Holographic circle */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-white/10"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)' }}
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
        }}
      />

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Projects...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Projects page loading animation - Variant 2: Code Editor
const ProjectsLoadingAnimation2 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Code editor window */}
      <motion.div
        className="relative w-96 h-64 bg-gray-900 rounded-lg overflow-hidden border border-purple-500/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 0px rgba(138, 43, 226, 0)',
            '0 0 30px rgba(138, 43, 226, 0.5)',
            '0 0 0px rgba(138, 43, 226, 0)',
          ]
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
        }}
      >
        {/* Editor header */}
        <div className="h-8 bg-gray-800 flex items-center px-4 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 text-gray-400 text-sm">project.jsx</div>
        </div>

        {/* Editor content */}
        <div className="p-4 font-mono text-sm">
          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <span className="text-gray-500 mr-4">1</span>
            <span className="text-purple-400">import</span>
            <span className="text-white"> React </span>
            <span className="text-purple-400">from</span>
            <span className="text-green-400"> 'react'</span>
            <span className="text-white">;</span>
          </motion.div>

          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <span className="text-gray-500 mr-4">2</span>
            <span className="text-purple-400">import</span>
            <span className="text-white"> { '{' } motion { '}' } </span>
            <span className="text-purple-400">from</span>
            <span className="text-green-400"> 'framer-motion'</span>
            <span className="text-white">;</span>
          </motion.div>

          <motion.div
            className="flex mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <span className="text-gray-500 mr-4">3</span>
            <span className="text-white"></span>
          </motion.div>

          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            <span className="text-gray-500 mr-4">4</span>
            <span className="text-purple-400">const</span>
            <span className="text-blue-400"> Project </span>
            <span className="text-white">= () =&gt; {'{'}</span>
          </motion.div>

          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          >
            <span className="text-gray-500 mr-4">5</span>
            <span className="text-white">  </span>
            <span className="text-purple-400">return</span>
            <span className="text-white"> (</span>
          </motion.div>

          <motion.div
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          >
            <span className="text-gray-500 mr-4">6</span>
            <span className="text-white">    {'<'}</span>
            <span className="text-orange-400">motion.div</span>
            <span className="text-white">{'>'}</span>
          </motion.div>

          {/* Cursor */}
          <motion.div
            className="absolute h-4 w-2 bg-white"
            style={{ left: '190px', top: '160px' }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Projects...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Projects page loading animation - Variant 3: 3D Project Showcase
const ProjectsLoadingAnimation3 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* 3D rotating showcase */}
      <div className="perspective-1000">
        <motion.div
          className="relative w-80 h-80 transform-style-3d"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Project cards on each face */}
          {[...Array(4)].map((_, i) => {
            const rotation = i * 90;
            const translateZ = 160;

            return (
              <motion.div
                key={`project-${i}`}
                className="absolute w-64 h-64 bg-black/30 backdrop-blur-sm border border-purple-500/50 rounded-lg overflow-hidden"
                style={{
                  transform: `rotateY(${rotation}deg) translateZ(${translateZ}px)`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  boxShadow: [
                    '0 0 0px rgba(138, 43, 226, 0)',
                    '0 0 30px rgba(138, 43, 226, 0.5)',
                    '0 0 0px rgba(138, 43, 226, 0)',
                  ]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.2 },
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.5 }
                }}
              >
                {/* Project content */}
                <div className="p-6 flex flex-col items-center justify-center h-full">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    {i === 0 ? '🚀' : i === 1 ? '💻' : i === 2 ? '🎨' : '🔧'}
                  </motion.div>

                  <motion.div
                    className="w-full h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  />

                  <motion.div
                    className="w-3/4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.7 + i * 0.2 }}
                  />

                  <motion.div
                    className="w-1/2 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 1, delay: 0.9 + i * 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Projects...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Contact page loading animation - Variant 1: Futuristic Mail System
const ContactLoadingAnimation1 = () => {
  // Predefined digital particles
  const particles = [
    { size: 2, startX: 50, startY: 30, delay: 0.2, duration: 3 },
    { size: 3, startX: 300, startY: 100, delay: 0.5, duration: 4 },
    { size: 1.5, startX: 150, startY: 200, delay: 0.8, duration: 3.5 },
    { size: 2.5, startX: 250, startY: 50, delay: 1.1, duration: 2.5 },
    { size: 3, startX: 100, startY: 150, delay: 1.4, duration: 3.2 },
    { size: 2, startX: 350, startY: 180, delay: 1.7, duration: 2.8 },
    { size: 1.5, startX: 200, startY: 80, delay: 0.3, duration: 3.3 },
    { size: 2.5, startX: 80, startY: 220, delay: 0.6, duration: 2.7 },
    { size: 3, startX: 320, startY: 120, delay: 0.9, duration: 3.8 },
    { size: 2, startX: 180, startY: 40, delay: 1.2, duration: 2.9 },
    { size: 1.5, startX: 280, startY: 190, delay: 1.5, duration: 3.1 },
    { size: 2.5, startX: 120, startY: 70, delay: 1.8, duration: 2.6 },
    { size: 3, startX: 220, startY: 230, delay: 0.4, duration: 3.4 },
    { size: 2, startX: 340, startY: 60, delay: 0.7, duration: 2.4 },
    { size: 1.5, startX: 160, startY: 170, delay: 1.0, duration: 3.7 },
  ];

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Circuit board pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.path
              d="M10,10 L90,10 L90,90 L10,90 Z M10,50 L40,50 M60,50 L90,50 M50,10 L50,40 M50,60 L50,90"
              fill="none"
              stroke="#8a2be2"
              strokeWidth="1"
              animate={{
                stroke: ['#8a2be2', '#ff00ff', '#8a2be2'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="5"
              fill="#8a2be2"
              animate={{
                fill: ['#8a2be2', '#ff00ff', '#8a2be2'],
                r: [5, 7, 5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Main animation container */}
      <div className="relative">
        {/* Envelope */}
        <motion.div
          className="relative w-96 h-64 bg-black/30 backdrop-blur-sm border border-purple-500/50 rounded-lg overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(138, 43, 226, 0.3)',
              '0 0 40px rgba(138, 43, 226, 0.6)',
              '0 0 20px rgba(138, 43, 226, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/30 to-transparent"
            style={{
              transformOrigin: 'top',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: [0, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>

          {/* Envelope content */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-black/50 rounded-lg border border-purple-500/30 p-6 flex flex-col items-center justify-center"
            animate={{
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
            }}
          >
            {/* Message header */}
            <div className="flex items-center mb-4 w-full">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mr-3"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 5px rgba(138, 43, 226, 0.3)',
                    '0 0 15px rgba(138, 43, 226, 0.7)',
                    '0 0 5px rgba(138, 43, 226, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <span className="text-white font-bold">J</span>
              </motion.div>
              <div>
                <motion.div
                  className="text-white font-medium"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  J Eshwar
                </motion.div>
                <div className="text-purple-400 text-xs">contact@jeshwar.dev</div>
              </div>
            </div>

            {/* Message body */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="w-full h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mb-3"
                initial={{ width: '0%' }}
                animate={{
                  width: ['0%', '100%'],
                  opacity: [0.5, 1],
                }}
                transition={{
                  width: { duration: 1, delay: i * 0.3 + 1, repeat: Infinity, repeatDelay: 3 },
                  opacity: { duration: 1, delay: i * 0.3 + 1, repeat: Infinity, repeatDelay: 3 },
                }}
              />
            ))}

            {/* Send button */}
            <motion.button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white text-sm font-medium"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 5px rgba(138, 43, 226, 0.3)',
                  '0 0 15px rgba(138, 43, 226, 0.7)',
                  '0 0 5px rgba(138, 43, 226, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 2,
              }}
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Digital particles with predefined positions */}
          {particles.map((particle, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: i % 2 === 0 ? '#8a2be2' : '#ff00ff',
                left: particle.startX,
                top: particle.startY,
              }}
              animate={{
                left: [particle.startX, 192],
                top: [particle.startY, 128],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "loop",
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Scanning beam */}
        <motion.div
          className="absolute left-1/2 top-0 w-1 h-64 bg-gradient-to-b from-transparent via-purple-500 to-transparent -translate-x-1/2"
          animate={{
            opacity: [0, 1, 0],
            left: ['30%', '70%', '30%'],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, repeatType: "loop" },
            left: { duration: 4, repeat: Infinity, repeatType: "loop" },
          }}
        />

        {/* Connection lines */}
        {[...Array(3)].map((_, i) => {
          const height = 100 + i * 50;
          const width = 300 + i * 50;

          return (
            <motion.div
              key={`connection-${i}`}
              className="absolute border border-purple-500/30 rounded-lg"
              style={{
                height: height,
                width: width,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                borderColor: ['rgba(138, 43, 226, 0.3)', 'rgba(255, 0, 255, 0.5)', 'rgba(138, 43, 226, 0.3)'],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.5,
              }}
            />
          );
        })}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Preparing Secure Channel...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Contact page loading animation - Variant 2: Message Typing
const ContactLoadingAnimation2 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Chat bubble */}
      <motion.div
        className="relative w-96 h-64 bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/50 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 0px rgba(138, 43, 226, 0)',
            '0 0 30px rgba(138, 43, 226, 0.5)',
            '0 0 0px rgba(138, 43, 226, 0)',
          ]
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
        }}
      >
        {/* Chat header */}
        <div className="flex items-center mb-4">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-lg mr-3"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            J
          </motion.div>
          <div>
            <div className="text-white font-medium">J Eshwar</div>
            <div className="text-gray-400 text-xs">Online</div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="space-y-4">
          {/* Incoming message */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-purple-900/50 rounded-lg p-3 max-w-[80%]">
              <div className="text-white text-sm">Hello! How can I help you?</div>
            </div>
          </motion.div>

          {/* Typing indicator */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="bg-pink-900/50 rounded-lg p-3 flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Message input */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800/50 rounded-full py-2 px-4 text-white text-sm focus:outline-none border border-purple-500/30"
              placeholder="Type your message..."
              disabled
            />
            <motion.button
              className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full w-8 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Chat...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Contact page loading animation - Variant 3: Form Builder
const ContactLoadingAnimation3 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Form container */}
      <motion.div
        className="relative w-96 bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/50 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 0px rgba(138, 43, 226, 0)',
            '0 0 30px rgba(138, 43, 226, 0.5)',
            '0 0 0px rgba(138, 43, 226, 0)',
          ]
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
        }}
      >
        {/* Form title */}
        <motion.div
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contact Form
        </motion.div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Name field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-1">Name</label>
            <motion.div
              className="w-full h-10 bg-gray-800/50 rounded-md border border-purple-500/30"
              animate={{
                borderColor: [
                  'rgba(138, 43, 226, 0.3)',
                  'rgba(138, 43, 226, 0.6)',
                  'rgba(138, 43, 226, 0.3)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>

          {/* Email field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
            <motion.div
              className="w-full h-10 bg-gray-800/50 rounded-md border border-purple-500/30"
              animate={{
                borderColor: [
                  'rgba(138, 43, 226, 0.3)',
                  'rgba(138, 43, 226, 0.6)',
                  'rgba(138, 43, 226, 0.3)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.3,
              }}
            />
          </motion.div>

          {/* Message field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-1">Message</label>
            <motion.div
              className="w-full h-24 bg-gray-800/50 rounded-md border border-purple-500/30"
              animate={{
                borderColor: [
                  'rgba(138, 43, 226, 0.3)',
                  'rgba(138, 43, 226, 0.6)',
                  'rgba(138, 43, 226, 0.3)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.6,
              }}
            />
          </motion.div>

          {/* Submit button */}
          <motion.div
            className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md flex items-center justify-center text-white font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                '0 0 0px rgba(138, 43, 226, 0)',
                '0 0 20px rgba(138, 43, 226, 0.5)',
                '0 0 0px rgba(138, 43, 226, 0)',
              ]
            }}
            transition={{
              opacity: { duration: 0.5, delay: 1 },
              y: { duration: 0.5, delay: 1 },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
            }}
          >
            Send Message
          </motion.div>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Form...
        </motion.span>
      </motion.div>
    </div>
  );
};

// LinkedIn page loading animation - Variant 1: Professional Network
const LinkedInLoadingAnimation1 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Network nodes */}
      <div className="relative w-80 h-80">
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;

          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-12 h-12 rounded-full bg-[#0a66c2] flex items-center justify-center text-white font-bold"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 1.2, 1],
                boxShadow: [
                  '0 0 0 rgba(10, 102, 194, 0)',
                  '0 0 20px rgba(10, 102, 194, 0.7)',
                  '0 0 0 rgba(10, 102, 194, 0)',
                ]
              }}
              transition={{
                scale: { duration: 0.5, delay: i * 0.2 },
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2
                }
              }}
            >
              {i === 0 ? 'in' : i === 1 ? 'E' : i === 2 ? 'S' : i === 3 ? 'H' : i === 4 ? 'W' : 'A'}
            </motion.div>
          );
        })}

        {/* Center node */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-[#0a66c2] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold text-2xl"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0 rgba(10, 102, 194, 0)',
              '0 0 30px rgba(10, 102, 194, 0.7)',
              '0 0 0 rgba(10, 102, 194, 0)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          J
        </motion.div>

        {/* Connection lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;

          return (
            <motion.div
              key={`line-${i}`}
              className="absolute top-1/2 left-1/2 h-0.5 bg-[#0a66c2] origin-left"
              style={{
                width: 100,
                transform: `rotate(${angle}rad)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1],
                opacity: [0, 1],
                backgroundColor: [
                  'rgba(10, 102, 194, 0.3)',
                  'rgba(10, 102, 194, 0.8)',
                  'rgba(10, 102, 194, 0.3)',
                ]
              }}
              transition={{
                scaleX: { duration: 0.5, delay: i * 0.2 },
                opacity: { duration: 0.5, delay: i * 0.2 },
                backgroundColor: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2
                }
              }}
            />
          );
        })}

        {/* Data packets */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;

          return (
            <motion.div
              key={`packet-${i}`}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white"
              animate={{
                x: [0, Math.cos(angle) * 100],
                y: [0, Math.sin(angle) * 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.3
              }}
            />
          );
        })}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Profile...
        </motion.span>
      </motion.div>
    </div>
  );
};

// LinkedIn page loading animation - Variant 2: Profile Card
const LinkedInLoadingAnimation2 = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Profile card */}
      <motion.div
        className="relative w-96 bg-black/30 backdrop-blur-sm rounded-lg border border-[#0a66c2]/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 0px rgba(10, 102, 194, 0)',
            '0 0 30px rgba(10, 102, 194, 0.5)',
            '0 0 0px rgba(10, 102, 194, 0)',
          ]
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
        }}
      >
        {/* Banner */}
        <motion.div
          className="h-24 bg-gradient-to-r from-[#0a66c2] to-[#0077b5]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: '200% 100%' }}
        />

        {/* Profile picture */}
        <div className="relative flex justify-center">
          <motion.div
            className="absolute -top-12 w-24 h-24 rounded-full border-4 border-black bg-gradient-to-br from-[#0a66c2] to-[#0077b5] flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0px rgba(10, 102, 194, 0)',
                '0 0 20px rgba(10, 102, 194, 0.7)',
                '0 0 0px rgba(10, 102, 194, 0)',
              ]
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, repeatType: "loop" },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
            }}
          >
            <span className="text-white text-3xl font-bold">J</span>
          </motion.div>
        </div>

        {/* Profile content */}
        <div className="p-6 pt-16">
          {/* Name and title */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-xl font-bold text-white mb-1">J Eshwar</div>
            <div className="text-[#0a66c2]">Full Stack Developer</div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex justify-between mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-white font-bold">500+</div>
              <div className="text-gray-400 text-sm">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">120</div>
              <div className="text-gray-400 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">45</div>
              <div className="text-gray-400 text-sm">Recommendations</div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-white font-medium mb-2">Top Skills</div>
            <div className="space-y-2">
              {['React', 'Node.js', 'MongoDB'].map((skill, i) => (
                <motion.div key={skill} className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[#0a66c2]"
                    initial={{ width: 0 }}
                    animate={{ width: `${85 - i * 10}%` }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect button */}
          <motion.button
            className="mt-6 w-full py-2 bg-[#0a66c2] rounded-full text-white font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                '0 0 0px rgba(10, 102, 194, 0)',
                '0 0 15px rgba(10, 102, 194, 0.7)',
                '0 0 0px rgba(10, 102, 194, 0)',
              ]
            }}
            transition={{
              opacity: { duration: 0.5, delay: 1 },
              y: { duration: 0.5, delay: 1 },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" }
            }}
          >
            Connect
          </motion.button>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Profile...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Blog page loading animation - Variant 1: Floating Articles
const BlogLoadingAnimation1 = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating blog cards */}
      <div className="relative w-full max-w-4xl">
        {[...Array(6)].map((_, i) => {
          const isLeft = i % 2 === 0;
          const xOffset = isLeft ? -100 - (i * 20) : 100 + (i * 20);
          const yOffset = (i - 3) * 60;
          const width = 280 + (i % 3) * 20;
          const height = 160 + (i % 2) * 20;
          const delay = i * 0.2;

          return (
            <motion.div
              key={`card-${i}`}
              className="absolute bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden"
              style={{
                width: width,
                height: height,
                left: '50%',
                top: '50%',
                x: xOffset,
                y: yOffset,
              }}
              animate={{
                x: [xOffset, xOffset + (isLeft ? 20 : -20), xOffset],
                y: [yOffset, yOffset - 10, yOffset],
                rotateZ: [0, isLeft ? -3 : 3, 0],
                boxShadow: [
                  '0 0 10px rgba(138, 43, 226, 0.2)',
                  '0 0 20px rgba(138, 43, 226, 0.4)',
                  '0 0 10px rgba(138, 43, 226, 0.2)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                delay: delay,
              }}
            >
              {/* Card header */}
              <div className="h-1/3 bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4">
                <motion.div
                  className="w-3/4 h-4 bg-white/20 rounded-full"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    width: ['60%', '80%', '60%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: delay,
                  }}
                />
              </div>

              {/* Card content */}
              <div className="p-4">
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={`line-${i}-${j}`}
                    className="w-full h-3 bg-white/10 rounded-full mb-2"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      width: j === 2 ? ['70%', '70%', '70%'] : ['100%', '100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: delay + j * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Central blog icon */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center z-10"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(138, 43, 226, 0.4)',
              '0 0 40px rgba(138, 43, 226, 0.6)',
              '0 0 20px rgba(138, 43, 226, 0.4)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.span
            className="text-white text-4xl"
            animate={{
              rotateY: [0, 360],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            📝
          </motion.span>
        </motion.div>
      </div>

      {/* Predefined particles with fixed positions instead of random values */}
      <motion.div
        className="absolute rounded-full w-3 h-3"
        style={{
          backgroundColor: '#8a2be2',
          left: '30%',
          top: '25%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.2,
        }}
      />

      <motion.div
        className="absolute rounded-full w-2 h-2"
        style={{
          backgroundColor: '#ff00ff',
          left: '70%',
          top: '30%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute rounded-full w-4 h-4"
        style={{
          backgroundColor: '#8a2be2',
          left: '20%',
          top: '60%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute rounded-full w-2.5 h-2.5"
        style={{
          backgroundColor: '#ff00ff',
          left: '80%',
          top: '70%',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute rounded-full w-3.5 h-3.5"
        style={{
          backgroundColor: '#8a2be2',
          left: '40%',
          top: '80%',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -20, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.8,
        }}
      />

      <motion.div
        className="absolute rounded-full w-2 h-2"
        style={{
          backgroundColor: '#ff00ff',
          left: '60%',
          top: '20%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute rounded-full w-3 h-3"
        style={{
          backgroundColor: '#8a2be2',
          left: '50%',
          top: '40%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1.2,
        }}
      />

      <motion.div
        className="absolute rounded-full w-2.5 h-2.5"
        style={{
          backgroundColor: '#ff00ff',
          left: '25%',
          top: '35%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.3,
        }}
      />

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Articles...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Blog page loading animation - Variant 2: Typewriter Effect
const BlogLoadingAnimation2 = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Typewriter container */}
      <motion.div
        className="relative w-96 h-96 bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30 p-8 overflow-hidden"
        animate={{
          boxShadow: [
            '0 0 20px rgba(138, 43, 226, 0.3)',
            '0 0 40px rgba(138, 43, 226, 0.5)',
            '0 0 20px rgba(138, 43, 226, 0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* Paper texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="paper" patternUnits="userSpaceOnUse" width="100" height="100">
              <rect width="100" height="100" fill="#ffffff" />
              <rect width="100" height="1" fill="#cccccc" y="20" />
              <rect width="100" height="1" fill="#cccccc" y="40" />
              <rect width="100" height="1" fill="#cccccc" y="60" />
              <rect width="100" height="1" fill="#cccccc" y="80" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#paper)" />
          </svg>
        </div>

        {/* Typewriter header */}
        <motion.div
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          My Blog
        </motion.div>

        {/* Typewriter text */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => {
            const width = 70 + (i % 3) * 10;
            return (
              <div key={`line-${i}`} className="relative">
                <motion.div
                  className="h-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full"
                  style={{ width: `${width}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />

                {/* Typing cursor */}
                <motion.div
                  className="absolute top-0 h-4 w-1 bg-purple-500"
                  initial={{ left: 0 }}
                  animate={{
                    left: `${width}%`,
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    left: {
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    },
                    opacity: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Predefined ink drops with fixed positions */}
        <motion.div
          className="absolute rounded-full w-3 h-3 bg-purple-500/70"
          style={{
            left: '20%',
            top: '30%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        <motion.div
          className="absolute rounded-full w-2 h-2 bg-purple-500/70"
          style={{
            left: '70%',
            top: '40%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        <motion.div
          className="absolute rounded-full w-4 h-4 bg-purple-500/70"
          style={{
            left: '50%',
            top: '60%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        <motion.div
          className="absolute rounded-full w-2.5 h-2.5 bg-purple-500/70"
          style={{
            left: '30%',
            top: '70%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        <motion.div
          className="absolute rounded-full w-3.5 h-3.5 bg-purple-500/70"
          style={{
            left: '80%',
            top: '20%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 2.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        <motion.div
          className="absolute rounded-full w-2 h-2 bg-purple-500/70"
          style={{
            left: '60%',
            top: '80%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 3,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Writing Content...
        </motion.span>
      </motion.div>
    </div>
  );
};

// Blog page loading animation - Variant 3: Digital Bookshelf
const BlogLoadingAnimation3 = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bookshelf */}
      <div className="relative w-full max-w-3xl h-80">
        {/* Shelf */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4 bg-gradient-to-r from-purple-900/50 via-purple-700/50 to-purple-900/50 rounded-lg"
          animate={{
            boxShadow: [
              '0 0 10px rgba(138, 43, 226, 0.3)',
              '0 0 20px rgba(138, 43, 226, 0.5)',
              '0 0 10px rgba(138, 43, 226, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Books - using predefined sizes instead of random values */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center items-end">
          <motion.div
            className="mx-1 rounded-t-md bg-gradient-to-b from-purple-600 to-purple-800"
            style={{
              height: 120,
              width: 30,
            }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                '0 0 5px rgba(138, 43, 226, 0.3)',
                '0 0 15px rgba(138, 43, 226, 0.5)',
                '0 0 5px rgba(138, 43, 226, 0.3)',
              ],
            }}
            transition={{
              y: {
                duration: 1,
                delay: 0,
                repeat: Infinity,
                repeatType: "loop",
              },
              boxShadow: {
                duration: 2,
                delay: 0,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <motion.div
                  className="w-3/4 h-1 bg-white/30 mx-auto mb-2"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                <motion.div
                  className="w-1/2 h-1 bg-white/30 mx-auto"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.2,
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-1 rounded-t-md bg-gradient-to-b from-pink-600 to-pink-800"
            style={{
              height: 160,
              width: 35,
            }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                '0 0 5px rgba(138, 43, 226, 0.3)',
                '0 0 15px rgba(138, 43, 226, 0.5)',
                '0 0 5px rgba(138, 43, 226, 0.3)',
              ],
            }}
            transition={{
              y: {
                duration: 1,
                delay: 0.1,
                repeat: Infinity,
                repeatType: "loop",
              },
              boxShadow: {
                duration: 2,
                delay: 0.1,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <motion.div
                  className="w-3/4 h-1 bg-white/30 mx-auto mb-2"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.1,
                  }}
                />
                <motion.div
                  className="w-1/2 h-1 bg-white/30 mx-auto"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.3,
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-1 rounded-t-md bg-gradient-to-b from-indigo-600 to-indigo-800"
            style={{
              height: 140,
              width: 32,
            }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                '0 0 5px rgba(138, 43, 226, 0.3)',
                '0 0 15px rgba(138, 43, 226, 0.5)',
                '0 0 5px rgba(138, 43, 226, 0.3)',
              ],
            }}
            transition={{
              y: {
                duration: 1,
                delay: 0.2,
                repeat: Infinity,
                repeatType: "loop",
              },
              boxShadow: {
                duration: 2,
                delay: 0.2,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <motion.div
                  className="w-3/4 h-1 bg-white/30 mx-auto mb-2"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-1/2 h-1 bg-white/30 mx-auto"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.4,
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-1 rounded-t-md bg-gradient-to-b from-purple-600 to-purple-800"
            style={{
              height: 130,
              width: 38,
            }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                '0 0 5px rgba(138, 43, 226, 0.3)',
                '0 0 15px rgba(138, 43, 226, 0.5)',
                '0 0 5px rgba(138, 43, 226, 0.3)',
              ],
            }}
            transition={{
              y: {
                duration: 1,
                delay: 0.3,
                repeat: Infinity,
                repeatType: "loop",
              },
              boxShadow: {
                duration: 2,
                delay: 0.3,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <motion.div
                  className="w-3/4 h-1 bg-white/30 mx-auto mb-2"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.3,
                  }}
                />
                <motion.div
                  className="w-1/2 h-1 bg-white/30 mx-auto"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.5,
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-1 rounded-t-md bg-gradient-to-b from-pink-600 to-pink-800"
            style={{
              height: 150,
              width: 33,
            }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                '0 0 5px rgba(138, 43, 226, 0.3)',
                '0 0 15px rgba(138, 43, 226, 0.5)',
                '0 0 5px rgba(138, 43, 226, 0.3)',
              ],
            }}
            transition={{
              y: {
                duration: 1,
                delay: 0.4,
                repeat: Infinity,
                repeatType: "loop",
              },
              boxShadow: {
                duration: 2,
                delay: 0.4,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            <div className="h-full w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <motion.div
                  className="w-3/4 h-1 bg-white/30 mx-auto mb-2"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.4,
                  }}
                />
                <motion.div
                  className="w-1/2 h-1 bg-white/30 mx-auto"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.6,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating book */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-md overflow-hidden"
          animate={{
            y: [-20, 0, -20],
            rotateY: [0, 360],
            boxShadow: [
              '0 0 20px rgba(138, 43, 226, 0.4)',
              '0 0 40px rgba(138, 43, 226, 0.6)',
              '0 0 20px rgba(138, 43, 226, 0.4)',
            ],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop" },
          }}
        >
          {/* Book cover */}
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <span className="text-3xl">📝</span>
            </motion.div>

            <motion.div
              className="w-full h-2 bg-white/20 rounded-full mb-2"
              animate={{
                width: ['60%', '80%', '60%'],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />

            <motion.div
              className="w-3/4 h-2 bg-white/20 rounded-full"
              animate={{
                width: ['40%', '60%', '40%'],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.2,
              }}
            />

            {/* Page flipping effect */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full bg-black/20"
              animate={{
                width: ['0%', '50%', '0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{
            opacity: [0, 1, 0],
            color: ['#8a2be2', '#ff00ff', '#8a2be2'],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Blog...
        </motion.span>
      </motion.div>
    </div>
  );
};

// LinkedIn page loading animation - Variant 3: Skills Graph
const LinkedInLoadingAnimation3 = () => {
  const skills = [
    { name: 'React', value: 90 },
    { name: 'Node.js', value: 85 },
    { name: 'MongoDB', value: 80 },
    { name: 'Express', value: 85 },
    { name: 'Next.js', value: 75 },
    { name: 'TypeScript', value: 70 },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Skills graph */}
      <motion.div
        className="relative w-96 h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Center point */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-[#0a66c2] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0px rgba(10, 102, 194, 0)',
              '0 0 20px rgba(10, 102, 194, 0.7)',
              '0 0 0px rgba(10, 102, 194, 0)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          Skills
        </motion.div>

        {/* Skill spokes */}
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div key={skill.name} className="absolute top-1/2 left-1/2">
              {/* Line */}
              <motion.div
                className="absolute h-0.5 bg-[#0a66c2]/50 origin-left"
                style={{
                  width: radius,
                  transform: `rotate(${angle}rad)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />

              {/* Skill node */}
              <motion.div
                className="absolute rounded-full bg-[#0a66c2] flex items-center justify-center text-white text-xs font-medium px-3 py-1"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  boxShadow: [
                    '0 0 0px rgba(10, 102, 194, 0)',
                    '0 0 10px rgba(10, 102, 194, 0.7)',
                    '0 0 0px rgba(10, 102, 194, 0)',
                  ]
                }}
                transition={{
                  scale: { duration: 0.5, delay: 0.5 + i * 0.2 },
                  opacity: { duration: 0.5, delay: 0.5 + i * 0.2 },
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.3 }
                }}
              >
                {skill.name}
              </motion.div>

              {/* Skill value */}
              <motion.div
                className="absolute bg-[#0a66c2]/20 rounded-full"
                style={{
                  width: (skill.value / 100) * 40,
                  height: (skill.value / 100) * 40,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
              />

              {/* Skill pulse */}
              <motion.div
                className="absolute rounded-full border border-[#0a66c2]"
                style={{
                  width: (skill.value / 100) * 60,
                  height: (skill.value / 100) * 60,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.3,
                }}
              />
            </motion.div>
          );
        })}

        {/* Rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border border-dashed border-[#0a66c2]/30 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-10 text-white text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          Loading Skills...
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
