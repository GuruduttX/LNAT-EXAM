// components/Admin/Components/Topbar.tsx
"use client";

import { Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";

export default function Topbar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-40
      bg-[#0B1221] border-b border-slate-800
      h-16 px-6 flex items-center justify-between transition-all duration-300
      ${isSidebarOpen ? "lg:pl-64" : "lg:pl-6"}`}
    >
      {/* Left: Mobile Menu Toggle & Search */}
      <div className="flex items-center gap-4 w-full max-w-md">
        <button
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-[#FDFBF7] transition-colors"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span className="lg:hidden">
            <Menu size={20} />
          </span>
          <span className="hidden lg:block">
            {isSidebarOpen ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </span>
        </button>

        <div className="relative w-full hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full bg-slate-900/50 border border-slate-800 pl-9 pr-4 py-1.5 rounded-md 
            outline-none text-[#FDFBF7] text-sm focus:border-slate-700 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Right: User Profile Indicator */}
      <div className="flex items-center gap-4 text-slate-400 shrink-0">
        <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-medium text-[#FDFBF7]">
              Editorial Admin
            </span>
            <span className="text-xs text-slate-500">LNAT Platform</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-[#C4A47C]/30 flex items-center justify-center text-[#C4A47C] font-semibold text-sm">
            EA
          </div>
        </div>
      </div>
    </header>
  );
}
