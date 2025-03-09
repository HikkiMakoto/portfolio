"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  // UseEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Set active section based on scroll position
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "/";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          currentSection = `/#${section.id}`;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <Disclosure as="header" className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Animated gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>
            
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex-shrink-0 flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/" className="font-poppins font-bold text-2xl text-primary-600 dark:text-primary-400 relative">
                      <span className="relative z-10">BS</span>
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full -z-10"></span>
                    </Link>
                  </motion.div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                  <div className="flex space-x-6">
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.href;
                      
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors group"
                        >
                          {link.name}
                          {isActive && (
                            <motion.span
                              layoutId="activeSection"
                              className="absolute inset-x-0 -bottom-1 h-[2px] bg-primary-500 dark:bg-primary-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-primary-500 dark:bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                        </Link>
                      );
                    })}
                  </div>
                  
                  <motion.button
                    aria-label="Toggle Dark Mode"
                    type="button"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={resolvedTheme}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {resolvedTheme === "dark" ? (
                          <SunIcon className="h-5 w-5" />
                        ) : (
                          <MoonIcon className="h-5 w-5" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <motion.button
                  aria-label="Toggle Dark Mode"
                  type="button"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mr-2"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={resolvedTheme}
                      initial={{ rotate: -30, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 30, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {resolvedTheme === "dark" ? (
                        <SunIcon className="h-5 w-5" />
                      ) : (
                        <MoonIcon className="h-5 w-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
                
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Disclosure.Panel className="sm:hidden">
                  <motion.div 
                    className="px-2 pt-2 pb-3 space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, staggerChildren: 0.1 }}
                  >
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </Disclosure.Panel>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}