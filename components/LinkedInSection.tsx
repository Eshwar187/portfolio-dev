'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EnhancedHeading from './EnhancedHeading';

// LinkedIn data structure
interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
  activities?: string;
}

interface Certification {
  id: number;
  name: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialURL?: string;
}

interface LinkedInData {
  profileUrl: string;
  name: string;
  headline: string;
  location: string;
  about: string;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
  profileImageUrl?: string;
}

// Sample LinkedIn data for J Eshwar
const linkedInData: LinkedInData = {
  profileUrl: "https://www.linkedin.com/in/j-eshwar-7b8854289/",
  name: "J Eshwar",
  headline: "Full-Stack MERN Developer | Next.js | React | Node.js | MongoDB | Express.js | PostgreSQL",
  location: "Chennai, Tamil Nadu, India",
  about: "I'm a passionate Full-Stack Developer specializing in the MERN stack, Next.js, and PostgreSQL. With a strong foundation in both frontend and backend technologies, I create immersive digital experiences that combine technical excellence with creative design.",
  experiences: [
    {
      id: 1,
      title: "Web Development Intern",
      company: "Prodigy Infotech",
      location: "Remote",
      startDate: "June 2023",
      endDate: "July 2023",
      description: "Worked on full-stack web development projects using the MERN stack, focusing on responsive design and user experience. Developed and maintained web applications with React.js frontend and Node.js/Express.js backend.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Responsive Design", "UI/UX"]
    }
  ],
  education: [
    {
      id: 1,
      school: "Saveetha Engineering College",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startDate: "2021",
      endDate: "2025",
      grade: "8.5 CGPA"
    }
  ],
  certifications: [
    {
      id: 1,
      name: "Full-Stack Web Development",
      organization: "Udemy",
      issueDate: "2022"
    },
    {
      id: 2,
      name: "React - The Complete Guide",
      organization: "Udemy",
      issueDate: "2022"
    }
  ],
  skills: [
    "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL",
    "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Git", "GitHub",
    "RESTful APIs", "GraphQL", "Responsive Design", "UI/UX Design", "Problem Solving"
  ],
  profileImageUrl: "/profile-photo.jpg"
};

const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<LinkedInData | null>(null);

  useEffect(() => {
    // Simulate loading data from LinkedIn API
    const timer = setTimeout(() => {
      setData(linkedInData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-400">Failed to load LinkedIn data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <EnhancedHeading level={2}>My LinkedIn Profile</EnhancedHeading>

      {/* Profile Header */}
      <motion.div
        className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50">
            <Image
              src={data.profileImageUrl || "/profile-photo.jpg"}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{data.name}</h3>
            <p className="text-xl text-purple-300 mb-4">{data.headline}</p>
            <p className="text-gray-300 mb-4">{data.location}</p>
            <p className="text-gray-300 mb-6">{data.about}</p>
            <Link
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
              View LinkedIn Profile
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 relative z-10">Experience</h3>

        <div className="space-y-6">
          {data.experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold">{exp.title}</h4>
                  <p className="text-purple-300">{exp.company}</p>
                </div>
                <div className="text-gray-400 mt-2 md:mt-0 text-sm">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <p className="text-gray-300 mb-4">{exp.location}</p>
              <p className="text-gray-300 mb-4">{exp.description}</p>

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 relative z-10">Education</h3>

        <div className="space-y-6">
          {data.education.map((edu) => (
            <motion.div
              key={edu.id}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold">{edu.school}</h4>
                  <p className="text-purple-300">{edu.degree}, {edu.field}</p>
                </div>
                <div className="text-gray-400 mt-2 md:mt-0 text-sm">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              {edu.grade && <p className="text-gray-300">Grade: {edu.grade}</p>}
              {edu.activities && <p className="text-gray-300 mt-2">{edu.activities}</p>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 relative z-10">Certifications</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-2">{cert.name}</h4>
              <p className="text-purple-300 mb-2">{cert.organization}</p>
              <p className="text-gray-400 text-sm">
                Issued: {cert.issueDate}
                {cert.expirationDate && ` • Expires: ${cert.expirationDate}`}
              </p>
              {cert.credentialId && (
                <p className="text-gray-300 mt-2">Credential ID: {cert.credentialId}</p>
              )}
              {cert.credentialURL && (
                <Link
                  href={cert.credentialURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Credential
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 relative z-10">Skills</h3>

        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20">
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-white rounded-full"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)'
                }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LinkedInSection;
