import React from "react";

interface TerminalCursorProps {
  isVisible: boolean;
  isBlinking?: boolean;
}

export default function TerminalCursor({
  isVisible,
  isBlinking = true,
}: TerminalCursorProps) {
  if (!isVisible) return null;

  return (
    <div className="text-purple-400 mt-4">
      <span className="text-purple-400">$</span>{" "}
      <span
        className={`bg-purple-500/20 px-1 ${isBlinking ? "animate-pulse" : ""}`}
      >
        |
      </span>
    </div>
  );
}
