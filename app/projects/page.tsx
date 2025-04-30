'use client';

import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import EnhancedHeading from '../../components/EnhancedHeading';

// Project data
const projects = [
  {
    id: 1,
    title: 'Beach Buddy',
    description: 'A comprehensive web application that helps users find and connect with beach activities, services, and communities. Features include real-time weather updates, beach ratings, and social networking.',
    image: '/beach-buddy.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    githubLink: 'https://github.com/username/beach-buddy',
    demoLink: 'https://beach-buddy-demo.vercel.app',
  },
  {
    id: 2,
    title: 'Anonymous Q&A Platform',
    description: 'An NGL-like application that allows users to receive anonymous questions and messages. Includes features like custom themes, message filtering, and social media integration.',
    image: '/ngl-app.jpg',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'],
    githubLink: 'https://github.com/username/anonymous-qa',
    demoLink: 'https://anonymous-qa-demo.vercel.app',
  },
  {
    id: 3,
    title: 'Smart Healthcare Solution',
    description: 'A Smart India Hackathon project that provides an AI-powered healthcare platform for remote diagnosis and patient monitoring. Includes features like symptom analysis and appointment scheduling.',
    image: '/healthcare-app.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TensorFlow.js'],
    githubLink: 'https://github.com/username/smart-healthcare',
  },
  {
    id: 4,
    title: 'E-Learning Platform',
    description: 'A comprehensive e-learning platform with features like course creation, video lectures, quizzes, and progress tracking. Supports both instructors and students with a clean, intuitive interface.',
    image: '/elearning-platform.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'AWS S3'],
    githubLink: 'https://github.com/username/elearning-platform',
    demoLink: 'https://elearning-demo.vercel.app',
  },
  {
    id: 5,
    title: 'Task Management App',
    description: 'A feature-rich task management application with Kanban boards, task prioritization, team collaboration, and deadline reminders. Designed for both personal and team productivity.',
    image: '/task-app.jpg',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Auth0'],
    githubLink: 'https://github.com/username/task-management',
    demoLink: 'https://task-management-demo.vercel.app',
  },
  {
    id: 6,
    title: 'Real-time Chat Application',
    description: 'A modern chat application with real-time messaging, group chats, file sharing, and end-to-end encryption. Features a responsive design for seamless use across devices.',
    image: '/chat-app.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Firebase'],
    githubLink: 'https://github.com/username/chat-app',
    demoLink: 'https://chat-app-demo.vercel.app',
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <EnhancedHeading level={1}>My Projects</EnhancedHeading>

        <motion.p
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore my portfolio of web applications, from full-stack MERN projects to Next.js and PostgreSQL solutions. Each project showcases my skills in creating interactive, user-friendly experiences.
        </motion.p>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm p-12 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a project in mind?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Let's discuss how we can work together to bring your ideas to life.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
