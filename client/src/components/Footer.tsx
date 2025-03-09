"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "contact@bohdanshapovalov.com",
    phone: "+1 (234) 567-890"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/developer");
        if (response.data && response.data.length > 0) {
          const developerData = response.data[0];
          setSocialLinks(developerData.socialLinks || []);
          
          // Update contact information
          if (developerData.email) {
            setContactInfo(prev => ({...prev, email: developerData.email}));
          }
          
          if (developerData.phone) {
            setContactInfo(prev => ({...prev, phone: developerData.phone}));
          }
        }
      } catch (error) {
        console.error("Error fetching developer info:", error);
        // Fallback data in case the API is not available
        setSocialLinks([
          { platform: "GitHub", url: "https://github.com/bohdanshapovalov" },
          { platform: "LinkedIn", url: "https://linkedin.com/in/bohdanshapovalov" },
          { platform: "Twitter", url: "https://twitter.com/bohdanshapovalov" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
      {/* Animated stripe background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute h-1 w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-slide"></div>
        <div className="absolute h-1 w-full bg-gradient-to-r from-blue-300 via-teal-300 to-green-400 animate-slide-delay-1 top-6"></div>
        <div className="absolute h-1 w-full bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 animate-slide-delay-2 top-12"></div>
        <div className="absolute h-1 w-full bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-400 animate-slide-delay-3 top-18"></div>
        <div className="absolute h-1 w-full bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 animate-slide-delay-4 top-24"></div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Links */}
          <div className="col-span-full md:col-span-2 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-5 mb-4">
              {!isLoading &&
                socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                    aria-label={link.platform}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{link.platform}</span>
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      {link.platform === "GitHub" && (
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      )}
                      {link.platform === "LinkedIn" && (
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      )}
                      {link.platform === "Twitter" && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                    </svg>
                  </motion.a>
                ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="col-span-full text-center">
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              © {new Date().getFullYear()} Bohdan Shapovalov. All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}