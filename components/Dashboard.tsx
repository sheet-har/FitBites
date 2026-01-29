
import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Zap, 
  ChevronRight, 
  History,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const CHART_DATA = [
  { day: 'Mon', score: 65, fatSaved: 12 },
  { day: 'Tue', score: 72, fatSaved: 18 },
  { day: 'Wed', score: 68, fatSaved: 15 },
  { day: 'Thu', score: 85, fatSaved: 22 },
  { day: 'Fri', score: 80, fatSaved: 20 },
  { day: 'Sat', score: 92, fatSaved: 28 },
  { day: 'Sun', score: 88, fatSaved: 25 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Welcome back, Health Seeker!</h1>
          <p className="text-gray-500 dark:text-gray-400">You've saved 140g of unhealthy fats this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-fitGreen-100 dark:bg-fitGreen-900/30 p-2 rounded-xl border border-fitGreen-200 dark:border-fitGreen-800">
            <p className="text-xs text-fitGreen-700 dark:text-fitGreen-400 font-bold uppercase">Daily Streak</p>
            <div className="flex items-center gap-1 font-bold dark:text-white">
              <Zap size={16} className="text-amber-500 fill-amber-500" /> 12 Days
            </div>
          </div>
          <div className="bg-fitBrown-100 dark:bg-fitBrown-900/30 p-2 rounded-xl border border-fitBrown-200 dark:border-fitBrown-800">
            <p className="text-xs text-fitBrown-700 dark:text-fitBrown-400 font-bold uppercase">Points</p>
            <div className="flex items-center gap-1 font-bold dark:text-white">
              <Award size={16} className="text-fitBrown-500" /> 1,250
            </div>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-fitGreen-100 dark:bg-fitGreen-900/50 p-3 rounded-2xl">
              <TrendingUp className="text-fitGreen-600" />
            </div>
            <span className="text-xs font-bold text-fitGreen-600 bg-fitGreen-50 dark:bg-fitGreen-900/30 px-2 py-1 rounded-full">+15% vs last week</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Avg Fat Replacement Score</p>
          <p className="text-4xl font-black mt-1 dark:text-white">82.4</p>
          <div className="mt-4 w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full">
            <div className="bg-fitGreen-500 h-2 rounded-full w-[82.4%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-fitBrown-100 dark:bg-fitBrown-900/50 p-3 rounded-2xl">
              <Target className="text-fitBrown-600" />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">Keep it up!</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Bad Fat Reduced</p>
          <p className="text-4xl font-black mt-1 dark:text-white">2.4kg</p>
          <p className="text-xs text-gray-400 mt-4">Equivalent to ~15,000 cal of junk food avoided.</p>
        </div>

        <div className="bg-fitBrown-600 text-white p-6 rounded-3xl shadow-xl">
          <h3 className="text-lg font-bold mb-4">Next Goal</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Weekly Health Challenge</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full">
              <div className="bg-fitGreen-400 h-2 rounded-full w-[75%]"></div>
            </div>
            <p className="text-xs text-fitBrown-100 leading-relaxed italic">
              "Replace one standard snack today to unlock the 'Consistency King' badge."
            </p>
            <button className="w-full py-2 bg-white text-fitBrown-600 font-bold rounded-xl text-sm transition-transform active:scale-95">
              View Challenges
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold dark:text-white">Weekly Progress</h3>
            <button className="text-fitGreen-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              Details <ChevronRight size={16} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4D9136" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4D9136" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4D9136" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
              <History size={20} className="text-gray-400" /> Recent Scans
            </h3>
            <button className="text-fitBrown-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              View History <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Oats & Dark Cocoa', time: '2 hours ago', score: 92, status: 'Smart' },
              { name: 'Berry Power Bar', time: 'Yesterday', score: 85, status: 'Smart' },
              { name: 'Almond Granola', time: 'Yesterday', score: 78, status: 'Fair' },
            ].map((scan, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl group cursor-pointer hover:bg-fitGreen-50 dark:hover:bg-fitGreen-900/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-fitBrown-100 dark:bg-fitBrown-900/50 flex items-center justify-center text-fitBrown-600 font-bold">
                    {scan.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm dark:text-white">{scan.name}</p>
                    <p className="text-xs text-gray-500">{scan.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-fitGreen-600">{scan.score}/100</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{scan.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
