
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Scanner } from './components/Scanner';
import { Marketplace } from './components/Marketplace';
import { Profile } from './components/Profile';
import { Onboarding } from './components/Onboarding';
import { AppSection, UserProfile } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const savedUser = localStorage.getItem('fitbites_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleOnboardingComplete = (userData: UserProfile) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('fitbites_user', JSON.stringify(userData));
  };

  const renderContent = () => {
    if (!user) return null;

    switch (activeSection) {
      case AppSection.Dashboard:
        return <Dashboard />;
      case AppSection.Scanner:
        return <Scanner />;
      case AppSection.Marketplace:
        return <Marketplace />;
      case AppSection.Profile:
        return <Profile user={user} />;
      case AppSection.Analytics:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold dark:text-white">Fat Reduction Analytics</h2>
            <p className="text-gray-500 mt-2 max-w-md">Detailed breakdown of your long-term health improvements. This module is currently processing your monthly data.</p>
            <div className="mt-8 bg-fitGreen-50 dark:bg-fitGreen-900/20 p-8 rounded-3xl border border-fitGreen-100 dark:border-fitGreen-900/50 w-full max-w-2xl">
              <p className="text-fitGreen-600 font-black text-6xl">2.4kg</p>
              <p className="text-gray-500 font-bold uppercase tracking-widest mt-2">Total Unhealthy Fats Replaced</p>
            </div>
          </div>
        );
      case AppSection.Community:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold dark:text-white">Health Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                   <img src={`https://picsum.photos/seed/comm${i}/600/300`} className="w-full h-40 object-cover rounded-2xl mb-4" />
                   <h3 className="text-lg font-bold dark:text-white">30-Day Sugar-Free Challenge</h3>
                   <p className="text-gray-500 text-sm mt-2">Join 12.5k others in reducing trans-fats and processed sugars.</p>
                   <button className="mt-6 w-full py-3 bg-fitBrown-500 text-white font-bold rounded-2xl hover:bg-fitBrown-600">Join Challenge</button>
                </div>
              ))}
            </div>
          </div>
        );
      case AppSection.Education:
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black dark:text-white">Knowledge Hub</h2>
              <p className="text-gray-500">Master the science of healthy fats and smart snacking.</p>
            </div>
            <div className="space-y-4">
              {[
                "Why MCTs are the future of snacking",
                "Hidden trans-fats in common office snacks",
                "The correlation between fat quality and brain focus",
                "How FitBites replaces industrial oils with plant goodness"
              ].map((title, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-2xl flex items-center justify-between group cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-fitGreen-500 transition-colors">
                  <span className="font-bold dark:text-white">{title}</span>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg group-hover:bg-fitGreen-500 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      isDark={isDark}
      toggleTheme={toggleTheme}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
