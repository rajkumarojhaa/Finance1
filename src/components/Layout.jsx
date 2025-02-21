import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Layout({ children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();  // Initialize useNavigate

  const handleClick = () => {
    navigate('/add-transaction');  // Navigate to AddTransaction page
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-gray-200 dark:bg-gray-800 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              
              {/* Left Section: Sidebar Button & Logo */}
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Link to="/">
                  <img src="/IDLOGO1.png" alt="Company Logo" className="sm:h-10 h-7 w-auto sm:ml-3 ml-1 lg:ml-0" />
                </Link>
              </div>

              {/* Middle Section: Buttons */}
              <div className="flex-1 flex justify-center gap-1 sm:gap-3">
                <button onClick={handleClick} className='sm:text-sm text-xs font-thin bg-blue-800 text-white rounded-md p-1'>
                  Add Transaction
                </button>
                <Link to="/">
                  <button className='sm:text-sm text-xs font-thin bg-blue-800 text-white rounded-md p-2'>Dashboard</button>
                </Link>
              </div>

              {/* Right Section: Icons & Profile */}
              <div className="flex items-center gap-3 sm:mr-4">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative">
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                    />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Account Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
