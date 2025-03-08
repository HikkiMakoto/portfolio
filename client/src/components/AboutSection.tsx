"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useInView } from "react-intersection-observer";

interface Skill {
  name: string;
  icon?: string;
  proficiency?: number;
}

interface Developer {
  skills: Skill[];
  bio: string;
}

export default function AboutSection() {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          bio: "Passionate full stack developer with experience building modern web applications using React, Node.js, and MongoDB. I focus on creating intuitive, responsive user interfaces and efficient, scalable backend solutions.",
          skills: [
            { name: "JavaScript", proficiency: 90 },
            { name: "TypeScript", proficiency: 85 },
            { name: "React", proficiency: 90 },
            { name: "Next.js", proficiency: 85 },
            { name: "Node.js", proficiency: 85 },
            { name: "NestJS", proficiency: 80 },
            { name: "MongoDB", proficiency: 75 },
            { name: "CSS/Tailwind", proficiency: 85 },
          ],
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-20 h-1.5 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"
          />
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {developer?.bio || "No bio available"}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-16"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8"
          >
            My Skills
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {developer?.skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {skill.name}
                </h4>
                {skill.proficiency && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}