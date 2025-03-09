"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

interface Developer {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

export default function HeroSection() {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/developer");
        if (response.data && response.data.length > 0) {
          setDeveloper(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching developer info:", error);
        // Fallback data
        setDeveloper({
          name: "Bohdan Shapovalov",
          title: "Full Stack Web Developer",
          bio: "Passionate developer crafting modern web experiences",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-36 h-36 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-3000"></div>
      </div>
      
      {/* Animated stripes */}
      <div className="absolute top-1/4 -left-10 w-[120%] h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent"></div>
      <div className="absolute top-2/4 -left-10 w-[120%] h-px bg-gradient-to-r from-transparent via-primary-400/20 to-transparent"></div>
      <div className="absolute top-3/4 -left-10 w-[120%] h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              Hi, I'm{" "}
              <motion.span 
                className="text-primary-600 dark:text-primary-400 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {developer?.name || "Bohdan Shapovalov"}
                <svg className="absolute -z-10 -bottom-2 left-0 w-full h-3 text-primary-200 dark:text-primary-700" 
                  viewBox="0 0 200 9" preserveAspectRatio="none">
                  <path d="M0,5 C50,0 150,0 200,5 L200,9 L0,9 Z" fill="currentColor"/>
                </svg>
              </motion.span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {developer?.title || "Full Stack Web Developer"}
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {developer?.bio ||
                "Passionate about creating elegant, efficient, and user-friendly web applications."}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2"
              >
                <span>View My Work</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium py-3 px-8 rounded-lg border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex justify-center relative"
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -z-10 w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-dashed border-primary-200 dark:border-primary-800"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            ></motion.div>
            
            <motion.div 
              className="absolute -z-10 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border border-primary-100 dark:border-primary-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            ></motion.div>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl z-10">
              {developer?.avatar ? (
                <Image 
                  src={developer.avatar} 
                  alt={developer.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-100 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                  <motion.span 
                    className="text-6xl font-bold text-primary-600 dark:text-primary-300"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {developer?.name?.charAt(0) || "B"}
                  </motion.span>
                </div>
              )}
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute top-0 right-0 md:right-12 w-20 h-20 rounded-xl bg-white dark:bg-gray-800 shadow-lg p-5 flex items-center justify-center transform rotate-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-4 left-0 md:-left-8 w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-lg p-4 flex items-center justify-center transform -rotate-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ArrowDownIcon className="h-8 w-8 text-primary-600 dark:text-primary-400 animate-bounce" />
      </motion.a>
    </section>
  );
}