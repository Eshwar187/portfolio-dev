'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import anime from 'animejs';

interface AnimeProfileProps {
  isVisible: boolean;
  delay?: number;
}

const AnimeProfile = ({ isVisible, delay = 0 }: AnimeProfileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !ringsRef.current) return;
    if (!isVisible) return;

    // Create rings
    const ringsContainer = ringsRef.current;
    const ringCount = 3;

    for (let i = 0; i < ringCount; i++) {
      const ring = document.createElement('div');
      ring.className = 'absolute top-1/2 left-1/2 rounded-full border-2 border-purple-500 -translate-x-1/2 -translate-y-1/2';
      ring.style.width = `${100 + i * 20}%`;
      ring.style.height = `${100 + i * 20}%`;
      ring.style.opacity = '0';
      ringsContainer.appendChild(ring);
    }

    // Main animation timeline
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      delay: delay
    });

    timeline
      // Container animation
      .add({
        targets: containerRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        rotate: [-180, 0],
        duration: 1800,
        easing: 'spring(1, 80, 10, 0)'
      })
      // Image animation
      .add({
        targets: imageRef.current,
        scale: [0.5, 1.1, 1],
        opacity: [0, 1],
        boxShadow: [
          '0 0 0 rgba(138, 43, 226, 0)',
          '0 0 50px rgba(138, 43, 226, 0.8)',
          '0 0 20px rgba(138, 43, 226, 0.5)',
        ],
        duration: 1200,
        easing: 'easeOutElastic(1, .5)'
      }, '-=1200')
      // Rings animation
      .add({
        targets: ringsContainer.children,
        opacity: [0, 0.3],
        scale: [0.8, 1],
        duration: 1000,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .5)'
      }, '-=800');

    // Continuous animations
    anime({
      targets: imageRef.current,
      boxShadow: [
        '0 0 20px rgba(138, 43, 226, 0.5)',
        '0 0 60px rgba(138, 43, 226, 0.8)',
        '0 0 30px rgba(255, 0, 255, 0.6)',
        '0 0 20px rgba(138, 43, 226, 0.5)',
      ],
      borderColor: [
        'rgba(138, 43, 226, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(138, 43, 226, 1)',
      ],
      duration: 4000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });

    anime({
      targets: ringsContainer.children,
      rotate: (el, i) => [0, 360],
      duration: (el, i) => 10000 + i * 5000,
      loop: true,
      easing: 'linear'
    });

    // Clean up
    return () => {
      timeline.pause();
      anime.remove([containerRef.current, imageRef.current, ringsContainer.children]);
      while (ringsContainer.firstChild) {
        ringsContainer.removeChild(ringsContainer.firstChild);
      }
    };
  }, [isVisible, delay]);

  // 3D flip animation
  useEffect(() => {
    if (!imageRef.current || !isVisible) return;

    // Set up 3D flip animation
    const flipAnimation = anime({
      targets: imageRef.current,
      rotateY: [0, 360],
      scale: [1, 1.05, 1],
      duration: 2500,
      delay: 3000, // Delay before first flip
      easing: 'easeInOutQuad',
      update: (anim) => {
        // Add special effects during rotation
        const progress = anim.progress / 100;
        const intensity = Math.sin(progress * Math.PI) * 40;
        const hue = Math.floor(270 + progress * 60); // Purple to pink hue shift

        if (imageRef.current) {
          // Dynamic shadow effect
          imageRef.current.style.boxShadow = `0 0 ${30 + intensity}px hsl(${hue}, 80%, 60%)`;

          // Add 3D perspective distortion
          const distortion = Math.sin(progress * Math.PI * 2) * 5;
          imageRef.current.style.transform = `rotateY(${progress * 360}deg) perspective(1000px) rotateX(${distortion}deg)`;

          // Change border color
          imageRef.current.style.borderColor = `hsl(${hue}, 80%, 60%)`;
        }
      },
      complete: () => {
        // Schedule next flip with random delay
        setTimeout(() => {
          if (imageRef.current) {
            flipAnimation.restart();
          }
        }, 6000 + Math.random() * 4000);
      }
    });

    return () => {
      flipAnimation.pause();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-10"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-purple-500 transform-style-3d shadow-2xl shadow-purple-500/50"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div className="absolute inset-0 backface-hidden">
          <Image
            src="/profile-photo.jpg"
            alt="J Eshwar"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 mix-blend-overlay" />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Image
            src="/profile-photo.jpg"
            alt="J Eshwar"
            fill
            className="object-cover object-center scale-x-[-1]" /* Mirrored */
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-purple-500/40 mix-blend-overlay" />
        </div>
      </div>

      {/* Rings container */}
      <div ref={ringsRef} className="absolute inset-0" />
    </div>
  );
};

export default AnimeProfile;
