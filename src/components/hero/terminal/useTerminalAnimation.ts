import { useState, useEffect, useCallback } from 'react';

export interface TerminalLine {
  text: string;
  className: string;
  isCommand: boolean;
}

export const defaultTerminalLines: TerminalLine[] = [
  {
    text: "$ dune exec main",
    className: "text-green-400",
    isCommand: true,
  },
  {
    text: "✓ Type checking complete",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: "✓ C# generation successful",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: "$ unity -quit -projectPath . -executeMethod Builder.Build",
    className: "text-green-400 mt-4",
    isCommand: true,
  },
  {
    text: "✓ Assets optimized",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: "✓ Build ready for deployment",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: '$ git commit -m "Another epic feature"',
    className: "text-green-400 mt-4",
    isCommand: true,
  },
  {
    text: "✓ Ready to ship! 🚀",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
];

export interface UseTerminalAnimationOptions {
  lines?: TerminalLine[];
  typingSpeed?: number;
  commandDelay?: number;
  outputDelay?: number;
  startDelay?: number;
  onAnimationComplete?: () => void;
}

export interface UseTerminalAnimationResult {
  currentLineIndex: number;
  currentText: string;
  completedLines: string[];
  isTyping: boolean;
  isAnimationComplete: boolean;
  resetAnimation: () => void;
}

export const useTerminalAnimation = (
  isVisible: boolean,
  options: UseTerminalAnimationOptions = {}
): UseTerminalAnimationResult => {
  const {
    lines = defaultTerminalLines,
    typingSpeed = 50,
    commandDelay = 300,
    outputDelay = 500,
    startDelay = 800,
    onAnimationComplete,
  } = options;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const resetAnimation = useCallback(() => {
    setCurrentLineIndex(0);
    setCurrentText("");
    setCompletedLines([]);
    setIsTyping(false);
    setIsAnimationComplete(false);
  }, []);

  const typeText = useCallback((text: string, callback: () => void) => {
    let charIndex = 0;
    setCurrentText("");

    const typeChar = () => {
      if (charIndex < text.length) {
        setCurrentText(text.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        callback();
      }
    };

    typeChar();
  }, [typingSpeed]);

  const animateNextLine = useCallback(() => {
    if (currentLineIndex >= lines.length) {
      setIsAnimationComplete(true);
      onAnimationComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentLine.isCommand) {
      setIsTyping(true);
      typeText(currentLine.text, () => {
        setIsTyping(false);
        setCompletedLines((prev) => [...prev, currentLine.text]);
        setCurrentText("");
        setCurrentLineIndex((prev) => prev + 1);
      });
    } else {
      setCompletedLines((prev) => [...prev, currentLine.text]);
      setCurrentLineIndex((prev) => prev + 1);
    }
  }, [currentLineIndex, lines, typeText, onAnimationComplete]);

  // Reset when visibility changes
  useEffect(() => {
    if (!isVisible) {
      resetAnimation();
      return;
    }

    // Start animation only if we haven't started yet
    if (currentLineIndex === 0 && completedLines.length === 0 && !isTyping) {
      const startAnimation = setTimeout(() => {
        animateNextLine();
      }, startDelay);

      return () => clearTimeout(startAnimation);
    }
  }, [isVisible, currentLineIndex, completedLines.length, isTyping, startDelay, animateNextLine, resetAnimation]);

  // Handle line progression
  useEffect(() => {
    if (!isVisible || isTyping || isAnimationComplete) return;

    if (currentLineIndex > 0 && currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      const delay = currentLine.isCommand ? commandDelay : outputDelay;
      
      const timer = setTimeout(() => {
        animateNextLine();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [
    currentLineIndex, 
    isVisible, 
    isTyping, 
    isAnimationComplete, 
    lines, 
    commandDelay, 
    outputDelay, 
    animateNextLine
  ]);

  // Check for animation completion separately
  useEffect(() => {
    if (currentLineIndex >= lines.length && !isAnimationComplete) {
      setIsAnimationComplete(true);
      onAnimationComplete?.();
    }
  }, [currentLineIndex, lines.length, isAnimationComplete, onAnimationComplete]);

  return {
    currentLineIndex,
    currentText,
    completedLines,
    isTyping,
    isAnimationComplete,
    resetAnimation,
  };
};