'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Import the blog posts data
import { blogPosts } from '../page';

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the blog post with the matching ID
    const id = params.id;
    const foundPost = blogPosts.find(p => p.id.toString() === id);
    
    if (foundPost) {
      setPost(foundPost);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
        <p className="text-xl text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Blog
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Back Button */}
        <Link href="/blog">
          <motion.button
            className="mb-8 flex items-center text-purple-300 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to Blog
          </motion.button>
        </Link>

        {/* Blog Post Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <span className="text-sm text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">
              {post.date} • {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            {post.title}
          </h1>
        </motion.div>

        {/* Blog Post Content */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20 p-6 md:p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div 
            className="prose prose-invert prose-purple max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Share and Navigation */}
        <motion.div
          className="flex flex-wrap justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex gap-4 mb-4 md:mb-0">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-purple-500 rounded-full text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(138, 43, 226, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Share
            </motion.button>
            
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-purple-500 rounded-full text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(138, 43, 226, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              Tweet
            </motion.button>
          </div>

          <Link href="/blog">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              More Articles
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
