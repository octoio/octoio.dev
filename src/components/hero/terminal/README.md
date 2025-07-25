# Terminal Component System 🖥️

An interactive, modular terminal component system with a virtual filesystem, easter eggs, and smooth animations.

## 🏗️ Architecture

The terminal is now split into focused, reusable components:

```
terminal/
├── TerminalDisplay.tsx      # Main orchestrator component
├── TerminalWindow.tsx       # Terminal window UI with header
├── TerminalContent.tsx      # Content rendering with syntax highlighting
├── TerminalInput.tsx        # Interactive input with history & shortcuts
├── TerminalCursor.tsx       # Animated cursor component
├── useTerminalAnimation.ts  # Animation hook for typing effects
├── useVirtualFileSystem.ts  # File system state management
├── commandHandler.ts        # Command processing and easter eggs
├── virtualFS.ts             # Extended virtual filesystem data
└── index.ts                 # Exports for easy importing
```

## 🎮 Features

### Interactive Terminal
- **Real command execution**: `ls`, `cd`, `cat`, `help`, `pwd`, `clear`, `whoami`
- **Command history**: Use ↑/↓ arrows to navigate previous commands
- **Tab completion**: Basic autocomplete for common commands
- **Hidden files**: Use `ls -a` to reveal easter eggs
- **Error handling**: Realistic terminal error messages

### Virtual File System
- **Rich content**: Multiple directories with game development content
- **File type indicators**: Visual icons for different file types
- **Nested navigation**: Deep directory structures to explore
- **Dynamic content**: Special file handling for easter eggs

### Easter Eggs & Secrets 🎁
- **Hidden files**: Secret configurations and developer notes
- **Special commands**: Try `konami`, `matrix`, `sudo`
- **Developer diary**: Personal insights and project thoughts
- **Virtual cookies**: Rewards for thorough exploration
- **Command aliases**: Multiple ways to execute commands

### Animation System
- **Typing animation**: Commands type character by character
- **Instant output**: Results appear immediately like a real terminal
- **Smooth transitions**: Configurable timing and delays
- **Interactive mode**: Seamless transition from animation to user input

## 🔧 Usage

### Basic Usage
```tsx
import { TerminalDisplay } from '@/components/hero/terminal';

<TerminalDisplay isVisible={true} />
```

### Advanced Usage with Custom Hooks
```tsx
import { 
  TerminalWindow, 
  TerminalContent, 
  TerminalInput,
  useTerminalAnimation,
  useVirtualFileSystem 
} from '@/components/hero/terminal';

function CustomTerminal() {
  const { currentPathString, executeCommand } = useVirtualFileSystem();
  const { completedLines, isTyping, currentText } = useTerminalAnimation(true);
  
  return (
    <TerminalWindow isVisible={true} currentPath={currentPathString}>
      <TerminalContent 
        completedLines={completedLines}
        currentText={currentText}
        isTyping={isTyping}
      />
      <TerminalInput 
        isVisible={true} 
        onCommand={executeCommand} 
      />
    </TerminalWindow>
  );
}
```

## 📁 Virtual File System Structure

```
home/
├── README.md              # Welcome guide
├── .env                   # "Secret" environment variables
├── .gitignore             # Development wisdom
├── konami.surprise        # Hidden Konami code content
├── src/                   # Source code examples
│   ├── main.ts            # Game engine TypeScript
│   ├── player.ml          # OCaml entity definitions
│   └── components/
│       └── Hero.tsx       # React component examples
├── docs/                  # Project documentation
│   ├── architecture.md    # System architecture overview
│   ├── getting-started.md # Setup and usage guide
│   └── commands.txt       # Terminal command reference
├── games/                 # Game development projects
│   ├── fey/              # Main game project
│   │   ├── fey.md        # Game description
│   │   ├── characters/   # Character definitions
│   │   └── skills/       # Skill system content
│   └── prototypes/       # Game ideas and concepts
└── secrets/               # Hidden directory with easter eggs
    ├── .hidden_config     # Developer configuration
    ├── .quantum_state     # Quantum physics humor
    ├── diary.md          # Developer's secret diary
    └── cookie.txt        # Virtual achievement cookie
```

## 🎨 Customization

### Adding New Commands
```typescript
// In commandHandler.ts
const commands = {
  mycommand: (args: string[], context: CommandContext): CommandResult => {
    return { 
      output: ['Hello from my custom command!'] 
    };
  }
};
```

### Extending the File System
```typescript
// In virtualFS.ts
export const virtualFS: FileSystem = {
  home: {
    "new_file.txt": "New content here!",
    new_directory: {
      "nested_file.md": "Nested content..."
    }
  }
};
```

### Customizing Animation
```typescript
const animation = useTerminalAnimation(isVisible, {
  typingSpeed: 30,      // ms per character
  commandDelay: 200,    // ms after command completes
  outputDelay: 400,     // ms between output lines
  startDelay: 1000,     // ms before animation starts
});
```

## 🎯 Performance Notes

- **Lazy loading**: Components only render when visible
- **Efficient re-renders**: Optimized state updates and memoization
- **Minimal DOM**: Virtual scrolling for large command histories
- **Memory management**: Automatic cleanup when component unmounts

## 🐛 Development Tips

- Use `clear` command to reset terminal content
- Try `help` for available commands overview
- Explore with `ls -a` to find hidden files
- Use ↑/↓ for command history navigation
- Check browser console for any React warnings

## 🏆 Easter Egg Hints

1. Look for files starting with `.` (dot files)
2. Try navigating to the `secrets/` directory
3. Use `cat` on interesting-looking files
4. Try typing classic commands like `konami` or `matrix`
5. Read the developer's diary for insider info
6. Find the quantum state file for physics humor
7. Discover the virtual cookie reward

Happy exploring! 🚀