import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, Zap } from 'lucide-react';

const Insights = () => {
  const { transactions } = useDashboard();
  
  const topCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
  const highest = Object.entries(topCategory).sort((a,b) => b[1] - a[1])[0] || ["None", 0];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-start gap-4 transition-colors">
        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600"><TrendingUp size={20}/></div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Top Expense</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">Most spent on {highest[0]} (${highest[1].toLocaleString()})</p>
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-start gap-4 transition-colors">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600"><Zap size={20}/></div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Savings Tip</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">You are spending 12% less than last month. Keep it up!</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;