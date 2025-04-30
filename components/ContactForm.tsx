'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import emailjs from '@emailjs/browser';
import EnhancedHeading from './EnhancedHeading';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Reset status after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
      const autoreplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;

      if (!serviceId || !contactTemplateId || !autoreplyTemplateId) {
        throw new Error("EmailJS configuration is missing");
      }

      // Common template parameters
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_name: "J Eshwar", // The recipient's name in your EmailJS template
      };

      // Send contact form email to you
      const contactResult = await emailjs.send(
        serviceId,
        contactTemplateId,
        templateParams
      );

      console.log('Contact email sent successfully:', contactResult.text);

      // Send auto-reply email to the user
      const autoreplyResult = await emailjs.send(
        serviceId,
        autoreplyTemplateId,
        {
          ...templateParams,
          to_email: formData.email,
          to_name: formData.name,
        }
      );

      console.log('Auto-reply email sent successfully:', autoreplyResult.text);

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');

      // Reset form using the form reference
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative grid md:grid-cols-2 gap-8 items-center">
      {/* 3D Element */}
      <div className="h-[400px] w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#8a2be2"
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Contact Form */}
      <div className="relative">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 relative z-10">Get In Touch</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-purple-300 mb-2">
              Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-purple-900/20 border ${errors.name ? 'border-red-500' : 'border-purple-500/30'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-purple-300 mb-2">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-purple-900/20 border ${errors.email ? 'border-red-500' : 'border-purple-500/30'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-purple-300 mb-2">
              Message
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 bg-purple-900/20 border ${errors.message ? 'border-red-500' : 'border-purple-500/30'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-400">
                  Message sent successfully! You should receive a confirmation email shortly, and I'll get back to you soon.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-red-400">
                  Failed to send message. Please try again or contact me directly at jeshwar.work@gmail.com
                </p>
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default ContactForm;
