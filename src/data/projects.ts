import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Fey Data Pipeline (OCaml)",
    description:
      "OCaml-based data processing pipeline that validates JSON game data definitions, manages entity relationships, and generates type-safe C# code for Unity integration.",
    technologies: ["OCaml", "ATD", "Dune", "JSON", "C#"],
    githubUrl: "https://github.com/octoio/fey-data",
    featured: true,
  },
  {
    id: "2",
    title: "Fey Console (React/TypeScript)",
    description:
      "Modern web-based console for creating, editing, and managing game entities. Features entity-specific editors, multi-entity support, and comprehensive testing with 1200+ tests.",
    technologies: ["React", "TypeScript", "Vite", "Ant Design", "Zustand", "Vitest"],
    githubUrl: "https://github.com/octoio/fey-console",
    featured: true,
  },
  {
    id: "3",
    title: "Voice Viewer",
    description:
      "Audio visualization tool for analyzing and displaying voice patterns and audio data.",
    technologies: ["TypeScript", "Web Audio API", "Canvas"],
    githubUrl: "https://github.com/octoio/voice-viewer",
    featured: false,
  },
  {
    id: "4",
    title: "Whisper Transcriber",
    description:
      "Audio transcription tool leveraging OpenAI's Whisper model for accurate speech-to-text conversion.",
    technologies: ["Python", "OpenAI Whisper", "Audio Processing"],
    githubUrl: "https://github.com/octoio/whisper-transcriber",
    featured: false,
  },
  {
    id: "5",
    title: "Fey Manim Animations",
    description:
      "Mathematical animation system for creating devlog content and educational materials.",
    technologies: ["Python", "Manim", "Animation"],
    githubUrl: "https://github.com/octoio/fey-manim",
    featured: true,
  },
];
