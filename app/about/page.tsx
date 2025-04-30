'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Timeline from '../../components/Timeline';
import gsap from 'gsap';
import EnhancedHeading from '../../components/EnhancedHeading';

// Timeline data
const timelineItems = [
  {
    id: 1,
    title: 'Prodigy Infotech Internship',
    date: '2023',
    description: 'Worked on full-stack web development projects using the MERN stack, focusing on responsive design and user experience.',
  },
  {
    id: 2,
    title: 'NASSCOM Hackathon',
    date: '2022',
    description: 'Participated in the NASSCOM Hackathon, developing innovative solutions to real-world problems using cutting-edge technologies.',
  },
  {
    id: 3,
    title: 'Smart India Hackathon',
    date: '2022',
    description: 'Competed in the Smart India Hackathon, collaborating with a team to create impactful digital solutions for societal challenges.',
  },
  {
    id: 4,
    title: 'Beach Buddy Project',
    date: '2021',
    description: 'Developed Beach Buddy, a web application that helps users find and connect with beach activities and services.',
  },
  {
    id: 5,
    title: 'NGL-like App Development',
    date: '2021',
    description: 'Created an anonymous Q&A platform similar to NGL, implementing secure authentication and real-time messaging features.',
  },
];

export default function About() {
  const skillsRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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
          className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl text-gray-300 mb-6">
            I'm J Eshwar, a passionate Full-Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js) with expertise in Next.js and PostgreSQL.
          </p>
          <p className="text-xl text-gray-300 mb-6">
            With a background in hackathons (NASSCOM, Smart India Hackathon) and professional experience, I blend technical expertise with creative problem-solving to build immersive, user-centric web applications.
          </p>
          <p className="text-xl text-gray-300">
            I'm dedicated to creating visually stunning, high-performance applications that deliver exceptional user experiences. My approach combines cutting-edge technologies with clean, maintainable code to bring ideas to life.
          </p>
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
function SkillCube({ skill, index, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e) => {
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
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;

  return `${r}, ${g}, ${b}`;
}

// Helper function to get skill icon
function getSkillIcon(skillName) {
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
