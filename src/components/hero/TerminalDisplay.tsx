"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalDisplayProps {
  isVisible: boolean;
}

interface TerminalLine {
  text: string;
  className: string;
  isCommand: boolean;
}

type FileSystem = {
  [key: string]: string | FileSystem;
};

const virtualFS: FileSystem = {
  home: {
    readme: "Welcome to the terminal. Type `help` to begin.",
    src: {
      "main.ts": "// TODO: build logic",
    },
    docs: {
      "info.txt": "Project documentation coming soon...",
    },
    ".env":
      "Wow, you really thought you found a secret?\nCongrats, detective. Now get back to work.",
  },
};

const terminalLines: TerminalLine[] = [
  {
    text: "$ ocaml compile game_data.ml",
    className: "text-green-400",
    isCommand: true,
  },
  {
    text: "\u2713 Type checking complete",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: "\u2713 C# generation successful",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: "$ unity build --target WebGL",
    className: "text-green-400 mt-4",
    isCommand: true,
  },
  {
    text: "\u2713 Assets optimized",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: "\u2713 Build ready for deployment",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
  {
    text: '$ git commit -m "Another epic feature"',
    className: "text-green-400 mt-4",
    isCommand: true,
  },
  {
    text: "\u2713 Ready to ship! \ud83d\ude80",
    className: "text-cyan-300 pl-4",
    isCommand: false,
  },
];

export default function TerminalDisplay({ isVisible }: TerminalDisplayProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [fsPath, setFsPath] = useState<string[]>(["home"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) {
      setCurrentLineIndex(0);
      setCurrentText("");
      setCompletedLines([]);
      setShowCursor(false);
      setIsTyping(false);
      setInputMode(false);
      return;
    }

    if (currentLineIndex === 0 && completedLines.length === 0 && !isTyping) {
      const startAnimation = setTimeout(() => {
        animateNextLine();
      }, 800);

      return () => clearTimeout(startAnimation);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || isTyping) return;

    if (currentLineIndex > 0 && currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        animateNextLine();
      }, 300);

      return () => clearTimeout(timer);
    }

    if (currentLineIndex === terminalLines.length) {
      setInputMode(true);
      setShowCursor(true);
    }
  }, [currentLineIndex, isVisible, isTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [completedLines]);

  const animateNextLine = () => {
    if (currentLineIndex >= terminalLines.length) {
      setShowCursor(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];

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
  };

  const typeText = (text: string, callback: () => void) => {
    let charIndex = 0;
    setCurrentText("");

    const typeChar = () => {
      if (charIndex < text.length) {
        setCurrentText(text.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, 50);
      } else {
        callback();
      }
    };

    typeChar();
  };

  const handleCommand = (command: string) => {
    const parts = command.trim().split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);
    const path = [...fsPath];
    const getDir = (fs: FileSystem, p: string[]): FileSystem | null => {
      return p.reduce<FileSystem | null>((acc, key) => {
        if (acc && typeof acc[key] === "object") {
          return acc[key] as FileSystem;
        }
        return null;
      }, fs);
    };

    const currentDir = getDir(virtualFS, path);
    const output: string[] = [];
    if (!currentDir) {
      output.push("Error: Invalid path.");
    }

    switch (cmd) {
      case "ls": {
        if (currentDir) {
          const showAll = args.includes("-a");
          const files = Object.keys(currentDir).filter((key) =>
            showAll ? true : !key.startsWith(".")
          );
          output.push(files.join("  ") || "");
        }
        break;
      }
      case "cd": {
        if (args[0] === "..") {
          if (path.length > 1) path.pop();
        } else if (args[0] === ".") {
          // do nothing
        } else if (
          args[0] &&
          currentDir &&
          typeof currentDir[args[0]] === "object"
        ) {
          path.push(args[0]);
        } else {
          output.push(`cd: no such directory: ${args[0]}`);
        }
        setFsPath(path);
        break;
      }
      case "cat": {
        if (args[0] && currentDir && typeof currentDir[args[0]] === "string") {
          const content = currentDir[args[0]] as string;
          output.push(...content.split("\n"));
        } else {
          output.push(`cat: cannot open '${args[0]}'`);
        }
        break;
      }
      case "help": {
        output.push("Available commands: ls, cd, cat, help");
        break;
      }
      case "":
        break;
      default: {
        output.push(`command not found: ${cmd}`);
      }
    }

    const prompt = `$ ${command}`;
    setCompletedLines((prev) => [...prev, prompt, ...output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(userInput);
      setUserInput("");
    }
  };

  useEffect(() => {
    if (inputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);

  return (
    <div
      className={`relative transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
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

        <div
          ref={scrollRef}
          className="font-mono text-sm space-y-2 h-62 overflow-y-auto pr-2 custom-scroll"
        >
          {completedLines.map((line, index) => {
            const isCmd = line.startsWith("$");
            return (
              <div
                key={index}
                className={isCmd ? "text-green-400" : "text-cyan-300 pl-4"}
              >
                {isCmd ? (
                  <>
                    <span className="text-purple-400">$</span>{" "}
                    {line.substring(1)}
                  </>
                ) : (
                  line
                )}
              </div>
            );
          })}

          {isTyping && currentText && (
            <div className="text-green-400">
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

          {inputMode && (
            <div className="text-green-400">
              <span className="text-purple-400 mr-1">$</span>
              <input
                ref={inputRef}
                className="bg-transparent outline-none text-green-400 flex-1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}

          {showCursor && !inputMode && (
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
