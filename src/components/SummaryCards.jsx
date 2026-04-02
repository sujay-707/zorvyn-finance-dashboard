import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = () => {
  const { totals } = useDashboard();

  const cards = [
    {
      title: 'Total Balance',
      amount: totals.totalBalance,
      icon: <Wallet className="text-blue-600 dark:text-blue-400" />,
      // Using opacity utility (50/10) to make the colors look good in both modes
      iconBg: 'bg-blue-50 dark:bg-blue-900/20', 
      titleColor: 'text-gray-400 dark:text-slate-500'
    },
    {
      title: 'Total Income',
      amount: totals.totalIncome,
      icon: <TrendingUp className="text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      titleColor: 'text-gray-400 dark:text-slate-500'
    },
    {
      title: 'Total Expenses',
      amount: totals.totalExpenses,
      icon: <TrendingDown className="text-rose-600 dark:text-rose-400" />,
      iconBg: 'bg-rose-50 dark:bg-rose-900/20',
      titleColor: 'text-gray-400 dark:text-slate-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3 rounded-2xl transition-colors ${card.iconBg}`}>
              {card.icon}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${card.titleColor}`}>
              {card.title}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight transition-colors">
              ${card.amount.toLocaleString()}
            </span>
            <div className="flex items-center gap-2 mt-2">
               <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-medium text-gray-400 dark:text-slate-500">Live Updates</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;