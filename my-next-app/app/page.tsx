"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Home() {

  const [currentTagline, setCurrentTagline] = useState(0);

  const taglines = [
    "Innovative Web Developer",
    "Passionate Tech Enthusiast",
    "Creative Problem Solver",
    "Design Thinker",
    "Tech-Savvy Innovator",
    "Full-Stack Developer",
    "User-Centric Designer",
    "Agile Developer",
  ];

  const handleScroll = (event:any) => {
    if (event.deltaY > 0) {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    } else {
      setCurrentTagline((prev) => (prev - 1 + taglines.length) % taglines.length);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl text-white mb-4 text-center"
        >Hi, I&apos;m</motion.h2>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-white mb-4 text-center"
      >
        Anil Unni
      </motion.h1>
      <motion.p
        key={currentTagline}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0, y: -50 }} // Dissolve effect on exit
        className="text-2xl md:text-3xl text-white mb-8 text-center"
      >
        {taglines[currentTagline]}
      </motion.p>
      <div className="mt-8 space-x-4 flex">
        <a
          href='mailto:anilunni@outlook.com'
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 text-3xl"
        >
          <MdEmail />
        </a>
        <a
          href="https://github.com/anil-unni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 text-3xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/anilunni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 text-3xl"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
