'use client';

import { useState, useEffect } from 'react';

interface TerminalDisplayProps {
  isVisible: boolean;
}

interface TerminalLine {
  text: string;
  className: string;
  isCommand: boolean;
}

const terminalLines: TerminalLine[] = [
  { text: '$ ocaml compile game_data.ml', className: 'text-green-400', isCommand: true },
  { text: '✓ Type checking complete', className: 'text-cyan-300 pl-4', isCommand: false },
  { text: '✓ C# generation successful', className: 'text-cyan-300 pl-4', isCommand: false },
  { text: '$ unity build --target WebGL', className: 'text-green-400 mt-4', isCommand: true },
  { text: '✓ Assets optimized', className: 'text-cyan-300 pl-4', isCommand: false },
  { text: '✓ Build ready for deployment', className: 'text-cyan-300 pl-4', isCommand: false },
  { text: '$ git commit -m "Another epic feature"', className: 'text-green-400 mt-4', isCommand: true },
  { text: '✓ Ready to ship! 🚀', className: 'text-cyan-300 pl-4', isCommand: false },
];

export default function TerminalDisplay({ isVisible }: TerminalDisplayProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>('');
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCurrentLineIndex(0);
      setCurrentText('');
      setCompletedLines([]);
      setShowCursor(false);
      setIsTyping(false);
      return;
    }

    // Only start animation if we haven't started yet
    if (currentLineIndex === 0 && completedLines.length === 0 && !isTyping) {
      const startAnimation = setTimeout(() => {
        animateNextLine();
      }, 800);

      return () => clearTimeout(startAnimation);
    }
  }, [isVisible]);

  // Separate effect to handle line progression
  useEffect(() => {
    if (!isVisible || isTyping) return;
    
    if (currentLineIndex > 0 && currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        animateNextLine();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, isVisible, isTyping]);

  const animateNextLine = () => {
    if (currentLineIndex >= terminalLines.length) {
      setShowCursor(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    
    if (currentLine.isCommand) {
      // Type commands letter by letter
      setIsTyping(true);
      typeText(currentLine.text, () => {
        setIsTyping(false);
        setCompletedLines(prev => [...prev, currentLine.text]);
        setCurrentText('');
        setCurrentLineIndex(prev => prev + 1);
      });
    } else {
      // Show output lines instantly
      setCompletedLines(prev => [...prev, currentLine.text]);
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  const typeText = (text: string, callback: () => void) => {
    let charIndex = 0;
    setCurrentText('');
    
    const typeChar = () => {
      if (charIndex < text.length) {
        setCurrentText(text.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, 50); // 50ms per character
      } else {
        callback();
      }
    };
    
    typeChar();
  };

  return (
    <div
      className={`relative transition-all duration-1000 delay-300 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8"
      }`}
    >
      <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-white/70 text-sm font-mono ml-2">
            ~/octoio/current-project
          </span>
        </div>

        <div className="font-mono text-sm space-y-2">
          {/* Render completed lines */}
          {completedLines.map((line, index) => {
            const lineData = terminalLines.find(tl => tl.text === line);
            return (
              <div key={index} className={lineData?.className || ''}>
                {line.startsWith('$') ? (
                  <>
                    <span className="text-purple-400">$</span>
                    {line.substring(1)}
                  </>
                ) : (
                  line
                )}
              </div>
            );
          })}
          
          {/* Render currently typing line */}
          {isTyping && currentText && (
            <div className={terminalLines[currentLineIndex]?.className || ''}>
              {currentText.startsWith('$') ? (
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

          {/* Final cursor when all animation is done */}
          {showCursor && (
            <div className="text-purple-400 mt-4 animate-pulse">
              <span className="text-purple-400">$</span>{" "}
              <span className="bg-purple-500/20 px-1">|</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}