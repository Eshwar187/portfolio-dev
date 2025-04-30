'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ClientParticles from '../components/ClientParticles';
import ClientCtaParticles from '../components/ClientCtaParticles';
import EnhancedHeading from '../components/EnhancedHeading';
import AnimeLoading from '../components/AnimeLoading';
import AnimeText from '../components/AnimeText';
import AnimeProfile from '../components/AnimeProfile';
import AnimeSkillCard from '../components/AnimeSkillCard';
import AnimeProjectCard from '../components/AnimeProjectCard';

export default function Home() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0);

  // No scroll detection needed

  // Loading animation sequence
  useEffect(() => {
    // Phase 0: Initial loading
    // Phase 1: Zoom to photo
    // Phase 2: Photo flip
    // Phase 3: Complete and fade to main page

    const timer1 = setTimeout(() => {
      setLoadingPhase(1); // Start zooming to photo after 1 second
    }, 1000);

    const timer2 = setTimeout(() => {
      setLoadingPhase(2); // Start photo flip after 2 seconds
    }, 2000);

    const timer3 = setTimeout(() => {
      setLoadingPhase(3); // Complete loading after 3 seconds
    }, 3000);

    const timer4 = setTimeout(() => {
      setIsLoading(false); // Hide loading overlay after 3.5 seconds
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Anime.js Loading Animation */}
      <AnimeLoading
        isLoading={isLoading}
        loadingPhase={loadingPhase}
        onComplete={() => setIsLoading(false)}
      />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeInOut"
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Animated circles */}
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={`circle-${index}`}
              className="absolute rounded-full border-2 border-purple-500 opacity-20"
              style={{
                top: '50%',
                left: '50%',
                width: `${(index + 1) * 20}%`,
                height: `${(index + 1) * 20}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: {
                  duration: 20 + index * 5,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2 + index,
                  repeat: Infinity,
                  repeatType: "reverse",
                }
              }}
            />
          ))}

          {/* Animated particles - Client-side only */}
          <ClientParticles />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10 flex flex-col items-center">
          {/* Top About Me Section */}
          <motion.div
            className="w-full max-w-3xl mb-12 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              I'm a passionate Full-Stack Developer specializing in the MERN stack, Next.js, and PostgreSQL.
              With a strong foundation in both frontend and backend technologies, I create immersive digital experiences.
            </motion.p>
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              On the backend, I excel in Node.js, Express, MongoDB, and RESTful API development.
              I'm proficient in database design, server-side authentication, and deploying scalable applications.
            </motion.p>
          </motion.div>

          {/* Profile Image with Anime.js */}
          <AnimeProfile
            isVisible={!isLoading}
            delay={0.8}
          />

          {/* Name and Title with Anime.js */}
          <div className="mb-6 text-center">
            <AnimeText
              text="J Eshwar"
              className="text-5xl md:text-7xl font-bold gradient-text"
              delay={1000}
              duration={2000}
              staggerDelay={100}
            />
          </div>

          <div className="mb-8 text-center">
            <AnimeText
              text="Full-Stack Developer"
              className="text-2xl md:text-3xl font-medium text-glow"
              delay={1500}
              duration={1500}
              staggerDelay={50}
            />
          </div>

          {/* Bottom About Me Section */}
          <motion.div
            className="w-full max-w-3xl mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              My journey in web development began with a fascination for creating interactive user interfaces.
              This passion led me to explore various technologies and frameworks, ultimately specializing in React and its ecosystem.
            </motion.p>
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              As I evolved as a developer, I became equally passionate about backend development. I enjoy building
              robust server architectures, designing efficient databases, and implementing secure authentication systems.
              My experience with Node.js and Express allows me to create performant APIs that power my frontend applications.
            </motion.p>
            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              When I'm not coding, you'll find me participating in hackathons, contributing to open-source projects,
              or exploring new technologies to expand my skill set.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <Link href="/projects">
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(138, 43, 226, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                className="px-10 py-4 bg-transparent border-2 border-purple-500 rounded-full text-white font-medium text-lg hover:bg-purple-900/20 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(138, 43, 226, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white opacity-70"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Skills Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <EnhancedHeading level={2} id="skills">Featured Skills</EnhancedHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { name: 'React', icon: '⚛️', level: 100 },
            { name: 'Next.js', icon: '▲', level: 100 },
            { name: 'Node.js', icon: '🟢', level: 100 },
            { name: 'TypeScript', icon: '📘', level: 100 }
          ].map((skill, index) => (
            <AnimeSkillCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              level={skill.level}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/about#skills">
            <motion.button
              className="px-6 py-3 bg-transparent border border-purple-500 rounded-full text-white font-medium hover:bg-purple-900/20 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px rgba(138, 43, 226, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // This will ensure the page scrolls to the skills section after navigation
                setTimeout(() => {
                  const skillsSection = document.getElementById('skills');
                  if (skillsSection) {
                    skillsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 500);
              }}
            >
              View All Skills
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <EnhancedHeading level={2} id="projects">Featured Projects</EnhancedHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: 'Employee Management System',
              description: 'A comprehensive Employee Management System built with React.js and Tailwind CSS. Features include login system, Admin Dashboard for employee management, and Employee Dashboard for profile handling.',
              image: '/ems.jpg',
              tags: ['React.js', 'Tailwind CSS', 'User Interface Design', 'Local Storage'],
              link: '/projects',
              index: 0
            },
            {
              title: 'ConstructHub.ai',
              description: 'An innovative platform that uses AI to generate floor plans and painting suggestions for construction and interior design projects. Helps users visualize and plan their spaces efficiently.',
              image: '/constructhub.jpg',
              tags: ['React.js', 'AI Integration', 'Node.js', 'Express'],
              link: '/projects',
              index: 1
            },
            {
              title: 'Buildwise.ai',
              description: 'An advanced construction planning platform that finds local designers and provides AI material suggestions. Similar to ConstructHub.ai but with enhanced features for connecting with professionals.',
              image: '/buildwise.jpg',
              tags: ['React.js', 'AI Integration', 'MongoDB', 'Express'],
              link: '/projects',
              index: 2
            }
          ].map((project) => (
            <AnimeProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              index={project.index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/projects">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(138, 43, 226, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <EnhancedHeading level={2} id="stats">My Stats</EnhancedHeading>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { title: 'Web Development', value: '1+ Years' },
            { title: 'Projects Completed', value: '15+' },
            { title: 'Hackathons Won/Participated', value: '8+' },
            { title: 'Satisfied Clients', value: '15+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)'
              }}
            >
              <motion.h3
                className="text-2xl font-bold text-white mb-2"
                animate={{
                  color: ['#8a2be2', '#ff00ff', '#8a2be2'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-300">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 z-0">
          <ClientCtaParticles />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
            >
              Let's Work Together
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I'm currently available for freelance work. If you have a project that needs some creative touch, I'd love to hear about it.
            </motion.p>

            <Link href="/contact">
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium text-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(138, 43, 226, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
