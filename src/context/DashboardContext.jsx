import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Persistence for Transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('zorvyn_tx');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  // Persistence for Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('zorvyn_theme') || 'light');
  const [role, setRole] = useState('ADMIN');

  useEffect(() => {
    localStorage.setItem('zorvyn_tx', JSON.stringify(transactions));
    localStorage.setItem('zorvyn_theme', theme);
    
    // Apply theme to HTML root for Tailwind 'dark' class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [transactions, theme]);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { totalBalance: income - expenses, totalIncome: income, totalExpenses: expenses };
  }, [transactions]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <DashboardContext.Provider value={{ 
      transactions, totals, role, setRole, theme, toggleTheme 
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);