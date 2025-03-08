"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

interface Project {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback data
        setProjects([
          {
            _id: "1",
            title: "E-commerce Platform",
            description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB",
            featuredImage: "https://via.placeholder.com/600x400",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com",
          },
          {
            _id: "2",
            title: "Task Management App",
            description: "A task management application with drag-and-drop functionality",
            featuredImage: "https://via.placeholder.com/600x400",
            technologies: ["React", "TypeScript", "Firebase"],
            githubUrl: "https://github.com",
          },
          {
            _id: "3",
            title: "Portfolio Website",
            description: "A modern portfolio website built with Next.js and Tailwind CSS",
            featuredImage: "https://via.placeholder.com/600x400",
            technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com",
          },
        ]);
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1.5 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Check out some of my recent work
          </p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 w-full">
                {project.featuredImage ? (
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <CodeBracketIcon className="h-5 w-5 mr-1" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-1" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}