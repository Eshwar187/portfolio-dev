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
    const particleCount = 80;

    // Create different types of particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');

      // Determine particle type
      const particleType = Math.floor(Math.random() * 3);

      if (particleType === 0) {
        // Circle particles
        particle.className = 'absolute rounded-full bg-gradient-to-br from-purple-500 to-pink-500';
      } else if (particleType === 1) {
        // Square particles
        particle.className = 'absolute bg-gradient-to-br from-blue-500 to-purple-500 rotate-45';
      } else {
        // Star particles (using a pseudo-element for the star shape)
        particle.className = 'absolute text-yellow-400 text-opacity-70';
        particle.innerHTML = '✦';
        particle.style.fontSize = `${Math.random() * 14 + 8}px`;
      }

      if (particleType !== 2) {
        particle.style.width = `${Math.random() * 12 + 3}px`;
        particle.style.height = particle.style.width;
      }

      particle.style.opacity = `${Math.random() * 0.7 + 0.2}`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.filter = 'blur(0.5px)';
      particlesContainer.appendChild(particle);
    }

    // Add a glowing orb in the center
    const orb = document.createElement('div');
    orb.className = 'absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500';
    orb.style.width = '150px';
    orb.style.height = '150px';
    orb.style.left = '50%';
    orb.style.top = '50%';
    orb.style.transform = 'translate(-50%, -50%)';
    orb.style.opacity = '0';
    orb.style.filter = 'blur(30px)';
    particlesContainer.appendChild(orb);

    // Initial animation timeline
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750,
      complete: () => {
        // Start particles animation with more dynamic movement
        anime({
          targets: particlesContainer.children,
          translateX: () => anime.random(-150, 150),
          translateY: () => anime.random(-150, 150),
          scale: () => anime.random(0.5, 2),
          opacity: () => anime.random(0.1, 0.7),
          rotate: () => anime.random(-360, 360),
          duration: () => anime.random(2000, 4000),
          delay: anime.stagger(8),
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine'
        });

        // Animate the central orb
        anime({
          targets: orb,
          opacity: [0, 0.6, 0.3],
          scale: [0.8, 1.2, 1],
          filter: ['blur(30px)', 'blur(40px)', 'blur(30px)'],
          duration: 3000,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine'
        });
      }
    });

    // More dramatic entrance animation
    timeline
      .add({
        targets: particlesContainer,
        opacity: [0, 1],
        duration: 800,
      })
      .add({
        targets: orb,
        opacity: [0, 0.4],
        scale: [0, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, .5)'
      }, '-=400')
      .add({
        targets: logoRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        rotate: [120, 0],
        duration: 1200,
        easing: 'spring(1, 80, 10, 0)'
      }, '-=800')
      .add({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: anime.stagger(80),
      }, '-=600');

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
      // Phase 1: Zoom to photo
      anime({
        targets: photoRef.current,
        scale: [0, 1.2],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .5)'
      });

      // Fade out logo
      anime({
        targets: logoRef.current,
        scale: [1, 0.5],
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutQuad'
      });

      // Fade out text
      anime({
        targets: textRef.current,
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 800,
        easing: 'easeInOutQuad'
      });
    }

    if (loadingPhase === 2) {
      // Phase 2: Photo flip with more dramatic effects
      anime({
        targets: photoRef.current,
        rotateY: [0, 1080],
        scale: [1.2, 1.5],
        duration: 2000,
        easing: 'easeOutElastic(1, .5)',
        update: (anim) => {
          // Add dynamic glowing effect during rotation
          const progress = anim.progress / 100;
          const intensity = Math.sin(progress * Math.PI) * 60;
          const hue = Math.floor(270 + progress * 60); // Purple to pink hue shift
          if (photoRef.current) {
            photoRef.current.style.boxShadow = `0 0 ${intensity}px hsl(${hue}, 80%, 60%)`;

            // Add 3D perspective distortion
            const distortion = Math.sin(progress * Math.PI * 4) * 10;
            photoRef.current.style.transform = `rotateY(${progress * 1080}deg) perspective(800px) rotateX(${distortion}deg)`;
          }
        }
      });

      // Create light rays emanating from the photo
      const rays = [];
      const rayCount = 12;

      if (particlesRef.current) {
        for (let i = 0; i < rayCount; i++) {
          const ray = document.createElement('div');
          ray.className = 'absolute bg-gradient-to-r from-purple-500 to-transparent';
          ray.style.width = '200px';
          ray.style.height = '2px';
          ray.style.left = '50%';
          ray.style.top = '50%';
          ray.style.transformOrigin = '0 50%';
          ray.style.transform = `translate(-50%, -50%) rotate(${i * (360 / rayCount)}deg) translateX(60px)`;
          ray.style.opacity = '0';
          particlesRef.current.appendChild(ray);
          rays.push(ray);
        }

        // Animate rays
        anime({
          targets: rays,
          opacity: [0, 0.7, 0],
          width: ['200px', '400px', '200px'],
          easing: 'easeOutInSine',
          duration: 2000,
          delay: anime.stagger(100),
          complete: () => {
            // Remove rays after animation
            rays.forEach(ray => {
              if (particlesRef.current && ray.parentNode === particlesRef.current) {
                particlesRef.current.removeChild(ray);
              }
            });
          }
        });
      }

      // Enhanced particles explosion
      anime({
        targets: particlesRef.current?.children,
        translateX: () => anime.random(-400, 400),
        translateY: () => anime.random(-400, 400),
        scale: () => anime.random(0.1, 4),
        rotate: () => anime.random(-540, 540),
        opacity: (el, i) => {
          // Keep some particles visible
          return i % 3 === 0 ? [0.5, 0.2] : [0.5, 0];
        },
        duration: () => anime.random(1500, 2500),
        easing: 'easeOutExpo'
      });

      // Add shockwave effect
      if (particlesRef.current) {
        const shockwave = document.createElement('div');
        shockwave.className = 'absolute rounded-full border-2 border-purple-500';
        shockwave.style.width = '10px';
        shockwave.style.height = '10px';
        shockwave.style.left = '50%';
        shockwave.style.top = '50%';
        shockwave.style.transform = 'translate(-50%, -50%)';
        shockwave.style.opacity = '0.8';
        particlesRef.current.appendChild(shockwave);

        anime({
          targets: shockwave,
          scale: [0, 15],
          opacity: [0.8, 0],
          easing: 'easeOutExpo',
          duration: 1500,
          complete: () => {
            if (particlesRef.current && shockwave.parentNode === particlesRef.current) {
              particlesRef.current.removeChild(shockwave);
            }
          }
        });
      }
    }

    if (loadingPhase === 3) {
      // Phase 3: Complete and fade to main page
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 1000,
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

      {/* Logo */}
      <div ref={logoRef} className="absolute">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-5xl font-bold">
          J
        </div>
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
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
          J Eshwar
        </h1>
        <div className="text-xl text-gray-300">
          Loading Portfolio...
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeLoading;
