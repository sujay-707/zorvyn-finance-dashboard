import React, { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import { ShieldCheck, Eye, Sun, Moon, Menu, X } from "lucide-react";
import ZorvynLogo from "../assets/logo.png";

const Navbar = () => {
  const { role, setRole, theme, toggleTheme } = useDashboard();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeBtnStyle = {
    backgroundColor: theme === "dark" ? "#1e293b" : "#2563eb",
    color: "#ffffff",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src={ZorvynLogo}
              alt="Zorvyn"
              className="w-10 h-8 sm:w-16 sm:h-12 object-contain"
            />

            {/* REMOVED 'hidden sm:flex' AND REPLACED WITH 'flex' */}
            <div className="flex flex-col leading-tight border-l border-slate-200 dark:border-slate-800 pl-3">
              <span className="text-sm sm:text-xl font-black text-[var(--text-heading)] uppercase">
                Zorvyn <span className="text-blue-600">Finance</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-amber-500"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Desktop Role Switcher */}
            <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setRole("VIEWER")}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={
                  role === "VIEWER" ? activeBtnStyle : { color: "#94a3b8" }
                }
              >
                <Eye size={14} /> Viewer
              </button>
              <button
                onClick={() => setRole("ADMIN")}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={role === "ADMIN" ? activeBtnStyle : { color: "#94a3b8" }}
              >
                <ShieldCheck size={14} /> Admin
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--text-main)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-subtle)] p-6 space-y-4 shadow-xl">
          <button
            onClick={() => {
              setRole("VIEWER");
              setIsMenuOpen(false);
            }}
            className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold ${role === "VIEWER" ? "bg-blue-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500"}`}
          >
            <Eye size={20} /> Viewer Access
          </button>
          <button
            onClick={() => {
              setRole("ADMIN");
              setIsMenuOpen(false);
            }}
            className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold ${role === "ADMIN" ? "bg-blue-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500"}`}
          >
            <ShieldCheck size={20} /> Admin Access
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
