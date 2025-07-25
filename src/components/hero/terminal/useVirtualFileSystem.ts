import { useState, useCallback } from "react";
import { virtualFS, getCurrentPath } from "./virtualFS";
import {
  handleCommand,
  type CommandContext,
  type CommandResult,
} from "./commandHandler";

export interface UseVirtualFileSystemResult {
  currentPath: string[];
  currentPathString: string;
  executeCommand: (command: string) => CommandResult;
  resetFileSystem: () => void;
}

export const useVirtualFileSystem = (
  initialPath: string[] = ["home"]
): UseVirtualFileSystemResult => {
  const [currentPath, setCurrentPath] = useState<string[]>(initialPath);

  const resetFileSystem = useCallback(() => {
    setCurrentPath(initialPath);
  }, [initialPath]);

  const executeCommand = useCallback(
    (command: string): CommandResult => {
      const context: CommandContext = {
        currentPath,
        fs: virtualFS,
      };

      const result = handleCommand(command, context);

      // Update path if command changed it
      if (result.newPath) {
        setCurrentPath(result.newPath);
      }

      return result;
    },
    [currentPath]
  );

  const currentPathString = getCurrentPath(currentPath);

  return {
    currentPath,
    currentPathString,
    executeCommand,
    resetFileSystem,
  };
};
