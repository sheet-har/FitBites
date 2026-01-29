
import React, { useState, useRef } from 'react';
import { ArrowRight, CheckCircle, User, Activity, Mail, Lock, Camera, Upload, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 25,
    email: '',
    lifestyle: 'Moderate',
    dietaryGoals: [],
    profilePic: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const handleComplete = () => onComplete(formData);

  const lifestyles: UserProfile['lifestyle'][] = ['Sedentary', 'Moderate', 'Active', 'Athletic'];
  const goals = ['Weight Loss', 'Muscle Gain', 'Healthier Heart', 'More Energy', 'Better Digestion'];

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryGoals: prev.dietaryGoals.includes(goal)
        ? prev.dietaryGoals.filter(g => g !== goal)
        : [...prev.dietaryGoals, goal]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding a user
    const mockUser: UserProfile = {
      name: 'Alex Johnson',
      email: formData.email || 'alex@example.com',
      age: 28,
      lifestyle: 'Active',
      dietaryGoals: ['Muscle Gain', 'More Energy'],
      profilePic: 'https://picsum.photos/seed/alex/200/200'
    };
    onComplete(mockUser);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full py-8">
        {!isLogin && (
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-fitGreen-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
            ))}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center">
              <div className="bg-fitGreen-100 dark:bg-fitGreen-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img src="https://picsum.photos/seed/fitbiteslogo/64/64" className="w-10 h-10 rounded" alt="Logo" />
              </div>
              <h2 className="text-3xl font-black dark:text-white">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Sign in to continue your health journey.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-fitGreen-500 outline-none dark:text-white"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="Password" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-fitGreen-500 outline-none dark:text-white"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-fitGreen-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-fitGreen-500/30 transition-all"
            >
              Sign In
            </button>
            <p className="text-center text-sm text-gray-500">
              Don't have an account? <span onClick={() => setIsLogin(false)} className="text-fitGreen-600 font-bold cursor-pointer hover:underline">Create Account</span>
            </p>
          </form>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                  <div className="bg-fitGreen-100 dark:bg-fitGreen-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <img src="https://picsum.photos/seed/fitbiteslogo/64/64" className="w-10 h-10 rounded" alt="Logo" />
                  </div>
                  <h2 className="text-3xl font-black dark:text-white">Start FitBites</h2>
                  <p className="text-gray-500 mt-2">Join the revolution of smart snacking.</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-fitGreen-500 outline-none dark:text-white"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="password" 
                      placeholder="Create Password" 
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-fitGreen-500 outline-none dark:text-white"
                    />
                  </div>
                </div>
                <button 
                  onClick={nextStep}
                  disabled={!formData.email}
                  className="w-full bg-fitGreen-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-fitGreen-500/30 transition-all disabled:opacity-50"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-500">
                  Already have an account? <span onClick={() => setIsLogin(true)} className="text-fitGreen-600 font-bold cursor-pointer hover:underline">Log In</span>
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium">
                  <ArrowLeft size={16} /> Back
                </button>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-black dark:text-white">Personalize Profile</h2>
                  <p className="text-gray-500 text-sm">Upload a photo and let us know your name.</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-28 h-28 rounded-3xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-fitGreen-500 transition-colors"
                  >
                    {formData.profilePic ? (
                      <img src={formData.profilePic} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-fitGreen-500">
                        <Camera size={24} />
                        <span className="text-[10px] font-bold uppercase mt-1">Upload</span>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                  
                  <div className="w-full space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-fitGreen-500 outline-none dark:text-white"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Your Age: {formData.age}</label>
                      <input 
                        type="range" 
                        min="12" 
                        max="100" 
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fitGreen-500"
                        value={formData.age}
                        onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={nextStep}
                  disabled={!formData.name}
                  className="w-full bg-fitGreen-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-fitGreen-500/30 transition-all disabled:opacity-50"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium">
                  <ArrowLeft size={16} /> Back
                </button>
                <h2 className="text-2xl font-black dark:text-white text-center">Your Lifestyle</h2>
                <div className="grid grid-cols-1 gap-3">
                  {lifestyles.map(l => (
                    <button
                      key={l}
                      onClick={() => setFormData({ ...formData, lifestyle: l })}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        formData.lifestyle === l 
                          ? 'border-fitGreen-500 bg-fitGreen-50 dark:bg-fitGreen-900/20 text-fitGreen-700 dark:text-fitGreen-400 shadow-md' 
                          : 'border-gray-100 dark:border-gray-700 text-gray-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Activity size={20} className={formData.lifestyle === l ? 'text-fitGreen-500' : ''} />
                        <span className="font-bold">{l}</span>
                      </div>
                      {formData.lifestyle === l && <CheckCircle size={20} />}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={nextStep}
                  className="w-full bg-fitGreen-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-fitGreen-500/30 transition-all"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <button onClick={prevStep} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium">
                  <ArrowLeft size={16} /> Back
                </button>
                <h2 className="text-2xl font-black dark:text-white text-center">Health Goals</h2>
                <p className="text-gray-500 text-center">We'll tailor your insights based on these goals.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {goals.map(g => (
                    <button
                      key={g}
                      onClick={() => toggleGoal(g)}
                      className={`px-4 py-2 rounded-xl border-2 font-bold transition-all text-sm ${
                        formData.dietaryGoals.includes(g)
                          ? 'border-fitGreen-500 bg-fitGreen-500 text-white shadow-md'
                          : 'border-gray-100 dark:border-gray-700 text-gray-500 hover:border-fitGreen-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleComplete}
                  className="w-full bg-fitGreen-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-fitGreen-500/30 transition-all mt-4"
                >
                  Launch My Journey
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
