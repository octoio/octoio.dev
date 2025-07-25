// Main terminal component
export { default as TerminalDisplay } from './TerminalDisplay';

// Individual components for advanced usage
export { default as TerminalWindow } from './TerminalWindow';
export { default as TerminalContent } from './TerminalContent';
export { default as TerminalInput } from './TerminalInput';
export { default as TerminalCursor } from './TerminalCursor';

// Hooks for custom implementations
export { useTerminalAnimation } from './useTerminalAnimation';
export { useVirtualFileSystem } from './useVirtualFileSystem';
export { useTabCompletion } from './useTabCompletion';

// Utilities
export { handleCommand } from './commandHandler';
export { virtualFS, getCurrentPath, getDirectory, getFile } from './virtualFS';

// Types
export type { FileSystem } from './virtualFS';
export type { CommandResult, CommandContext } from './commandHandler';
export type { UseTerminalAnimationResult, UseTerminalAnimationOptions, TerminalLine } from './useTerminalAnimation';
export type { UseVirtualFileSystemResult } from './useVirtualFileSystem';