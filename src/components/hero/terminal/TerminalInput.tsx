import React, { useRef, useEffect, useState } from "react";
import { useTabCompletion } from "./useTabCompletion";
import { virtualFS } from "./virtualFS";

interface TerminalInputProps {
  isVisible: boolean;
  onCommand: (command: string) => void;
  currentPath: string[];
  placeholder?: string;
  autoFocus?: boolean;
}

export default function TerminalInput({
  isVisible,
  onCommand,
  currentPath,
  autoFocus = false,
}: TerminalInputProps) {
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCompletions, setShowCompletions] = useState(false);
  const [completions, setCompletions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tab completion hook
  const { completeInput, getCompletionsList } = useTabCompletion({
    currentPath,
    fs: virtualFS,
  });

  // Focus input when visible and autoFocus is enabled
  useEffect(() => {
    if (isVisible && autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible, autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (userInput.trim()) {
          // Add to history if it's not a duplicate of the last command
          if (commandHistory[commandHistory.length - 1] !== userInput.trim()) {
            setCommandHistory((prev) => [...prev, userInput.trim()]);
          }
          onCommand(userInput.trim());
        } else {
          onCommand(""); // Handle empty command
        }
        setUserInput("");
        setHistoryIndex(-1);
        break;

      case "ArrowUp":
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setUserInput(commandHistory[newIndex]);
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (historyIndex >= 0) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setUserInput("");
          } else {
            setHistoryIndex(newIndex);
            setUserInput(commandHistory[newIndex]);
          }
        }
        break;

      case "Tab":
        e.preventDefault();
        handleTabCompletion();
        break;

      case "Escape":
        setUserInput("");
        setHistoryIndex(-1);
        break;
    }
  };

  const handleTabCompletion = () => {
    if (!userInput.trim()) return;

    const availableCompletions = getCompletionsList(userInput);

    if (availableCompletions.length === 0) {
      return; // No completions available
    }

    if (availableCompletions.length === 1) {
      // Single completion - auto-complete
      const completed = completeInput(userInput);
      setUserInput(completed);
      setShowCompletions(false);
      setCompletions([]);
    } else {
      // Multiple completions - show list and complete common prefix
      const completed = completeInput(userInput);
      setUserInput(completed);
      setCompletions(availableCompletions);
      setShowCompletions(true);

      // Hide completions after a short delay
      setTimeout(() => {
        setShowCompletions(false);
        setCompletions([]);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setHistoryIndex(-1); // Reset history navigation when typing

    // Hide completions when user types
    if (showCompletions) {
      setShowCompletions(false);
      setCompletions([]);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="text-cyan-300 text-sm">
        <span className="text-purple-400">$</span>{" "}
        <input
          ref={inputRef}
          className="bg-transparent outline-none text-cyan-300 font-mono text-sm w-full inline"
          style={{ width: "calc(100% - 1.5rem)" }}
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      {/* Tab completion suggestions */}
      {showCompletions && completions.length > 0 && (
        <div className="text-yellow-300 text-xs mt-1 pl-4">
          <span className="text-white/60">Completions: </span>
          {completions.join("  ")}
        </div>
      )}
    </>
  );
}
