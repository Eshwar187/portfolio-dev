'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';

interface SkillCardProps {
  name: string;
  icon: string;
  level: number;
  index: number;
}

const AnimeSkillCard = ({ name, icon, level, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !progressRef.current || !iconRef.current) return;

    // Card entrance animation
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.9, 1],
      easing: 'easeOutElastic(1, .5)',
      duration: 800,
      delay: 300 + index * 100
    });

    // Progress bar animation
    anime({
      targets: progressRef.current,
      width: `${level}%`,
      easing: 'easeInOutQuart',
      duration: 1000,
      delay: 500 + index * 100
    });

    // Icon animation
    anime({
      targets: iconRef.current,
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      easing: 'easeInOutBack',
      duration: 1200,
      delay: 300 + index * 100
    });

    // Hover animation setup
    const enterAnimation = anime({
      targets: cardRef.current,
      scale: 1.05,
      translateY: -10, // Move up when hovered
      boxShadow: '0 15px 30px rgba(138, 43, 226, 0.4)',
      borderColor: 'rgba(138, 43, 226, 0.8)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const leaveAnimation = anime({
      targets: cardRef.current,
      scale: 1,
      translateY: 0, // Return to original position
      boxShadow: '0 5px 15px rgba(138, 43, 226, 0.2)',
      borderColor: 'rgba(138, 43, 226, 0.3)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const iconEnterAnimation = anime({
      targets: iconRef.current,
      scale: 1.2,
      rotate: '+=20',
      translateY: -5,
      backgroundColor: 'rgba(138, 43, 226, 0.3)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const iconLeaveAnimation = anime({
      targets: iconRef.current,
      scale: 1,
      rotate: '-=20',
      translateY: 0,
      backgroundColor: 'rgba(138, 43, 226, 0.1)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    // Add event listeners
    const card = cardRef.current;
    card.addEventListener('mouseenter', () => {
      enterAnimation.play();
      iconEnterAnimation.play();
    });
    card.addEventListener('mouseleave', () => {
      leaveAnimation.play();
      iconLeaveAnimation.play();
    });

    // Clean up
    return () => {
      card.removeEventListener('mouseenter', () => enterAnimation.play());
      card.removeEventListener('mouseleave', () => leaveAnimation.play());
      anime.remove([cardRef.current, progressRef.current, iconRef.current]);
    };
  }, [index, level]);

  return (
    <motion.div
      ref={cardRef}
      className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <div
          ref={iconRef}
          className="text-2xl mr-3 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full shadow-inner shadow-purple-500/10 transition-all"
        >
          {icon}
        </div>
        <h3 className="text-xl font-medium">{name}</h3>
      </div>

      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-0"
        />
      </div>

      <div className="mt-2 text-right text-sm text-gray-400">{level}%</div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default AnimeSkillCard;
