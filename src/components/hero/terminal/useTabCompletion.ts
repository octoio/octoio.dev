import { useCallback } from "react";
import { getDirectory, type FileSystem } from "./virtualFS";

interface TabCompletionOptions {
  currentPath: string[];
  fs: FileSystem;
}

export const useTabCompletion = ({ currentPath, fs }: TabCompletionOptions) => {
  const getCompletions = useCallback(
    (input: string): string[] => {
      const trimmed = input.trim();
      const parts = trimmed.split(" ");

      // If no input or just spaces, return empty
      if (!trimmed) return [];

      // Command completion (first word)
      if (parts.length === 1) {
        const commands = [
          "ls",
          "cd",
          "cat",
          "pwd",
          "help",
          "clear",
          "whoami",
          "nav",
          "konami",
          "matrix",
          "sudo",
        ];

        const partial = parts[0].toLowerCase();
        return commands.filter((cmd) => cmd.startsWith(partial));
      }

      // File/directory completion (for commands that take file arguments)
      const command = parts[0].toLowerCase();
      const fileCommands = ["cd", "cat"];

      if (fileCommands.includes(command) && parts.length >= 2) {
        const partial = parts[parts.length - 1]; // Last argument being typed
        const currentDir = getDirectory(fs, currentPath);

        if (!currentDir) return [];

        const items = Object.keys(currentDir)
          .filter((item) => item.startsWith(partial))
          .sort();

        // For 'cd' command, only show directories
        if (command === "cd") {
          return items.filter((item) => typeof currentDir[item] === "object");
        }

        // For 'cat' command, only show files
        if (command === "cat") {
          return items.filter((item) => typeof currentDir[item] === "string");
        }

        return items;
      }

      return [];
    },
    [currentPath, fs]
  );

  const completeInput = useCallback(
    (input: string): string => {
      const completions = getCompletions(input);

      if (completions.length === 0) {
        return input; // No completions available
      }

      if (completions.length === 1) {
        // Single completion - complete it
        const parts = input.trim().split(" ");

        if (parts.length === 1) {
          // Completing command
          return completions[0] + " ";
        } else {
          // Completing file/directory
          const completion = completions[0];
          const newParts = [...parts.slice(0, -1), completion];

          // Add trailing slash for directories and space for files
          const currentDir = getDirectory(fs, currentPath);
          const isDirectory =
            currentDir && typeof currentDir[completion] === "object";

          return newParts.join(" ") + (isDirectory ? "/" : " ");
        }
      }

      // Multiple completions - find common prefix
      const commonPrefix = findCommonPrefix(completions);
      const parts = input.trim().split(" ");

      if (parts.length === 1) {
        // Completing command
        return commonPrefix;
      } else {
        // Completing file/directory
        const newParts = [...parts.slice(0, -1), commonPrefix];
        return newParts.join(" ");
      }
    },
    [getCompletions, currentPath, fs]
  );

  const getCompletionsList = useCallback(
    (input: string): string[] => {
      return getCompletions(input);
    },
    [getCompletions]
  );

  return {
    completeInput,
    getCompletionsList,
  };
};

// Helper function to find common prefix among completions
function findCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];

  let prefix = "";
  const first = strings[0];

  for (let i = 0; i < first.length; i++) {
    const char = first[i];
    if (strings.every((str) => str[i] === char)) {
      prefix += char;
    } else {
      break;
    }
  }

  return prefix;
}
