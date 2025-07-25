export type FileSystem = {
  [key: string]: string | FileSystem;
};

export const virtualFS: FileSystem = {
  home: {
    "README.md": `# Welcome to Octoio's Terminal 🎮

## Available Commands
- \`ls\` - list directory contents
- \`ls -a\` - list all files (including hidden)
- \`cd <dir>\` - change directory
- \`cat <file>\` - display file contents
- \`help\` - show available commands
- \`pwd\` - show current directory

## Getting Started
Try exploring the directories below:
- \`src/\` - Source code and projects
- \`docs/\` - Documentation and guides
- \`games/\` - Game development projects
- \`secrets/\` - 🤫 What could be in here?

Happy exploring! 🚀`,

    src: {
      "main.ts": `// Octoio's Main Entry Point
console.log("🎮 Welcome to the game development universe!");

class GameEngine {
  private systems: System[] = [];
  
  constructor() {
    this.initialize();
  }
  
  private initialize() {
    // TODO: Initialize all game systems
    // - Entity Component System
    // - Physics Engine
    // - Rendering Pipeline
    // - Audio System
  }
  
  run() {
    // The magic happens here ✨
    requestAnimationFrame(() => this.gameLoop());
  }
  
  private gameLoop() {
    // Update all systems
    this.systems.forEach(system => system.update());
    
    // Continue the loop
    requestAnimationFrame(() => this.gameLoop());
  }
}

export default GameEngine;`,

      "player.ml": `(* OCaml Player Entity Definition *)
type player = {
  id: string;
  name: string;
  level: int;
  health: int;
  mana: int;
  position: float * float;
  inventory: item list;
}

and item = {
  id: string;
  name: string;
  description: string;
  rarity: rarity;
}

and rarity = Common | Rare | Epic | Legendary

let create_player name =
  {
    id = Uuid.create ();
    name;
    level = 1;
    health = 100;
    mana = 50;
    position = (0.0, 0.0);
    inventory = [];
  }

(* Player actions *)
let level_up player =
  { player with 
    level = player.level + 1;
    health = player.health + 20;
    mana = player.mana + 10;
  }`,

      components: {
        "Hero.tsx": `// The hero you just saw! 🦸‍♂️
import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="hero-gradient min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}

// Fun fact: This terminal is also a React component! 
// Inception much? 🤯`,
      },
    },

    docs: {
      "architecture.md": `# System Architecture 🏗️

## The Fey Game Development Ecosystem

### Overview
A multi-language, type-safe game development pipeline that bridges the gap between rapid prototyping and production-ready games.

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   fey-console   │───▶│    fey-data     │───▶│  fey-game-mock  │
│  (Management)   │    │  (Processing)   │    │   (Unity Game)  │
│                 │    │                 │    │                 │
│ • Entity Editors│    │ • Validation    │    │ • Generated C#  │
│ • JSON Creation │    │ • C# Generation │    │ • StreamingAssets│
│ • File Manager  │    │ • Type Safety   │    │ • Game Integration│
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

### Why This Architecture?
- **Type Safety**: From OCaml to C# to TypeScript
- **Rapid Iteration**: Change data definitions instantly
- **Validation**: Catch errors before they reach the game
- **Scalability**: Handle thousands of game entities`,

      "getting-started.md": `# Getting Started Guide 🚀

## Prerequisites
- OCaml 5.2.0+
- Node.js 18+
- Unity 2022.3 LTS

## Quick Start
1. Clone the ecosystem repositories
2. Set up OCaml environment: \`opam switch create . 5.2.0\`
3. Install dependencies: \`opam install . --deps-only\`
4. Build the pipeline: \`dune build\`
5. Start the console: \`npm run dev\`

## Your First Entity
Create a new weapon entity:
\`\`\`json
{
  "id": "iron_sword",
  "name": "Iron Sword",
  "damage": 25,
  "durability": 100,
  "rarity": "common"
}
\`\`\`

## What's Next?
- Explore the entity editors
- Create your first skill tree
- Build and deploy to Unity`,

      "commands.txt": `Terminal Commands Reference 📋

Basic Navigation:
• ls - List files and directories
• ls -a - List all files (including hidden ones starting with .)
• cd <directory> - Change to directory
• cd .. - Go up one directory level
• cd . - Stay in current directory (does nothing)
• pwd - Print working directory (coming soon!)

File Operations:
• cat <filename> - Display file contents
• head <filename> - Display first few lines (coming soon!)
• tail <filename> - Display last few lines (coming soon!)

System:
• help - Show available commands
• clear - Clear terminal (coming soon!)
• whoami - Show current user (coming soon!)

Easter Eggs:
• Try exploring hidden files with ls -a
• Look for unusual file extensions
• Check out the secrets directory 👀`,
    },

    games: {
      fey: {
        "fey.md": `# Fey (fæge) - Online Coop Dungeon Crawler 🎮

## What is Fey?
Fey is an online cooperative dungeon crawler RPG roguelite where you and your friends explore procedurally generated dungeons, battle monsters, collect loot, and develop your characters.

## Key Features
- **Online Coop**: Play with up to 4 friends
- **Procedural Generation**: No two dungeons are the same
- **Character Progression**: Level up and customize your playstyle
- **Loot System**: Discover powerful weapons and equipment
- **Skill Trees**: Unlock new abilities and combos

## Current Status
🔥 **Active Development** 🔥
- Core gameplay loop complete
- Multiplayer networking implemented
- Asset pipeline fully automated
- Regular devlogs on YouTube (@octoio)

## Technologies
- Unity 2022.3 LTS
- Mirror Networking
- OCaml data pipeline
- TypeScript management console`,

        characters: {
          "warrior.json": `{
  "id": "warrior",
  "name": "Stalwart Warrior",
  "description": "A battle-hardened fighter who excels in melee combat",
  "baseStats": {
    "health": 120,
    "mana": 30,
    "strength": 15,
    "dexterity": 8,
    "intelligence": 5,
    "vitality": 12
  },
  "startingSkills": ["slash", "block", "charge"],
  "startingEquipment": ["iron_sword", "leather_armor", "wooden_shield"]
}`,

          "mage.json": `{
  "id": "mage",
  "name": "Arcane Scholar",
  "description": "A master of magical arts who wields devastating spells",
  "baseStats": {
    "health": 70,
    "mana": 100,
    "strength": 5,
    "dexterity": 7,
    "intelligence": 18,
    "vitality": 8
  },
  "startingSkills": ["fireball", "frost_bolt", "mana_shield"],
  "startingEquipment": ["oak_staff", "mage_robes", "spell_focus"]
}`,
        },

        skills: {
          "epic_skills.txt": `🌟 LEGENDARY SKILLS DISCOVERED 🌟

🔥 Inferno Strike
   Unleash the power of a thousand suns in a single blow
   
❄️  Absolute Zero
   Freeze time itself and shatter your enemies
   
⚡ Thunder God's Hammer
   Channel divine lightning through your weapon
   
🌪️ Void Vortex
   Create a black hole that devours everything
   
🌟 Phoenix Resurrection
   Rise from death stronger than before

These skills are so powerful, they're still in development! 
Check back in the next major update... 👀`,
        },
      },

      prototypes: {
        "ideas.txt": `🎮 Game Prototype Ideas 💡

1. **Quantum Platformer**
   - Player exists in multiple dimensions simultaneously
   - Actions in one dimension affect others
   - Puzzle-platformer mechanics

2. **Ecosystem Simulator**
   - Build and manage complex food webs
   - Climate change affects gameplay
   - Educational yet fun

3. **Memory Palace**
   - Navigate through mental landscapes
   - Solve puzzles by manipulating memories
   - Psychological horror elements

4. **Code Combat Arena**
   - Program AI fighters to battle
   - Real programming language integration
   - Educational competitive gaming

5. **Time Archaeologist**
   - Uncover historical mysteries
   - Time travel affects narrative
   - Research-based gameplay

Which one should I prototype next? 🤔`,
      },
    },

    secrets: {
      ".hidden_config": `# 🤫 SECRET CONFIG FILE 🤫
# If you're reading this, you're quite the explorer!

DEVELOPER_MODE=true
EASTER_EGG_ENABLED=true
SECRET_LEVEL_UNLOCKED=false
KONAMI_CODE_ACTIVATED=false

# Hidden features:
# - Type 'konami' in the terminal 
# - Check the .quantum_state file
# - Look for the developer's diary

# Remember: With great power comes great responsibility! 🕷️`,

      ".quantum_state": `QUANTUM_ENTANGLEMENT_ACTIVE=true
SUPERPOSITION_ENABLED=false
OBSERVER_EFFECT=minimal

# Schrödinger's Code: This file exists and doesn't exist
# until you observe it. By reading this, you've collapsed
# the wave function! 🐱📦

PROBABILITY_OF_BUGS=0.42
COFFEE_LEVEL=critically_low
INSPIRATION_METER=over_9000

# The developer was here... or was he? 🤔
TIMESTAMP=2024-13-32T25:61:99Z  # Wait, that's not a valid date...`,

      "diary.md": `# Developer's Secret Diary 📔

## Entry #42: The Great Refactor
*Date: Yesterday, Tomorrow, or Maybe Never*

Dear Diary,

I've been working on this terminal component for what feels like eons. Started simple - just show some fake commands. But then I thought... what if it was REAL? What if users could actually interact with it?

So here we are. A fully functional terminal inside a React component inside a Next.js app inside a browser. It's terminals all the way down! 🐢

## Entry #43: The Easter Egg Rabbit Hole
*Date: 3 AM (Time has lost all meaning)*

I couldn't stop adding easter eggs. First it was just the .env file. Then I added more files. Then directories. Then a whole filesystem!

I think I have a problem. But it's a fun problem! 😄

## Entry #44: File System Inception
*Date: When the coffee kicks in*

Users can now navigate directories, read files, and discover secrets. I've hidden references to:
- The actual codebase structure
- Game development projects
- Random thoughts and ideas
- This very diary!

If someone finds this, they deserve a virtual cookie 🍪

## Entry #∞: The Loop
*Date: Always*

I wonder if anyone will ever read this far. If you do, you're amazing! Drop me a line and mention "quantum cats" - I'll know you're a true explorer.

Time to push to production... or is production pushing to me? 🤯

~ The Developer (Currently Caffeinated)`,

      "cookie.txt": `🍪 CONGRATULATIONS! 🍪

You found the secret cookie!

   ╭──────────────────────╮
   │     VIRTUAL COOKIE    │
   │                      │
   │    🍪  AWARDED TO:    │
   │     THE EXPLORER     │
   │                      │  
   │   For exceptional    │
   │   curiosity and      │
   │   determination      │
   ╰──────────────────────╯

This cookie has zero calories but infinite satisfaction!
Your dedication to exploration is truly inspiring.

Fun facts about this cookie:
- It's made with 100% organic pixels
- Baked in a virtual oven at 404°F
- Contains traces of determination and curiosity
- May cause increased productivity

Thanks for exploring! 🎉`,
    },

    ".env": `# 🕵️‍♀️ ENVIRONMENT SECRETS 🕵️‍♂️

API_KEY=not_the_real_key_obviously
DATABASE_URL=sqlite://definitely_not_production.db
SECRET_SAUCE=42_and_coffee

# Did you really think you'd find actual secrets in a fake terminal?
# Well... congratulations on your persistence! 🎉

ACTUAL_SECRET=The real secret is the friends we made along the way
EASTER_EGG_LEVEL=expert_explorer
DEVELOPER_MOOD=impressed_by_your_curiosity

# Pro tip: Check out the 'secrets' directory for more hidden gems 👀
# Also, try 'ls -a' to see all the hidden files!`,

    ".gitignore": `# This is a fake .gitignore file
# But it contains real wisdom! 💎

node_modules/
dist/
build/
*.log
.env
.DS_Store

# Files that definitely don't exist:
secrets/the_real_password.txt
my_diary.md
embarrassing_code.js
that_bug_i_never_fixed.py

# Real advice:
# - Always gitignore your environment files
# - Keep secrets out of version control  
# - Document your .gitignore entries
# - This fake terminal is kind of cool, right? 😎`,

    "konami.surprise": `🎮 KONAMI CODE ACTIVATED! 🎮

↑ ↑ ↓ ↓ ← → ← → B A

 ████████╗██╗  ██╗███████╗    
 ╚══██╔══╝██║  ██║██╔════╝    
    ██║   ███████║█████╗      
    ██║   ██╔══██║██╔══╝      
    ██║   ██║  ██║███████╗    
    ╚═╝   ╚═╝  ╚═╝╚══════╝    
                              
 ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║  ██║█████╗  
██║     ██║   ██║██║  ██║██╔══╝  
╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝

You've unlocked the legendary cheat mode!
🌟 Infinite virtual cookies
🚀 Maximum exploration speed  
🎯 Ultimate easter egg detector
⚡ Quantum debugging powers

Welcome to the secret club of terminal explorers! 🎊`,
  },
};

export const getCurrentPath = (path: string[]): string => {
  return path.length > 1 
    ? `~/${path.slice(1).join('/')}`
    : '~';
};

export const getDirectoryContents = (fs: FileSystem, path: string[]): string[] => {
  const dir = getDirectory(fs, path);
  return dir ? Object.keys(dir) : [];
};

export const getDirectory = (fs: FileSystem, path: string[]): FileSystem | null => {
  return path.reduce<FileSystem | null>((acc, key) => {
    if (acc && typeof acc[key] === 'object') {
      return acc[key] as FileSystem;
    }
    return null;
  }, fs);
};

export const getFile = (fs: FileSystem, path: string[], filename: string): string | null => {
  const dir = getDirectory(fs, path);
  if (dir && typeof dir[filename] === 'string') {
    return dir[filename] as string;
  }
  return null;
};

export const isDirectory = (fs: FileSystem, path: string[], name: string): boolean => {
  const dir = getDirectory(fs, path);
  return dir ? typeof dir[name] === 'object' : false;
};

export const isFile = (fs: FileSystem, path: string[], name: string): boolean => {
  const dir = getDirectory(fs, path);
  return dir ? typeof dir[name] === 'string' : false;
};