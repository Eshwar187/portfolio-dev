'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  index: number;
}

const AnimeProjectCard = ({ title, description, image, tags, link, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current || !tagsRef.current) return;

    // Card entrance animation
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [100, 0],
      easing: 'easeOutElastic(1, .6)',
      duration: 1200,
      delay: 300 + index * 150
    });

    // Image animation
    anime({
      targets: imageRef.current,
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 500 + index * 150
    });

    // Content animation
    anime({
      targets: contentRef.current.children,
      translateY: [20, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(100, { start: 700 + index * 150 })
    });

    // Tags animation
    anime({
      targets: tagsRef.current.children,
      translateX: [20, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 600,
      delay: anime.stagger(50, { start: 900 + index * 150 })
    });

    // Hover animation setup
    const enterAnimation = anime({
      targets: cardRef.current,
      scale: 1.03,
      translateY: -12, // Move up when hovered
      boxShadow: '0 20px 30px rgba(138, 43, 226, 0.4)',
      borderColor: 'rgba(138, 43, 226, 0.8)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const leaveAnimation = anime({
      targets: cardRef.current,
      scale: 1,
      translateY: 0, // Return to original position
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(138, 43, 226, 0.3)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const imageEnterAnimation = anime({
      targets: imageRef.current,
      scale: 1.08,
      translateY: -5,
      filter: 'brightness(1.1)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const imageLeaveAnimation = anime({
      targets: imageRef.current,
      scale: 1,
      translateY: 0,
      filter: 'brightness(1)',
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    // Add event listeners
    const card = cardRef.current;
    card.addEventListener('mouseenter', () => {
      enterAnimation.play();
      imageEnterAnimation.play();
    });
    card.addEventListener('mouseleave', () => {
      leaveAnimation.play();
      imageLeaveAnimation.play();
    });

    // Clean up
    return () => {
      card.removeEventListener('mouseenter', () => enterAnimation.play());
      card.removeEventListener('mouseleave', () => leaveAnimation.play());
      anime.remove([cardRef.current, imageRef.current, contentRef.current, tagsRef.current]);
    };
  }, [index]);

  return (
    <Link href={link}>
      <motion.div
        ref={cardRef}
        className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/30 overflow-hidden h-full flex flex-col"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div ref={imageRef} className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div ref={contentRef} className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 mb-4 flex-grow">{description}</p>

          <div ref={tagsRef} className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </Link>
  );
};

export default AnimeProjectCard;
