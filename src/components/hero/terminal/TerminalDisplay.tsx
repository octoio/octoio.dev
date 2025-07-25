"use client";

import React, { useState, useCallback } from "react";
import TerminalWindow from "./TerminalWindow";
import TerminalContent from "./TerminalContent";
import TerminalInput from "./TerminalInput";
import TerminalCursor from "./TerminalCursor";
import { useTerminalAnimation } from "./useTerminalAnimation";
import { useVirtualFileSystem } from "./useVirtualFileSystem";

interface TerminalDisplayProps {
  isVisible: boolean;
  autoFocus?: boolean;
}

export default function TerminalDisplay({ isVisible, autoFocus = false }: TerminalDisplayProps) {
  const [userLines, setUserLines] = useState<string[]>([]);
  const [inputMode, setInputMode] = useState(false);

  // File system hook
  const { currentPath, currentPathString, executeCommand, resetFileSystem } =
    useVirtualFileSystem();

  // Animation hook with callback to enable interactive mode
  const {
    currentText,
    completedLines: animationLines,
    isTyping,
    isAnimationComplete,
    resetAnimation,
  } = useTerminalAnimation(isVisible, {
    onAnimationComplete: () => {
      setInputMode(true);
    },
  });

  // Ensure input mode is set when animation completes
  React.useEffect(() => {
    if (isAnimationComplete && !inputMode) {
      setInputMode(true);
    }
  }, [isAnimationComplete, inputMode]);

  // Handle user commands
  const handleCommand = useCallback(
    (command: string) => {
      if (!command.trim()) {
        setUserLines((prev) => [...prev, "$ "]);
        return;
      }

      // Special command to clear screen
      if (command.toLowerCase() === "clear") {
        setUserLines([]);
        return;
      }

      // Execute command through file system
      const result = executeCommand(command);
      const prompt = `$ ${command}`;

      setUserLines((prev) => [...prev, prompt, ...result.output]);
    },
    [executeCommand]
  );

  // Reset everything when visibility changes
  const handleReset = useCallback(() => {
    resetAnimation();
    resetFileSystem();
    setUserLines([]);
    setInputMode(false);
  }, [resetAnimation, resetFileSystem]);

  // Reset when component becomes invisible
  React.useEffect(() => {
    if (!isVisible) {
      handleReset();
    }
  }, [isVisible, handleReset]);

  // Combine animation lines and user lines for display
  const allLines = [...animationLines, ...userLines];

  return (
    <TerminalWindow isVisible={isVisible} currentPath={currentPathString}>
      <TerminalContent
        completedLines={allLines}
        currentText={currentText}
        isTyping={isTyping}
      >
        {/* Interactive input after animation completes */}
        {inputMode && (
          <TerminalInput 
            isVisible={true} 
            onCommand={handleCommand}
            currentPath={currentPath}
            autoFocus={autoFocus}
          />
        )}
      </TerminalContent>

      {/* Show cursor when animation is complete but input is not active */}
      {isAnimationComplete && !inputMode && <TerminalCursor isVisible={true} />}
    </TerminalWindow>
  );
}
