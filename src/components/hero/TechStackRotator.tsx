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
  const [buttonWidth, setButtonWidth] = useState<number>(0);

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

  // Calculate and update button width when tech changes
  useEffect(() => {
    if (!imagesLoaded) return;

    // Create a temporary element to measure text width
    const measureElement = document.createElement('span');
    measureElement.style.visibility = 'hidden';
    measureElement.style.position = 'absolute';
    measureElement.style.fontSize = '18px'; // text-lg
    measureElement.style.fontWeight = '700'; // font-bold
    measureElement.style.fontFamily = 'var(--font-geist-sans), system-ui, -apple-system, sans-serif';
    measureElement.style.whiteSpace = 'nowrap';
    measureElement.style.padding = '0';
    measureElement.style.margin = '0';
    measureElement.textContent = techStack[currentTech].name;
    
    document.body.appendChild(measureElement);
    const textWidth = Math.ceil(measureElement.getBoundingClientRect().width);
    document.body.removeChild(measureElement);
    
    // Button width = padding + icon + gap + text + padding + extra buffer
    // px-4 = 16px each side = 32px total padding
    // icon = 24px, gap = 8px (gap-2)
    // Add 8px buffer to prevent text cutoff
    const calculatedWidth = 32 + 24 + 8 + textWidth + 8;
    setButtonWidth(calculatedWidth);
  }, [currentTech, imagesLoaded]);

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
        className={`relative px-4 py-2 rounded-lg bg-gradient-to-r ${techStack[currentTech].color} text-white font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-lg flex items-center gap-2 overflow-hidden`}
        style={{
          width: buttonWidth > 0 ? `${buttonWidth}px` : 'auto',
          transition: 'width 200ms ease-in-out, background 500ms ease-in-out, transform 300ms ease-in-out, box-shadow 300ms ease-in-out'
        }}
      >
        {/* Background gradient animation */}
        <div 
          className="absolute inset-0 bg-gradient-to-r opacity-0 hover:opacity-20 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)'
          }}
        />
        
        {/* Preloaded images - all rendered but only one visible */}
        <div className="relative w-6 h-6 flex-shrink-0">
          {techStack.map((tech, index) => (
            <Image
              key={tech.name}
              src={tech.logo}
              alt={`${tech.name} logo`}
              width={24}
              height={24}
              className={`absolute inset-0 filter brightness-0 invert transition-all duration-500 transform ${
                index === currentTech 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-75 rotate-12'
              }`}
              unoptimized
            />
          ))}
        </div>
        
        {/* Tech name with slide animation */}
        <div className="relative overflow-hidden">
          {techStack.map((tech, index) => (
            <span
              key={tech.name}
              className={`absolute whitespace-nowrap transition-all duration-500 transform ${
                index === currentTech
                  ? 'translate-y-0 opacity-100'
                  : index < currentTech
                  ? '-translate-y-full opacity-0'
                  : 'translate-y-full opacity-0'
              }`}
            >
              {tech.name}
            </span>
          ))}
          {/* Invisible placeholder to maintain proper height */}
          <span className="opacity-0 pointer-events-none whitespace-nowrap">
            {techStack[currentTech].name}
          </span>
        </div>
      </button>
    </div>
  );
}