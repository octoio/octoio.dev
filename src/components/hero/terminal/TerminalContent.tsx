import React, { useRef, useEffect } from 'react';

interface TerminalContentProps {
  completedLines: string[];
  currentText: string;
  isTyping: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function TerminalContent({
  completedLines,
  currentText,
  isTyping,
  className = "font-mono text-sm space-y-2 h-64 min-h-64 max-h-64 overflow-y-auto pr-2 custom-scroll",
  children
}: TerminalContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [completedLines, currentText]);

  const renderLine = (line: string, index: number) => {
    const isCommand = line.startsWith("$");
    const isError = line.includes("command not found") || line.includes("Error:");
    const isSuccess = line.includes("✓") || line.includes("🎉") || line.includes("🎊");
    const isWarning = line.includes("Warning:") || line.includes("⚠️");
    
    let lineClassName = "text-green-400 pl-4"; // Default output style - green/cyan for output
    
    if (isCommand) {
      lineClassName = "text-cyan-300"; // Commands are cyan/light blue
    } else if (isError) {
      lineClassName = "text-red-400 pl-4";
    } else if (isSuccess) {
      lineClassName = "text-emerald-400 pl-4";
    } else if (isWarning) {
      lineClassName = "text-yellow-400 pl-4";
    }

    return (
      <div key={index} className={lineClassName}>
        {isCommand ? (
          <>
            <span className="text-purple-400">$</span>{" "}
            {line.substring(1)}
          </>
        ) : (
          line
        )}
      </div>
    );
  };

  return (
    <div ref={scrollRef} className={className}>
      {/* Render completed lines */}
      {completedLines.map((line, index) => renderLine(line, index))}

      {/* Render currently typing line */}
      {isTyping && currentText && (
        <div className="text-cyan-300">
          {currentText.startsWith("$") ? (
            <>
              <span className="text-purple-400">$</span>
              {currentText.substring(1)}
              <span className="bg-purple-500/20 px-1 animate-pulse">|</span>
            </>
          ) : (
            <>
              {currentText}
              <span className="bg-purple-500/20 px-1 animate-pulse">|</span>
            </>
          )}
        </div>
      )}

      {/* Render any additional content (like input) */}
      {children}
    </div>
  );
}