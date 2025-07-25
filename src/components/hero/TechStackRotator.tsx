"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface TechStackRotatorProps {
  onTechClick?: () => void;
}

interface Technology {
  name: string;
  color: string;
  logo: string;
}

const techStack: Technology[] = [
  {
    name: "OCaml",
    color: "from-orange-400 to-red-500",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ocaml/ocaml-original.svg",
  },
  {
    name: "TypeScript",
    color: "from-blue-400 to-blue-600",
    logo: "https://raw.githubusercontent.com/maciejkorsan/typescript-blue/master/logo.svg",
  },
  {
    name: "Unity",
    color: "from-gray-700 to-gray-900",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/unity/unity-original.svg",
  },
  {
    name: "React",
    color: "from-cyan-400 to-blue-500",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  {
    name: "Python",
    color: "from-yellow-400 to-blue-500",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  },
  {
    name: "Docker",
    color: "from-blue-400 to-blue-600",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  },
  {
    name: "NestJS",
    color: "from-red-500 to-red-700",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg",
  },
  {
    name: "MongoDB",
    color: "from-green-500 to-green-700",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
  },
];

export default function TechStackRotator({ onTechClick }: TechStackRotatorProps) {
  const [currentTech, setCurrentTech] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = techStack.map((tech) => {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img');
          img.onload = () => resolve(true);
          img.onerror = () => reject(new Error(`Failed to load ${tech.name} logo`));
          img.src = tech.logo;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn("Some tech stack images failed to preload:", error);
        // Still set as loaded to show the component
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const handleNextTech = () => {
    setCurrentTech((prev) => (prev + 1) % techStack.length);
    onTechClick?.();
  };

  if (!imagesLoaded) {
    // Show loading state with first tech
    return (
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
        <span className="text-xl text-white/90">Building with</span>
        <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${techStack[0].color} text-white font-bold text-lg flex items-center gap-2`}>
          <div className="w-6 h-6 bg-white/20 rounded animate-pulse" />
          {techStack[0].name}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
      <span className="text-xl text-white/90">Building with</span>
      <button
        onClick={handleNextTech}
        className={`relative px-4 py-2 rounded-lg bg-gradient-to-r ${techStack[currentTech].color} text-white font-bold text-lg transition-all duration-300 hover:scale-110 flex items-center gap-2`}
      >
        {/* Preloaded images - all rendered but only one visible */}
        <div className="relative w-6 h-6">
          {techStack.map((tech, index) => (
            <Image
              key={tech.name}
              src={tech.logo}
              alt={`${tech.name} logo`}
              width={24}
              height={24}
              className={`absolute inset-0 filter brightness-0 invert transition-opacity duration-200 ${
                index === currentTech ? 'opacity-100' : 'opacity-0'
              }`}
              unoptimized
            />
          ))}
        </div>
        {techStack[currentTech].name}
      </button>
    </div>
  );
}