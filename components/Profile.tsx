
import React from 'react';
import { User, Mail, Shield, Zap, Award, Edit2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-fitGreen-50 dark:bg-fitGreen-900/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-fitBrown-500 overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
              <img 
                src={user.profilePic || `https://picsum.photos/seed/${user.email}/200/200`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 bg-fitGreen-500 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
              <Edit2 size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black dark:text-white">{user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-1">
              <Mail size={16} /> {user.email}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <span className="bg-fitGreen-100 dark:bg-fitGreen-900/30 text-fitGreen-700 dark:text-fitGreen-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {user.lifestyle} Lifestyle
              </span>
              <span className="bg-fitBrown-100 dark:bg-fitBrown-900/30 text-fitBrown-700 dark:text-fitBrown-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Age: {user.age}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 min-w-[200px]">
            <p className="text-xs font-bold text-gray-400 uppercase mb-4">Account Status</p>
            <div className="flex items-center gap-3">
              <Shield className="text-fitGreen-500" />
              <div>
                <p className="font-bold dark:text-white">Pro Member</p>
                <p className="text-xs text-gray-500">Expires Dec 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
            <Zap className="text-amber-500" /> My Health Goals
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.dietaryGoals.map((goal, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                {goal}
              </div>
            ))}
            <button className="px-4 py-2 rounded-xl text-sm font-bold text-fitGreen-600 hover:bg-fitGreen-50 dark:hover:bg-fitGreen-900/20 transition-colors">
              + Add Goal
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
            <Award className="text-fitBrown-500" /> Achievement Badges
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
                <img src={`https://picsum.photos/seed/badge${i}/80/80`} alt="Badge" className="w-10 h-10 rounded" />
              </div>
            ))}
            <div className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center text-gray-300">
              ?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
