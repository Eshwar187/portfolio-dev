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
  comingSoon?: boolean;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  githubLink,
  demoLink,
  comingSoon,
}: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-[350px] perspective-1000">
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
          <div className="relative w-full h-2/5">
            {comingSoon ? (
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover filter blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-2xl font-bold mb-2 relative"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <motion.span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                      animate={{
                        backgroundPosition: ["0% center", "100% center", "0% center"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      Coming Soon
                    </motion.span>
                    <motion.div
                      className="absolute -inset-2 rounded-lg"
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(138, 43, 226, 0)",
                          "0 0 15px rgba(138, 43, 226, 0.5)",
                          "0 0 0 rgba(138, 43, 226, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  <motion.div
                    className="flex space-x-1"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      times: [0, 0.5, 1],
                      delay: 0.5
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-purple-500"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                          backgroundColor: [
                            "rgb(168, 85, 247)", // purple-500
                            "rgb(236, 72, 153)", // pink-500
                            "rgb(168, 85, 247)"  // purple-500
                          ]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            ) : demoLink ? (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={`transition-transform duration-300 hover:scale-105 ${
                    title === 'Employee Management System' || title === 'Todolist'
                      ? 'object-contain p-2'
                      : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hover:from-black/60 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 bg-purple-600/80 rounded-full text-white font-medium backdrop-blur-sm">
                    View Project
                  </span>
                </div>
              </a>
            ) : (
              <>
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={`${
                    title === 'Employee Management System' || title === 'Todolist'
                      ? 'object-contain p-2'
                      : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-purple-900/50 text-purple-200 border border-purple-500"
                >
                  {tech}
                </span>
              ))}
            </div>
            <motion.button
              onClick={handleFlip}
              className={`mt-1 px-3 py-1 text-sm bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all ${
                comingSoon ? 'relative overflow-hidden' : ''
              } ${title === 'Todolist' ? 'mt-0' : 'mt-1'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {comingSoon ? (
                <>
                  View Details
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                </>
              ) : (
                'View Details'
              )}
            </motion.button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rotateY-180 ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          } rounded-xl overflow-hidden border border-purple-500 bg-black/30 backdrop-blur-sm p-4`}
        >
          <button
            onClick={handleFlip}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-white"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-300 mb-4 text-sm">{description}</p>
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
          <div className="flex gap-4 mt-auto">
            {comingSoon ? (
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(138, 43, 226, 0)",
                    "0 0 20px rgba(138, 43, 226, 0.8)",
                    "0 0 0 rgba(138, 43, 226, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="relative z-10"
                >
                  Coming Soon
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </motion.div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
