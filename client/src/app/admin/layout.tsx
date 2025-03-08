"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  UserIcon,
  FolderIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    
    // Skip authentication check for login page
    if (pathname === "/admin/login") {
      return;
    }
    
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Don't render anything on the server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  // Render login page directly without navigation
  if (pathname === "/admin/login") {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Profile", href: "/admin/dashboard", icon: UserIcon },
    { name: "Projects", href: "/admin/projects", icon: FolderIcon },
    { name: "Messages", href: "/admin/messages", icon: EnvelopeIcon },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <div className="fixed z-30 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-md transition-transform overflow-y-auto">
          <div className="px-6 pt-8">
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Admin Panel
            </h2>
          </div>
          <nav className="mt-10 px-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto pt-8">
              <button
                onClick={handleLogout}
                className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-red-500 dark:text-red-400" />
                Logout
              </button>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <main className="py-10 px-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}