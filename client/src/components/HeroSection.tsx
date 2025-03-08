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
    <section className="relative min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                {developer?.name || "Bohdan Shapovalov"}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {developer?.title || "Full Stack Web Developer"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              {developer?.bio ||
                "Passionate about creating elegant, efficient, and user-friendly web applications."}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium py-3 px-6 rounded-lg border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-600 dark:border-indigo-400 shadow-2xl">
              {developer?.avatar ? (
                <Image 
                  src={developer.avatar} 
                  alt={developer.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">
                    {developer?.name?.charAt(0) || "B"}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ArrowDownIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-bounce" />
      </motion.a>
    </section>
  );
}