/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getDirectory,
  getFile,
  getCurrentPath,
  isDirectory,
  type FileSystem,
} from "./virtualFS";

export interface CommandResult {
  output: string[];
  newPath?: string[];
}

export interface CommandContext {
  currentPath: string[];
  fs: FileSystem;
}

const commands = {
  ls: (args: string[], context: CommandContext): CommandResult => {
    const { currentPath, fs } = context;
    const showAll = args.includes("-a");
    const currentDir = getDirectory(fs, currentPath);

    if (!currentDir) {
      return { output: ["Error: Invalid directory"] };
    }

    const items = Object.keys(currentDir)
      .filter((key) => showAll || !key.startsWith("."))
      .sort()
      .map((key) => {
        if (typeof currentDir[key] === "object") {
          return `${key}/`;
        } else {
          return key;
        }
      });

    return {
      output: items.length > 0 ? items : ["(empty directory)"],
    };
  },

  cd: (args: string[], context: CommandContext): CommandResult => {
    const { currentPath, fs } = context;
    let newPath = [...currentPath];

    if (args.length === 0) {
      // cd with no args goes to home
      return { output: [], newPath: ["home"] };
    }

    const target = args[0];

    if (target === "..") {
      if (newPath.length > 1) {
        newPath.pop();
      }
    } else if (target === ".") {
      // Stay in current directory
    } else if (target === "~") {
      newPath = ["home"];
    } else if (target.startsWith("/")) {
      // Absolute path (not fully supported, but handle gracefully)
      return { output: [`cd: absolute paths not yet supported: ${target}`] };
    } else {
      // Relative path - handle trailing slash
      const cleanTarget = target.endsWith("/") ? target.slice(0, -1) : target;
      const currentDir = getDirectory(fs, currentPath);
      if (currentDir && isDirectory(fs, currentPath, cleanTarget)) {
        newPath.push(cleanTarget);
      } else {
        return { output: [`cd: no such directory: ${target}`] };
      }
    }

    return { output: [], newPath };
  },

  cat: (args: string[], context: CommandContext): CommandResult => {
    const { currentPath, fs } = context;

    if (args.length === 0) {
      return { output: ["cat: missing filename"] };
    }

    const filename = args[0];
    const content = getFile(fs, currentPath, filename);

    if (content === null) {
      if (isDirectory(fs, currentPath, filename)) {
        return { output: [`cat: ${filename}: Is a directory`] };
      }
      return { output: [`cat: ${filename}: No such file`] };
    }

    // Handle special files with extra flair
    if (filename === "konami.surprise") {
      return {
        output: [
          "🎉 SURPRISE! You found the Konami code file!",
          "",
          ...content.split("\n"),
          "",
          "🎮 Achievement Unlocked: Retro Gamer! 🎮",
        ],
      };
    }

    if (filename === "cookie.txt") {
      return {
        output: [
          "🍪 *nom nom nom* 🍪",
          "",
          ...content.split("\n"),
          "",
          "✨ You feel your exploration skills increase! ✨",
        ],
      };
    }

    return { output: content.split("\n") };
  },

  pwd: (args: string[], context: CommandContext): CommandResult => {
    const { currentPath } = context;
    return { output: [getCurrentPath(currentPath)] };
  },

  help: (args: string[], context: CommandContext): CommandResult => {
    const helpText = [
      "🖥️  Terminal Commands Help 🖥️",
      "",
      "📁 Navigation:",
      "  ls [-a]     List directory contents (-a shows hidden files)",
      "  cd <dir>    Change directory (.. for parent, . for current, ~ for home)",
      "  pwd         Show current directory path",
      "",
      "📄 File Operations:",
      "  cat <file>  Display file contents",
      "",
      "🔧 System:",
      "  help        Show this help message",
      "  clear       Clear the terminal screen",
      "  whoami      Display current user info",
      "  nav         Navigate website (nav --help for sitemap)",
      "",
      "💡 Pro Tips:",
      "  - Use Tab key for command and filename completion",
      "  - Use ↑/↓ arrows to navigate command history",
      "  - Use .. to go up directories",
      "  - Hidden files start with a dot (.)",
      "  - Try exploring the filesystem with ls and cd",
    ];

    return { output: helpText };
  },

  clear: (args: string[], context: CommandContext): CommandResult => {
    return { output: ["CLEAR_SCREEN"] }; // Special command to clear screen
  },

  whoami: (args: string[], context: CommandContext): CommandResult => {
    return {
      output: [
        "👤 Current User: explorer",
        "🏠 Home Directory: /home/explorer",
        "🎮 Role: Terminal Adventurer",
        "🔍 Curiosity Level: Maximum",
        "☕ Coffee Status: Adequately Caffeinated",
        "",
        "You are a brave soul exploring the depths of this virtual filesystem!",
        "Your mission: Discover all the hidden easter eggs and secrets.",
        "",
        "🏆 Current Achievements:",
        "- [✓] Opened the terminal",
        "- [✓] Used the help command",
        "- [ ] Found a hidden file",
        "- [ ] Discovered the secret cookie",
        "- [ ] Activated the Konami code",
        "- [ ] Read the developer's diary",
      ],
    };
  },

  konami: (args: string[], context: CommandContext): CommandResult => {
    const konamiFile = getFile(context.fs, ["home"], "konami.surprise");
    if (konamiFile) {
      return {
        output: [
          "🎮 KONAMI CODE SEQUENCE DETECTED! 🎮",
          "",
          "↑ ↑ ↓ ↓ ← → ← → B A",
          "",
          ...konamiFile.split("\n"),
          "",
          "🎊 Welcome to the secret developer club! 🎊",
          "You now have access to... well, the same files as before,",
          "but with the knowledge that you're truly awesome! 🌟",
        ],
      };
    }
    return {
      output: [
        "🎮 KONAMI CODE: ↑ ↑ ↓ ↓ ← → ← → B A",
        "Try typing the actual sequence in the terminal! 😉",
      ],
    };
  },

  // Hidden commands for fun
  "↑↑↓↓←→←→ba": (args: string[], context: CommandContext): CommandResult => {
    return commands.konami(args, context);
  },

  matrix: (args: string[], context: CommandContext): CommandResult => {
    return {
      output: [
        "🕶️  Welcome to the Matrix, Neo... 🕶️",
        "",
        "01001000 01100101 01101100 01101100 01101111",
        "01010111 01101111 01110010 01101100 01100100",
        "",
        'Translation: "Hello World"',
        "",
        "You took the red pill and ended up in a React component.",
        "Reality is often disappointing... but this terminal is pretty cool! 😎",
      ],
    };
  },

  sudo: (args: string[], context: CommandContext): CommandResult => {
    return {
      output: [
        `[sudo] password for explorer: `,
        "Sorry, try again.",
        `[sudo] password for explorer: `,
        "Sorry, try again.",
        `[sudo] password for explorer: `,
        "sudo: 3 incorrect password attempts",
        "",
        "Nice try! But this is a fake terminal. 😏",
        `You don't actually have sudo access here.`,
        "",
        "However, your determination is noted and appreciated! 🏆",
      ],
    };
  },

  nav: (args: string[], context: CommandContext): CommandResult => {
    if (args.includes("--help") || args.includes("-h")) {
      return {
        output: [
          "🧭 Navigation Command Help",
          "",
          "Usage: nav [destination]",
          "",
          "📍 Current Page Sections:",
          "  #hero      - Jump to hero section (top of page)",
          "  #about     - Jump to about section",
          "  #projects  - Jump to projects section",
          "  #connect   - Jump to contact/social links section",
          "",
          "📄 Site Pages:",
          "  /          - Home page",
          "  /projects  - All projects page",
          "  /posts     - All blog posts page",
          "",
          "📝 Blog Posts:",
          "  /post/multi-language-game-ecosystem",
          "  /post/type-safety-game-pipelines",
          "",
          "💡 Examples:",
          "  nav #about           - Scroll to about section",
          "  nav /projects        - Navigate to projects page",
          "  nav /posts           - Navigate to blog posts",
          "",
          "🌐 External Links:",
          "  nav github           - Opens GitHub profile",
          "  nav youtube          - Opens YouTube channel",
          "  nav discord          - Opens Discord server",
          "",
          "Note: Page navigation will open in the same tab,",
          "external links will open in a new tab.",
        ],
      };
    }

    if (args.length === 0) {
      return {
        output: [
          "🧭 Navigation Command",
          "",
          "Usage: nav [destination]",
          "Type 'nav --help' for available destinations and examples.",
          "",
          "Quick options:",
          "  nav #about     - Jump to about section",
          "  nav /projects  - Go to projects page",
          "  nav github     - Open GitHub profile",
        ],
      };
    }

    const destination = args[0].toLowerCase();

    // Handle current page sections (hash navigation)
    const currentPageSections: Record<string, string> = {
      "#hero": "#",
      "#about": "#about",
      "#projects": "#projects",
      "#connect": "#connect",
    };

    if (destination in currentPageSections) {
      const targetHash = currentPageSections[destination];

      // Scroll to section
      setTimeout(() => {
        const element = document.querySelector(
          targetHash === "#" ? "body" : `[id="${targetHash.substring(1)}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      return {
        output: [`🧭 Navigating to ${destination}...`],
      };
    }

    // Handle site pages
    const sitePages: Record<string, string> = {
      "/": "/",
      "/projects": "/projects",
      "/posts": "/posts",
      home: "/",
      projects: "/projects",
      posts: "/posts",
    };

    if (destination in sitePages) {
      const targetUrl = sitePages[destination];

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 100);

      return {
        output: [`🧭 Navigating to ${targetUrl}...`],
      };
    }

    // Handle blog posts
    if (
      destination.startsWith("/post/") ||
      destination.includes("game-ecosystem") ||
      destination.includes("type-safety")
    ) {
      let postUrl = destination;

      if (destination.includes("game-ecosystem")) {
        postUrl = "/post/multi-language-game-ecosystem";
      } else if (destination.includes("type-safety")) {
        postUrl = "/post/type-safety-game-pipelines";
      }

      setTimeout(() => {
        window.location.href = postUrl;
      }, 100);

      return {
        output: [`🧭 Navigating to ${postUrl}...`],
      };
    }

    // Handle external links
    const externalLinks: Record<string, string> = {
      github: "https://github.com/octoio",
      youtube: "https://youtube.com/@octoio",
      discord: "https://discord.gg/Wb2ZZCEF",
      reddit: "https://reddit.com/u/octoio",
      instagram: "https://instagram.com/octoio",
      tiktok: "https://www.tiktok.com/@octoio_dev",
      email: "mailto:octoiodev@gmail.com",
    };

    if (destination in externalLinks) {
      const targetUrl = externalLinks[destination];

      setTimeout(() => {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }, 100);

      return {
        output: [`🌐 Opening ${destination} in new tab...`],
      };
    }

    // Unknown destination
    return {
      output: [
        `🧭 Unknown destination: ${destination}`,
        "",
        "Available options:",
        "• Page sections: #hero, #about, #projects, #connect",
        "• Site pages: /, /projects, /posts",
        "• External: github, youtube, discord",
        "",
        "Type 'nav --help' for full sitemap and examples.",
      ],
    };
  },
};

export const handleCommand = (
  input: string,
  context: CommandContext
): CommandResult => {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return { output: [] };
  }

  const parts = trimmedInput.split(" ");
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (command in commands) {
    return commands[command as keyof typeof commands](args, context);
  }

  // Handle some common typos and aliases
  const aliases: Record<string, string> = {
    ll: "ls",
    la: "ls -a",
    dir: "ls",
    type: "cat",
    more: "cat",
    less: "cat",
    chdir: "cd",
    md: "mkdir",
    rd: "rmdir",
    del: "rm",
    copy: "cp",
    move: "mv",
    ren: "mv",
  };

  if (command in aliases) {
    const aliasedCommand = aliases[command];
    const aliasedParts = aliasedCommand.split(" ");
    const realCommand = aliasedParts[0];
    const realArgs = [...aliasedParts.slice(1), ...args];

    if (realCommand in commands) {
      return commands[realCommand as keyof typeof commands](realArgs, context);
    }
  }

  // Easter egg responses for common commands that don't exist
  const easterEggResponses: Record<string, string[]> = {
    vim: [
      "vim: command not found",
      "",
      "But hey, at least you're not stuck in vim right now! 😄",
      "How to exit vim: Just close this browser tab! 🚪",
    ],
    emacs: [
      "emacs: command not found",
      "",
      "The editor war ends here. We only have cat. 🐱",
      "Peace in our time! ✌️",
    ],
    nano: [
      "nano: command not found",
      "",
      "This terminal is too minimal for text editors.",
      "Try using cat to read files instead! 📖",
    ],
    git: [
      "git: command not found",
      "",
      "This virtual filesystem isn't under version control.",
      "But the real code definitely is! Check out the GitHub repo. 🐙",
    ],
    npm: [
      "npm: command not found",
      "",
      "No package.json found in virtual filesystem.",
      "This terminal runs on pure imagination! ✨",
    ],
    python: [
      "python: command not found",
      "",
      "No snakes in this terminal! 🐍",
      "But there might be some Python code in the src/ directory...",
    ],
    node: [
      "node: command not found",
      "",
      "This terminal is more of a leaf than a node. 🍃",
      "Check out the TypeScript files for some real JavaScript action!",
    ],
  };

  if (command in easterEggResponses) {
    return { output: easterEggResponses[command] };
  }

  return {
    output: [
      `command not found: ${command}`,
      "",
      'Type "help" to see available commands.',
    ],
  };
};

export default handleCommand;
