import React from "react";

interface NavigationDotProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  showConnectionLine: boolean;
  children?: React.ReactNode;
}

export default function NavigationDot({
  id,
  label,
  isActive,
  onClick,
  showConnectionLine,
  children,
}: NavigationDotProps) {
  return (
    <li className="relative flex items-center justify-end transition-all duration-300 group">
      <button
        onClick={() => onClick(id)}
        aria-label={`Navigate to ${label}`}
        className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 relative backdrop-blur-md focus:outline-none hover:scale-115 hover:border-indigo-500 ${
          isActive
            ? "border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-700 shadow-[0_4px_15px_rgba(102,126,234,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
            : "border-slate-400/30 bg-slate-50/80 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-indigo-500/15"
        }`}
      />

      {/* Connection line */}
      {showConnectionLine && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-6 rounded-sm backdrop-blur-sm transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-b from-indigo-500/80 to-indigo-500/30"
              : "bg-gradient-to-b from-slate-500/30 to-slate-500/10"
          }`}
        />
      )}

      {children}
    </li>
  );
}
