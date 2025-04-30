'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NumberGuessingGame from '../../components/NumberGuessingGame';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Building Beach Buddy with MERN Stack',
    excerpt: 'Learn how I built Beach Buddy, a comprehensive beach activity platform, using MongoDB, Express, React, and Node.js.',
    date: 'April 15, 2023',
    category: 'Web Development',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Integrating PostgreSQL with Next.js',
    excerpt: 'A step-by-step guide on how to integrate PostgreSQL with Next.js for building robust, full-stack applications.',
    date: 'March 22, 2023',
    category: 'Database',
    readTime: '6 min read',
  },
  {
    id: 3,
    title: 'Creating 3D Animations with React Three Fiber',
    excerpt: 'Explore how to add immersive 3D elements to your React applications using React Three Fiber and Three.js.',
    date: 'February 10, 2023',
    category: 'Animation',
    readTime: '10 min read',
  },
  {
    id: 4,
    title: 'Lessons from Smart India Hackathon',
    excerpt: 'Key takeaways and lessons learned from participating in the Smart India Hackathon, including team collaboration and rapid prototyping.',
    date: 'January 5, 2023',
    category: 'Hackathon',
    readTime: '5 min read',
  },
  {
    id: 5,
    title: 'Optimizing React Performance',
    excerpt: 'Advanced techniques for optimizing React applications, including code splitting, memoization, and efficient state management.',
    date: 'December 12, 2022',
    category: 'Performance',
    readTime: '7 min read',
  },
  {
    id: 6,
    title: 'Building Secure Authentication Systems',
    excerpt: 'Best practices for implementing secure authentication in web applications, including JWT, OAuth, and multi-factor authentication.',
    date: 'November 28, 2022',
    category: 'Security',
    readTime: '9 min read',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Blog</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Insights, tutorials, and thoughts on web development, technology, and my experiences as a full-stack developer.
        </motion.p>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)' }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-purple-300 bg-purple-900/30 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {post.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                  <Link href={`/blog/${post.id}`}>
                    <motion.button
                      className="text-purple-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More →
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Game Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm p-12 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Number Guessing Challenge</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-center">
            Can you guess the secret number in 5 attempts? Test your deduction skills with this interactive game!
          </p>

          <NumberGuessingGame />
        </motion.div>
      </section>

    </div>
  );
}
