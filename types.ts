
export interface UserProfile {
  name: string;
  age: number;
  email: string;
  lifestyle: 'Sedentary' | 'Moderate' | 'Active' | 'Athletic';
  dietaryGoals: string[];
  profilePic?: string;
}

export interface SnackData {
  id: string;
  name: string;
  brand: string;
  image: string;
  normalFat: number;
  replacedFat: number;
  score: number;
  ingredients: string[];
  typeOfFats: string;
  description: string;
  calories: number;
}

export interface AnalysisResult {
  comparison: string;
  suggestions: string[];
  healthTip: string;
  estimatedCalories: number;
}

export enum AppSection {
  Dashboard = 'dashboard',
  Scanner = 'scanner',
  Analytics = 'analytics',
  Marketplace = 'marketplace',
  Community = 'community',
  Education = 'education',
  Profile = 'profile'
}
