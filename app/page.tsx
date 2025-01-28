"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  return (
    <div
      className={`flex flex-col justify-between min-h-screen px-4 md:px-8 lg:px-16 py-8 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } ${poppins.className} transition-colors duration-500`}
    >
      {/* Header */}
      <header className="w-full flex justify-end">
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-full focus:outline-none hover:scale-110 transition-transform"
          aria-label="Toggle Theme"
          whileTap={{ rotate: 180 }}
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-500 text-2xl" />
          ) : (
            <FaMoon className="text-gray-800 text-2xl" />
          )}
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center mt-20">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I’m <span className="text-blue-500">Anil Unni</span>
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mt-6 text-gray-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A <span className="font-semibold">Full-Stack Developer</span> passionate about building scalable and efficient systems.
        </motion.p>
      </main>

      {/* Social Links */}
      <footer className="flex justify-center gap-8 mt-20">
        <motion.a
          href="mailto:anilunni@outlook.com"
          className="text-3xl hover:text-blue-500 transition-colors"
          aria-label="Email"
          whileHover={{ scale: 1.2 }}
        >
          <FaEnvelope />
        </motion.a>
        <motion.a
          href="https://github.com/anil-unni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl hover:text-blue-500 transition-colors"
          aria-label="GitHub"
          whileHover={{ scale: 1.2 }}
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/anilunni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl hover:text-blue-500 transition-colors"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.2 }}
        >
          <FaLinkedin />
        </motion.a>
      </footer>
    </div>
  );
}