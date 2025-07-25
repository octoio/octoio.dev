"use client";

import { useState, useEffect } from "react";
import Search from "./Search";

export default function SearchProvider() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Also support / for quick search
      if (e.key === "/" && !isSearchOpen) {
        // Only if not already typing in an input
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  return (
    <>
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Glass search button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-6 left-6 z-40 lg:bottom-8 lg:left-8 bg-slate-600/60 hover:bg-slate-600/70 text-white backdrop-blur-sm border border-slate-500/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-4 py-3 flex items-center gap-3 group"
        title="Search"
        aria-label="Open search"
      >
        <svg
          className="w-5 h-5 text-white/90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <span className="text-sm font-medium text-white">Search</span>

        {/* Keyboard shortcut */}
        <div className="flex items-center gap-1">
          <kbd className="px-2 py-1 text-xs font-semibold text-white/90 bg-slate-500/30 border border-slate-400/40 rounded-md">
            ⌘K
          </kbd>
        </div>
      </button>
    </>
  );
}
