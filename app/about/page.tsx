'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Timeline from '../../components/Timeline';
import gsap from 'gsap';
import EnhancedHeading from '../../components/EnhancedHeading';
import anime from 'animejs';

// Timeline data
const timelineItems = [
  {
    id: 0,
    title: 'IG NGL App',
    date: '2024',
    description: 'Developing an anonymous messaging platform inspired by Instagram and NGL, with enhanced privacy features and customizable themes.',
  },
  {
    id: 1,
    title: 'Employee Management System',
    date: 'Nov 2024 - Dec 2024',
    description: 'Developed an Employee Management System with React.js and Tailwind CSS featuring login system, Admin Dashboard for employee management, and Employee Dashboard for profile handling—all powered by local storage.',
  },
  {
    id: 2,
    title: 'Weather App',
    date: 'Oct 2024 - Oct 2024',
    description: 'Developed a weather app using React.js that provides real-time updates and forecasts. It features an intuitive UI for easy location searches, displaying temperature, humidity, wind speed. Integrated with a weather API for accurate data and ensured responsiveness for various devices.',
  },
  {
    id: 3,
    title: 'Todolist',
    date: 'Sep 2024 - Sep 2024',
    description: 'A powerful frontend tool for managing tasks, this application offers seamless functionality for creating, updating, and deleting tasks and their descriptions within a personalized to-do list.',
  },
  {
    id: 4,
    title: 'Prodigy Infotech Internship',
    date: '2023',
    description: 'Worked on full-stack web development projects using the MERN stack, focusing on responsive design and user experience.',
  },
  {
    id: 5,
    title: 'NASSCOM Hackathon',
    date: '2022',
    description: 'Participated in the NASSCOM Hackathon, developing innovative solutions to real-world problems using cutting-edge technologies.',
  },
  {
    id: 6,
    title: 'Smart India Hackathon',
    date: '2022',
    description: 'Competed in the Smart India Hackathon, collaborating with a team to create impactful digital solutions for societal challenges.',
  },
  {
    id: 7,
    title: 'Beach Buddy Project',
    date: '2021',
    description: 'Developed Beach Buddy, a web application that helps users find and connect with beach activities and services.',
  },
  {
    id: 8,
    title: 'ConstructHub.ai',
    date: '2023',
    description: 'Developed an innovative platform that uses AI to generate floor plans and painting suggestions for construction and interior design projects.',
  },
  {
    id: 9,
    title: 'Buildwise.ai',
    date: '2023',
    description: 'Created an advanced construction planning platform that finds local designers and provides AI material suggestions, enhancing the construction planning process.',
  },
];

// Floating emoji component
interface FloatingEmojiProps {
  emoji: string;
  delay?: number;
  duration?: number;
  x?: number;
}

const FloatingEmoji = ({ emoji, delay = 0, duration = 3, x = 0 }: FloatingEmojiProps) => {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none"
      initial={{ opacity: 0, y: 0, x }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -60, -80, -100],
        x: [x, x + 20, x - 20, x + 10]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
    >
      {emoji}
    </motion.div>
  );
};

// Sparkle component
interface SparkleProps {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  top: string | number;
  left: string | number;
}

