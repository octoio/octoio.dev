import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Fey Data Pipeline",
    description:
      "OCaml-based data processing pipeline that validates JSON game data definitions, manages entity relationships, and generates type-safe C# code for Unity integration.",
    technologies: ["OCaml", "ATD", "Dune", "JSON", "C#"],
    url: "https://github.com/octoio/fey-data",
    displayUrl: "View on GitHub",
    featured: true,
    publishedAt: "2025-07-28",
  },
  {
    id: "2",
    title: "Fey Console",
    description:
      "Modern web-based console for creating, editing, and managing game entities. Features entity-specific editors, multi-entity support, and comprehensive testing.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Ant Design",
      "Zustand",
      "Vitest",
    ],
    url: "https://github.com/octoio/fey-console",
    displayUrl: "View on GitHub",
    featured: true,
    publishedAt: "2025-07-27",
  },
  {
    id: "3",
    title: "Voice Viewer",
    description:
      "Professional audio visualizer for faceless content creators and developers. Features live microphone mode with real-time parameter tuning, multiple visualizers (waveform, spectrum, circular), and professional themes perfect for devlogs and tutorials.",
    technologies: [
      "Python",
      "OpenCV",
      "LibROSA",
      "MoviePy",
      "PyAudio",
      "NumPy",
    ],
    url: "https://github.com/octoio/voice-viewer",
    displayUrl: "View on GitHub",
    featured: false,
    publishedAt: "2025-07-26",
  },
  {
    id: "4",
    title: "Whisper Transcriber",
    description:
      "Audio transcription tool leveraging OpenAI's Whisper model for accurate speech-to-text conversion.",
    technologies: ["Python", "OpenAI Whisper", "Audio Processing"],
    url: "https://github.com/octoio/whisper-transcriber",
    displayUrl: "View on GitHub",
    featured: false,
    publishedAt: "2025-07-25",
  },
  {
    id: "5",
    title: "Fey Manim Animations",
    description:
      "Mathematical animation system for creating devlog content and educational materials.",
    technologies: ["Python", "Manim", "Animation"],
    url: "https://github.com/octoio/fey-manim",
    displayUrl: "View on GitHub",
    featured: false,
    publishedAt: "2025-07-24",
  },
  {
    id: "6",
    title: "octoio.dev",
    description:
      "This portfolio website built with Next.js 15 and TypeScript. Features an interactive terminal, fuzzy search, MDX blog system, and comprehensive project showcase. Built collaboratively with Claude.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Fuse.js"],
    url: "https://github.com/octoio/octoio.dev",
    displayUrl: "View on GitHub",
    featured: true,
    publishedAt: "2025-07-23",
  },
];
