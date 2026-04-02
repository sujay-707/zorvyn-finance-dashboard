import React from 'react';
import { motion } from 'framer-motion';
import { DashboardProvider } from './context/DashboardContext';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import DashboardCharts from './components/DashboardCharts';
import Insights from './components/Insights';

function App() {
  return (
    <DashboardProvider>
      {/* Using bg-[var(--bg-canvas)] ensures that our CSS variable 
          defines the page color, not a Tailwind preset.
      */}
      <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-500 font-sans overflow-x-hidden">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryCards />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div 
              className="lg:col-span-2 w-full" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <DashboardCharts />
            </motion.div>
            
            <motion.div 
              className="space-y-6 w-full" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold dark:text-white px-1">Smart Insights</h3>
              <Insights />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full"
          >
            <TransactionTable />
          </motion.div>
          
        </main>

        <footer className="py-12 text-center text-xs text-gray-400 uppercase tracking-widest opacity-60">
          Zorvyn Finance Dashboard • 2026
        </footer>
      </div>
    </DashboardProvider>
  );
}

export default App;