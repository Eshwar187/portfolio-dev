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
      rotate: () => [0, 360],
      duration: (_el, i) => 10000 + i * 5000,
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

  // Subtle glow animation instead of 3D flip
  useEffect(() => {
    if (!imageRef.current || !isVisible) return;

    // Set up subtle glow animation
    const glowAnimation = anime({
      targets: imageRef.current,
      boxShadow: [
        '0 0 20px rgba(138, 43, 226, 0.5)',
        '0 0 40px rgba(138, 43, 226, 0.7)',
        '0 0 20px rgba(138, 43, 226, 0.5)',
      ],
      borderColor: [
        'rgba(138, 43, 226, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(138, 43, 226, 1)',
      ],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate'
    });

    return () => {
      glowAnimation.pause();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-10"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-purple-500 shadow-2xl shadow-purple-500/50"
      >
        <Image
          src="/profile-photo.jpg"
          alt="J Eshwar"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 mix-blend-overlay" />
      </div>

      {/* Rings container */}
      <div ref={ringsRef} className="absolute inset-0" />
    </div>
  );
};

export default AnimeProfile;
