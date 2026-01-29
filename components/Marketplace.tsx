
import React from 'react';
import { ShoppingCart, Star, Plus, ShieldCheck } from 'lucide-react';
import { MOCK_SNACKS } from '../constants.tsx';

export const Marketplace: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">FitBites Marketplace</h2>
          <p className="text-gray-500 dark:text-gray-400">Shop verified smart food and guilt-free snacks.</p>
        </div>
        <div className="bg-fitGreen-100 dark:bg-fitGreen-900/30 text-fitGreen-700 dark:text-fitGreen-400 px-4 py-2 rounded-xl border border-fitGreen-200 dark:border-fitGreen-800 flex items-center gap-2 font-bold cursor-pointer">
          <ShoppingCart size={18} /> (0)
        </div>
      </div>

      {/* Featured Promo */}
      <div className="bg-gradient-to-r from-fitGreen-600 to-fitGreen-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Subscription Special</span>
          <h3 className="text-3xl font-black mt-4 mb-2">The Ultimate Fat-Swap Box</h3>
          <p className="text-fitGreen-100 mb-6">Get 12 assorted FitBites snacks delivered weekly. Cancel anytime.</p>
          <button className="bg-white text-fitGreen-800 px-6 py-3 rounded-2xl font-bold transition-transform active:scale-95 shadow-xl">
            Subscribe Now - $29.99/mo
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
           <img src="https://picsum.photos/seed/snacks/600/400" className="object-cover w-full h-full opacity-40 mix-blend-overlay" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...MOCK_SNACKS, ...MOCK_SNACKS, ...MOCK_SNACKS].map((snack, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={snack.image} alt={snack.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <ShieldCheck size={14} className="text-fitGreen-600" /> {snack.score} Score
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold dark:text-white">{snack.name}</h4>
                  <p className="text-xs text-gray-400">{snack.brand}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star size={14} fill="currentColor" /> 4.9
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                {snack.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t dark:border-gray-700">
                <span className="text-xl font-black dark:text-white">$4.99</span>
                <button className="bg-fitGreen-500 hover:bg-fitGreen-600 text-white p-2 rounded-xl shadow-md transition-colors active:scale-95">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
