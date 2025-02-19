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

      {/* Lanyard Container - Make sure it's above background but below content */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        <Lanyard
          position={[0, 0, 15]}
          gravity={[0, -20, 0]}
          transparent={true}
        />
      </div>

      {/* Main Content */}
      <main
        className={`relative ${poppins.className} min-h-screen flex flex-col`}
        style={{ zIndex: 2 }}
      >
        {/* Theme Toggle Button */}
        <div className="absolute top-0 right-0 p-6">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full 
              bg-gray-100/80 dark:bg-gray-800/80 
              hover:bg-gray-200/80 dark:hover:bg-gray-700/80
              backdrop-blur-sm transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <FaSun className="w-6 h-6 text-yellow-400" />
            ) : (
              <FaMoon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                text-gray-900 dark:text-white font-light">
                Hi, I'm{' '}
                <span className="font-normal">
                  Anil Unni
                </span>
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl 
                text-gray-700 dark:text-gray-300 font-light flex gap-2">
                A <FlipWords words={words} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <div className="relative p-6 md:p-12">
          <motion.div
            className="flex gap-8 justify-center sm:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="mailto:anilunni@outlook.com"
              className="p-2 text-gray-600 dark:text-gray-400 
                hover:text-blue-600 dark:hover:text-blue-400
                transition-colors duration-200"
              aria-label="Email"
            >
              <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>

            <a
              href="https://github.com/anil-unni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 
                hover:text-blue-600 dark:hover:text-blue-400
                transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>

            <a
              href="https://linkedin.com/in/anilunni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 
                hover:text-blue-600 dark:hover:text-blue-400
                transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}