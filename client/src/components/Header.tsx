"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // UseEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Disclosure as="header" className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="font-poppins font-bold text-xl text-indigo-600 dark:text-indigo-400">
                    BS
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                  <div className="flex space-x-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <button
                    aria-label="Toggle Dark Mode"
                    type="button"
                    className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  aria-label="Toggle Dark Mode"
                  type="button"
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
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

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}