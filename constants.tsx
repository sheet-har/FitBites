
import React from 'react';
import { 
  LayoutDashboard, 
  ScanQrCode, 
  BarChart3, 
  ShoppingBag, 
  Users, 
  BookOpen,
  UserCircle
} from 'lucide-react';
import { AppSection } from './types';

export const COLORS = {
  primary: '#4D9136', // Green from logo
  secondary: '#5D382A', // Brown from logo
};

export const NAVIGATION_ITEMS = [
  { id: AppSection.Dashboard, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: AppSection.Scanner, label: 'Scan Food', icon: <ScanQrCode size={20} /> },
  { id: AppSection.Analytics, label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: AppSection.Marketplace, label: 'Marketplace', icon: <ShoppingBag size={20} /> },
  { id: AppSection.Community, label: 'Community', icon: <Users size={20} /> },
  { id: AppSection.Education, label: 'Education', icon: <BookOpen size={20} /> },
  { id: AppSection.Profile, label: 'Profile', icon: <UserCircle size={20} /> },
];

export const MOCK_SNACKS = [
  {
    id: 'snack_001',
    name: 'Oats & Dark Cocoa Bite',
    brand: 'FitBites',
    image: 'https://picsum.photos/seed/snack1/400/300',
    normalFat: 12,
    replacedFat: 3,
    score: 92,
    ingredients: ['Whole grain oats', 'Unsweetened cocoa', 'Stevia', 'Almond flour', 'MCT Oil'],
    typeOfFats: 'High-quality MCTs and Unsaturated Plant Fats',
    description: 'A guilt-free chocolate craving solver with 75% less unhealthy fats.'
  },
  {
    id: 'snack_002',
    name: 'Baked Sweet Potato Crisps',
    brand: 'FitBites',
    image: 'https://picsum.photos/seed/snack2/400/300',
    normalFat: 8,
    replacedFat: 1.5,
    score: 88,
    ingredients: ['Sweet Potato', 'Olive Oil spray', 'Sea Salt', 'Paprika'],
    typeOfFats: 'Omega-9 rich Olive Oil',
    description: 'Thinly sliced sweet potatoes baked to perfection using minimal high-quality oils.'
  }
];
