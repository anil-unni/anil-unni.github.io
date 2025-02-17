"use client";

import { FlipWords } from "@/components/ui/flip-words";
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function FlipWordsDemo() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const words = [
    "Backend Developer",
    "Tech Enthusiast",
    "Full-Stack Developer",
    "Problem Solver",
    "System Designer",
    "Database Administrator",
    "Data Analyst",
    "Web Developer",
    "Technical Consultant"
  ];

  // Function to toggle theme and save to local storage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Use effect to set the initial theme based on local storage or system preference
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
      className={`flex flex-col justify-between h-svh px-4 md:px-6 lg:px-12 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } ${poppins.className} transition-all duration-500`}
      style={{ overflow: 'hidden' }} // Prevent scrolling
    >
      {/* Theme Toggle Button */}
      <div className="w-full flex justify-end items-start py-4">
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
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start mt-10 ml-6 md:ml-16 lg:ml-20 max-w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-tight">
          Hi,
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-tight">
          I’m <span>Anil Unni</span>
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight flex flex-row flex-wrap gap-2 mt-4">
          A<FlipWords words={words} />
        </div>
      </div>

      {/* Social Links at the bottom */}
      <div className="flex gap-6 mb-8 ml-4 md:ml-8 lg:ml-12">
        <motion.a
          href="mailto:anilunni@outlook.com"
          className="text-3xl md:text-4xl hover:scale-110 transition-transform"
          aria-label="Email"
          whileHover={{ scale: 1.2 }}
        >
          <FaEnvelope />
        </motion.a>
        <motion.a
          href="https://github.com/anil-unni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl md:text-4xl hover:scale-110 transition-transform"
          aria-label="GitHub"
          whileHover={{ scale: 1.2 }}
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/anilunni"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl md:text-4xl hover:scale-110 transition-transform"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.2 }}
        >
          <FaLinkedin />
        </motion.a>
      </div>
    </div>
  );
}
