"use client"
import React, { useState, useEffect } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import Lanyard from "@/components/Lanyard/Lanyard";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap'
});

export default function MinimalPortfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const words = [
    "Backend Developer",
    "Full-Stack Developer",
    "System Designer",
    "Problem Solver"
  ];

  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');

    const initialTheme = storedTheme === 'dark' || (!storedTheme && darkModePreference.matches);
    setIsDarkMode(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-white dark:bg-gray-900 transition-colors duration-300"
        style={{ zIndex: 0 }}
      />

      {/* Lanyard Container */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 50 }}>
        <Lanyard
          position={[10, 0, 15]}
          gravity={[0, -20, 0]}
          transparent={true}
        />
      </div>

      {/* Main Content */}
      <main className={`relative ${poppins.className} min-h-screen flex flex-col`} style={{ zIndex: 2 }}>
        {/* Center Content */}
        <div className="flex flex-1 items-center justify-start h-full px-4 sm:px-6 md:px-12">
          <div className="w-full max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white font-light">
                Hi, I'm{' '}
                <span className="font-normal">Anil Unni</span>
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light flex justify-center sm:justify-start gap-2">
                A <FlipWords words={words} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Controls Container */}
      <div className="fixed bottom-4 left-0 w-full px-4 sm:px-6 py-4 flex flex-row justify-between items-center gap-4" style={{ zIndex: 1000 }}>
        {/* Social Links */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a href="mailto:anilunni@outlook.com" className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200" aria-label="Email">
            <FaEnvelope className="w-5 h-5" />
          </a>
          <a href="https://github.com/anil-unni" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200" aria-label="GitHub">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/anilunni" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200" aria-label="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Theme Toggle Button */}
        <motion.button
          onClick={handleThemeToggle}
          className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 backdrop-blur-sm transition-all duration-200"
          aria-label="Toggle theme"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isDarkMode ? (
            <FaSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FaMoon className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