const Sparkle = ({ size = 10, color = "#FFC700", delay = 0, duration = 0.8, top, left }: SparkleProps) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top,
        left,
        boxShadow: `0 0 ${size/2}px ${color}`
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1
      }}
    />
  );
};

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Create sparkles after a delay
    setTimeout(() => {
      setShowSparkles(true);
    }, 2000);

    if (skillsRef.current) {
      // Create a floating animation for skill cards
      const cards = skillsRef.current.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: '10px',
          duration: 2 + index * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      });
    }

    // Add floating particles to about section
    if (aboutSectionRef.current) {
      const container = aboutSectionRef.current;

      // Create particles
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full pointer-events-none';

        // Random size between 3 and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random color
        const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.opacity = '0';

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        container.appendChild(particle);

        // Animate with anime.js
        anime({
          targets: particle,
          opacity: [0, 0.4, 0],
          translateY: [0, -30],
          translateX: [0, Math.random() * 40 - 20],
          scale: [1, 0.5],
          duration: Math.random() * 4000 + 3000,
          easing: 'easeInOutQuad',
          loop: true,
          delay: Math.random() * 2000
        });
      }
    }

    // Handle hash navigation for smooth scrolling
    if (typeof window !== 'undefined' && window.location.hash) {
      // Get the target element
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      // Scroll to the target element if it exists
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side rendering
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <EnhancedHeading level={1}>About Me</EnhancedHeading>

        <motion.div
          ref={aboutSectionRef}
          className="relative max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Floating emojis */}
          {showSparkles && (
            <>
              <FloatingEmoji emoji="⚛️" delay={2} x={20} />
              <FloatingEmoji emoji="💻" delay={4} x={-30} duration={4} />
              <FloatingEmoji emoji="🚀" delay={6} x={40} duration={3.5} />
              <FloatingEmoji emoji="🎨" delay={8} x={-50} duration={4.2} />
              <FloatingEmoji emoji="🧠" delay={10} x={60} duration={3.8} />
              <FloatingEmoji emoji="🌟" delay={12} x={-70} duration={3.2} />

              {/* Sparkles */}
              <Sparkle top="10%" left="5%" delay={1} />
              <Sparkle top="15%" left="90%" delay={2} size={6} color="#FF69B4" />
              <Sparkle top="50%" left="95%" delay={3} size={8} color="#3B82F6" />
              <Sparkle top="80%" left="10%" delay={4} size={7} color="#10B981" />
              <Sparkle top="30%" left="50%" delay={5} size={5} color="#F59E0B" />
              <Sparkle top="70%" left="80%" delay={6} size={9} color="#8B5CF6" />
              <Sparkle top="90%" left="40%" delay={7} size={6} color="#EC4899" />
              <Sparkle top="20%" left="30%" delay={8} size={8} color="#8B5CF6" />
              <Sparkle top="60%" left="70%" delay={9} size={7} color="#3B82F6" />
              <Sparkle top="40%" left="20%" delay={10} size={5} color="#10B981" />
            </>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="text-xl text-gray-300 mb-6"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Hello, I&apos;m <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{
                  scale: [1, 1.1, 1],
                  color: ["#8B5CF6", "#EC4899", "#8B5CF6"]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >J Eshwar</motion.span>, a 20-year-old, IInd year BTech Computer Science and Engineering (AI/ML) student at <motion.span
                className="font-semibold text-purple-300"
                whileHover={{ color: "#EC4899" }}
              >SRM Institute of Science And Technology, Tiruchirappalli</motion.span>, from Tamil Nadu with a relentless passion for technology and innovation. I firmly believe that learning is a lifelong journey, and I am constantly on the path of exploring, experimenting, and enhancing my skills to stay ahead in the fast-evolving tech landscape.
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="text-xl text-gray-300 mb-6"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              As a dedicated and enthusiastic learner, I have developed a strong interest in web development as a <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >full-stack MERN developer</motion.span>. My frontend expertise lies in creating responsive, user-friendly, and visually appealing UI/UX designs using <motion.span
                className="inline-block"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 5 }}
              >⚛️</motion.span> React.js and other modern frameworks.

              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                On the backend, I&apos;m proficient with <motion.span
                  className="relative inline-block font-semibold text-green-400"
                  whileHover={{ scale: 1.1 }}
                >Node.js <motion.span
                  className="absolute -top-3 -right-3 text-sm"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >🟢</motion.span></motion.span> and <motion.span
                  className="relative inline-block font-semibold text-blue-400"
                  whileHover={{ scale: 1.1 }}
                >Express.js <motion.span
                  className="absolute -top-3 -right-3 text-sm"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >🚂</motion.span></motion.span>, creating robust APIs and server-side applications. I work with both <motion.span
                  className="relative inline-block font-semibold text-green-400"
                  whileHover={{ scale: 1.1 }}
                >MongoDB <motion.span
                  className="absolute -top-3 -right-3 text-sm"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                >🍃</motion.span></motion.span> and SQL databases, implementing efficient data models and queries. I enjoy the challenge of blending creativity with functionality to deliver seamless and impactful full-stack digital experiences, handling everything from server architecture to beautiful user interfaces.
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div
              className="text-xl text-gray-300 mb-6"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Beyond academics, I dedicate my time to mastering new tools and technologies that align with my interests in <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.1 }}
              >artificial intelligence <motion.span
                className="absolute -top-4 -right-4 text-lg"
                animate={{
                  y: [0, -10, 0],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >✨</motion.span></motion.span>, machine learning, and web development. I thrive in dynamic environments that encourage collaboration, innovation, and problem-solving. My ability to adapt and quickly grasp new concepts ensures that I am always prepared to tackle complex challenges head-on.
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.div
              className="text-xl text-gray-300 mb-6"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              Coming from the culturally rich state of Tamil Nadu, I carry the values of perseverance, hard work, and dedication in everything I do. These values drive me to not only enhance my technical skills but also grow as an individual who can contribute meaningfully to the tech community.
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <motion.div
              className="text-xl text-gray-300 mb-6"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              I aspire to work on projects that push the boundaries of technology and leave a lasting impact. Whether it&apos;s building creative web applications, designing intuitive interfaces, or exploring AI-powered solutions, I am always ready to take on new opportunities that help me grow and make a difference.
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <motion.div
              className="text-xl text-gray-300"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Let&apos;s <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
                whileHover={{ scale: 1.2 }}
              >
                connect
                <motion.span
                  className="absolute -top-3 -right-3 text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 20, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                >
                  ✨
                </motion.span>
              </motion.span> and <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
                style={{ backgroundSize: "200% 200%" }}
                whileHover={{ scale: 1.2 }}
              >
                collaborate
                <motion.span
                  className="absolute -top-3 -right-3 text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, -20, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 7
                  }}
                >
                  ✨
                </motion.span>
              </motion.span> to shape the future of technology together!

              <motion.span
                className="inline-block relative"
                whileHover={{ scale: 1.5, rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  🚀
                </motion.span>
                <motion.span
                  className="absolute -bottom-1 -left-1 w-full h-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 255, 255, 0)",
                      "0 0 0 4px rgba(255, 255, 255, 0.1)",
                      "0 0 0 0 rgba(255, 255, 255, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ borderRadius: "50%" }}
                />
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Timeline */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <EnhancedHeading level={2}>My Journey</EnhancedHeading>

        <Timeline items={timelineItems} />
      </section>

      {/* Skills Radar */}
      <section id="skills" ref={skillsRef} className="container mx-auto px-4 py-16 md:py-24">
        <EnhancedHeading level={2}>My Skills</EnhancedHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div className="space-y-6">
            <motion.h3
              className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Frontend
            </motion.h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'React', level: 95, color: '#61DAFB' },
                { name: 'Next.js', level: 90, color: '#000000' },
                { name: 'TypeScript', level: 85, color: '#3178C6' },
                { name: 'Tailwind CSS', level: 90, color: '#38B2AC' },
                { name: 'Framer Motion', level: 80, color: '#FF4154' },
                { name: 'Three.js', level: 75, color: '#000000' },
              ].map((skill, index) => (
                <SkillCube
                  key={skill.name}
                  skill={skill}
                  index={index}
                  className="skill-card"
                />
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="space-y-6">
            <motion.h3
              className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Backend
            </motion.h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Node.js', level: 92, color: '#68A063' },
                { name: 'Express.js', level: 88, color: '#000000' },
                { name: 'MongoDB', level: 85, color: '#4DB33D' },
                { name: 'PostgreSQL', level: 80, color: '#336791' },
                { name: 'RESTful APIs', level: 90, color: '#FF6C37' },
                { name: 'GraphQL', level: 75, color: '#E535AB' },
              ].map((skill, index) => (
                <SkillCube
                  key={skill.name}
                  skill={skill}
                  index={index + 6}
                  className="skill-card"
                />
              ))}
            </div>
          </div>

          {/* Other Skills */}
          <div className="space-y-6">
            <motion.h3
              className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Other Skills
            </motion.h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Git & GitHub', level: 90, color: '#F05032' },
                { name: 'UI/UX Design', level: 85, color: '#FF61F6' },
                { name: 'Responsive Design', level: 92, color: '#2196F3' },
                { name: 'Performance', level: 88, color: '#4CAF50' },
                { name: 'Deployment', level: 85, color: '#FF9800' },
                { name: 'Problem Solving', level: 95, color: '#9C27B0' },
              ].map((skill, index) => (
                <SkillCube
                  key={skill.name}
                  skill={skill}
                  index={index + 12}
                  className="skill-card"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Skill Cube Component
interface SkillCubeProps {
  skill: {
    name: string;
    icon?: string;
    color: string;
    level: number;
  };
  index: number;
  className?: string;
}

function SkillCube({ skill, index, className }: SkillCubeProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`${className} h-40 perspective-1000`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: index * 0.1
        }
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full transform-style-3d"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          z: 50,
          transition: { duration: 0.3 }
        }}
      >
        {/* Front face */}
        <motion.div
          className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 rounded-xl"
          style={{
            backgroundColor: `rgba(0, 0, 0, 0.7)`,
            backgroundImage: `radial-gradient(circle at center, rgba(${hexToRgb(skill.color)}, 0.3), transparent 70%)`,
            border: `2px solid ${skill.color}`,
            boxShadow: `0 0 15px ${skill.color}80`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D floating content */}
          <motion.div
            className="transform-style-3d"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.div
              className="text-4xl mb-3"
              animate={{
                rotateY: [0, 360],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.2
                }
              }}
            >
              {getSkillIcon(skill.name)}
            </motion.div>

            <h4 className="text-center font-bold text-white mb-2">{skill.name}</h4>

            <div className="w-full bg-gray-700/50 rounded-full h-1.5">
              <motion.div
                className="h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${skill.color}, #ff00ff)`
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          {/* Animated corners */}
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-3 h-3"
              style={{
                borderStyle: 'solid',
                borderWidth: corner < 2 ? '2px 0 0 2px' : corner === 2 ? '0 0 2px 2px' : '0 2px 2px 0',
                borderColor: skill.color,
                top: corner < 2 ? '4px' : 'auto',
                bottom: corner >= 2 ? '4px' : 'auto',
                left: corner === 0 || corner === 2 ? '4px' : 'auto',
                right: corner === 1 || corner === 3 ? '4px' : 'auto',
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1 + corner * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;

  return `${r}, ${g}, ${b}`;
}

// Helper function to get skill icon
function getSkillIcon(skillName: string): string {
  const lowerSkill = skillName.toLowerCase();

  if (lowerSkill.includes('react')) return '⚛️';
  if (lowerSkill.includes('node')) return '🟢';
  if (lowerSkill.includes('mongo')) return '🍃';
  if (lowerSkill.includes('express')) return '🚂';
  if (lowerSkill.includes('next')) return '▲';
  if (lowerSkill.includes('postgre')) return '🐘';
  if (lowerSkill.includes('type')) return '📘';
  if (lowerSkill.includes('tailwind')) return '🌊';
  if (lowerSkill.includes('git')) return '📂';
  if (lowerSkill.includes('ui')) return '🎨';
  if (lowerSkill.includes('responsive')) return '📱';
  if (lowerSkill.includes('performance')) return '⚡';
  if (lowerSkill.includes('deploy')) return '🚀';
  if (lowerSkill.includes('problem')) return '🧩';
  if (lowerSkill.includes('rest')) return '🔄';
  if (lowerSkill.includes('graph')) return '📊';
  if (lowerSkill.includes('framer')) return '🔄';
  if (lowerSkill.includes('three')) return '🎮';

  return '💻';
}
