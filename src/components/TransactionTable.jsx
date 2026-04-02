import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Search, Plus, ArrowUpRight, ArrowDownLeft, Download, Filter } from 'lucide-react';

const TransactionTable = () => {
  const { transactions, role } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const exportToCSV = () => {
    const headers = "Date,Description,Category,Type,Amount\n";
    const rows = filtered.map(t => `${t.date},${t.description},${t.category},${t.type},${t.amount}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    // FIX: Using var(--bg-card) ensures the manual toggle works
    <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-subtle)] shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row justify-between gap-4">
        <h3 className="text-lg font-bold text-[var(--text-heading)]">Transactions</h3>
        
        <div className="flex flex-wrap gap-2">
          {/* Filter Dropdown */}
          <div className="relative flex items-center bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-xl px-3 transition-colors">
            <Filter size={14} className="text-gray-400 mr-2" />
            <select 
              className="bg-transparent text-sm py-2 outline-none text-[var(--text-main)] cursor-pointer"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-xl text-sm outline-none w-full md:w-64 focus:border-[var(--accent-primary)] transition-all text-[var(--text-main)]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={exportToCSV} 
            className="p-2 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-xl hover:opacity-80 transition-opacity"
            title="Export CSV"
          >
            <Download size={18} className="text-gray-500" />
          </button>

          {role === 'ADMIN' && (
            <button className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-blue-500/20">
              Add New
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-[var(--bg-canvas)] text-gray-400 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4 tracking-wider">Date</th>
              <th className="px-6 py-4 tracking-wider">Description</th>
              <th className="px-6 py-4 tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-[var(--bg-canvas)] transition-colors group">
                <td className="px-6 py-4 text-sm text-[var(--text-main)] opacity-70">{t.date}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[var(--text-heading)]">
                  {t.description}
                  <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] uppercase">
                    {t.category}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm font-bold text-right flex items-center justify-end gap-2 ${
                  t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  <div className={`p-1 rounded-md ${t.type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                    {t.type === 'income' ? <ArrowUpRight size={14}/> : <ArrowDownLeft size={14}/>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-[var(--text-main)] opacity-50">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;