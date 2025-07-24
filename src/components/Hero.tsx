"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentTech, setCurrentTech] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const techStack = [
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

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [techStack.length]);

  const handleNextTech = () => {
    setCurrentTech((prev) => (prev + 1) % techStack.length);
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-700"
    >
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6">
                <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  Octoio
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <span className="text-xl text-white/90">Building with</span>
                  <button
                    onClick={handleNextTech}
                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${techStack[currentTech].color} text-white font-bold text-lg transition-transform duration-300 hover:scale-110 flex items-center gap-2`}
                  >
                    <Image
                      src={techStack[currentTech].logo}
                      alt={`${techStack[currentTech].name} logo`}
                      width={24}
                      height={24}
                      className={"inline-block filter brightness-0 invert"}
                      unoptimized
                    />
                    {techStack[currentTech].name}
                  </button>
                </div>
              </div>

              <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-xl lg:mx-0 mx-auto">
                Crafting immersive game experiences through code. From type-safe
                data pipelines to interactive Unity worlds, I bridge the gap
                between elegant architecture and compelling gameplay.
              </p>

              <div className="flex justify-center lg:justify-start">
                <Link
                  href="#about"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    About Me
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side - Terminal */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white/70 text-sm font-mono ml-2">
                    ~/octoio/current-project
                  </span>
                </div>

                <div className="font-mono text-sm space-y-2">
                  <div className="text-green-400">
                    <span className="text-purple-400">$</span> ocaml compile
                    game_data.ml
                  </div>
                  <div className="text-cyan-300 pl-4">
                    ✓ Type checking complete
                  </div>
                  <div className="text-cyan-300 pl-4">
                    ✓ C# generation successful
                  </div>

                  <div className="text-green-400 mt-4">
                    <span className="text-purple-400">$</span> unity build
                    --target WebGL
                  </div>
                  <div className="text-cyan-300 pl-4">✓ Assets optimized</div>
                  <div className="text-cyan-300 pl-4">
                    ✓ Build ready for deployment
                  </div>

                  <div className="text-green-400 mt-4">
                    <span className="text-purple-400">$</span> git commit -m
                    &quot;Another epic feature&quot;
                  </div>
                  <div className="text-cyan-300 pl-4">✓ Ready to ship! 🚀</div>

                  <div className="text-purple-400 mt-4 animate-pulse">
                    <span className="text-purple-400">$</span>{" "}
                    <span className="bg-purple-500/20 px-1">|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
