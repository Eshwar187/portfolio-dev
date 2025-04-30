'use client';

import { useRef, useEffect } from 'react';
import anime from 'animejs';

interface AnimeTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

const AnimeText = ({
  text,
  className = 'text-2xl font-bold',
  delay = 0,
  duration = 1500,
  staggerDelay = 50
}: AnimeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text into individual characters
    const characters = text.split('');
    containerRef.current.innerHTML = '';

    // Create a span for each character
    characters.forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      containerRef.current?.appendChild(span);
    });

    // Animate each character
    anime({
      targets: containerRef.current.children,
      opacity: [0, 1],
      translateY: [20, 0],
      translateZ: 0,
      duration: duration,
      delay: anime.stagger(staggerDelay, { start: delay }),
      easing: 'easeOutExpo'
    });

    // Clean up
    return () => {
      anime.remove(containerRef.current?.children);
    };
  }, [text, delay, duration, staggerDelay]);

  return <div ref={containerRef} className={className} />;
};

export default AnimeText;
