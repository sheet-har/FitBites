
import React, { useEffect, useState } from 'react';
import { Sun, Moon, LogOut, Settings, Bell, Search } from 'lucide-react';
import { AppSection, UserProfile } from '../types';
import { NAVIGATION_ITEMS } from '../constants.tsx';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeSection, 
  setActiveSection, 
  isDark, 
  toggleTheme 
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('fitbites_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fitbites_user');
    window.location.reload();
  };

  return (
    <div className={`min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col h-screen sticky top-0">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="bg-fitGreen-500 p-2 rounded-xl">
               <img src="https://picsum.photos/seed/fitbiteslogo/40/40" className="w-8 h-8 rounded" alt="Logo" />
            </div>
            <span className="text-2xl font-black text-fitGreen-600">FitBites</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                activeSection === item.id 
                  ? 'bg-fitGreen-500 text-white shadow-lg shadow-fitGreen-500/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-fitGreen-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className={activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover:text-fitGreen-500'}>
                {item.icon}
              </div>
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings size={20} />
            <span className="font-semibold text-sm">Settings</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-semibold text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products, insights..." 
                className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-2xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-fitGreen-500 dark:text-white outline-none"
              />
            </div>
          </div>
          
          <div className="lg:hidden flex items-center gap-2">
            <div className="bg-fitGreen-500 p-1.5 rounded-lg">
               <img src="https://picsum.photos/seed/f/32/32" className="w-6 h-6 rounded" alt="Logo" />
            </div>
            <span className="font-black text-fitGreen-600">FitBites</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative p-2.5 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-fitGreen-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </div>
            <div 
              onClick={() => setActiveSection(AppSection.Profile)}
              className="h-10 w-10 rounded-2xl bg-fitBrown-500 border-2 border-white dark:border-gray-700 shadow-sm overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
               <img 
                 src={user?.profilePic || `https://picsum.photos/seed/${user?.email}/80/80`} 
                 alt="Avatar" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 lg:p-8 flex-1 animate-in fade-in duration-500">
          {children}
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden h-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center justify-around px-2 sticky bottom-0 z-40">
           {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
             <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  activeSection === item.id 
                    ? 'text-fitGreen-600' 
                    : 'text-gray-400'
                }`}
             >
                {item.icon}
                <span className="text-[10px] font-bold uppercase">{item.label}</span>
             </button>
           ))}
        </nav>
      </main>
    </div>
  );
};
