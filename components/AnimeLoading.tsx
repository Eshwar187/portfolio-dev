'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import Image from 'next/image';

interface AnimeLoadingProps {
  isLoading: boolean;
  loadingPhase: number;
  onComplete: () => void;
}

const AnimeLoading = ({ isLoading, loadingPhase, onComplete }: AnimeLoadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Initial loading animation
  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !photoRef.current || !particlesRef.current || !textRef.current) return;

    // Create particles
    const particlesContainer = particlesRef.current;
    const particleCount = 60;

    // Create tech-focused particles that match web dev profile
    const emojis = ['⚛️', '💻', '🚀', '🔥', '🌐', '📱', '💡', '✨', '🧠', '🔮'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');

      // Determine particle type
      const particleType = Math.floor(Math.random() * 3);

      if (particleType === 0) {
        // Emoji particles
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        particle.className = 'absolute text-2xl';
        particle.innerHTML = randomEmoji;
        particle.style.fontSize = `${Math.random() * 16 + 12}px`;
      } else if (particleType === 1) {
        // Code/tech particles
        const techSymbols = ['</>','{}','[]','()','JS','ML','AI','==','++','=>'];
        const randomSymbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        particle.className = 'absolute text-purple-400 font-mono font-bold';
        particle.innerHTML = randomSymbol;
        particle.style.fontSize = `${Math.random() * 14 + 10}px`;
      } else {
        // Bubble particles
        particle.className = 'absolute rounded-full bg-gradient-to-br from-purple-400 to-pink-400';
        particle.style.width = `${Math.random() * 15 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.filter = 'blur(0.5px)';
      }

      particle.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particlesContainer.appendChild(particle);
    }

    // Add a cute background glow
    const glow = document.createElement('div');
    glow.className = 'absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400';
    glow.style.width = '200px';
    glow.style.height = '200px';
    glow.style.left = '50%';
    glow.style.top = '50%';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.opacity = '0';
    glow.style.filter = 'blur(40px)';
    particlesContainer.appendChild(glow);

    // Initial animation timeline
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750,
      complete: () => {
        // Start particles animation with cute bouncy movement
        anime({
          targets: particlesContainer.children,
          translateX: () => anime.random(-100, 100),
          translateY: () => anime.random(-100, 100),
          scale: () => anime.random(0.7, 1.3),
          rotate: () => anime.random(-30, 30),
          opacity: () => anime.random(0.4, 1),
          duration: () => anime.random(1500, 3000),
          delay: anime.stagger(10),
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutQuad'
        });

        // Animate the glow with a pulsing effect
        anime({
          targets: glow,
          opacity: [0.2, 0.5, 0.2],
          scale: [0.8, 1.2, 0.8],
          duration: 2000,
          loop: true,
          easing: 'easeInOutSine'
        });
      }
    });

    // Cute entrance animation
    timeline
      .add({
        targets: particlesContainer,
        opacity: [0, 1],
        duration: 600,
      })
      .add({
        targets: glow,
        opacity: [0, 0.3],
        scale: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
      }, '-=300')
      .add({
        targets: logoRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        rotate: [0, 0],
        duration: 800,
        easing: 'spring(1, 80, 10, 0)'
      }, '-=400')
      .add({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(80),
      }, '-=400');

    // Clean up
    return () => {
      timeline.pause();
      while (particlesContainer.firstChild) {
        particlesContainer.removeChild(particlesContainer.firstChild);
      }
    };
  }, []);

  // Phase transitions
  useEffect(() => {
    if (!containerRef.current || !photoRef.current) return;

    if (loadingPhase === 1) {
      // Phase 1: Photo reveal with laptop animation
      anime({
        targets: photoRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .6)'
      });

      // Add code particles flying from the laptop to the photo
      if (particlesRef.current) {
        const codeParticles = [];
        const codeElements = [
          { content: '<div>', class: 'font-mono text-green-400' },
          { content: '</div>', class: 'font-mono text-green-400' },
          { content: 'function()', class: 'font-mono text-yellow-400' },
          { content: 'return', class: 'font-mono text-purple-400' },
          { content: 'const', class: 'font-mono text-blue-400' },
          { content: 'import', class: 'font-mono text-blue-400' },
          { content: 'export', class: 'font-mono text-blue-400' },
          { content: '⚛️', class: '' },
          { content: '💻', class: '' },
          { content: '🚀', class: '' },
          { content: '🧠', class: '' },
          { content: '{}', class: 'font-mono text-yellow-400' },
          { content: '[]', class: 'font-mono text-yellow-400' },
          { content: '()', class: 'font-mono text-yellow-400' },
          { content: '=>', class: 'font-mono text-purple-400' },
        ];

        // Get laptop position
        const laptopRect = logoRef.current?.getBoundingClientRect();
        const photoRect = photoRef.current?.getBoundingClientRect();

        if (laptopRect && photoRect) {
          const laptopCenterX = laptopRect.left + laptopRect.width / 2;
          const laptopCenterY = laptopRect.top + laptopRect.height / 2;
          const photoCenterX = photoRect.left + photoRect.width / 2;
          const photoCenterY = photoRect.top + photoRect.height / 2;

          for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const randomElement = codeElements[Math.floor(Math.random() * codeElements.length)];

            particle.innerHTML = randomElement.content;
            particle.className = `absolute ${randomElement.class}`;
            particle.style.fontSize = `${Math.random() * 14 + 10}px`;
            particle.style.left = `${laptopCenterX}px`;
            particle.style.top = `${laptopCenterY}px`;
            particle.style.opacity = '0';
            particle.style.zIndex = '100';
            particlesRef.current.appendChild(particle);
            codeParticles.push(particle);
          }

          // Animate code particles from laptop to photo
          anime({
            targets: codeParticles,
            left: photoCenterX,
            top: photoCenterY,
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0],
            easing: 'easeOutQuad',
            duration: 1500,
            delay: anime.stagger(50),
            complete: () => {
              codeParticles.forEach(particle => {
                if (particlesRef.current && particle.parentNode === particlesRef.current) {
                  particlesRef.current.removeChild(particle);
                }
              });
            }
          });
        }
      }

      // Animate laptop screen typing effect
      anime({
        targets: logoRef.current.querySelectorAll('.text-green-400, .text-purple-400, .text-blue-400, .text-yellow-400, .text-pink-400'),
        opacity: [1, 0.3],
        duration: 800,
        easing: 'easeInOutSine',
        delay: anime.stagger(100),
      });

      // Fade out text with a bounce
      anime({
        targets: textRef.current,
        opacity: [1, 0],
        translateY: [0, -15],
        scale: [1, 0.9],
        duration: 800,
        easing: 'easeInOutQuad'
      });
    }

    if (loadingPhase === 2) {
      // Phase 2: Laptop to photo transition animation

      // Animate photo with glowing effect
      anime({
        targets: photoRef.current,
        scale: [1, 1.1, 1],
        borderWidth: [4, 8, 4],
        borderColor: [
          'rgb(168, 85, 247)', // purple-500
          'rgb(236, 72, 153)', // pink-500
          'rgb(168, 85, 247)'  // purple-500
        ],
        boxShadow: [
          '0 0 10px rgba(168, 85, 247, 0.5)',
          '0 0 30px rgba(236, 72, 153, 0.7)',
          '0 0 10px rgba(168, 85, 247, 0.5)'
        ],
        duration: 2000,
        easing: 'easeInOutQuad'
      });

      // Animate laptop closing
      if (logoRef.current) {
        // Get the laptop screen and base elements
        const laptopScreen = logoRef.current.querySelector('.w-full.h-48');
        const laptopBase = logoRef.current.querySelector('.w-full.h-10');

        if (laptopScreen && laptopBase) {
          // Animate laptop screen closing
          anime({
            targets: laptopScreen,
            scaleY: [1, 0],
            transformOrigin: 'bottom',
            easing: 'easeInOutQuad',
            duration: 800
          });

          // Animate laptop base fading out
          anime({
            targets: laptopBase,
            opacity: [1, 0],
            translateY: [0, 20],
            easing: 'easeInOutQuad',
            duration: 800,
            delay: 400
          });
        }

        // Fade out the entire laptop
        anime({
          targets: logoRef.current,
          opacity: [1, 0],
          scale: [1, 0.8],
          translateY: [0, -30],
          easing: 'easeInOutQuad',
          duration: 1000,
          delay: 800
        });
      }

      // Create code elements flying around the photo
      if (particlesRef.current) {
        const codeElements = [];
        const elementCount = 24;

        // Mix of web development elements
        const elements = [
          { content: '<React/>', class: 'font-mono text-blue-400' },
          { content: '<div>', class: 'font-mono text-green-400' },
          { content: '</div>', class: 'font-mono text-green-400' },
          { content: 'function()', class: 'font-mono text-yellow-400' },
          { content: '⚛️', class: '' },
          { content: '🧠', class: '' },
          { content: '💻', class: '' },
          { content: '🚀', class: '' },
          { content: 'useState', class: 'font-mono text-purple-400' },
          { content: 'useEffect', class: 'font-mono text-purple-400' },
          { content: 'MongoDB', class: 'font-mono text-green-500' },
          { content: 'Express', class: 'font-mono text-gray-400' },
          { content: 'Node.js', class: 'font-mono text-green-400' },
          { content: 'Next.js', class: 'font-mono text-white' },
          { content: 'API', class: 'font-mono text-blue-400' },
          { content: 'REST', class: 'font-mono text-orange-400' }
        ];

        // Get photo position
        const photoRect = photoRef.current?.getBoundingClientRect();

        if (photoRect) {
          const centerX = photoRect.left + photoRect.width / 2;
          const centerY = photoRect.top + photoRect.height / 2;

          for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            const randomElement = elements[Math.floor(Math.random() * elements.length)];

            element.innerHTML = randomElement.content;
            element.className = `absolute ${randomElement.class}`;
            element.style.fontSize = `${Math.random() * 14 + 10}px`;
            element.style.left = `${centerX}px`;
            element.style.top = `${centerY}px`;
            element.style.opacity = '0';
            element.style.zIndex = '100';
            particlesRef.current.appendChild(element);
            codeElements.push(element);
          }

          // Animate code elements in a spiral pattern
          anime({
            targets: codeElements,
            translateX: (el, i) => {
              const angle = i / elementCount * 4 * Math.PI; // 2 full rotations
              const radius = 20 + i * 5; // Increasing radius for spiral effect
              return radius * Math.cos(angle);
            },
            translateY: (el, i) => {
              const angle = i / elementCount * 4 * Math.PI;
              const radius = 20 + i * 5;
              return radius * Math.sin(angle);
            },
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            easing: 'easeInOutQuad',
            duration: 2000,
            delay: anime.stagger(50),
            complete: () => {
              codeElements.forEach(element => {
                if (particlesRef.current && element.parentNode === particlesRef.current) {
                  particlesRef.current.removeChild(element);
                }
              });
            }
          });
        }
      }

      // Add a glowing circle around the photo
      if (particlesRef.current && photoRef.current) {
        const photoRect = photoRef.current.getBoundingClientRect();
        const centerX = photoRect.left + photoRect.width / 2;
        const centerY = photoRect.top + photoRect.height / 2;

        const glowCircle = document.createElement('div');
        glowCircle.className = 'absolute rounded-full';
        glowCircle.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(0, 0, 0, 0) 70%)';
        glowCircle.style.width = '300px';
        glowCircle.style.height = '300px';
        glowCircle.style.left = `${centerX}px`;
        glowCircle.style.top = `${centerY}px`;
        glowCircle.style.transform = 'translate(-50%, -50%)';
        glowCircle.style.opacity = '0';
        particlesRef.current.appendChild(glowCircle);

        anime({
          targets: glowCircle,
          opacity: [0, 0.8, 0],
          scale: [0.8, 1.2, 0.8],
          easing: 'easeInOutQuad',
          duration: 2000,
          complete: () => {
            if (particlesRef.current && glowCircle.parentNode === particlesRef.current) {
              particlesRef.current.removeChild(glowCircle);
            }
          }
        });
      }
    }

    if (loadingPhase === 3) {
      // Phase 3: Web developer themed finale

      // Create a code editor window that appears and then transforms
      if (particlesRef.current) {
        // Create the code editor container
        const editorContainer = document.createElement('div');
        editorContainer.className = 'absolute bg-gray-900 border-2 border-purple-500 rounded-lg overflow-hidden';
        editorContainer.style.width = '500px';
        editorContainer.style.height = '300px';
        editorContainer.style.left = '50%';
        editorContainer.style.top = '50%';
        editorContainer.style.transform = 'translate(-50%, -50%) scale(0)';
        editorContainer.style.opacity = '0';
        editorContainer.style.zIndex = '200';

        // Create the editor header
        const editorHeader = document.createElement('div');
        editorHeader.className = 'h-8 bg-gray-800 flex items-center px-3';
        editorHeader.innerHTML = `
          <div class="flex space-x-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div class="mx-auto text-xs text-gray-400 font-mono">portfolio.jsx</div>
        `;

        // Create the editor content
        const editorContent = document.createElement('div');
        editorContent.className = 'p-4 font-mono text-sm h-[calc(100%-2rem)] overflow-hidden';
        editorContent.innerHTML = `
          <div class="text-blue-400">import</div>
          <div class="text-white ml-2">React, { useState, useEffect } <span class="text-blue-400">from</span> <span class="text-green-400">'react'</span>;</div>
          <div class="text-blue-400">import</div>
          <div class="text-white ml-2">{ motion } <span class="text-blue-400">from</span> <span class="text-green-400">'framer-motion'</span>;</div>
          <div class="h-4"></div>
          <div class="text-blue-400">const</div>
          <div class="text-yellow-400 ml-2">Portfolio = () => {</div>
          <div class="text-blue-400 ml-4">return</div>
          <div class="text-white ml-6">(<span class="text-yellow-400">
            &lt;motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            &gt;
              &lt;h1&gt;Welcome to J Eshwar's Portfolio&lt;/h1&gt;
              &lt;p&gt;Full-Stack Developer&lt;/p&gt;
            &lt;/motion.div&gt;
          </span>);</div>
          <div class="text-yellow-400 ml-2">};</div>
          <div class="h-4"></div>
          <div class="text-blue-400">export</div>
          <div class="text-blue-400 ml-2">default</div>
          <div class="text-yellow-400 ml-4">Portfolio;</div>
        `;

        // Add elements to the DOM
        editorContainer.appendChild(editorHeader);
        editorContainer.appendChild(editorContent);
        particlesRef.current.appendChild(editorContainer);

        // Animate the editor appearing
        anime({
          targets: editorContainer,
          opacity: [0, 1],
          scale: [0, 1],
          easing: 'easeOutElastic(1, .6)',
          duration: 1000,
          complete: () => {
            // After the editor appears, animate it transforming into particles
            setTimeout(() => {
              // Create particles from the editor
              const particles = [];
              const particleCount = 50;

              // Web dev elements
              const webDevElements = [
                { content: '⚛️', class: '' },
                { content: '💻', class: '' },
                { content: '🚀', class: '' },
                { content: '<React/>', class: 'font-mono text-blue-400' },
                { content: 'function()', class: 'font-mono text-yellow-400' },
                { content: 'export', class: 'font-mono text-blue-400' },
                { content: 'import', class: 'font-mono text-blue-400' },
                { content: 'useState', class: 'font-mono text-purple-400' },
                { content: 'return', class: 'font-mono text-blue-400' },
                { content: '</>',  class: 'font-mono text-blue-400' },
                { content: 'JS', class: 'font-mono text-yellow-400' },
                { content: 'MERN', class: 'font-mono text-green-400' }
              ];

              // Get editor position
              const editorRect = editorContainer.getBoundingClientRect();
              const centerX = editorRect.left + editorRect.width / 2;
              const centerY = editorRect.top + editorRect.height / 2;

              for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                const randomElement = webDevElements[Math.floor(Math.random() * webDevElements.length)];

                particle.innerHTML = randomElement.content;
                particle.className = `absolute ${randomElement.class}`;
                particle.style.fontSize = `${Math.random() * 18 + 12}px`;
                particle.style.left = `${centerX}px`;
                particle.style.top = `${centerY}px`;
                particle.style.opacity = '0';
                particle.style.zIndex = '100';
                particlesRef.current.appendChild(particle);
                particles.push(particle);
              }

              // Fade out the editor
              anime({
                targets: editorContainer,
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                  if (particlesRef.current && editorContainer.parentNode === particlesRef.current) {
                    particlesRef.current.removeChild(editorContainer);
                  }
                }
              });

              // Animate particles explosion
              anime({
                targets: particles,
                translateX: () => anime.random(-300, 300),
                translateY: () => anime.random(-300, 300),
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: () => anime.random(-360, 360),
                easing: 'easeOutExpo',
                duration: 1500,
                delay: anime.stagger(10),
                complete: () => {
                  particles.forEach(particle => {
                    if (particlesRef.current && particle.parentNode === particlesRef.current) {
                      particlesRef.current.removeChild(particle);
                    }
                  });
                }
              });
            }, 1000);
          }
        });
      }

      // Final transition of the photo
      anime({
        targets: photoRef.current,
        scale: [1, 1.2, 0],
        opacity: [1, 1, 0],
        duration: 800,
        delay: 2000,
        easing: 'easeInOutBack'
      });

      // Fade out the container
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 1000,
        delay: 2800,
        easing: 'easeInOutQuad',
        complete: onComplete
      });
    }
  }, [loadingPhase, onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
    >
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Animated Laptop */}
      <div ref={logoRef} className="absolute top-1/4 transform -translate-y-1/2">
        <motion.div
          className="relative w-80 h-60"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Laptop Screen */}
          <motion.div
            className="w-full h-48 bg-gray-900 border-2 border-purple-500 rounded-t-lg overflow-hidden flex flex-col"
            initial={{ scaleY: 0, transformOrigin: "bottom" }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            {/* Screen Header */}
            <div className="h-6 bg-gray-800 flex items-center px-3">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-xs text-gray-400 font-mono">developer-terminal</div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-3 font-mono text-sm overflow-hidden">
              <motion.div
                className="text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                &gt; Welcome to the world of web development...
              </motion.div>
              <motion.div
                className="text-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                &gt; Initializing developer profile: J Eshwar
              </motion.div>
              <motion.div
                className="text-blue-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
              >
                &gt; Loading skills: React, Node.js, Next.js, MongoDB...
              </motion.div>
              <motion.div
                className="text-yellow-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
              >
                &gt; Preparing portfolio experience...
              </motion.div>
              <motion.div
                className="text-pink-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
              >
                &gt; Ready to explore! Launching portfolio...
              </motion.div>
            </div>
          </motion.div>

          {/* Laptop Base */}
          <motion.div
            className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-b-lg relative"
            initial={{ scaleX: 0, transformOrigin: "center" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-1 bg-gray-800 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Photo */}
      <div
        ref={photoRef}
        className="absolute w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500 opacity-0"
        style={{ perspective: '1000px' }}
      >
        <Image
          src="/profile-photo.jpg"
          alt="J Eshwar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 mix-blend-overlay" />
      </div>

      {/* Text */}
      <div ref={textRef} className="absolute bottom-1/4 text-center">
        <motion.h1
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Entering the World of Web Development
        </motion.h1>
        <motion.div
          className="text-2xl text-white font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          J Eshwar | Full-Stack Developer
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimeLoading;
