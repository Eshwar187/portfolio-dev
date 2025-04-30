'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  githubLink,
  demoLink,
}: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-[400px] perspective-1000">
      <motion.div
        className="relative w-full h-full transform-style-3d transition-all duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          } rounded-xl overflow-hidden border border-purple-500 bg-black/30 backdrop-blur-sm`}
        >
          <div className="relative w-full h-3/5">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-purple-900/50 text-purple-200 border border-purple-500"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={handleFlip}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rotateY-180 ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          } rounded-xl overflow-hidden border border-purple-500 bg-black/30 backdrop-blur-sm p-6`}
        >
          <button
            onClick={handleFlip}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-white"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-purple-900/50 text-purple-200 border border-purple-500"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-auto">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 rounded-full text-white font-medium hover:bg-gray-700 transition-all"
              >
                GitHub
              </a>
            )}
            {demoLink && (
              demoLink.startsWith('/') ? (
                <Link
                  href={demoLink}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all"
                >
                  View Project
                </Link>
              ) : (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all"
                >
                  Live Demo
                </a>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
