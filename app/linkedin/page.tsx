'use client';

import LinkedInSection from '../../components/LinkedInSection';
import { motion } from 'framer-motion';
import EnhancedHeading from '../../components/EnhancedHeading';

export default function LinkedInPage() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <EnhancedHeading level={1}>My LinkedIn Profile</EnhancedHeading>

        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore my professional journey, skills, and experiences directly from my LinkedIn profile.
        </motion.p>
      </section>

      <LinkedInSection />
    </div>
  );
}
