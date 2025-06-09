'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from './Logo';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-lg py-4 shadow-lg shadow-[#6c3ce9]/20'
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6c3ce9] to-[#ff3d87] rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2 bg-gradient-to-r from-[#6c3ce9] to-[#ff3d87] rounded-full text-white font-medium hover:from-[#8a4bff] hover:to-[#ff5c9e] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.nav
        className={`md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg shadow-lg shadow-[#6c3ce9]/20 overflow-hidden border-t border-[#6c3ce9]/20`}
        initial={{ height: 0 }}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#6c3ce9]/20 text-white border-l-2 border-[#6c3ce9]'
                      : 'text-gray-300 hover:bg-[#6c3ce9]/10 hover:text-white hover:border-l-2 hover:border-[#6c3ce9]/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            );
          })}

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-gradient-to-r from-[#6c3ce9] to-[#ff3d87] rounded-lg text-white font-medium hover:from-[#8a4bff] hover:to-[#ff5c9e] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-500/20"
            onClick={() => setIsMobileMenuOpen(false)}
            whileTap={{ scale: 0.98 }}
          >
            Resume
          </motion.a>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Navigation;
