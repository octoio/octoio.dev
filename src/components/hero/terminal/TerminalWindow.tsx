import React from 'react';

interface TerminalWindowProps {
  isVisible: boolean;
  currentPath: string;
  children: React.ReactNode;
}

export default function TerminalWindow({ 
  isVisible, 
  currentPath, 
  children 
}: TerminalWindowProps) {
  return (
    <div
      className={`relative transition-all duration-1000 delay-300 mb-8 lg:mb-0 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" 
               title="Close" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" 
               title="Minimize" />
          <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" 
               title="Maximize" />
          <span className="text-white/70 text-sm font-mono ml-2">
            {currentPath}
          </span>
        </div>

        {/* Terminal Content */}
        {children}
      </div>
    </div>
  );
}