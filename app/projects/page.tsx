'use client';

import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import EnhancedHeading from '../../components/EnhancedHeading';

// Project data
const projects = [
  // Completed Projects
  {
    id: 1,
    title: 'Employee Management System',
    description: 'A comprehensive Employee Management System built with React.js and Tailwind CSS. Features include login system, Admin Dashboard for employee management, and Employee Dashboard for profile handling—all powered by local storage.',
    image: '/ems.jpg',
    technologies: ['React.js', 'Tailwind CSS', 'User Interface Design', 'Local Storage'],
    demoLink: 'https://www.linkedin.com/in/j-eshwar-7b8854289/details/projects/',
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Developed a weather app using React.js that provides real-time updates and forecasts. It features an intuitive UI for easy location searches, displaying temperature, humidity, wind speed. Integrated with a weather API for accurate data and ensured responsiveness for various devices.',
    image: '/weather.jpg',
    technologies: ['React.js', 'Weather API', 'User Interface Design', 'Responsive Web Design', 'HTML5'],
    demoLink: 'https://weather-app-blue-chi-77.vercel.app/',
  },
  {
    id: 3,
    title: 'Todolist',
    description: 'A powerful frontend tool for managing tasks, this application offers seamless functionality for creating, updating, and deleting tasks and their descriptions within a personalized to-do list.',
    image: '/todo.jpg',
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Responsive Web Design', 'HTML5', 'Git', 'User Interface Design', 'Front-End Development'],
    demoLink: 'https://todolist-three-indol.vercel.app/',
  },

  // Coming Soon Projects
  {
    id: 4,
    title: 'IG NGL App',
    description: 'An anonymous messaging platform inspired by Instagram and NGL, allowing users to receive and respond to anonymous messages with enhanced privacy features and customizable themes.',
    image: '/profile-photo.jpg',
    technologies: ['React.js', 'Next.js', 'Firebase', 'Authentication', 'Real-time Database', 'UI/UX Design'],
    comingSoon: true,
  },
  {
    id: 5,
    title: 'Beach Buddy',
    description: 'A comprehensive web application that helps users find and connect with beach activities, services, and communities. Features include real-time weather updates, beach ratings, and social networking.',
    image: '/profile-photo.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    comingSoon: true,
  },
  {
    id: 6,
    title: 'ConstructHub.ai',
    description: 'An innovative platform that uses AI to generate floor plans and painting suggestions for construction and interior design projects. Helps users visualize and plan their spaces efficiently.',
    image: '/constructhub.jpg',
    technologies: ['React.js', 'AI Integration', 'Node.js', 'Express', 'UI/UX Design'],
    comingSoon: true,
  },
  {
    id: 7,
    title: 'Buildwise.ai',
    description: 'An advanced construction planning platform that finds local designers and provides AI material suggestions. Similar to ConstructHub.ai but with enhanced features for connecting with professionals and optimizing material selection.',
    image: '/buildwise.jpg',
    technologies: ['React.js', 'AI Integration', 'Node.js', 'Express', 'MongoDB', 'UI/UX Design'],
    comingSoon: true,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                demoLink={project.demoLink}
                comingSoon={project.comingSoon}
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
            I&apos;m always open to new opportunities and collaborations. Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium text-lg hover:from-purple-700 hover:to-pink-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
